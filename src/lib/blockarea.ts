import { BlockPoint } from './models';
import { Connection } from './connection';
import { Connector } from './connector';
import { Drag } from './drag';
import { Zoom } from './zoom';
import { listenEvent, uuidv4 } from './utils';
import { BlockAreaOptions, ConnectionValidationResult, ConnectionValidator, IBlockAreaOptions, Transform } from './blockareaoptions';
import { HTMLEventManager, IEventOne, IEventTwo, TypedEventOne, TypedEventTwo } from './events';
import { IBlockDropItem } from './interfaces';

export class BlockArea implements IBlockDropItem {
    
    public el: HTMLElement;
    public parentEl: HTMLElement;
    public activeConnection!: Connection | null;
    public destroy: (() => void);
    
    private _start: BlockPoint | null = null;
    private _zoom: Zoom;
    private _drag: Drag;
    private _transform: Transform = { k: 1, x: 0, y: 0 };
    private _options: BlockAreaOptions;

    private _mouseMove = new TypedEventTwo<BlockArea, BlockPoint>();
    private _mouseUp = new TypedEventTwo<BlockArea, BlockPoint>();
    private _connectionValidation = new TypedEventTwo<BlockArea, ConnectionValidationResult>();
    private _connectionCreated = new TypedEventOne<Connection>();
    private _id: string;
    private _eventMap: HTMLEventManager;
    
    constructor(el: HTMLElement, parentEl: HTMLElement, options?: IBlockAreaOptions) {
        this._id = uuidv4();
        this.el = el;
        this.parentEl = parentEl;
        this._options = new BlockAreaOptions(options);
        this._eventMap = new HTMLEventManager(this.el);
        this.el.classList.add(`area-${this.internalId}`);
        this.el.classList.add(`area`);
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

    public get elem(): Element {
        return this.el;
    }

    public get position(): BlockPoint {
        return {
            x: this._transform.x,
            y: this._transform.y
        };
    }

    public get mouseMove(): IEventTwo<BlockArea, BlockPoint> {
        return this._mouseMove.asEvent();
    }

    public get mouseUp(): IEventTwo<BlockArea, BlockPoint> {
        return this._mouseUp.asEvent();
    }

    public get connectionCreated(): IEventOne<Connection> {
        return this._connectionCreated.asEvent();
    }

    public get connectionValidation(): IEventTwo<BlockArea, ConnectionValidationResult> {
        return this._connectionValidation.asEvent();
    }

    public get options(): BlockAreaOptions {
        return this._options;
    }

    public get id(): string {
        return this._id;
    }

    public get internalId(): string {
        return this.id;
    }

    private onMove(e: PointerEvent) {
        const { clientX, clientY } = e;
        const rect = this.el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const k = this._transform.k;
        
        const mouse = { x: x / k, y: y / k };
        this._mouseMove.next(this, mouse);
    }

    private pointerUp(e: PointerEvent) {
        this._mouseUp.next(this, {x: e.x, y: e.y});
    }

    private onSelect() {
        this._start = { x: this._transform.x, y: this._transform.y };
    }

    private onTranslate(x: number, y: number) {
        if (this._start && !this._options.disableDragging) {
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

    public createId(): string {
        return uuidv4();
    }

    public disableDragging(): BlockArea {
        this._options.disableDragging = true;
        return this;
    }

    public enableDragging(): BlockArea {
        this._options.disableDragging = false;
        return this;
    }

    public disableZooming(): BlockArea {
        this._options.disableZooming = true;
        return this;
    }

    public enableZooming(): BlockArea {
        this._options.disableZooming = false;
        return this;
    }

    public move(x: number, y: number): BlockArea {
        this._transform.x = (x / this._transform.k) * -1;
        this._transform.y = (y / this._transform.k) * -1;
        this.update();
        return this;
    }

    public getZoom(): number {
        return this._transform.k;
    }

    public zoom(zoom: number): BlockArea {
        this._transform.k = zoom;
        this.update();
        return this;
    }

    public resetZoom(): BlockArea {
        this._transform.k = 1;
        this.update();
        return this;
    }

    public resetDrag(): BlockArea {
        this._transform.x = 0;
        this._transform.y = 0;
        this.update();
        return this;
    }

    public setActiveConnection(conn: Connection): void {
        this.activeConnection = conn;
    }

    public cancelConnection(): void {
        if (this.activeConnection) {
            this.activeConnection.delete();
        }
    }

    public endConnection(connector: Connector): void {
        if (this.activeConnection) {
            const conn = this.activeConnection;
            this.activeConnection = null;
            const startConnector = conn.startConnector;
            const endConnector = connector;
            const result = this.validConnection(startConnector, endConnector);
            if(result.valid) {
                conn.complete(connector);
                this._connectionCreated.next(conn);
            }
            this._connectionValidation.next(this, { status: result.valid, validator: result.validator, start: startConnector, end: endConnector});
        }
    }

    public delete(removeElements = false): void {
        this.destroy();
        this._drag.destroy();
        this._zoom.destroy();
        if (removeElements) {
            this.parentEl.removeChild(this.el);
        }
    }

    public addListener<K extends keyof HTMLElementEventMap>(id: string, event: K, handler: (e: HTMLElementEventMap[K]) => void): () => void {
        return this._eventMap.addListener(id, event, handler);
    }
    
}