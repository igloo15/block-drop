import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector } from './connector';
import { BlockArea } from './blockarea';

export class Block {
    el: HTMLElement;
    x: number;
    y: number;
    start: BlockPoint;
    dragger: Drag;
    inputs: Connector[] = [];
    outputs: Connector[] = [];

    constructor(element: HTMLElement) {
        this.el = element;
        this.x = this.el.getBoundingClientRect().x;
        this.y = this.el.getBoundingClientRect().y;
        this.start = { x: this.x, y: this.y };
        this.dragger = new Drag(this.el, this.onTranslate.bind(this), this.onSelect.bind(this));
    }

    private onSelect(e: MouseEvent) {
        this.start.x = this.x;
        this.start.y = this.y;
    }

    private onTranslate(x: number, y: number, e: PointerEvent) {

        // if (!this.trigger('nodetranslate', params)) return;

        this.x = this.start.x + x;
        this.y = this.start.y + y;

        this.update();
        this.outputs.forEach(o => {
            o.update();
        });
        this.inputs.forEach(o => {
            o.update();
        });
        // this.trigger('nodetranslated', { node, prev });
    }

    private update() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public moveMouse(area: BlockArea, e: PointerEvent) {
        
    }

    public addInputs(area: BlockArea, inputs: string[]) {
        for(const selector in inputs) {
            const connectorEl = <HTMLElement>this.el.querySelector(inputs[selector]);
            this.inputs.push(new Connector(connectorEl, area, true));
        }

        return this;
    }

    public addOutputs(area: BlockArea, outputs: string[]) {
        for(const selector in outputs) {
            const connectorEl = <HTMLElement>this.el.querySelector(outputs[selector]);
            this.outputs.push(new Connector(connectorEl, area, false));
        }

        return this;
    }
}