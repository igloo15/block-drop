import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connector } from "./connector";
import { IEventOne, ISubscription, TypedEventOne } from "./events";
import { IBlockDropItem } from "./interfaces";
import { BlockPoint } from "./models";
import { uuidv4 } from "./utils";

export class Connection implements IBlockDropItem {

    private _path!: SVGPathElement;
    private _containerElem!: HTMLElement;
    private _parent: BlockArea;
    private _startConnector: Connector;
    private _endConnector: Connector | null = null;
    private _moveSubscription!: ISubscription | null;
    private _upSubscription!: ISubscription | null;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _destroy: () => void = () => {};
    private _previousStartPos: BlockPoint = { x: 0, y: 0};
    private _previousEndPos: BlockPoint = { x: 0, y: 0};
    private _id: string;
    private _clickedEvent: TypedEventOne<Connection> = new TypedEventOne<Connection>();
    private _dblClickedEvent: TypedEventOne<Connection> = new TypedEventOne<Connection>();

    constructor(parent: BlockArea, startConnector: Connector, initialPoint: BlockPoint) {
        this._id = uuidv4();
        this._parent = parent;
        this._startConnector = startConnector;
        this._moveSubscription = this._parent.mouseMove.subscribe((area: BlockArea, e: BlockPoint) => {
            const currPos = this.getStartPosition();
            const renderedPath = this.renderPath([e.x, e.y, currPos.x, currPos.y], 0.4);
            this.updateConnection(this._path, renderedPath);
        });
        this._upSubscription = this._parent.mouseUp.subscribe(() => {
            this.delete();
        });
        const startPos = this.getStartPosition();
        this.renderConnection(initialPoint.x, initialPoint.y, startPos.x, startPos.y);
    }

    private updateConnection(el: SVGPathElement, d: string) {
        el.setAttribute('d', d);
    }

    private unsubscribe() {
        if (this._moveSubscription) {
            this._moveSubscription.unsubscribe();
            this._moveSubscription = null;
        }
        if (this._upSubscription) {
            this._upSubscription.unsubscribe();
            this._upSubscription = null;
        }

        
    }

    private getStartPosition(): BlockPoint {
        const startPos = this._startConnector.position;
        if (startPos) {
            this._previousStartPos = startPos;
            return startPos;
        }
        return this._previousStartPos;
    }

    private getEndPosition(): BlockPoint {
        const endPos = this._endConnector?.position;
        if (endPos) {
            this._previousEndPos = endPos;
            return endPos;
        }
        return this._previousEndPos;
    }

    private renderPath(points: number[], curvature: number) {
        const [x1, y1, x2, y2] = points;

        //endpoint
        let hx1 = -1;
        if (!this._endConnector?.options.alternateConnCurve || (!this._endConnector && this._parent.options.connectionAlternative)) {
            hx1 = ((x1 + 100) + Math.abs(x2 - x1) * curvature);
        } else {
            hx1 = ((x1 - 50) - Math.abs(x2 - x1) * curvature);
        }
        
        //startpoint
        let hx2 = -1;
        if (!this._startConnector.options.alternateConnCurve) {
            hx2 = ((x2 - 100) - Math.abs(x2 - x1) * curvature);
        } else {
            hx2 = ((x2 + 50) + Math.abs(x2 - x1) * curvature);
        }
        
        let pathString = `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
        pathString = this._parent.options.renderPathFunction(pathString, x1, y1, x2, y2, hx1, hx2);
        return pathString;
    }

    private renderConnection(mouseX: number, mouseY: number, x: number, y: number) {
        this._containerElem = document.createElement('div');
        this._containerElem.style.position = 'absolute';
        this._containerElem.style.zIndex = '-1';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.classList.add('conn-svg');
        svg.classList.add(`conn-${this.internalId}-svg`);
        this._path.classList.add('conn-path');
        this._path.classList.add(`conn-${this.internalId}-path`);

        const d = this.renderPath([x, y, mouseX, mouseY], 0.4);
        this._path.setAttribute('d', d);
        this._path.setAttribute('marker-end', `url(#path-${this.internalId}-end)`);
        this._path.setAttribute('marker-mid', `url(#path-${this.internalId}-mid)`);
        this._path.setAttribute('marker-start', `url(#path-${this.internalId}-start)`);

        const destroyClick = this._parent.addListener(`.conn-${this.internalId}-path`, 'click', () => {
            console.log('click');
            this._clickedEvent.nextAsync(this); 
        });

        const destroyDblClick = this._parent.addListener(`.conn-${this.internalId}-path`, 'dblclick', () => {
            console.log('dblClick');
            this._dblClickedEvent.nextAsync(this); 
        });

        this._destroy = () => { destroyClick(); destroyDblClick(); };

        svg.appendChild(defs);
        svg.appendChild(this._path);
        this._containerElem.appendChild(svg);
        this._parent.el.appendChild(this._containerElem);
        
        this._parent.options.renderConnectionFunction(this, svg, this._path, defs);
        this.updateConnection(this._path, d);
    }

    public get startBlock(): Block | null {
        return this._startConnector.block;
    }

    public get startConnector(): Connector {
        return this._startConnector;
    }

    public get endBlock(): Block | null {
        if (this._endConnector) {
            return this._endConnector.block;
        }
        return null;
    }

    public get endConnector(): Connector | null {
        return this._endConnector;
    }

    public get path(): SVGPathElement {
        return this._path;
    }

    public get id(): string {
        return this._id;
    }

    public get internalId(): string {
        return this.id;
    }

    public get clickEvent(): IEventOne<Connection> {
        return this._clickedEvent.asEvent();
    }

    public get dblClickEvent(): IEventOne<Connection> {
        return this._dblClickedEvent.asEvent();
    }

    public getPointOnLine(percentage: number): BlockPoint {
        const length = this._path.getTotalLength();
        const point = this._path.getPointAtLength(percentage*length);
        return {
            x: point.x,
            y: point.y
        };
    }

    public delete(): void {
        this.unsubscribe();
        this._destroy();
        this._parent.el.removeChild(this._containerElem);
        this.startConnector.removeConnection(this);
        this.endConnector?.removeConnection(this);
    }

    public complete(connector: Connector): void {
        this._endConnector = connector;
        this.unsubscribe();
        this._endConnector.complete(this);
        this._startConnector.complete(this);
        this.update();
    }

    public update(): void {
        const startPos = this.getStartPosition();
        const endPos = this.getEndPosition();
        if (endPos) {
            const renderedPath = this.renderPath([endPos.x, endPos.y, startPos.x, startPos.y], 0.4);
            this.updateConnection(this._path, renderedPath);
        }
    }

    public static createConnection(parent: BlockArea, startConnector: Connector, endConnector: Connector): Connection {
        if (!parent || !startConnector || !endConnector) {
            throw new Error('Null or undefined parameter while creating connection');
        }
        const conn = new Connection(parent, startConnector, {x: 0, y: 0});
        conn.complete(endConnector);
        conn.update();
        return conn;
    }
}