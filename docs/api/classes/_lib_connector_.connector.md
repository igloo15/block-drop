**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["lib/connector"](../modules/_lib_connector_.md) / Connector

# Class: Connector

## Hierarchy

* **Connector**

## Index

### Constructors

* [constructor](_lib_connector_.connector.md#constructor)

### Properties

* [\_area](_lib_connector_.connector.md#_area)
* [\_connections](_lib_connector_.connector.md#_connections)
* [\_data](_lib_connector_.connector.md#_data)
* [\_destroyDownSubscription](_lib_connector_.connector.md#_destroydownsubscription)
* [\_destroyUpSubscription](_lib_connector_.connector.md#_destroyupsubscription)
* [\_el](_lib_connector_.connector.md#_el)
* [\_parent](_lib_connector_.connector.md#_parent)
* [id](_lib_connector_.connector.md#id)

### Accessors

* [block](_lib_connector_.connector.md#block)
* [connections](_lib_connector_.connector.md#connections)
* [options](_lib_connector_.connector.md#options)
* [position](_lib_connector_.connector.md#position)

### Methods

* [complete](_lib_connector_.connector.md#complete)
* [delete](_lib_connector_.connector.md#delete)
* [getData](_lib_connector_.connector.md#getdata)
* [removeConnection](_lib_connector_.connector.md#removeconnection)
* [setBlockParent](_lib_connector_.connector.md#setblockparent)
* [startConnection](_lib_connector_.connector.md#startconnection)
* [update](_lib_connector_.connector.md#update)

### Object literals

* [\_options](_lib_connector_.connector.md#_options)

## Constructors

### constructor

\+ **new Connector**(`id`: string, `element`: HTMLElement, `area`: [BlockArea](_lib_blockarea_.blockarea.md), `options`: [ConnectorOptions](../interfaces/_lib_connector_.connectoroptions.md), `extraData?`: any): [Connector](_lib_connector_.connector.md)

*Defined in [lib/connector.ts:26](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`element` | HTMLElement |
`area` | [BlockArea](_lib_blockarea_.blockarea.md) |
`options` | [ConnectorOptions](../interfaces/_lib_connector_.connectoroptions.md) |
`extraData?` | any |

**Returns:** [Connector](_lib_connector_.connector.md)

## Properties

### \_area

• `Private` **\_area**: [BlockArea](_lib_blockarea_.blockarea.md)

*Defined in [lib/connector.ts:14](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L14)*

___

### \_connections

• `Private` **\_connections**: [Connection](_lib_connection_.connection.md)[] = []

*Defined in [lib/connector.ts:21](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L21)*

___

### \_data

• `Private` **\_data**: any

*Defined in [lib/connector.ts:22](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L22)*

___

### \_destroyDownSubscription

• `Private` **\_destroyDownSubscription**: () => void

*Defined in [lib/connector.ts:23](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L23)*

___

### \_destroyUpSubscription

• `Private` **\_destroyUpSubscription**: () => void

*Defined in [lib/connector.ts:24](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L24)*

___

### \_el

• `Private` **\_el**: HTMLElement

*Defined in [lib/connector.ts:16](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L16)*

___

### \_parent

• `Private` **\_parent**: [Block](_lib_block_.block.md) \| null = null

*Defined in [lib/connector.ts:15](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L15)*

___

### id

•  **id**: string

*Defined in [lib/connector.ts:26](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L26)*

## Accessors

### block

• get **block**(): [Block](_lib_block_.block.md) \| null

*Defined in [lib/connector.ts:66](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L66)*

**Returns:** [Block](_lib_block_.block.md) \| null

___

### connections

• get **connections**(): [Connection](_lib_connection_.connection.md)[]

*Defined in [lib/connector.ts:70](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L70)*

**Returns:** [Connection](_lib_connection_.connection.md)[]

___

### options

• get **options**(): [ConnectorOptions](../interfaces/_lib_connector_.connectoroptions.md)

*Defined in [lib/connector.ts:74](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L74)*

**Returns:** [ConnectorOptions](../interfaces/_lib_connector_.connectoroptions.md)

___

### position

• get **position**(): [BlockPoint](../interfaces/_lib_models_.blockpoint.md) \| undefined

*Defined in [lib/connector.ts:55](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L55)*

**Returns:** [BlockPoint](../interfaces/_lib_models_.blockpoint.md) \| undefined

## Methods

### complete

▸ **complete**(`conn`: [Connection](_lib_connection_.connection.md)): void

*Defined in [lib/connector.ts:91](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`conn` | [Connection](_lib_connection_.connection.md) |

**Returns:** void

___

### delete

▸ **delete**(`removeConnections`: boolean, `removeElement`: boolean): void

*Defined in [lib/connector.ts:101](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L101)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`removeConnections` | boolean | false |
`removeElement` | boolean | false |

**Returns:** void

___

### getData

▸ **getData**\<T>(): T

*Defined in [lib/connector.ts:83](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L83)*

#### Type parameters:

Name |
------ |
`T` |

**Returns:** T

___

### removeConnection

▸ **removeConnection**(`conn`: [Connection](_lib_connection_.connection.md)): void

*Defined in [lib/connector.ts:115](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L115)*

#### Parameters:

Name | Type |
------ | ------ |
`conn` | [Connection](_lib_connection_.connection.md) |

**Returns:** void

___

### setBlockParent

▸ **setBlockParent**(`block`: [Block](_lib_block_.block.md)): void

*Defined in [lib/connector.ts:87](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`block` | [Block](_lib_block_.block.md) |

**Returns:** void

___

### startConnection

▸ `Private`**startConnection**(`mouseEvent`: PointerEvent): void

*Defined in [lib/connector.ts:78](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`mouseEvent` | PointerEvent |

**Returns:** void

___

### update

▸ **update**(): void

*Defined in [lib/connector.ts:95](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L95)*

**Returns:** void

## Object literals

### \_options

▪ `Private` **\_options**: object

*Defined in [lib/connector.ts:17](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/connector.ts#L17)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`alternateConnCurve` | false | false |
`isInput` | false | false |
