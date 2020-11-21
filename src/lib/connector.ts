import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connection } from "./connection";
import { IEventTwo, TypedEventTwo } from "./events";
import { IBlockDropItem } from "./interfaces";
import { BlockPoint } from "./models";
import { listenEvent, uuidv4 } from "./utils";

export interface IConnectorOptions {
    isInput?: boolean;
    alternateConnCurve?: boolean;
    anchorPointOffset?: BlockPoint;
    disableConnections?: boolean;
    internalId?: string;
    data?: unknown;
}

export class Connector implements IBlockDropItem {
    public readonly itemType = 'Connector';

    private _connected = false;
    private _area: BlockArea;
    private _parent: Block | null = null;
    private _el: HTMLElement;
    private _options: IConnectorOptions = {
        isInput: false,
        alternateConnCurve: false,
        anchorPointOffset: { x: 0, y: 0 },
        disableConnections: false
    };
    private _connections: Connection[] = [];
    private _data: unknown;
    private _destroy: () => void;

    private _connectionStarted = new TypedEventTwo<Connector, Connection>();
    private _connectionCompleted = new TypedEventTwo<Connector, Connection>();
    private _connectionRemoved = new TypedEventTwo<Connector, Connection>();
    private _hoverOver = new TypedEventTwo<Connector, Connection | null>();
    private _click = new TypedEventTwo<Connector, BlockPoint>();
    private _dblClick = new TypedEventTwo<Connector, BlockPoint>();
    private _rightClick = new TypedEventTwo<Connector, MouseEvent>();

    constructor(element: HTMLElement, area: BlockArea, options: IConnectorOptions) {
        this._options = {...this._options, ...options};
        if (!this._options.internalId || this._options.internalId === '') {
            this._options.internalId = uuidv4();
        }
        this._area = area;
        this._el = element;
        this._data = options.data;
        this._el.classList.add(`connector-${this.internalId}`);
        this._el.classList.add(`connector`);
        if (options.isInput) {
            this._el.classList.add(`connector-input`);
        } else {
            this._el.classList.add(`connector-output`);
        }
        
        const destroyDown = listenEvent(this._el, 'pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            if (!this._options.isInput && !this._options.disableConnections) {
                this.startConnection(e);
            }
        });
    
        const destroyUp = listenEvent(this._el, 'pointerup', e => {
            e.preventDefault();
            e.stopPropagation();
            if (this._options.isInput && !this._options.disableConnections) {
                this._area.endConnection(this);
            } else {
                this._area.cancelConnection();
            }
        });

        const destroyHover = listenEvent(this._el, 'pointerover', () => {
            this._hoverOver.nextAsync(this, this._area.activeConnection);
        });

        const destroyClick = this._area.addListener(`.connector-${this.internalId}`, 'click', (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this._click.nextAsync(this, {x: e.clientX, y: e.clientY});
            this._area.triggerGlobalClick(this, {x: e.clientX, y: e.clientY});
        });

        const destroyDblClick = this._area.addListener(`.connector-${this.internalId}`, 'dblclick', (e: MouseEvent) => {
            this._dblClick.nextAsync(this, {x: e.clientX, y: e.clientY});
            this._area.triggerGlobalDblClick(this, {x: e.clientX, y: e.clientY});
        });

        const destroyRightClick = this._area.addListener(`.connector-${this.internalId}`, 'contextmenu', (e: MouseEvent) => {
            this._rightClick.nextAsync(this, e);
            this._area.triggerGlobalRightClick(this, e);
        });

        this._destroy = () => { destroyHover(); destroyUp(); destroyDown(); destroyClick(); destroyDblClick(); destroyRightClick(); }
        
    }

    public get elem(): Element {
        return this._el;
    }

    public get data(): unknown {
        return this._data;
    }

    public get position(): BlockPoint | undefined {
        const parentPos = this._parent?.getPosition();
        let anchorPoint = parentPos;
        if (parentPos) {
            anchorPoint = {
                x: parentPos.x + this._el.offsetLeft + (this._el.offsetWidth / 2) + (this._options.anchorPointOffset?.x || 0),
                y: parentPos.y + this._el.offsetTop + (this._el.offsetHeight / 2) + (this._options.anchorPointOffset?.y || 0)
            }
        }
        return this._area.options.alterAnchorPointFunction(this, anchorPoint);
    }

    public get block(): Block | null {
        return this._parent;
    }

    public get connections(): Connection[] {
        return this._connections;
    }

    public get options(): IConnectorOptions {
        return this._options;
    }

    public get connectionStarted(): IEventTwo<Connector, Connection> {
        return this._connectionStarted.asEvent();
    }

    public get connectionCompleted(): IEventTwo<Connector, Connection> {
        return this._connectionCompleted.asEvent();
    }

    public get connectionRemoved(): IEventTwo<Connector, Connection> {
        return this._connectionRemoved.asEvent();
    }

    public get hoverOver(): IEventTwo<Connector, Connection | null> {
        return this._hoverOver.asEvent();
    }

    public get click(): IEventTwo<Connector, BlockPoint> {
        return this._click.asEvent();
    }

    public get dblClick(): IEventTwo<Connector, BlockPoint> {
        return this._dblClick.asEvent();
    }

    public get rightClick(): IEventTwo<Connector, MouseEvent> {
        return this._rightClick.asEvent();
    }

    public get internalId(): string {
        if (!this._options.internalId) {
            throw new Error('Blank Internal Id');
        }
        return this._options.internalId;
    }

    private startConnection(mouseEvent: PointerEvent) {
        const tempConn = new Connection(this._area, this, mouseEvent);
        this._area.setActiveConnection(tempConn);
        this._connectionStarted.next(this, tempConn);
    }

    

    public getData<T>(): T {
        return this._data as T;
    }

    public disableConnections(): Connector {
        this._options.disableConnections = true;
        return this;
    }

    public enableConnections(): Connector {
        this._options.disableConnections = false;
        return this;
    }

    public setBlockParent(block: Block): Connector {
        this._parent = block;
        return this;
    }

    public getArea(): BlockArea {
        return this._area;
    }

    public complete(conn: Connection): Connector {
        this._connections.push(conn);
        this._connectionCompleted.next(this, conn);
        this.updateConnections();
        return this;
    }

    public update(): Connector {
        this._connections.forEach(conn => {
            conn.update();
        });
        return this;
    }

    public delete(removeConnections = true, removeElement = false): void {
        this._destroy();
        if (removeConnections) {
            this._connections.forEach(conn => {
                conn.delete();
            })
        }
        if (removeElement) {
            const parentElem = this._el.parentElement;
            parentElem?.removeChild(this._el);
        }
    }

    public removeConnection(conn: Connection): Connector {
        const connIndex = this._connections.indexOf(conn);
        if (connIndex > -1) {
            this._connections.splice(connIndex);
        }
        this.updateConnections();
        return this;
    }

    public updateConnections(): void {
        this._parent?.updateConnections();
        const numConnections = this._connections.length;
        if (numConnections > 0 && !this._connected) {
            this._el.classList.add(`connector-${this.internalId}-connected`);
            this._el.classList.add(`connector-connected`);
            this._connected = true;
        } else if (numConnections === 0 && this._connected) {
            this._connected = false;
            this._el.classList.remove(`connector-${this.internalId}-connected`);
            this._el.classList.remove(`connector-connected`);
        }
    }
   
}