import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connection } from "./connection";
import { BlockPoint } from "./models";
import { listenEvent } from "./utils";

export class Connector {

    private _area: BlockArea;
    private _parent: Block;
    private _el: HTMLElement;
    private _isInput: boolean;
    private _connections: Connection[] = [];
    private _data: any;
    private _destroyDownSubscription: () => void;
    private _destroyUpSubscription: () => void;

    public activeConnection: Connection | null = null;

    constructor(element: HTMLElement, block: Block, area: BlockArea, isInput: boolean, extraData?: any) {
        this._area = area;
        this._el = element;
        this._parent = block;
        this._isInput = isInput;
        this._data = extraData;
        
        this._destroyDownSubscription = listenEvent(this._el, 'pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
            if (!this._isInput) {
                this.startConnection(e);
            }
        });
    
        this._destroyUpSubscription = listenEvent(this._el, 'pointerup', e => {
            e.preventDefault();
            e.stopPropagation();
            if (this._isInput) {
                this._area.endConnection(this);
            } else {
                this._area.cancelConnection();
            }
        });
        
    }

    public get position(): BlockPoint {
        const parentPos = this._parent.getPosition();
        return {
            x: parentPos.x + this._el.offsetLeft + this._el.offsetWidth / 2,
            y: parentPos.y + this._el.offsetTop + this._el.offsetHeight / 2
        }
    }

    public get block(): Block {
        return this._parent;
    }

    public get connections(): Connection[] {
        return this._connections;
    }

    private startConnection(mouseEvent: PointerEvent) {
        const tempConn = new Connection(this._area, this, mouseEvent);
        this._area.setActiveConnection(tempConn);
    }

    public getData<T>(): T {
        return this._data as T;
    }

    public complete(conn: Connection) {
        this._connections.push(conn);
        this.activeConnection = null;
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