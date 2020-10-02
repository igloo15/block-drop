import "./style.scss";
import { Block, BlockManager, BlockArea } from './index';

console.log("Hello World");

const area = <HTMLElement>document.querySelector('#block-area');

const newArea = new BlockArea(area);

const newManager = new BlockManager(newArea);

const item1 = <HTMLElement>document.querySelector('#item-1');

const newNode1 = new Block(item1).addInputs(newArea, ['.input']);

console.log(item1);

const item2 = <HTMLElement>document.querySelector('#item-2');

const newNode2 = new Block(item2).addOutputs(newArea, ['.connector']);

console.log(item2);

newManager.addBlock(newNode1);
newManager.addBlock(newNode2);
