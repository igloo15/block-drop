import './style.scss';
import { Block,  BlockArea } from './index';
import { Connection } from "./connection";

console.log("Hello World");

const area = <HTMLElement>document.querySelector('#block-area');

const areaParent = <HTMLElement>document.querySelector('#block-area-container');

const newArea = new BlockArea(area, areaParent, { lockToArea: true, zoomInterval: 0.02 });

const item1 = <HTMLElement>document.querySelector('#item-1');

const conn1 = <HTMLElement>document.querySelector('.input');

const newNode1 = new Block(item1).addInputs(newArea, [conn1]);

console.log(item1);

const item2 = <HTMLElement>document.querySelector('#item-2');

const conn2 = <HTMLElement>document.querySelector('.connector');

const newNode2 = new Block(item2).addOutputs(newArea, [conn2]);

const newConnector = document.createElement('div');

newNode2.click.subscribe((block, e) => {
    console.log(`New Node 2 Connections: ${block.allConnections.length}`);
    console.log(`New Node 2 Clicked ${e.x}:${e.y}`);
});

newNode2.dblClick.subscribe((block, e) => {
    console.log(`New Node 2 Dbl Connections: ${block.allConnections.length}`);
    console.log(`New Node 2 Dbl Clicked ${e.x}:${e.y}`);
});

console.log(item2);
console.log(newNode1);
console.log(newNode2);

setTimeout(() => {
    newNode1.move(500, 900);
    newNode2.move(900, 500);
    Connection.createConnection(newArea, newNode2.outputs[0], newNode1.inputs[0]);
    // newArea.move(500, 900);
    // newArea.resetZoom();
}, 6000);

setTimeout(() => {
    //newNode2.outputs[0].delete(true, true);
    // newArea.zoom(0.6);
}, 12000);

setTimeout(() => {
    newConnector.classList.add('connector');
    newConnector.style.top = '90px';
    item1.appendChild(newConnector);
    newNode1.addInputs(newArea, [newConnector]);

    //newArea.resetZoom();
    //newArea.resetDrag();
}, 15000);
