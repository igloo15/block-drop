import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector, ConnectorOptions } from './connector';
import { BlockArea } from './blockarea';
import { listenEvent, uuidv4 } from './utils';
import { Connection } from './connection';
import { IEventTwo, TypedEventTwo } from './events';
import { IBlockDropItem } from './interfaces';

export class Block implements IBlockDropItem {
    private _el: HTMLElement;
    private _x: number;
    private _y: number;
    private _start: BlockPoint;
    private _dragger: Drag;
    private _inputs: Connector[] = [];
    private _outputs: Connector[] = [];
    private _mouseClick = new TypedEventTwo<Block, BlockPoint>();
    private _mouseDblClick = new TypedEventTwo<Block, BlockPoint>();
    private _destroyClick: () => void;
    private _destroyDblClick: () => void;
    private _data: unknown;
    private _internalId: string;
    private _dragAllowed = true;

    public id: string;

    constructor(id: string, element: HTMLElement, extraData?: unknown) {
        this._internalId = uuidv4();
        this.id = id;
        this._el = element;
        this._data = extraData;
        this._el.classList.add(`block-${this.internalId}`);
        this._el.classList.add(`block`);
        this._x = this._el.getBoundingClientRect().x;
        this._y = this._el.getBoundingClientRect().y;
        this._start = { x: this._x, y: this._y };
        this._dragger = new Drag(this._el, this.onTranslate.bind(this), this.onSelect.bind(this));
        this._destroyClick = listenEvent(this._el, 'click', this.onClick.bind(this));
        this._destroyDblClick = listenEvent(this._el, 'dblclick', this.onDblClick.bind(this));
    }

    private onClick(e: MouseEvent) {
        this._mouseClick.next(this, {x: e.x, y: e.y});
    }

    private onDblClick(e: MouseEvent) {
        this._mouseDblClick.next(this, {x: e.x, y: e.y});
    }

    private onSelect() {
        if (!this._dragAllowed) {
            return;
        }
        this._start.x = this._x;
        this._start.y = this._y;
    }

    private onTranslate(x: number, y: number) {
        if(!this._dragAllowed) {
            return;
        }
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

    public get click(): IEventTwo<Block, BlockPoint> {
        return this._mouseClick.asEvent();
    }

    public get dblClick(): IEventTwo<Block, BlockPoint> {
        return this._mouseDblClick.asEvent();
    }

    public get internalId(): string {
        return this._internalId;
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

    public get inputConnections(): Connection[] {
        return this.inputs.map(value => value.connections).reduce((accumulator, value) => accumulator.concat(value));
    }

    public get outputConnections(): Connection[] {
        return this.outputs.map(value => value.connections).reduce((accumulator, value) => accumulator.concat(value));
    }

    public get allConnections(): Connection[] {
        return this.allConnectors.map((value: Connector) => value.connections).reduce((accumulator, value) => accumulator.concat(value));
    }

    public getData<T>(): T {
        return this._data as T;
    }

    public disableDragging(): Block {
        this._dragAllowed = false;
        return this;
    }

    public enableDragging(): Block {
        this._dragAllowed = true;
        return this;
    }

    public move(x: number, y: number): Block {
        this.onTranslate(x, y);
        return this;
    }

    public getPosition(): BlockPoint {
        return {
            x: this._x,
            y: this._y
        }
    }

    public addInput(connector: Connector): Block {
        connector.setBlockParent(this);
        this._inputs.push(connector);
        return this;
    }

    public addInputElements(area: BlockArea, inputs: HTMLElement[], options?: ConnectorOptions): Block {
        const tempOptions = {...options, ...{ isInput: true}};
        for(const elem of inputs) {
            this.addInput(new Connector(elem, area, tempOptions));
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
            this.addOutput(new Connector(elem, area, tempOptions));
        }

        return this;
    }

    public addOutputStrings(area: BlockArea, outputs: string[], options?: ConnectorOptions): Block {
        this.addOutputElements(area, outputs.map(val => <HTMLElement>this._el.querySelector(val)), options);
        return this;
    }

    public removeConnection(conn: Connection): void {
        conn.delete();
    }

    public delete(removeElement = false): void {
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

export class TypedBlock<T> extends Block {
    /**
     * Construct a typed block with a specific type
     */
    constructor(id: string, element: HTMLElement, extraData?: T) {
        super(id, element, extraData);
    }
    public get data(): T {
        return this.getData<T>();
    }

}
