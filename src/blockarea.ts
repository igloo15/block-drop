import { EventDispatcher } from 'strongly-typed-events';
import { Connection } from './connection';
import { Connector } from './connector';

export class BlockArea {
    el: HTMLElement;
    private _mouseMove = new EventDispatcher<BlockArea, PointerEvent>();
    public activeConnection!: Connection;

    constructor(el: HTMLElement) {
        this.el = el;
        this.el.addEventListener('pointermove', this.onMove.bind(this));
    }

    public get mouseMove() {
        return this._mouseMove.asEvent();
    }

    private onMove(e: PointerEvent) {
        this._mouseMove.dispatch(this, e);
    }

    public setActiveConnection(conn: Connection) {
        this.activeConnection = conn;
    }

    public endConnection(e: PointerEvent, connector: Connector) {
        if (this.activeConnection) {
            this.activeConnection.complete(connector);
        }
    }
}