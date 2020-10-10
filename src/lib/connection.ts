import { Block } from "./block";
import { BlockArea } from "./blockarea";
import { Connector } from "./connector";
import { BlockPoint } from "./models";

export class Connection {

    private _path!: SVGPathElement;
    private _containerElem!: HTMLElement;
    private _parent: BlockArea;
    private _startConnector: Connector;
    private _endConnector: Connector | null = null;
    private _moveSubscription!: null | (() => void);
    private _upSubscription!: null | (() => void);
    private _previousStartPos: BlockPoint = { x: 0, y: 0};
    private _previousEndPos: BlockPoint = { x: 0, y: 0};

    constructor(parent: BlockArea, startConnector: Connector, initialPoint: BlockPoint) {
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
            this._moveSubscription();
            this._moveSubscription = null;
        }
        if (this._upSubscription) {
            this._upSubscription();
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
        if (!this._endConnector?.options.alternateConnCurve) {
            hx1 = x1 + Math.abs(x2 - x1) * curvature;
        } else {
            hx1 = x1 - Math.abs(x2 - x1) * curvature;
        }
        
        //startpoint
        let hx2 = -1;
        if (!this._startConnector.options.alternateConnCurve) {
            hx2 = x2 - Math.abs(x2 - x1) * curvature;
        } else {
            hx2 = x2 + Math.abs(x2 - x1) * curvature;
        }
        
        let pathString = `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
        pathString = this._parent.options.renderFunction(pathString, x1, y1, x2, y2, hx1, hx2);
        return pathString;
    }

    private renderConnection(mouseX: number, mouseY: number, x: number, y: number) {
        this._containerElem = document.createElement('div');
        this._containerElem.style.position = 'absolute';
        this._containerElem.style.zIndex = '-1';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        svg.style.zIndex = '-1';
        svg.style.position = 'absolute';
        svg.style.overflow = 'visible';
        svg.style.pointerEvents = 'none';

        const d = this.renderPath([x, y, mouseX, mouseY], 0.4)
        this._path.classList.add('main-path');
        this._path.setAttribute('d', d);

        svg.appendChild(this._path);
        this._containerElem.appendChild(svg);
        this._parent.el.appendChild(this._containerElem);

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

    public delete() {
        this.unsubscribe();
        this._parent.el.removeChild(this._containerElem);
        this.startConnector.removeConnection(this);
        this.endConnector?.removeConnection(this);
    }

    public complete(connector: Connector) {
        this._endConnector = connector;
        this.unsubscribe();
        this._endConnector.complete(this);
        this._startConnector.complete(this);
        this.update();
    }

    public update() {
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