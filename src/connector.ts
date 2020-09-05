import { listenWindow } from "./utils";

export class Connector {

    el: HTMLElement;

    constructor(element: HTMLElement) {
        this.el = element;
        this.el.addEventListener('pointerdown', e => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    getPosition() {
        return [
            this.el.getBoundingClientRect().x,
            this.el.getBoundingClientRect().y
        ]
    }
}