import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connection } from "./connection";
import { BlockPoint } from "./models";
import { listenEvent } from "./utils";

export interface ConnectorOptions {
    isInput: boolean;
    alternateConnCurve?: boolean;
}

export class Connector {

    private _area: BlockArea;
    private _parent: Block | null = null;
    private _el: HTMLElement;
    private _options: ConnectorOptions = {
        isInput: false,
        alternateConnCurve: false
    };
    private _connections: Connection[] = [];
    private _data: any;
    private _destroyDownSubscription: () => void;
    private _destroyUpSubscription: () => void;

    public id: string;

    constructor(id: string, element: HTMLElement, area: BlockArea, options: ConnectorOptions, extraData?: any) {
        this.id = id;
        this._area = area;
        this._el = element;
        this._options = {...this._options, ...options};
        this._data = extraData;
        
        this._destroyDownSubscription = listenEvent(this._el, 'pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            if (!this._options.isInput) {
                this.startConnection(e);
            }
        });
    
        this._destroyUpSubscription = listenEvent(this._el, 'pointerup', e => {
            e.preventDefault();
            e.stopPropagation();
            if (this._options.isInput) {
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
                x: parentPos.x + this._el.offsetLeft + this._el.offsetWidth / 2,
                y: parentPos.y + this._el.offsetTop + this._el.offsetHeight / 2
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

    private startConnection(mouseEvent: PointerEvent) {
        const tempConn = new Connection(this._area, this, mouseEvent);
        this._area.setActiveConnection(tempConn);
    }

    public getData<T>(): T {
        return this._data as T;
    }

    public setBlockParent(block: Block) {
        this._parent = block;
    }

    public complete(conn: Connection) {
        this._connections.push(conn);
    }

    public update() {
        this._connections.forEach(conn => {
            conn.update();
        });
    }

    public delete(removeConnections: boolean = false, removeElement: boolean = false) {
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

    public removeConnection(conn: Connection) {
        const connIndex = this._connections.indexOf(conn);
        if (connIndex > -1) {
            this._connections.splice(connIndex);
        }
    }
   
}