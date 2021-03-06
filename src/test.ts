import './test.scss';
import { Block,  BlockArea, Connection, Connector } from './lib/index';

const area = <HTMLElement>document.querySelector('#block-area');

const areaParent = <HTMLElement>document.querySelector('#block-area-container');
// zoom: 1.62, loc: {x: 751, y: 999},
const newArea = new BlockArea(area, areaParent, { zoom: 1.62, loc: {x: 503, y: 701}, connectionMouseOffset: { x: -15, y: 0}, connectionAlternative: false, lockToArea: true, zoomInterval: 0.1, gridBackground: true, renderConnectionFunction: (conn, svg, path, defs) => {
    const arrowMarkerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    arrowMarkerStart.id = `path-${conn.internalId}-start`;
    arrowMarkerStart.setAttribute('markerWidth', '12');
    arrowMarkerStart.setAttribute('markerHeight', '12');
    const startPoint = conn.getPointOnLine(0);
    const myPoint = conn.getPointOnLine(0.5);
    const deltaX = startPoint.x - myPoint.x;
    const deltaY = startPoint.y - myPoint.y;
    console.log(`x: ${deltaX} - y: ${deltaY}`);
    // arrowMarkerStart.setAttribute('refX', `${deltaX}`);
    // arrowMarkerStart.setAttribute('refY', `${deltaY}`);
    arrowMarkerStart.setAttribute('refX', `5`);
    arrowMarkerStart.setAttribute('refY', `6`);
    arrowMarkerStart.setAttribute('orient', 'auto-start-reverse');
    arrowMarkerStart.setAttribute('markerUnits', 'userSpaceOnUse');
    const arrowLineStart = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowLineStart.setAttribute('d', 'M0,0 L0,12 L12,6 z');
    arrowMarkerStart.appendChild(arrowLineStart);
    const arrowMarkerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    arrowMarkerEnd.id = `path-${conn.internalId}-end`;

    defs.appendChild(arrowMarkerStart);
    defs.appendChild(arrowMarkerEnd);

} });

newArea.click.subscribe(v => {
    console.log('area clicked');
});

newArea.globalClick.subscribe(v => {
    console.log(v);
    if(v instanceof Block) {
        console.log('InstanceOf Block');
    }
})

const item1 = <HTMLElement>document.querySelector('#item-1');

const conn1 = <HTMLElement>document.querySelector('.input');

const myConn1 = new Connector(conn1, newArea, {  });

const newNode1 = new Block(item1, {}, newArea).addOutput(myConn1);

console.log(item1);

const item2 = <HTMLElement>document.querySelector('#item-2');

const conn2 = <HTMLElement>document.querySelector('#output-1');

const conn3 = <HTMLElement>document.querySelector('#output-2');

const newNode2 = new Block(item2, {}, newArea).addInputElements(newArea, [conn2, conn3], { anchorPointOffset: {x: -23, y: 0 } } );

newNode2.rightClick.subscribe((v, t) => {
    t.stopPropagation();
    t.preventDefault();
    console.log(`Right Click ${v.internalId} at ${t}`);
})

const newConnector = document.createElement('div');

newNode2.click.subscribe((block, e) => {
    console.log(`New Node 2 Connections: ${block.allConnections.length}`);
    console.log(`New Node 2 Clicked ${e.x}:${e.y}`);
});

newNode2.dblClick.subscribe((block, e) => {
    console.log(`New Node 2 Dbl Connections: ${block.allConnections.length}`);
    console.log(`New Node 2 Dbl Clicked ${e.x}:${e.y}`);
});

myConn1.hoverOver.subscribe((v, t) => {
    console.log(v);
    console.log(t);
});

myConn1.connectionCompleted.subscribe((v, t) => {
    console.log(v);
    console.log(t);
    t.clickEvent.subscribe(v=> {
        console.log(`Clicked Connection ${v.internalId}`);
        if (v.path.style.stroke === 'green') {
            v.path.style.stroke = 'blue';
        } else {
            v.path.style.stroke = 'green';
        }
    });

    t.dblClickEvent.subscribe(v => {
        console.log(`Dbl Clicked Connection ${v.internalId}`);
    });
});

console.log(item2);
console.log(newNode1);
console.log(newNode2);

setTimeout(() => {
    newNode1.move(500, 900);
    newNode2.move(900, 500);
    // Connection.createConnection(newArea, newNode1.outputs[0], newNode2.inputs[0]);
    // newArea.move(500, 900);
    // newArea.resetZoom();
    console.log(newArea.position);
    console.log(newArea.getZoom());
}, 3000);

setTimeout(() => {
    //newNode2.outputs[0].delete(true, true);
    // newArea.zoom(0.6);
    console.log(newArea.position);
    console.log(newArea.getZoom());
    console.log(newNode1.getPosition());
    console.log(newNode2.getPosition());
}, 12000);

setTimeout(() => {
    newConnector.classList.add('connector');
    newConnector.style.top = '90px';
    item1.appendChild(newConnector);
    newNode1.addInputElements(newArea, [newConnector], {alternateConnCurve: true, isInput: true});

    //newArea.resetZoom();
    //newArea.resetDrag();
    
}, 15000);

setTimeout(() => {
    newNode1.delete(true);
}, 20000);
