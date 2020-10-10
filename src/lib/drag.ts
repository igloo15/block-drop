import { BlockPoint } from "./models";
import { listenEvent, listenWindow } from "./utils";

/* eslint-disable no-unused-vars */
export class Drag {

    private _pointerStart: BlockPoint | null;
    private _el: HTMLElement;
    public destroy: () => void;

    constructor(
        el: HTMLElement,
        private onTranslate = (_x: number, _y: number, _e: PointerEvent) => {},
        private onStart = (_e: PointerEvent) => {},
        private onDrag = (_e: PointerEvent) => {}
    ) {
        this._pointerStart = null;
        this._el = el;
        this._el.style.touchAction = 'none';
        const destroyDown = listenEvent(this._el, 'pointerdown', this.down.bind(this));
        const destroyMove = listenWindow('pointermove', this.move.bind(this));
        const destroyUp = listenWindow('pointerup', this.up.bind(this));

        this.destroy = () => { destroyMove(); destroyUp(); destroyDown(); }
    }

    down(e: PointerEvent) {
        if ((e.pointerType === 'mouse') && (e.button !== 0)) return;
        e.stopPropagation();
        this._pointerStart = { x: e.pageX, y: e.pageY };

        this.onStart(e);
    }

    move(e: PointerEvent) {
        if (!this._pointerStart) return;
        e.preventDefault();

        const [x, y] = [e.pageX, e.pageY]

        const delta = [x - this._pointerStart.x, y - this._pointerStart.y];

        const zoom = this._el.getBoundingClientRect().width / this._el.offsetWidth;

        this.onTranslate(delta[0] / zoom, delta[1] / zoom, e);
    }

    up(e: PointerEvent) {
        if (!this._pointerStart) return;
        
        this._pointerStart = null;
        this.onDrag(e);
    }
}