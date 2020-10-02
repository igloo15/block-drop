import { listenWindow } from "./utils";
import { BlockArea } from "./blockarea";
import { Connection } from "./connection";

export class Connector {

    area: BlockArea;
    el: HTMLElement;
    path: SVGPathElement | null = null;
    activeConnection: Connection | null = null;
    isInput: boolean;
    connections: Connection[] = [];

    constructor(element: HTMLElement, area: BlockArea, isInput: boolean) {
        this.area = area;
        this.el = element;
        
        this.isInput = isInput;
        if (!this.isInput) {
            this.el.addEventListener('pointerdown', e => {
                e.preventDefault();
                e.stopPropagation();
                this.startConnection(e);
            });
        } else {
            this.el.addEventListener('pointerup', e => {
                this.area.endConnection(e, this);
            });
        }
    }

    getPosition() {
        return [
            this.el.getBoundingClientRect().x + this.el.offsetWidth / 2,
            this.el.getBoundingClientRect().y + this.el.offsetHeight / 2
        ]
    }

    private startConnection(mouseEvent: PointerEvent) {
        this.activeConnection = new Connection(this.area, this, mouseEvent);
        // conn.renderConnection(mouseX, mouseY, x, y);
    }

    public complete(conn: Connection) {
        this.connections.push(conn);
        this.activeConnection = null;
    }

    public update() {
        this.connections.forEach(conn => {
            conn.update();
        });
    }
   
}