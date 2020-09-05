import { Block } from './block';

export * from './version';

const item1 = <HTMLElement>document.querySelector('#item-1');

const newNode1 = new Block(item1);

console.log(item1);

const item2 = <HTMLElement>document.querySelector('#item-2');

const newNode2 = new Block(item2, ['.connector']);

console.log(item2);