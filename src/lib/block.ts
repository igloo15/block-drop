import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector, IConnectorOptions } from './connector';
import { BlockArea } from './blockarea';
import { listenEvent, uuidv4 } from './utils';
import { Connection } from './connection';
import { IEventTwo, TypedEventTwo } from './events';
import { IBlockDropItem } from './interfaces';

export interface IBlockOptions {
    id: string;
    loc?: BlockPoint;
    data?: unknown;
    internalId?: string;
}

export class Block implements IBlockDropItem {
    private _connected = false;
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

    constructor(element: HTMLElement, options: IBlockOptions) {
        if(options.internalId) {
            this._internalId = options.internalId;
        } else {
            this._internalId = uuidv4();
        }
        this.id = options.id;
        this._el = element;
        this._data = options.data;
        this._el.classList.add(`block-${this.internalId}`);
        this._el.classList.add(`block`);
        this._x = this._el.getBoundingClientRect().x;
        this._y = this._el.getBoundingClientRect().y;
        this._start = { x: this._x, y: this._y };
        this._dragger = new Drag(this._el, this.onTranslate.bind(this), this.onSelect.bind(this));
        this._destroyClick = listenEvent(this._el, 'click', this.onClick.bind(this));
        this._destroyDblClick = listenEvent(this._el, 'dblclick', this.onDblClick.bind(this));

        if (options.loc) {
            this.move(options.loc.x, options.loc.y);
        }
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

    public updateConnections(): void {
        const numConnections = this.allConnections.length;
        if (numConnections > 0 && !this._connected) {
            this._el.classList.add(`block-${this.internalId}-connected`);
            this._el.classList.add(`block-connected`);
            this._connected = true;
        } else if (numConnections === 0 && this._connected) {
            this._connected = false;
            this._el.classList.remove(`block-${this.internalId}-connected`);
            this._el.classList.remove(`block-connected`);
        }
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

    public addInputElements(area: BlockArea, inputs: HTMLElement[], options?: IConnectorOptions): Block {
        const tempOptions = {...options, ...{ isInput: true}};
        for(const elem of inputs) {
            this.addInput(new Connector(elem, area, tempOptions));
        }

        return this;
    }

    public addInputStrings(area: BlockArea, inputs: string[], options?: IConnectorOptions): Block {
        this.addInputElements(area, inputs.map(val => <HTMLElement>this._el.querySelector(val)), options);
        return this;
    }

    public addOutput(connector: Connector): Block {
        connector.setBlockParent(this);
        this._outputs.push(connector);
        return this;
    }

    public addOutputElements(area: BlockArea, outputs: HTMLElement[], options?: IConnectorOptions): Block {
        const tempOptions = {...options, ...{ isInput: false}};
        for(const elem of outputs) {
            this.addOutput(new Connector(elem, area, tempOptions));
        }

        return this;
    }

    public addOutputStrings(area: BlockArea, outputs: string[], options?: IConnectorOptions): Block {
        this.addOutputElements(area, outputs.map(val => <HTMLElement>this._el.querySelector(val)), options);
        return this;
    }

    public removeConnection(conn: Connection): void {
        conn.delete();
    }

    public removeConnector(connector: Connector, removeElement = false): Block {
        let collec: Connector[] = [];
        if(connector.options.isInput) {
            collec = this._inputs;
        } else {
            collec = this._outputs;
        }

        const index = collec.findIndex(i => i.internalId === connector.internalId);
        collec.splice(index, 1);
        connector.delete(true, removeElement);

        return this;
    }

    public removeAllInputs(removeElement = false): Block {
        this._inputs.forEach(conn => {
            this.removeConnector(conn, removeElement);
        });

        return this;
    }

    public removeAllOutputs(removeElement = false): Block {
        this._outputs.forEach(conn => {
            this.removeConnector(conn, removeElement);
        });

        return this;
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
    constructor(element: HTMLElement, options: IBlockOptions) {
        super(element, options);
    }
    public get data(): T {
        return this.getData<T>();
    }

}
