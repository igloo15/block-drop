import { BlockArea } from "./blockarea";
import { Block } from "./block";

export class BlockManager {
    area: BlockArea;
    blocks: Block[] = [];
    constructor(area: BlockArea) {
        this.area = area;
        this.area.mouseMove.subscribe(this.onMove.bind(this));
    }   

    addBlock(block: Block) {
        this.blocks.push(block);
    }

    onMove(area: BlockArea, e: PointerEvent) {
        this.blocks.forEach(b => {
            b.moveMouse(area, e);
        });
    }
}