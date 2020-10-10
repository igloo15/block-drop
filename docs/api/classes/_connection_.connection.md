**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["connection"](../modules/_connection_.md) / Connection

# Class: Connection

## Hierarchy

* **Connection**

## Index

### Constructors

* [constructor](_connection_.connection.md#constructor)

### Properties

* [\_containerElem](_connection_.connection.md#_containerelem)
* [\_endConnector](_connection_.connection.md#_endconnector)
* [\_moveSubscription](_connection_.connection.md#_movesubscription)
* [\_parent](_connection_.connection.md#_parent)
* [\_path](_connection_.connection.md#_path)
* [\_startConnector](_connection_.connection.md#_startconnector)
* [\_upSubscription](_connection_.connection.md#_upsubscription)

### Accessors

* [endBlock](_connection_.connection.md#endblock)
* [endConnector](_connection_.connection.md#endconnector)
* [startBlock](_connection_.connection.md#startblock)
* [startConnector](_connection_.connection.md#startconnector)

### Methods

* [complete](_connection_.connection.md#complete)
* [delete](_connection_.connection.md#delete)
* [getEndPosition](_connection_.connection.md#getendposition)
* [getStartPosition](_connection_.connection.md#getstartposition)
* [renderConnection](_connection_.connection.md#renderconnection)
* [renderPath](_connection_.connection.md#renderpath)
* [unsubscribe](_connection_.connection.md#unsubscribe)
* [update](_connection_.connection.md#update)
* [updateConnection](_connection_.connection.md#updateconnection)
* [createConnection](_connection_.connection.md#createconnection)

### Object literals

* [\_previousEndPos](_connection_.connection.md#_previousendpos)
* [\_previousStartPos](_connection_.connection.md#_previousstartpos)

## Constructors

### constructor

\+ **new Connection**(`parent`: [BlockArea](_blockarea_.blockarea.md), `startConnector`: [Connector](_connector_.connector.md), `initialPoint`: [BlockPoint](../interfaces/_models_.blockpoint.md)): [Connection](_connection_.connection.md)

*Defined in [connection.ts:16](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`parent` | [BlockArea](_blockarea_.blockarea.md) |
`startConnector` | [Connector](_connector_.connector.md) |
`initialPoint` | [BlockPoint](../interfaces/_models_.blockpoint.md) |

**Returns:** [Connection](_connection_.connection.md)

## Properties

### \_containerElem

• `Private` **\_containerElem**: HTMLElement

*Defined in [connection.ts:9](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L9)*

___

### \_endConnector

• `Private` **\_endConnector**: [Connector](_connector_.connector.md) \| null = null

*Defined in [connection.ts:12](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L12)*

___

### \_moveSubscription

• `Private` **\_moveSubscription**: null \| () => void

*Defined in [connection.ts:13](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L13)*

___

### \_parent

• `Private` **\_parent**: [BlockArea](_blockarea_.blockarea.md)

*Defined in [connection.ts:10](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L10)*

___

### \_path

• `Private` **\_path**: SVGPathElement

*Defined in [connection.ts:8](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L8)*

___

### \_startConnector

• `Private` **\_startConnector**: [Connector](_connector_.connector.md)

*Defined in [connection.ts:11](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L11)*

___

### \_upSubscription

• `Private` **\_upSubscription**: null \| () => void

*Defined in [connection.ts:14](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L14)*

## Accessors

### endBlock

• get **endBlock**(): [Block](_block_.block.md) \| null

*Defined in [connection.ts:120](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L120)*

**Returns:** [Block](_block_.block.md) \| null

___

### endConnector

• get **endConnector**(): [Connector](_connector_.connector.md) \| null

*Defined in [connection.ts:127](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L127)*

**Returns:** [Connector](_connector_.connector.md) \| null

___

### startBlock

• get **startBlock**(): [Block](_block_.block.md) \| null

*Defined in [connection.ts:112](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L112)*

**Returns:** [Block](_block_.block.md) \| null

___

### startConnector

• get **startConnector**(): [Connector](_connector_.connector.md)

*Defined in [connection.ts:116](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L116)*

**Returns:** [Connector](_connector_.connector.md)

## Methods

### complete

▸ **complete**(`connector`: [Connector](_connector_.connector.md)): void

*Defined in [connection.ts:138](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L138)*

#### Parameters:

Name | Type |
------ | ------ |
`connector` | [Connector](_connector_.connector.md) |

**Returns:** void

___

### delete

▸ **delete**(): void

*Defined in [connection.ts:131](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L131)*

**Returns:** void

___

### getEndPosition

▸ `Private`**getEndPosition**(): [BlockPoint](../interfaces/_models_.blockpoint.md)

*Defined in [connection.ts:57](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L57)*

**Returns:** [BlockPoint](../interfaces/_models_.blockpoint.md)

___

### getStartPosition

▸ `Private`**getStartPosition**(): [BlockPoint](../interfaces/_models_.blockpoint.md)

*Defined in [connection.ts:48](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L48)*

**Returns:** [BlockPoint](../interfaces/_models_.blockpoint.md)

___

### renderConnection

▸ `Private`**renderConnection**(`mouseX`: number, `mouseY`: number, `x`: number, `y`: number): void

*Defined in [connection.ts:90](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L90)*

#### Parameters:

Name | Type |
------ | ------ |
`mouseX` | number |
`mouseY` | number |
`x` | number |
`y` | number |

**Returns:** void

___

### renderPath

▸ `Private`**renderPath**(`points`: number[], `curvature`: number): string

*Defined in [connection.ts:66](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`points` | number[] |
`curvature` | number |

**Returns:** string

___

### unsubscribe

▸ `Private`**unsubscribe**(): void

*Defined in [connection.ts:37](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L37)*

**Returns:** void

___

### update

▸ **update**(): void

*Defined in [connection.ts:145](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L145)*

**Returns:** void

___

### updateConnection

▸ `Private`**updateConnection**(`el`: SVGPathElement, `d`: string): void

*Defined in [connection.ts:33](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`el` | SVGPathElement |
`d` | string |

**Returns:** void

___

### createConnection

▸ `Static`**createConnection**(`parent`: [BlockArea](_blockarea_.blockarea.md), `startConnector`: [Connector](_connector_.connector.md), `endConnector`: [Connector](_connector_.connector.md)): [Connection](_connection_.connection.md)

*Defined in [connection.ts:154](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L154)*

#### Parameters:

Name | Type |
------ | ------ |
`parent` | [BlockArea](_blockarea_.blockarea.md) |
`startConnector` | [Connector](_connector_.connector.md) |
`endConnector` | [Connector](_connector_.connector.md) |

**Returns:** [Connection](_connection_.connection.md)

## Object literals

### \_previousEndPos

▪ `Private` **\_previousEndPos**: object

*Defined in [connection.ts:16](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L16)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`x` | number | 0 |
`y` | number | 0 |

___

### \_previousStartPos

▪ `Private` **\_previousStartPos**: object

*Defined in [connection.ts:15](https://github.com/igloo15/block-drop/blob/cf013cb/src/connection.ts#L15)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`x` | number | 0 |
`y` | number | 0 |
