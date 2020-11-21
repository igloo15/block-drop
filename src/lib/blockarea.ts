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
    public readonly itemType = 'BlockArea';
    public destroy: (() => void);
    
    private _start: BlockPoint | null = null;
    private _transform: Transform = { k: 1, x: 0, y: 0 };
    private _zoom: Zoom;
    private _options: BlockAreaOptions = new BlockAreaOptions();

    private _mouseMove = new TypedEventTwo<BlockArea, BlockPoint>();
    private _mouseUp = new TypedEventTwo<BlockArea, BlockPoint>();
    private _click = new TypedEventTwo<BlockArea, BlockPoint>();
    private _dblClick = new TypedEventTwo<BlockArea, BlockPoint>();
    private _rightClick = new TypedEventTwo<BlockArea, MouseEvent>();
    private _connectionValidation = new TypedEventTwo<BlockArea, ConnectionValidationResult>();
    private _connectionCreated = new TypedEventOne<Connection>();
    private _globalClick = new TypedEventTwo<IBlockDropItem, BlockPoint>();
    private _globalDoubleClick = new TypedEventTwo<IBlockDropItem, BlockPoint>();
    private _globalRightClick = new TypedEventTwo<IBlockDropItem, MouseEvent>();

    private _id: string;
    private _eventMap: HTMLEventManager;
    
    constructor(el: HTMLElement, parentEl: HTMLElement, options?: IBlockAreaOptions) {
        this._id = uuidv4();
        this.el = el;
        this.parentEl = parentEl;
        this.el.style.transformOrigin = '0 0';
        this.el.classList.add(`area-${this.internalId}`);
        this.el.classList.add(`area`);
        this._eventMap = new HTMLEventManager(this.el);
        
        const destroyMove = listenEvent(this.parentEl, 'pointermove', this.onMove.bind(this));
        const destroyUp = listenEvent(this.parentEl, 'pointerup', this.pointerUp.bind(this));
        this._zoom = new Zoom(this.el, this.parentEl as HTMLElement, this.onZoom.bind(this));
        const drag = new Drag(this.parentEl as HTMLElement, this.onTranslate.bind(this), this.onSelect.bind(this));
        const destroyClick = this._eventMap.addListener(`.area-${this.internalId}`, 'click', (e: MouseEvent) => {
            const { clientX, clientY } = e;
            this._click.nextAsync(this, {x: clientX, y: clientY});
            this._globalClick.nextAsync(this, {x: clientX, y: clientY});
        });
        const destroyDblClick = this._eventMap.addListener(`.area-${this.internalId}`, 'dblclick', (e: MouseEvent) => {
            const { clientX, clientY } = e;
            this._dblClick.nextAsync(this, {x: clientX, y: clientY});
            this._globalDoubleClick.nextAsync(this, {x: clientX, y: clientY});
        });
        const destroyRightClick = this._eventMap.addListener(`.area-${this.internalId}`, 'contextmenu', (e: MouseEvent) => {
            this._rightClick.nextAsync(this, e);
            this._globalRightClick.nextAsync(this, e);
        });
        this.destroy = () => { 
            destroyMove(); 
            destroyUp(); 
            destroyClick(); 
            destroyDblClick(); 
            destroyRightClick(); 
            this._zoom.destroy(); 
            drag.destroy(); 
        };

        this.updateOptions(options);
    }

    public get elem(): Element {
        return this.el;
    }

    public get position(): BlockPoint {
        return {
            x: this._transform.x * -1,
            y: this._transform.y * -1
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

    public get click(): IEventTwo<BlockArea, BlockPoint> {
        return this._click.asEvent();
    }

    public get dblClick(): IEventTwo<BlockArea, BlockPoint> {
        return this._dblClick.asEvent();
    }

    public get rightClick(): IEventTwo<BlockArea, MouseEvent> {
        return this._rightClick.asEvent();
    }

    public get globalClick(): IEventTwo<IBlockDropItem, BlockPoint> {
        return this._globalClick.asEvent();
    }

    public get globalDblClick(): IEventTwo<IBlockDropItem, BlockPoint> {
        return this._globalDoubleClick.asEvent();
    }

    public get globalRightClick(): IEventTwo<IBlockDropItem, MouseEvent> {
        return this._globalRightClick.asEvent();
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

    public updateOptions(options?: IBlockAreaOptions): BlockArea {
        this._options = new BlockAreaOptions(options);
        if (this._options.gridBackground) {
            if (!this.el.classList.contains('grid')) {
                this.el.classList.add('grid');
            }
        } else {
            this.el.classList.remove('grid');
        }        
        this.el.style.width = `${this._options.widthMax}px`;
        this.el.style.height = `${this._options.heightMax}px`;
        this._zoom.updateZoomInterval(this._options.zoomInterval);
        this.move(this.options.loc.x, this.options.loc.y);
        this.zoom(this.options.zoom);
        this.update();
        return this;
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
        if (removeElements) {
            this.parentEl.removeChild(this.el);
        }
    }

    public addListener<K extends keyof HTMLElementEventMap>(id: string, event: K, handler: (e: HTMLElementEventMap[K]) => void): () => void {
        return this._eventMap.addListener(id, event, handler);
    }
    

    public triggerGlobalClick(item: IBlockDropItem, point: BlockPoint): void {
        this._globalClick.nextAsync(item, point);
    }

    public triggerGlobalDblClick(item: IBlockDropItem, point: BlockPoint): void {
        this._globalDoubleClick.nextAsync(item, point);
    }

    public triggerGlobalRightClick(item: IBlockDropItem, point: MouseEvent): void {
        this._globalRightClick.nextAsync(item, point);
    }
}