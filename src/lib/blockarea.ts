import { BlockPoint } from './models';
import { Connection } from './connection';
import { Connector } from './connector';
import { Drag } from './drag';
import { Zoom } from './zoom';
import { listenEvent, uuidv4 } from './utils';
import { BlockAreaOptions, ConnectionValidationResult, ConnectionValidator, IBlockAreaOptions, Transform } from './blockareaoptions';
import { HTMLEventManager, IEventOne, IEventTwo, TypedEventOne, TypedEventTwo } from './events';
import { IBlockDropItem } from './interfaces';

/**
 * The BlockArea is an area that can be dragged and zoomed. The area also is necessary to make connections between connectors on blocks.
 */
export class BlockArea implements IBlockDropItem {
    
    /**
     * Parent Element
     */
    public parentEl: HTMLElement;

    /**
     * The current active connection being dragged across area
     */
    public activeConnection!: Connection | null;

    /**
     * The type of IBlockDropItem
     */
    public readonly itemType = 'BlockArea';

    /**
     * Destroys all events on Block Area
     */
    public destroy: (() => void);
    
    private _el: HTMLElement;

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
    
    /**
     * Constructs a Block Area
     * @param el The main area that will contain all blocks. This area will be scaled and dragged
     * @param parentEl The containing area that the main area will exist inside of. This area should bound the main area.
     * @param options The options to construct this block area
     */
    constructor(el: HTMLElement, parentEl: HTMLElement, options?: IBlockAreaOptions) {
        this._id = uuidv4();
        this._el = el;
        this.parentEl = parentEl;
        this._el.style.transformOrigin = '0 0';
        this._el.classList.add(`area-${this.internalId}`);
        this._el.classList.add(`area`);
        this._eventMap = new HTMLEventManager(this._el);
        
        const destroyMove = listenEvent(this.parentEl, 'pointermove', this.onMove.bind(this));
        const destroyUp = listenEvent(this.parentEl, 'pointerup', this.pointerUp.bind(this));
        this._zoom = new Zoom(this._el, this.parentEl as HTMLElement, this.onZoom.bind(this));
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

    /**
     * Gets the BlockArea HTML Element
     */
    public get elem(): Element {
        return this._el;
    }

    /**
     * Gets the dragged position of the BlockArea
     */
    public get position(): BlockPoint {
        return {
            x: this._transform.x * -1,
            y: this._transform.y * -1
        };
    }

    /**
     * The Mouse Move Event which allows you to subscribe mouse moves on the BlockArea
     */
    public get mouseMove(): IEventTwo<BlockArea, BlockPoint> {
        return this._mouseMove.asEvent();
    }

    /**
     * The Mouse Up Event which allows you to subscribe mouse moves on the BlockArea
     */
    public get mouseUp(): IEventTwo<BlockArea, BlockPoint> {
        return this._mouseUp.asEvent();
    }

    /**
     * The Connection creation event which allows you to subscribe to any subscription that are created
     */
    public get connectionCreated(): IEventOne<Connection> {
        return this._connectionCreated.asEvent();
    }

    /**
     * The Connection validation event which allows you to subscribe to any validation of a connection.
     * This can be both good and bad validation results
     */
    public get connectionValidation(): IEventTwo<BlockArea, ConnectionValidationResult> {
        return this._connectionValidation.asEvent();
    }

    /**
     * The Click event which allows you to subscribe to any clicks on the BlockArea
     */
    public get click(): IEventTwo<BlockArea, BlockPoint> {
        return this._click.asEvent();
    }

    /**
     * The Double Click event which allows you to subscribe to any double clicks on the BlockArea
     */
    public get dblClick(): IEventTwo<BlockArea, BlockPoint> {
        return this._dblClick.asEvent();
    }

    /**
     * The Right Click event which allows you to subscribe to any right clicks on the BlockArea
     */
    public get rightClick(): IEventTwo<BlockArea, MouseEvent> {
        return this._rightClick.asEvent();
    }

    /**
     * The Global Click event which allows you to subscribe to a click on any item in the BlockArea.
     * This includes Blocks, Connections, Connectors, and the BlockArea.
     */
    public get globalClick(): IEventTwo<IBlockDropItem, BlockPoint> {
        return this._globalClick.asEvent();
    }

    /**
     * The Global Double Click event which allows you to subscribe to a double click on any item in the BlockArea.
     * This includes Blocks, Connections, Connectors, and the BlockArea.
     */
    public get globalDblClick(): IEventTwo<IBlockDropItem, BlockPoint> {
        return this._globalDoubleClick.asEvent();
    }

    /**
     * The Global Right Click event which allows you to subscribe to a right click on any item in the BlockArea.
     * This includes Blocks, Connections, Connectors, and the BlockArea.
     */
    public get globalRightClick(): IEventTwo<IBlockDropItem, MouseEvent> {
        return this._globalRightClick.asEvent();
    }

    /**
     * Get the options for the BlockArea
     */
    public get options(): BlockAreaOptions {
        return this._options;
    }

    /**
     * Get the id of the BlockArea
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Get the internally assigned id of the BlockArea
     */
    public get internalId(): string {
        return this.id;
    }

    private onMove(e: PointerEvent) {
        const { clientX, clientY } = e;
        const rect = this._el.getBoundingClientRect();
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
            const zoomWidth = this._el.clientWidth * this._transform.k;
            const zoomHeight = this._el.clientHeight * this._transform.k;
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
        this._el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.k})`;
    }

    private validConnection(start: Connector, end: Connector): { valid: boolean, validator?: ConnectionValidator } {
        for(const validator of this._options.validators) {
            if(!validator.execute(start, end)) {
                return { valid: false, validator };
            }
        }
        return { valid: true };
    }

    /**
     * Update the options for this BlockArea
     * @param options The updated options
     */
    public updateOptions(options?: IBlockAreaOptions): BlockArea {
        this._options = {...new BlockAreaOptions(), ...options};
        if (this._options.gridBackground) {
            if (!this._el.classList.contains('grid')) {
                this._el.classList.add('grid');
            }
        } else {
            this._el.classList.remove('grid');
        }        
        this._el.style.width = `${this._options.widthMax}px`;
        this._el.style.height = `${this._options.heightMax}px`;
        this._zoom.updateZoomInterval(this._options.zoomInterval);
        this.move(this.options.loc.x, this.options.loc.y);
        this.zoom(this.options.zoom);
        this.update();
        return this;
    }

    /**
     * Create a unique id. It is used to create internal ids for BlockDrop
     */
    public createId(): string {
        return uuidv4();
    }

    /**
     * Disable Dragging of the BlockArea
     */
    public disableDragging(): BlockArea {
        this._options.disableDragging = true;
        return this;
    }

    /**
     * Enable dragging of BlockArea
     */
    public enableDragging(): BlockArea {
        this._options.disableDragging = false;
        return this;
    }

    /**
     * Disable Zooming of BlockArea
     */
    public disableZooming(): BlockArea {
        this._options.disableZooming = true;
        return this;
    }

    /**
     * Enable Zooming of BlockArea
     */
    public enableZooming(): BlockArea {
        this._options.disableZooming = false;
        return this;
    }

    /**
     * Move the BlockArea to the X & Y coordinates of the BlockArea
     * @param x The X coordinate to move the BlockArea
     * @param y The Y coordinate to move the BlockArea
     */
    public move(x: number, y: number): BlockArea {
        this._transform.x = (x / this._transform.k) * -1;
        this._transform.y = (y / this._transform.k) * -1;
        this.update();
        return this;
    }

    /**
     * Get the Zoom number that the BlockArea is currently at
     */
    public getZoom(): number {
        return this._transform.k;
    }

    /**
     * Zoom the BlockArea to a specific level
     * @param zoom The zoom level to set
     */
    public zoom(zoom: number): BlockArea {
        this._transform.k = zoom;
        this.update();
        return this;
    }

    /**
     * Reset Zoom to a default level
     */
    public resetZoom(): BlockArea {
        this._transform.k = 1;
        this.update();
        return this;
    }

    /**
     * Reset dragging to place block area back at center
     */
    public resetDrag(): BlockArea {
        this._transform.x = 0;
        this._transform.y = 0;
        this.update();
        return this;
    }

    /**
     * Set the active connection for this BlockArea
     * @param conn The connection to set as active
     */
    public setActiveConnection(conn: Connection): void {
        this.activeConnection = conn;
    }

    /**
     * Cancel the active connection for this BlockArea
     */
    public cancelConnection(): void {
        if (this.activeConnection) {
            this.activeConnection.delete();
        }
    }

    /**
     * End the active connection on the specified connection
     * @param connector The connector then active connection ended on
     */
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

    /**
     * Delete the BlockArea. This destroys all events and optionally removes the element
     * @param removeElements Optionally remove the BlockArea element from the parent element
     */
    public delete(removeElements = false): void {
        this.destroy();
        if (removeElements) {
            this.parentEl.removeChild(this._el);
        }
    }

    /**
     * A global listener for events
     * @param id The id of the element you are listening for
     * @param event The event you are listening for
     * @param handler A handler to handle the event triggering
     */
    public addListener<K extends keyof HTMLElementEventMap>(id: string, event: K, handler: (e: HTMLElementEventMap[K]) => void): () => void {
        return this._eventMap.addListener(id, event, handler);
    }
    
    /**
     * Trigger the global click with a IBlockDropItem and Point
     * @param item The BlockDrop item being triggered
     * @param point The point clicked at
     */
    public triggerGlobalClick(item: IBlockDropItem, point: BlockPoint): void {
        this._globalClick.nextAsync(item, point);
    }

    /**
     * Trigger the global double click with a IBlockDropItem and Point
     * @param item The BlockDrop item being triggered
     * @param point The point double clicked at
     */
    public triggerGlobalDblClick(item: IBlockDropItem, point: BlockPoint): void {
        this._globalDoubleClick.nextAsync(item, point);
    }

    /**
     * Trigger the global right click with a IBlockDropItem and Point
     * @param item The BlockDrop item being triggered
     * @param point The point right clicked at
     */
    public triggerGlobalRightClick(item: IBlockDropItem, point: MouseEvent): void {
        this._globalRightClick.nextAsync(item, point);
    }
}