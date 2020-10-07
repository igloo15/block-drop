import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector } from './connector';
import { BlockArea } from './blockarea';
import { listenEvent } from './utils';
import { EventDispatcher } from 'strongly-typed-events';
import { Connection } from './connection';

export class Block {
    private _el: HTMLElement;
    private _x: number;
    private _y: number;
    private _start: BlockPoint;
    private _dragger: Drag;
    private _inputs: Connector[] = [];
    private _outputs: Connector[] = [];
    private _mouseClick = new EventDispatcher<Block, BlockPoint>();
    private _mouseDblClick = new EventDispatcher<Block, BlockPoint>();
    private _destroyClick: () => void;
    private _destroyDblClick: () => void;
    private _data: any;

    constructor(element: HTMLElement, extraData?: any) {
        this._el = element;
        this._data = extraData;
        this._x = this._el.getBoundingClientRect().x;
        this._y = this._el.getBoundingClientRect().y;
        this._start = { x: this._x, y: this._y };
        this._dragger = new Drag(this._el, this.onTranslate.bind(this), this.onSelect.bind(this));
        this._destroyClick = listenEvent(this._el, 'click', this.onClick.bind(this));
        this._destroyDblClick = listenEvent(this._el, 'dblclick', this.onDblClick.bind(this));
    }

    private onClick(e: MouseEvent) {
        this._mouseClick.dispatch(this, {x: e.x, y: e.y});
    }

    private onDblClick(e: MouseEvent) {
        this._mouseDblClick.dispatch(this, {x: e.x, y: e.y});
    }

    private onSelect(e: MouseEvent) {
        this._start.x = this._x;
        this._start.y = this._y;
    }

    private onTranslate(x: number, y: number, e: PointerEvent | null) {
        this._x = this._start.x + x;
        this._y = this._start.y + y;

        this.update();
        this._outputs.forEach(o => {
            o.update();
        });
        this._inputs.forEach(o => {
            o.update();
        });
    }

    private update() {
        this._el.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }

    public get click() {
        return this._mouseClick.asEvent();
    }

    public get dblClick() {
        return this._mouseDblClick.asEvent();
    }

    public getData<T>(): T {
        return this._data as T;
    }

    public move(x: number, y: number) {
        this.onTranslate(x, y, null);
    }

    public getPosition(): BlockPoint {
        return {
            x: this._x,
            y: this._y
        }
    }

    public get inputs(): Connector[] {
        return this._inputs;
    }

    public get outputs(): Connector[] {
        return this._outputs;
    }

    public get allConnectors(): Connector[] {
        return this._inputs.concat(this._outputs);
    }

    public get allConnections(): Connection[] {
        return this.allConnectors.map((value: Connector) => value.connections).reduce((accumulator, value) => accumulator.concat(value));
    }

    public addInputs(area: BlockArea, inputs: HTMLElement[]) {
        for(const elem of inputs) {
            this._inputs.push(new Connector(elem, this, area, true));
        }

        return this;
    }

    public addInputStrings(area: BlockArea, inputs: string[]) {
        this.addInputs(area, inputs.map(val => <HTMLElement>this._el.querySelector(val)));
        return this;
    }

    public addOutputs(area: BlockArea, outputs: HTMLElement[]) {
        for(const elem of outputs) {
            this._outputs.push(new Connector(elem, this, area, false));
        }

        return this;
    }

    public addOutputStrings(area: BlockArea, outputs: string[]) {
        this.addOutputs(area, outputs.map(val => <HTMLElement>this._el.querySelector(val)));
        return this;
    }

    public delete(removeElement: boolean = false) {
        this._destroyClick();
        this._destroyDblClick();
        this._dragger.destroy();
        if (removeElement) {
            if (this._el.parentElement) {
                this._el.parentElement.removeChild(this._el);
            }
        }
    }
}