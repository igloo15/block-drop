import { Drag } from './drag';
import { BlockPoint } from './models';
import { Connector } from './connector';

export class Block {
    el: HTMLElement;
    x: number;
    y: number;
    start: BlockPoint;
    dragger: Drag;
    inputs: Connector[] = [];
    outputs: Connector[] = [];

    constructor(element: HTMLElement, inputs?: string[], outputs?: string[]) {
        this.el = element;
        this.x = this.el.getBoundingClientRect().x;
        this.y = this.el.getBoundingClientRect().y;
        this.start = { x: this.x, y: this.y };
        this.dragger = new Drag(this.el, this.onTranslate.bind(this), this.onSelect.bind(this));
        if (inputs) {
            for(const selector in inputs) {
                const connectorEl = <HTMLElement>this.el.querySelector(inputs[selector]);
                this.inputs.push(new Connector(connectorEl));
            }
        }
        if (outputs) {
            for(const selector in outputs) {
                const connectorEl = <HTMLElement>this.el.querySelector(outputs[selector]);
                this.outputs.push(new Connector(connectorEl));
            }
        }
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
        // this.trigger('nodetranslated', { node, prev });
    }

    private update() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}