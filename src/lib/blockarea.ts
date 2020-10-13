import { EventDispatcher, SimpleEventDispatcher } from 'strongly-typed-events';
import { BlockPoint } from './models';
import { Connection } from './connection';
import { Connector } from './connector';
import { Drag } from './drag';
import { Zoom } from './zoom';
import { listenEvent } from './utils';
import { BlockAreaOptions, ConnectionValidationResult, ConnectionValidator, IBlockAreaOptions, Transform } from './blockareaoptions';

export class BlockArea {
    
    public el: HTMLElement;
    public parentEl: HTMLElement;
    public activeConnection!: Connection | null;
    public destroy: (() => void);
    
    private _start: BlockPoint | null = null;
    private _zoom: Zoom;
    private _drag: Drag;
    private _transform: Transform = { k: 1, x: 0, y: 0 };
    private _options: BlockAreaOptions;

    private _mouseMove = new EventDispatcher<BlockArea, BlockPoint>();
    private _mouseUp = new EventDispatcher<BlockArea, BlockPoint>();
    private _connectionValidation = new EventDispatcher<BlockArea, ConnectionValidationResult>();
    private _connectionCreated = new SimpleEventDispatcher<Connection>();
    
    constructor(el: HTMLElement, parentEl: HTMLElement, options?: IBlockAreaOptions) {
        this.el = el;
        this.parentEl = parentEl;
        this._options = new BlockAreaOptions(options);
        if (this._options.gridBackground) {
            this.el.classList.add('grid');
        }
        this.el.style.width = `${this._options.widthMax}px`;
        this.el.style.height = `${this._options.heightMax}px`;
        this.el.style.transformOrigin = '0 0';
        const destroyMove = listenEvent(this.parentEl, 'pointermove', this.onMove.bind(this));
        const destroyUp = listenEvent(this.parentEl, 'pointerup', this.pointerUp.bind(this));
        this._zoom = new Zoom(this.el, this.parentEl as HTMLElement, this.onZoom.bind(this), this._options.zoomInterval);
        this._drag = new Drag(this.parentEl as HTMLElement, this.onTranslate.bind(this), this.onSelect.bind(this));
        this.destroy = () => { destroyMove(); destroyUp(); }
        this.update();
    }

    public get mouseMove() {
        return this._mouseMove.asEvent();
    }

    public get mouseUp() {
        return this._mouseUp.asEvent();
    }

    public get connectionCreated() {
        return this._connectionCreated.asEvent();
    }

    public get connectionValidation() {
        return this._connectionValidation.asEvent();
    }

    public get options() {
        return this._options;
    }

    private onMove(e: PointerEvent) {
        const { clientX, clientY } = e;
        const rect = this.el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const k = this._transform.k;
        
        const mouse = { x: x / k, y: y / k };
        this._mouseMove.dispatch(this, mouse);
    }

    private pointerUp(e: PointerEvent) {
        this._mouseUp.dispatch(this, {x: e.x, y: e.y});
    }

    private onSelect() {
        this._start = { x: this._transform.x, y: this._transform.y };
    }

    private onTranslate(x: number, y: number) {
        if (this._start) {
            this._transform.x = this._start.x + x;
            this._transform.y = this._start.y + y;
            
            this.update();
        }
    }

    private onZoom(delta: number, ox: number, oy: number) {
        let zoomNum = this._transform.k * (1 + delta);
        if (zoomNum < this._options.zoomMin) {
            zoomNum = this._options.zoomMin;
        } else if (zoomNum > this._options.zoomMax) {
            zoomNum = this._options.zoomMax;
        }

        const k = this._transform.k;
        const d = (k - zoomNum) / ((k - zoomNum) || 1);

        this._transform.k = zoomNum || 1;
        this._transform.x += ox * d;
        this._transform.y += oy * d;

        this.update();
    }

    private update() {
        if (this._options.lockToArea) {
            const zoomWidth = this.el.clientWidth * this._transform.k;
            const zoomHeight = this.el.clientHeight * this._transform.k;
            if (this._transform.x > 0) {
                this._transform.x = 0;
            } else if (this._transform.x < ((zoomWidth - this.parentEl.clientWidth) * -1)) {
                this._transform.x = (zoomWidth - this.parentEl.clientWidth) * -1;
            }
            if (this._transform.y > 0) {
                this._transform.y = 0;
            } else if (this._transform.y < ((zoomHeight - this.parentEl.clientHeight) * -1)) {
                this._transform.y = (zoomHeight - this.parentEl.clientHeight) * -1;
            }
        }
        const t = this._transform;
        this.el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.k})`;
    }

    private validConnection(start: Connector, end: Connector): { valid: boolean, validator?: ConnectionValidator } {
        for(const validator of this._options.validators) {
            if(!validator.execute(start, end)) {
                return { valid: false, validator };
            }
        }
        return { valid: true };
    }

    public move(x: number, y: number) {
        this._transform.x = (x / this._transform.k) * -1;
        this._transform.y = (y / this._transform.k) * -1;
        this.update();
    }

    public zoom(zoom: number) {
        this._transform.k = zoom;
        this.update();
    }

    public resetZoom() {
        this._transform.k = 1;
        this.update();
    }

    public resetDrag() {
        this._transform.x = 0;
        this._transform.y = 0;
        this.update();
    }

    public setActiveConnection(conn: Connection) {
        this.activeConnection = conn;
    }

    public cancelConnection() {
        if (this.activeConnection) {
            this.activeConnection.delete();
        }
    }

    public endConnection(connector: Connector) {
        if (this.activeConnection) {
            const conn = this.activeConnection;
            this.activeConnection = null;
            const startConnector = conn.startConnector;
            const endConnector = connector;
            const result = this.validConnection(startConnector, endConnector);
            if(result.valid) {
                conn.complete(connector);
                this._connectionCreated.dispatch(conn);
            }
            this._connectionValidation.dispatch(this, { status: result.valid, validator: result.validator, start: startConnector, end: endConnector});
        }
    }

    public delete(removeElements: boolean = false) {
        this.destroy();
        this._drag.destroy();
        this._zoom.destroy();
        if (removeElements) {
            this.parentEl.removeChild(this.el);
        }
    }
    
}