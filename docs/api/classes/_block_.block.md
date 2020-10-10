**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["block"](../modules/_block_.md) / Block

# Class: Block

## Hierarchy

* **Block**

## Index

### Constructors

* [constructor](_block_.block.md#constructor)

### Properties

* [\_connectorIndex](_block_.block.md#_connectorindex)
* [\_data](_block_.block.md#_data)
* [\_destroyClick](_block_.block.md#_destroyclick)
* [\_destroyDblClick](_block_.block.md#_destroydblclick)
* [\_dragger](_block_.block.md#_dragger)
* [\_el](_block_.block.md#_el)
* [\_inputs](_block_.block.md#_inputs)
* [\_mouseClick](_block_.block.md#_mouseclick)
* [\_mouseDblClick](_block_.block.md#_mousedblclick)
* [\_outputs](_block_.block.md#_outputs)
* [\_start](_block_.block.md#_start)
* [\_x](_block_.block.md#_x)
* [\_y](_block_.block.md#_y)
* [id](_block_.block.md#id)

### Accessors

* [allConnections](_block_.block.md#allconnections)
* [allConnectors](_block_.block.md#allconnectors)
* [click](_block_.block.md#click)
* [dblClick](_block_.block.md#dblclick)
* [inputs](_block_.block.md#inputs)
* [outputs](_block_.block.md#outputs)

### Methods

* [addInput](_block_.block.md#addinput)
* [addInputElements](_block_.block.md#addinputelements)
* [addInputStrings](_block_.block.md#addinputstrings)
* [addOutput](_block_.block.md#addoutput)
* [addOutputElements](_block_.block.md#addoutputelements)
* [addOutputStrings](_block_.block.md#addoutputstrings)
* [delete](_block_.block.md#delete)
* [getData](_block_.block.md#getdata)
* [getPosition](_block_.block.md#getposition)
* [move](_block_.block.md#move)
* [onClick](_block_.block.md#onclick)
* [onDblClick](_block_.block.md#ondblclick)
* [onSelect](_block_.block.md#onselect)
* [onTranslate](_block_.block.md#ontranslate)
* [update](_block_.block.md#update)

## Constructors

### constructor

\+ **new Block**(`id`: string, `element`: HTMLElement, `extraData?`: any): [Block](_block_.block.md)

*Defined in [block.ts:24](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`element` | HTMLElement |
`extraData?` | any |

**Returns:** [Block](_block_.block.md)

## Properties

### \_connectorIndex

• `Private` **\_connectorIndex**: number = 0

*Defined in [block.ts:22](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L22)*

___

### \_data

• `Private` **\_data**: any

*Defined in [block.ts:21](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L21)*

___

### \_destroyClick

• `Private` **\_destroyClick**: () => void

*Defined in [block.ts:19](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L19)*

___

### \_destroyDblClick

• `Private` **\_destroyDblClick**: () => void

*Defined in [block.ts:20](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L20)*

___

### \_dragger

• `Private` **\_dragger**: [Drag](_drag_.drag.md)

*Defined in [block.ts:14](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L14)*

___

### \_el

• `Private` **\_el**: HTMLElement

*Defined in [block.ts:10](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L10)*

___

### \_inputs

• `Private` **\_inputs**: [Connector](_connector_.connector.md)[] = []

*Defined in [block.ts:15](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L15)*

___

### \_mouseClick

• `Private` **\_mouseClick**: EventDispatcher\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)> = new EventDispatcher\<Block, BlockPoint>()

*Defined in [block.ts:17](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L17)*

___

### \_mouseDblClick

• `Private` **\_mouseDblClick**: EventDispatcher\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)> = new EventDispatcher\<Block, BlockPoint>()

*Defined in [block.ts:18](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L18)*

___

### \_outputs

• `Private` **\_outputs**: [Connector](_connector_.connector.md)[] = []

*Defined in [block.ts:16](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L16)*

___

### \_start

• `Private` **\_start**: [BlockPoint](../interfaces/_models_.blockpoint.md)

*Defined in [block.ts:13](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L13)*

___

### \_x

• `Private` **\_x**: number

*Defined in [block.ts:11](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L11)*

___

### \_y

• `Private` **\_y**: number

*Defined in [block.ts:12](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L12)*

___

### id

•  **id**: string

*Defined in [block.ts:24](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L24)*

## Accessors

### allConnections

• get **allConnections**(): [Connection](_connection_.connection.md)[]

*Defined in [block.ts:103](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L103)*

**Returns:** [Connection](_connection_.connection.md)[]

___

### allConnectors

• get **allConnectors**(): [Connector](_connector_.connector.md)[]

*Defined in [block.ts:99](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L99)*

**Returns:** [Connector](_connector_.connector.md)[]

___

### click

• get **click**(): IEvent\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)>

*Defined in [block.ts:68](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L68)*

**Returns:** IEvent\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)>

___

### dblClick

• get **dblClick**(): IEvent\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)>

*Defined in [block.ts:72](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L72)*

**Returns:** IEvent\<[Block](_block_.block.md), [BlockPoint](../interfaces/_models_.blockpoint.md)>

___

### inputs

• get **inputs**(): [Connector](_connector_.connector.md)[]

*Defined in [block.ts:91](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L91)*

**Returns:** [Connector](_connector_.connector.md)[]

___

### outputs

• get **outputs**(): [Connector](_connector_.connector.md)[]

*Defined in [block.ts:95](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L95)*

**Returns:** [Connector](_connector_.connector.md)[]

## Methods

### addInput

▸ **addInput**(`connector`: [Connector](_connector_.connector.md)): [Block](_block_.block.md)

*Defined in [block.ts:107](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L107)*

#### Parameters:

Name | Type |
------ | ------ |
`connector` | [Connector](_connector_.connector.md) |

**Returns:** [Block](_block_.block.md)

___

### addInputElements

▸ **addInputElements**(`area`: [BlockArea](_blockarea_.blockarea.md), `inputs`: HTMLElement[], `options?`: [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)): [Block](_block_.block.md)

*Defined in [block.ts:113](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L113)*

#### Parameters:

Name | Type |
------ | ------ |
`area` | [BlockArea](_blockarea_.blockarea.md) |
`inputs` | HTMLElement[] |
`options?` | [ConnectorOptions](../interfaces/_connector_.connectoroptions.md) |

**Returns:** [Block](_block_.block.md)

___

### addInputStrings

▸ **addInputStrings**(`area`: [BlockArea](_blockarea_.blockarea.md), `inputs`: string[], `options?`: [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)): [Block](_block_.block.md)

*Defined in [block.ts:123](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L123)*

#### Parameters:

Name | Type |
------ | ------ |
`area` | [BlockArea](_blockarea_.blockarea.md) |
`inputs` | string[] |
`options?` | [ConnectorOptions](../interfaces/_connector_.connectoroptions.md) |

**Returns:** [Block](_block_.block.md)

___

### addOutput

▸ **addOutput**(`connector`: [Connector](_connector_.connector.md)): [Block](_block_.block.md)

*Defined in [block.ts:128](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L128)*

#### Parameters:

Name | Type |
------ | ------ |
`connector` | [Connector](_connector_.connector.md) |

**Returns:** [Block](_block_.block.md)

___

### addOutputElements

▸ **addOutputElements**(`area`: [BlockArea](_blockarea_.blockarea.md), `outputs`: HTMLElement[], `options?`: [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)): [Block](_block_.block.md)

*Defined in [block.ts:134](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L134)*

#### Parameters:

Name | Type |
------ | ------ |
`area` | [BlockArea](_blockarea_.blockarea.md) |
`outputs` | HTMLElement[] |
`options?` | [ConnectorOptions](../interfaces/_connector_.connectoroptions.md) |

**Returns:** [Block](_block_.block.md)

___

### addOutputStrings

▸ **addOutputStrings**(`area`: [BlockArea](_blockarea_.blockarea.md), `outputs`: string[], `options?`: [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)): [Block](_block_.block.md)

*Defined in [block.ts:144](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L144)*

#### Parameters:

Name | Type |
------ | ------ |
`area` | [BlockArea](_blockarea_.blockarea.md) |
`outputs` | string[] |
`options?` | [ConnectorOptions](../interfaces/_connector_.connectoroptions.md) |

**Returns:** [Block](_block_.block.md)

___

### delete

▸ **delete**(`removeElement`: boolean): void

*Defined in [block.ts:149](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L149)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`removeElement` | boolean | false |

**Returns:** void

___

### getData

▸ **getData**\<T>(): T

*Defined in [block.ts:76](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L76)*

#### Type parameters:

Name |
------ |
`T` |

**Returns:** T

___

### getPosition

▸ **getPosition**(): [BlockPoint](../interfaces/_models_.blockpoint.md)

*Defined in [block.ts:84](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L84)*

**Returns:** [BlockPoint](../interfaces/_models_.blockpoint.md)

___

### move

▸ **move**(`x`: number, `y`: number): void

*Defined in [block.ts:80](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** void

___

### onClick

▸ `Private`**onClick**(`e`: MouseEvent): void

*Defined in [block.ts:38](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | MouseEvent |

**Returns:** void

___

### onDblClick

▸ `Private`**onDblClick**(`e`: MouseEvent): void

*Defined in [block.ts:42](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | MouseEvent |

**Returns:** void

___

### onSelect

▸ `Private`**onSelect**(): void

*Defined in [block.ts:46](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L46)*

**Returns:** void

___

### onTranslate

▸ `Private`**onTranslate**(`x`: number, `y`: number): void

*Defined in [block.ts:51](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** void

___

### update

▸ `Private`**update**(): void

*Defined in [block.ts:64](https://github.com/igloo15/block-drop/blob/cf013cb/src/block.ts#L64)*

**Returns:** void
