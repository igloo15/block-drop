**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["lib/connection"](../modules/_lib_connection_.md) / Connection

# Class: Connection

## Hierarchy

* **Connection**

## Index

### Constructors

* [constructor](_lib_connection_.connection.md#constructor)

### Properties

* [\_containerElem](_lib_connection_.connection.md#_containerelem)
* [\_endConnector](_lib_connection_.connection.md#_endconnector)
* [\_moveSubscription](_lib_connection_.connection.md#_movesubscription)
* [\_parent](_lib_connection_.connection.md#_parent)
* [\_path](_lib_connection_.connection.md#_path)
* [\_startConnector](_lib_connection_.connection.md#_startconnector)
* [\_upSubscription](_lib_connection_.connection.md#_upsubscription)

### Accessors

* [endBlock](_lib_connection_.connection.md#endblock)
* [endConnector](_lib_connection_.connection.md#endconnector)
* [startBlock](_lib_connection_.connection.md#startblock)
* [startConnector](_lib_connection_.connection.md#startconnector)

### Methods

* [complete](_lib_connection_.connection.md#complete)
* [delete](_lib_connection_.connection.md#delete)
* [getEndPosition](_lib_connection_.connection.md#getendposition)
* [getStartPosition](_lib_connection_.connection.md#getstartposition)
* [renderConnection](_lib_connection_.connection.md#renderconnection)
* [renderPath](_lib_connection_.connection.md#renderpath)
* [unsubscribe](_lib_connection_.connection.md#unsubscribe)
* [update](_lib_connection_.connection.md#update)
* [updateConnection](_lib_connection_.connection.md#updateconnection)
* [createConnection](_lib_connection_.connection.md#createconnection)

### Object literals

* [\_previousEndPos](_lib_connection_.connection.md#_previousendpos)
* [\_previousStartPos](_lib_connection_.connection.md#_previousstartpos)

## Constructors

### constructor

\+ **new Connection**(`parent`: [BlockArea](_lib_blockarea_.blockarea.md), `startConnector`: [Connector](_lib_connector_.connector.md), `initialPoint`: [BlockPoint](../interfaces/_lib_models_.blockpoint.md)): [Connection](_lib_connection_.connection.md)

*Defined in [lib/connection.ts:16](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`parent` | [BlockArea](_lib_blockarea_.blockarea.md) |
`startConnector` | [Connector](_lib_connector_.connector.md) |
`initialPoint` | [BlockPoint](../interfaces/_lib_models_.blockpoint.md) |

**Returns:** [Connection](_lib_connection_.connection.md)

## Properties

### \_containerElem

• `Private` **\_containerElem**: HTMLElement

*Defined in [lib/connection.ts:9](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L9)*

___

### \_endConnector

• `Private` **\_endConnector**: [Connector](_lib_connector_.connector.md) \| null = null

*Defined in [lib/connection.ts:12](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L12)*

___

### \_moveSubscription

• `Private` **\_moveSubscription**: null \| () => void

*Defined in [lib/connection.ts:13](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L13)*

___

### \_parent

• `Private` **\_parent**: [BlockArea](_lib_blockarea_.blockarea.md)

*Defined in [lib/connection.ts:10](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L10)*

___

### \_path

• `Private` **\_path**: SVGPathElement

*Defined in [lib/connection.ts:8](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L8)*

___

### \_startConnector

• `Private` **\_startConnector**: [Connector](_lib_connector_.connector.md)

*Defined in [lib/connection.ts:11](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L11)*

___

### \_upSubscription

• `Private` **\_upSubscription**: null \| () => void

*Defined in [lib/connection.ts:14](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L14)*

## Accessors

### endBlock

• get **endBlock**(): [Block](_lib_block_.block.md) \| null

*Defined in [lib/connection.ts:120](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L120)*

**Returns:** [Block](_lib_block_.block.md) \| null

___

### endConnector

• get **endConnector**(): [Connector](_lib_connector_.connector.md) \| null

*Defined in [lib/connection.ts:127](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L127)*

**Returns:** [Connector](_lib_connector_.connector.md) \| null

___

### startBlock

• get **startBlock**(): [Block](_lib_block_.block.md) \| null

*Defined in [lib/connection.ts:112](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L112)*

**Returns:** [Block](_lib_block_.block.md) \| null

___

### startConnector

• get **startConnector**(): [Connector](_lib_connector_.connector.md)

*Defined in [lib/connection.ts:116](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L116)*

**Returns:** [Connector](_lib_connector_.connector.md)

## Methods

### complete

▸ **complete**(`connector`: [Connector](_lib_connector_.connector.md)): void

*Defined in [lib/connection.ts:138](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L138)*

#### Parameters:

Name | Type |
------ | ------ |
`connector` | [Connector](_lib_connector_.connector.md) |

**Returns:** void

___

### delete

▸ **delete**(): void

*Defined in [lib/connection.ts:131](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L131)*

**Returns:** void

___

### getEndPosition

▸ `Private`**getEndPosition**(): [BlockPoint](../interfaces/_lib_models_.blockpoint.md)

*Defined in [lib/connection.ts:57](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L57)*

**Returns:** [BlockPoint](../interfaces/_lib_models_.blockpoint.md)

___

### getStartPosition

▸ `Private`**getStartPosition**(): [BlockPoint](../interfaces/_lib_models_.blockpoint.md)

*Defined in [lib/connection.ts:48](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L48)*

**Returns:** [BlockPoint](../interfaces/_lib_models_.blockpoint.md)

___

### renderConnection

▸ `Private`**renderConnection**(`mouseX`: number, `mouseY`: number, `x`: number, `y`: number): void

*Defined in [lib/connection.ts:90](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L90)*

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

*Defined in [lib/connection.ts:66](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`points` | number[] |
`curvature` | number |

**Returns:** string

___

### unsubscribe

▸ `Private`**unsubscribe**(): void

*Defined in [lib/connection.ts:37](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L37)*

**Returns:** void

___

### update

▸ **update**(): void

*Defined in [lib/connection.ts:145](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L145)*

**Returns:** void

___

### updateConnection

▸ `Private`**updateConnection**(`el`: SVGPathElement, `d`: string): void

*Defined in [lib/connection.ts:33](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`el` | SVGPathElement |
`d` | string |

**Returns:** void

___

### createConnection

▸ `Static`**createConnection**(`parent`: [BlockArea](_lib_blockarea_.blockarea.md), `startConnector`: [Connector](_lib_connector_.connector.md), `endConnector`: [Connector](_lib_connector_.connector.md)): [Connection](_lib_connection_.connection.md)

*Defined in [lib/connection.ts:154](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L154)*

#### Parameters:

Name | Type |
------ | ------ |
`parent` | [BlockArea](_lib_blockarea_.blockarea.md) |
`startConnector` | [Connector](_lib_connector_.connector.md) |
`endConnector` | [Connector](_lib_connector_.connector.md) |

**Returns:** [Connection](_lib_connection_.connection.md)

## Object literals

### \_previousEndPos

▪ `Private` **\_previousEndPos**: object

*Defined in [lib/connection.ts:16](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L16)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`x` | number | 0 |
`y` | number | 0 |

___

### \_previousStartPos

▪ `Private` **\_previousStartPos**: object

*Defined in [lib/connection.ts:15](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connection.ts#L15)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`x` | number | 0 |
`y` | number | 0 |
