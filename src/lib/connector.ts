import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connection } from "./connection";
import { IEventTwo, TypedEventTwo } from "./events";
import { IBlockDropItem } from "./interfaces";
import { BlockPoint } from "./models";
import { listenEvent, uuidv4 } from "./utils";

export interface ConnectorOptions {
    isInput?: boolean;
    alternateConnCurve?: boolean;
    anchorPointOffset?: BlockPoint;
    disableConnections?: boolean;
}

export class Connector implements IBlockDropItem {

    private _area: BlockArea;
    private _parent: Block | null = null;
    private _el: HTMLElement;
    private _options: ConnectorOptions = {
        isInput: false,
        alternateConnCurve: false,
        anchorPointOffset: { x: 0, y: 0 },
        disableConnections: false
    };
    private _connections: Connection[] = [];
    private _data: unknown;
    private _destroyDownSubscription: () => void;
    private _destroyUpSubscription: () => void;

    private _connectionStarted = new TypedEventTwo<Connector, Connection>();
    private _connectionCompleted = new TypedEventTwo<Connector, Connection>();

    private _id: string;

    constructor(element: HTMLElement, area: BlockArea, options: ConnectorOptions, extraData?: unknown) {
        this._id = uuidv4();
        this._area = area;
        this._el = element;
        this._options = {...this._options, ...options};
        this._data = extraData;
        
        this._destroyDownSubscription = listenEvent(this._el, 'pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            if (!this._options.isInput && !this._options.disableConnections) {
                this.startConnection(e);
            }
        });
    
        this._destroyUpSubscription = listenEvent(this._el, 'pointerup', e => {
            e.preventDefault();
            e.stopPropagation();
            if (this._options.isInput && !this._options.disableConnections) {
                this._area.endConnection(this);
            } else {
                this._area.cancelConnection();
            }
        });
        
    }

    public get position(): BlockPoint | undefined {
        const parentPos = this._parent?.getPosition();
        if (parentPos) {
            return {
                x: parentPos.x + this._el.offsetLeft + (this._el.offsetWidth / 2) + (this._options.anchorPointOffset?.x || 0),
                y: parentPos.y + this._el.offsetTop + (this._el.offsetHeight / 2) + (this._options.anchorPointOffset?.y || 0)
            }
        }
        return parentPos;
    }

    public get block(): Block | null {
        return this._parent;
    }

    public get connections(): Connection[] {
        return this._connections;
    }

    public get options(): ConnectorOptions {
        return this._options;
    }

    public get connectionStarted(): IEventTwo<Connector, Connection> {
        return this._connectionStarted.asEvent();
    }

    public get connectionCompleted(): IEventTwo<Connector, Connection> {
        return this._connectionCompleted.asEvent();
    }

    public get id(): string {
        return this._id;
    }

    public get internalId(): string {
        return this.id;
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

    public complete(conn: Connection): Connector {
        this._connections.push(conn);
        this._connectionCompleted.next(this, conn);
        return this;
    }

    public update(): Connector {
        this._connections.forEach(conn => {
            conn.update();
        });
        return this;
    }

    public delete(removeConnections = true, removeElement = false): void {
        this._destroyDownSubscription();
        this._destroyUpSubscription();
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

        return this;
    }
   
}