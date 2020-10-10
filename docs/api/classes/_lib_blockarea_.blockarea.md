**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["lib/blockarea"](../modules/_lib_blockarea_.md) / BlockArea

# Class: BlockArea

## Hierarchy

* **BlockArea**

## Index

### Constructors

* [constructor](_lib_blockarea_.blockarea.md#constructor)

### Properties

* [\_connectionCreated](_lib_blockarea_.blockarea.md#_connectioncreated)
* [\_connectionValidation](_lib_blockarea_.blockarea.md#_connectionvalidation)
* [\_drag](_lib_blockarea_.blockarea.md#_drag)
* [\_mouseMove](_lib_blockarea_.blockarea.md#_mousemove)
* [\_mouseUp](_lib_blockarea_.blockarea.md#_mouseup)
* [\_options](_lib_blockarea_.blockarea.md#_options)
* [\_start](_lib_blockarea_.blockarea.md#_start)
* [\_zoom](_lib_blockarea_.blockarea.md#_zoom)
* [activeConnection](_lib_blockarea_.blockarea.md#activeconnection)
* [destroy](_lib_blockarea_.blockarea.md#destroy)
* [el](_lib_blockarea_.blockarea.md#el)
* [parentEl](_lib_blockarea_.blockarea.md#parentel)

### Accessors

* [connectionCreated](_lib_blockarea_.blockarea.md#connectioncreated)
* [connectionValidation](_lib_blockarea_.blockarea.md#connectionvalidation)
* [mouseMove](_lib_blockarea_.blockarea.md#mousemove)
* [mouseUp](_lib_blockarea_.blockarea.md#mouseup)
* [options](_lib_blockarea_.blockarea.md#options)

### Methods

* [cancelConnection](_lib_blockarea_.blockarea.md#cancelconnection)
* [delete](_lib_blockarea_.blockarea.md#delete)
* [endConnection](_lib_blockarea_.blockarea.md#endconnection)
* [move](_lib_blockarea_.blockarea.md#move)
* [onMove](_lib_blockarea_.blockarea.md#onmove)
* [onSelect](_lib_blockarea_.blockarea.md#onselect)
* [onTranslate](_lib_blockarea_.blockarea.md#ontranslate)
* [onZoom](_lib_blockarea_.blockarea.md#onzoom)
* [pointerUp](_lib_blockarea_.blockarea.md#pointerup)
* [resetDrag](_lib_blockarea_.blockarea.md#resetdrag)
* [resetZoom](_lib_blockarea_.blockarea.md#resetzoom)
* [setActiveConnection](_lib_blockarea_.blockarea.md#setactiveconnection)
* [update](_lib_blockarea_.blockarea.md#update)
* [validConnection](_lib_blockarea_.blockarea.md#validconnection)
* [zoom](_lib_blockarea_.blockarea.md#zoom)

### Object literals

* [\_transform](_lib_blockarea_.blockarea.md#_transform)

## Constructors

### constructor

\+ **new BlockArea**(`el`: HTMLElement, `parentEl`: HTMLElement, `options?`: [IBlockAreaOptions](../interfaces/_lib_blockareaoptions_.iblockareaoptions.md)): [BlockArea](_lib_blockarea_.blockarea.md)

*Defined in [lib/blockarea.ts:26](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`el` | HTMLElement |
`parentEl` | HTMLElement |
`options?` | [IBlockAreaOptions](../interfaces/_lib_blockareaoptions_.iblockareaoptions.md) |

**Returns:** [BlockArea](_lib_blockarea_.blockarea.md)

## Properties

### \_connectionCreated

• `Private` **\_connectionCreated**: SimpleEventDispatcher\<[Connection](_lib_connection_.connection.md)> = new SimpleEventDispatcher\<Connection>()

*Defined in [lib/blockarea.ts:26](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L26)*

___

### \_connectionValidation

• `Private` **\_connectionValidation**: EventDispatcher\<[BlockArea](_lib_blockarea_.blockarea.md), [ConnectionValidationResult](../interfaces/_lib_blockareaoptions_.connectionvalidationresult.md)> = new EventDispatcher\<BlockArea, ConnectionValidationResult>()

*Defined in [lib/blockarea.ts:25](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L25)*

___

### \_drag

• `Private` **\_drag**: [Drag](_lib_drag_.drag.md)

*Defined in [lib/blockarea.ts:19](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L19)*

___

### \_mouseMove

• `Private` **\_mouseMove**: EventDispatcher\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)> = new EventDispatcher\<BlockArea, BlockPoint>()

*Defined in [lib/blockarea.ts:23](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L23)*

___

### \_mouseUp

• `Private` **\_mouseUp**: EventDispatcher\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)> = new EventDispatcher\<BlockArea, BlockPoint>()

*Defined in [lib/blockarea.ts:24](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L24)*

___

### \_options

• `Private` **\_options**: [BlockAreaOptions](_lib_blockareaoptions_.blockareaoptions.md)

*Defined in [lib/blockarea.ts:21](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L21)*

___

### \_start

• `Private` **\_start**: [BlockPoint](../interfaces/_lib_models_.blockpoint.md) \| null = null

*Defined in [lib/blockarea.ts:17](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L17)*

___

### \_zoom

• `Private` **\_zoom**: [Zoom](_lib_zoom_.zoom.md)

*Defined in [lib/blockarea.ts:18](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L18)*

___

### activeConnection

•  **activeConnection**: [Connection](_lib_connection_.connection.md) \| null

*Defined in [lib/blockarea.ts:14](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L14)*

___

### destroy

•  **destroy**: () => void

*Defined in [lib/blockarea.ts:15](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L15)*

___

### el

•  **el**: HTMLElement

*Defined in [lib/blockarea.ts:12](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L12)*

___

### parentEl

•  **parentEl**: HTMLElement

*Defined in [lib/blockarea.ts:13](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L13)*

## Accessors

### connectionCreated

• get **connectionCreated**(): ISimpleEvent\<[Connection](_lib_connection_.connection.md)>

*Defined in [lib/blockarea.ts:51](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L51)*

**Returns:** ISimpleEvent\<[Connection](_lib_connection_.connection.md)>

___

### connectionValidation

• get **connectionValidation**(): IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [ConnectionValidationResult](../interfaces/_lib_blockareaoptions_.connectionvalidationresult.md)>

*Defined in [lib/blockarea.ts:55](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L55)*

**Returns:** IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [ConnectionValidationResult](../interfaces/_lib_blockareaoptions_.connectionvalidationresult.md)>

___

### mouseMove

• get **mouseMove**(): IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)>

*Defined in [lib/blockarea.ts:43](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L43)*

**Returns:** IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)>

___

### mouseUp

• get **mouseUp**(): IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)>

*Defined in [lib/blockarea.ts:47](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L47)*

**Returns:** IEvent\<[BlockArea](_lib_blockarea_.blockarea.md), [BlockPoint](../interfaces/_lib_models_.blockpoint.md)>

___

### options

• get **options**(): [BlockAreaOptions](_lib_blockareaoptions_.blockareaoptions.md)

*Defined in [lib/blockarea.ts:59](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L59)*

**Returns:** [BlockAreaOptions](_lib_blockareaoptions_.blockareaoptions.md)

## Methods

### cancelConnection

▸ **cancelConnection**(): void

*Defined in [lib/blockarea.ts:163](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L163)*

**Returns:** void

___

### delete

▸ **delete**(`removeElements`: boolean): void

*Defined in [lib/blockarea.ts:184](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L184)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`removeElements` | boolean | false |

**Returns:** void

___

### endConnection

▸ **endConnection**(`connector`: [Connector](_lib_connector_.connector.md)): void

*Defined in [lib/blockarea.ts:169](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L169)*

#### Parameters:

Name | Type |
------ | ------ |
`connector` | [Connector](_lib_connector_.connector.md) |

**Returns:** void

___

### move

▸ **move**(`x`: number, `y`: number): void

*Defined in [lib/blockarea.ts:137](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L137)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** void

___

### onMove

▸ `Private`**onMove**(`e`: PointerEvent): void

*Defined in [lib/blockarea.ts:63](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | PointerEvent |

**Returns:** void

___

### onSelect

▸ `Private`**onSelect**(): void

*Defined in [lib/blockarea.ts:78](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L78)*

**Returns:** void

___

### onTranslate

▸ `Private`**onTranslate**(`x`: number, `y`: number): void

*Defined in [lib/blockarea.ts:82](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L82)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** void

___

### onZoom

▸ `Private`**onZoom**(`delta`: number, `ox`: number, `oy`: number): void

*Defined in [lib/blockarea.ts:91](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`delta` | number |
`ox` | number |
`oy` | number |

**Returns:** void

___

### pointerUp

▸ `Private`**pointerUp**(`e`: PointerEvent): void

*Defined in [lib/blockarea.ts:74](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L74)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | PointerEvent |

**Returns:** void

___

### resetDrag

▸ **resetDrag**(): void

*Defined in [lib/blockarea.ts:153](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L153)*

**Returns:** void

___

### resetZoom

▸ **resetZoom**(): void

*Defined in [lib/blockarea.ts:148](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L148)*

**Returns:** void

___

### setActiveConnection

▸ **setActiveConnection**(`conn`: [Connection](_lib_connection_.connection.md)): void

*Defined in [lib/blockarea.ts:159](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L159)*

#### Parameters:

Name | Type |
------ | ------ |
`conn` | [Connection](_lib_connection_.connection.md) |

**Returns:** void

___

### update

▸ `Private`**update**(): void

*Defined in [lib/blockarea.ts:109](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L109)*

**Returns:** void

___

### validConnection

▸ `Private`**validConnection**(`start`: [Connector](_lib_connector_.connector.md), `end`: [Connector](_lib_connector_.connector.md)): object

*Defined in [lib/blockarea.ts:128](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L128)*

#### Parameters:

Name | Type |
------ | ------ |
`start` | [Connector](_lib_connector_.connector.md) |
`end` | [Connector](_lib_connector_.connector.md) |

**Returns:** object

Name | Type |
------ | ------ |
`valid` | boolean |
`validator?` | [ConnectionValidator](_lib_blockareaoptions_.connectionvalidator.md) |

___

### zoom

▸ **zoom**(`zoom`: number): void

*Defined in [lib/blockarea.ts:143](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L143)*

#### Parameters:

Name | Type |
------ | ------ |
`zoom` | number |

**Returns:** void

## Object literals

### \_transform

▪ `Private` **\_transform**: object

*Defined in [lib/blockarea.ts:20](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockarea.ts#L20)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`k` | number | 1 |
`x` | number | 0 |
`y` | number | 0 |
