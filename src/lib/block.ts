import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector, IConnectorOptions } from './connector';
import { BlockArea } from './blockarea';
import { listenEvent, uuidv4 } from './utils';
import { Connection } from './connection';
import { IEventTwo, TypedEventTwo } from './events';
import { IBlockDropItem } from './interfaces';

export interface IBlockOptions {
    loc?: BlockPoint;
    data?: unknown;
    internalId?: string;
}

export class Block implements IBlockDropItem {
    public readonly itemType = 'Block';

    private _area: BlockArea | undefined = undefined;
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
    private _mouseRightClick = new TypedEventTwo<Block, MouseEvent>();
    private _destroy: (() => void);
    private _dragAllowed = true;
    private _options: IBlockOptions;

    

    constructor(element: HTMLElement, options: IBlockOptions, area?: BlockArea) {
        this._options = options;
        if(!options.internalId || options.internalId === '') {
            this._options.internalId = uuidv4();
        }
        this._area = area;
        this._el = element;
        this._el.classList.add(`block-${this.internalId}`);
        this._el.classList.add(`block`);
        this._x = this._el.getBoundingClientRect().x;
        this._y = this._el.getBoundingClientRect().y;
        this._start = { x: this._x, y: this._y };
        this._dragger = new Drag(this._el, this.onTranslate.bind(this), this.onSelect.bind(this));
        let destroyClick: () => void;
        let destroyDblClick: () => void;
        let destroyRightClick: () => void;
        if (!this._area) {
            destroyClick = listenEvent(this._el, 'click', this.onClick.bind(this));
            destroyDblClick = listenEvent(this._el, 'dblclick', this.onDblClick.bind(this));
            destroyRightClick = listenEvent(this._el, 'contextmenu', this.onRightClick.bind(this));
        } else {
            destroyClick = this._area.addListener(`.block-${this.internalId}`, 'click', (e) => this.onClick(e));
            destroyDblClick = this._area.addListener(`.block-${this.internalId}`, 'dblclick', (e) => this.onDblClick(e));
            destroyRightClick = this._area.addListener(`.block-${this.internalId}`, 'contextmenu', (e) => this.onRightClick(e));
        }
        
        this._destroy = () => { destroyDblClick(); destroyClick(); this._dragger.destroy(); destroyRightClick(); };

        if (options.loc) {
            this.move(options.loc.x, options.loc.y);
        }
    }

    private onClick(e: MouseEvent) {
        this._mouseClick.nextAsync(this, {x: e.x, y: e.y});
        if (this._area) {
            this._area.triggerGlobalClick(this, {x: e.x, y: e.y})
        }
    }

    private onDblClick(e: MouseEvent) {
        this._mouseDblClick.nextAsync(this, {x: e.x, y: e.y});
        this._area?.triggerGlobalDblClick(this, {x: e.x, y: e.y});
    }

    private onRightClick(e: MouseEvent) {
        this._mouseRightClick.nextAsync(this, e);
        this._area?.triggerGlobalRightClick(this, e);
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

        this.updateAll();
    }

    private update() {
        this._el.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }


    private updateAll() {
        this.update();
        this._outputs.forEach(o => {
            o.update();
        });
        this._inputs.forEach(o => {
            o.update();
        });
    }
    public get options(): IBlockOptions {
        return this._options;
    }

    public get elem(): Element {
        return this._el;
    }

    public get data(): unknown {
        return this._options.data;
    }

    public get click(): IEventTwo<Block, BlockPoint> {
        return this._mouseClick.asEvent();
    }

    public get dblClick(): IEventTwo<Block, BlockPoint> {
        return this._mouseDblClick.asEvent();
    }

    public get rightClick(): IEventTwo<Block, MouseEvent> {
        return this._mouseRightClick.asEvent();
    }

    public get internalId(): string {
        if(!this._options.internalId) {
            throw new Error('No Internal Id set');
        }
        
        return this._options.internalId;
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
        if(this.inputs.length > 0) {
            const connsArray = this.inputs.map(value => value.connections);
            if (connsArray.length > 0) {
                return connsArray.reduce((accumulator, value) => accumulator.concat(value));
            }
        }
        return [];        
    }

    public get outputConnections(): Connection[] {
        if(this.outputs.length > 0) {
            const connsArray = this.outputs.map(value => value.connections);
            if (connsArray.length > 0) {
                return connsArray.reduce((accumulator, value) => accumulator.concat(value));
            }
        }
        return [];
    }

    public get allConnections(): Connection[] {
        return this.inputConnections.concat(this.outputConnections);
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
        return this._options.data as T;
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
        // const zoom = this._el.getBoundingClientRect().width / this._el.offsetWidth;
        // this.onTranslate(x / zoom, y / zoom);
        //this.onTranslate(x, y);
        this._x = x;
        this._y = y;
        this.updateAll();
        return this;
    }

    public getPosition(): BlockPoint {
        return {
            x: this._x,
            y: this._y
        }
    }

    public addInput(connector: Connector): Block {
        if (!this._area) {
            this._area = connector.getArea();
        }
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
        this._destroy();
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
