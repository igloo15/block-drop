**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["lib/drag"](../modules/_lib_drag_.md) / Drag

# Class: Drag

## Hierarchy

* **Drag**

## Index

### Constructors

* [constructor](_lib_drag_.drag.md#constructor)

### Properties

* [\_el](_lib_drag_.drag.md#_el)
* [\_pointerStart](_lib_drag_.drag.md#_pointerstart)
* [destroy](_lib_drag_.drag.md#destroy)
* [onDrag](_lib_drag_.drag.md#ondrag)
* [onStart](_lib_drag_.drag.md#onstart)
* [onTranslate](_lib_drag_.drag.md#ontranslate)

### Methods

* [down](_lib_drag_.drag.md#down)
* [move](_lib_drag_.drag.md#move)
* [up](_lib_drag_.drag.md#up)

## Constructors

### constructor

\+ **new Drag**(`el`: HTMLElement, `onTranslate`: (Anonymous function), `onStart`: (Anonymous function), `onDrag`: (Anonymous function)): [Drag](_lib_drag_.drag.md)

*Defined in [lib/drag.ts:9](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L9)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`el` | HTMLElement | - |
`onTranslate` | (Anonymous function) | (_x: number, _y: number, _e: PointerEvent) => {} |
`onStart` | (Anonymous function) | (_e: PointerEvent) => {} |
`onDrag` | (Anonymous function) | (_e: PointerEvent) => {} |

**Returns:** [Drag](_lib_drag_.drag.md)

## Properties

### \_el

• `Private` **\_el**: HTMLElement

*Defined in [lib/drag.ts:8](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L8)*

___

### \_pointerStart

• `Private` **\_pointerStart**: [BlockPoint](../interfaces/_lib_models_.blockpoint.md) \| null

*Defined in [lib/drag.ts:7](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L7)*

___

### destroy

•  **destroy**: () => void

*Defined in [lib/drag.ts:9](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L9)*

___

### onDrag

• `Private` **onDrag**: (Anonymous function)

*Defined in [lib/drag.ts:15](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L15)*

___

### onStart

• `Private` **onStart**: (Anonymous function)

*Defined in [lib/drag.ts:14](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L14)*

___

### onTranslate

• `Private` **onTranslate**: (Anonymous function)

*Defined in [lib/drag.ts:13](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L13)*

## Methods

### down

▸ **down**(`e`: PointerEvent): void

*Defined in [lib/drag.ts:27](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | PointerEvent |

**Returns:** void

___

### move

▸ **move**(`e`: PointerEvent): void

*Defined in [lib/drag.ts:35](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L35)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | PointerEvent |

**Returns:** void

___

### up

▸ **up**(`e`: PointerEvent): void

*Defined in [lib/drag.ts:48](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/drag.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | PointerEvent |

**Returns:** void
