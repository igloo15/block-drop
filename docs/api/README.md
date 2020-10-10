**[@igloo15/block-drop](README.md)**

> [Globals](globals.md)

# Block Drop

Block Drop is a very simple drag drop and panning library for creating node diagram editors. You can easily add this library to your own existing web application to enable node diagram editor.

## Getting Started

Install the package into your web application

`npm i @igloo15/block-drop`

### Example 1
After installing application you create a basic block by creating an element in your html and then in your code creating a block and adding the element to it

HTML:
```html
<div id="block-1" style="width:200px; height:200px;background-color:blue">
</div>
```
Typescript:
```typescript
import { Block } form '@igloo15/block-drop'

const block = <HTMLElement>document.querySelector('#block-1');

const newNode = new Block('block-id-1', block);
```
### Example 2

If you would like to have a background that pans and zooms elements inside it you can setup it like this

HTML:
```html
<div id="block-area-container" style="width:1000px; height:1000px; overflow:hidden;">
    <div id="block-area" style="background-color:lightgrey">
        <div id="block-1" style="width:200px; height:200px;background-color:blue">
        </div>
    </div>
</div>
```

Typescript:
```typescript
import { Block, BlockArea } form '@igloo15/block-drop'

const areaParent = <HTMLElement>document.querySelector('#block-area-container');
const area = <HTMLElement>document.querySelector('#block-area');

const newArea = new BlockArea(area, areaParent, { lockToArea: true, zoomInterval: 0.02 });

const block = <HTMLElement>document.querySelector('#block-1');

const newNode = new Block('block-id-1', block);
```

### Example 3
You can then add connectors on your blocks to create connections between blocks:

HTML:
```html
<div id="block-area-container" style="width:1000px; height:1000px; overflow:hidden;">
    <div id="block-area" style="background-color:lightgrey">
        <div id="block-1" style="width:200px; height:200px;background-color:blue">
            <div class="input"></div>
        </div>
        <div id="block-2" style="width:200px; height:200px;background-color:blue">
            <div class="output"></div>
        </div>
    </div>
</div>
```

CSS:
```css
.output {
  position: relative;
  top:50px;
  left: 168px;
  border: 1px solid black;
  width: 30px;
  height: 30px;
  background-color:white;
}

.input {
  position: relative;
  top: 50px;
  border: 1px solid black;
  width: 30px;
  height: 30px;
  background-color:white;
}
```

Typescript:
```typescript
import { Block, BlockArea } form '@igloo15/block-drop'

const areaParent = <HTMLElement>document.querySelector('#block-area-container');
const area = <HTMLElement>document.querySelector('#block-area');

const newArea = new BlockArea(area, areaParent, { lockToArea: true, zoomInterval: 0.02 });

const block1 = <HTMLElement>document.querySelector('#block-1');

const conn1 = <HTMLElement>document.querySelector('.input');

const newNode = new Block('block-id-1', block).addInputElements(newArea, [conn1]);

const block2 = <HTMLElement>document.querySelector('#block-2');

const conn2 = <HTMLElement>document.querySelector('.output');

const newNode = new Block('block-id-2', block).addInputElements(newArea, [conn1]);
```

## Docs

Check out all the [api docs](./docs/api/globals.md)
