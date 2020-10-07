import { listenEvent } from "./utils";

export type ZoomFunction = (delta: number, x: number, y: number) => void;

export class Zoom {
    private _el: HTMLElement;
    private _parent: HTMLElement;
    private _onZoom: Function;
    private _zoomInterval: number;
    public destroy: () => void;

    constructor(
        el: HTMLElement, 
        parent: HTMLElement, 
        onZoom: ZoomFunction,
        zoomInterval: number = 0.1
    ) {
        this._parent = parent;
        this._el = el;
        this._onZoom = onZoom;
        this._zoomInterval = zoomInterval;
        const destroyWheel = listenEvent(this._parent, 'wheel', this.mouseWheel.bind(this));
        this.destroy = () => { destroyWheel(); };
    }

    mouseWheel(e: WheelEvent) {
        e.preventDefault();
        const rect = this._el.getBoundingClientRect();
        const wheelDelta = (e as any).wheelDelta;
        const delta = (wheelDelta ? wheelDelta / 120 : - e.deltaY / 3) * this._zoomInterval;

        const ox = (rect.left - e.clientX) * delta;
        const oy = (rect.top - e.clientY) * delta;

        this._onZoom(delta, ox, oy);
    }
}