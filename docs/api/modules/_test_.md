**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / "test"

# Module: "test"

## Index

### Variables

* [area](_test_.md#area)
* [areaParent](_test_.md#areaparent)
* [conn1](_test_.md#conn1)
* [conn2](_test_.md#conn2)
* [item1](_test_.md#item1)
* [item2](_test_.md#item2)
* [newArea](_test_.md#newarea)
* [newConnector](_test_.md#newconnector)
* [newNode1](_test_.md#newnode1)
* [newNode2](_test_.md#newnode2)

## Variables

### area

• `Const` **area**: HTMLElement = \<HTMLElement>document.querySelector('#block-area')

*Defined in [test.ts:4](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L4)*

___

### areaParent

• `Const` **areaParent**: HTMLElement = \<HTMLElement>document.querySelector('#block-area-container')

*Defined in [test.ts:6](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L6)*

___

### conn1

• `Const` **conn1**: HTMLElement = \<HTMLElement>document.querySelector('.input')

*Defined in [test.ts:12](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L12)*

___

### conn2

• `Const` **conn2**: HTMLElement = \<HTMLElement>document.querySelector('.connector')

*Defined in [test.ts:20](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L20)*

___

### item1

• `Const` **item1**: HTMLElement = \<HTMLElement>document.querySelector('#item-1')

*Defined in [test.ts:10](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L10)*

___

### item2

• `Const` **item2**: HTMLElement = \<HTMLElement>document.querySelector('#item-2')

*Defined in [test.ts:18](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L18)*

___

### newArea

• `Const` **newArea**: [BlockArea](../classes/_lib_blockarea_.blockarea.md) = new BlockArea(area, areaParent, { lockToArea: true, zoomInterval: 0.02 })

*Defined in [test.ts:8](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L8)*

___

### newConnector

• `Const` **newConnector**: HTMLDivElement = document.createElement('div')

*Defined in [test.ts:24](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L24)*

___

### newNode1

• `Const` **newNode1**: [Block](../classes/_lib_block_.block.md) = new Block('item1', item1).addInputElements(newArea, [conn1])

*Defined in [test.ts:14](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L14)*

___

### newNode2

• `Const` **newNode2**: [Block](../classes/_lib_block_.block.md) = new Block('item2', item2).addOutputElements(newArea, [conn2])

*Defined in [test.ts:22](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/test.ts#L22)*
