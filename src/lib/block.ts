import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector, ConnectorOptions } from './connector';
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
    private _connectorIndex = 0;

    public id: string;

    constructor(id: string, element: HTMLElement, extraData?: any) {
        this.id = id;
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

    private onSelect() {
        this._start.x = this._x;
        this._start.y = this._y;
    }

    private onTranslate(x: number, y: number) {
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
        this.onTranslate(x, y);
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

    public addInput(connector: Connector): Block {
        connector.setBlockParent(this);
        this._inputs.push(connector);
        return this;
    }

    public addInputElements(area: BlockArea, inputs: HTMLElement[], options?: ConnectorOptions): Block {
        const tempOptions = {...options, ...{ isInput: true}};
        for(const elem of inputs) {
            this.addInput(new Connector(`${this.id}-${this._connectorIndex}`, elem, area, tempOptions));
            this._connectorIndex++;
        }

        return this;
    }

    public addInputStrings(area: BlockArea, inputs: string[], options?: ConnectorOptions): Block {
        this.addInputElements(area, inputs.map(val => <HTMLElement>this._el.querySelector(val)), options);
        return this;
    }

    public addOutput(connector: Connector): Block {
        connector.setBlockParent(this);
        this._outputs.push(connector);
        return this;
    }

    public addOutputElements(area: BlockArea, outputs: HTMLElement[], options?: ConnectorOptions): Block {
        const tempOptions = {...options, ...{ isInput: false}};
        for(const elem of outputs) {
            this.addOutput(new Connector(`${this.id}-${this._connectorIndex}`, elem, area, tempOptions));
            this._connectorIndex++;
        }

        return this;
    }

    public addOutputStrings(area: BlockArea, outputs: string[], options?: ConnectorOptions): Block {
        this.addOutputElements(area, outputs.map(val => <HTMLElement>this._el.querySelector(val)), options);
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