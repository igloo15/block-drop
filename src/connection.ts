import { BlockArea } from "./blockarea";
import { Connector } from "./connector";

export class Connection {
    private path!: SVGPathElement;
    private parent: BlockArea;
    private startConnector: Connector;
    private endConnector!: Connector;
    private subscription!: null | (() => void);

    constructor(parent: BlockArea, startConnector: Connector, initialEvent: PointerEvent) {
        this.parent = parent;
        this.startConnector = startConnector;
        this.subscription = this.parent.mouseMove.subscribe((area: BlockArea, e: PointerEvent) => {
            const currPos = this.getStartPosition();
            const renderedPath = this.renderPath([e.x, e.y, currPos[0], currPos[1]], 0.4)
            this.updateConnection(this.path, renderedPath);
        });
        this.renderConnection(initialEvent.x, initialEvent.y, this.getStartPosition()[0], this.getStartPosition()[1]);
        this.parent.setActiveConnection(this);
    }

    private updateConnection(el: SVGPathElement, d: string) {
        el.setAttribute('d', d);
    }

    private getParentPosition() {
        return [
            this.parent.el.getBoundingClientRect().x,
            this.parent.el.getBoundingClientRect().y
        ]
    }

    private unsubscribe() {
        if (this.subscription) {
            this.subscription();
            this.subscription = null;
        }
    }

    private getStartPosition() {
        return this.startConnector.getPosition();
    }

    private getEndPosition() {
        return this.endConnector.getPosition();
    }

    private renderPath(points: number[], curvature: number) {
        const [x1, y1, x2, y2] = points;
        const hx1 = x1 + Math.abs(x2 - x1) * curvature;
        const hx2 = x2 - Math.abs(x2 - x1) * curvature;
    
        return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
    }

    public renderConnection(mouseX: number, mouseY: number, x: number, y: number) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        // svg.classList.add('connection', ...classed);
        svg.style.zIndex = '-1';
        svg.style.position = 'absolute';
        svg.style.overflow = 'visible';
        svg.style.pointerEvents = 'none';

        const d = this.renderPath([x, y, mouseX, mouseY], 0.4)
        this.path.classList.add('main-path');
        this.path.setAttribute('d', d);

        svg.appendChild(this.path);
        this.parent.el.appendChild(svg);

        this.updateConnection(this.path, d);
    }

    public delete() {
        this.unsubscribe();
    }


    public complete(connector: Connector) {
        this.endConnector = connector;
        this.unsubscribe();
        this.endConnector.complete(this);
        this.startConnector.complete(this);
    }

    public update() {
        const startPos = this.getStartPosition();
        const endPos = this.getEndPosition();
        const renderedPath = this.renderPath([endPos[0], endPos[1], startPos[0], startPos[1]], 0.4);
        this.updateConnection(this.path, renderedPath);
    }
}