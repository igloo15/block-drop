**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["connector"](../modules/_connector_.md) / Connector

# Class: Connector

## Hierarchy

* **Connector**

## Index

### Constructors

* [constructor](_connector_.connector.md#constructor)

### Properties

* [\_area](_connector_.connector.md#_area)
* [\_connections](_connector_.connector.md#_connections)
* [\_data](_connector_.connector.md#_data)
* [\_destroyDownSubscription](_connector_.connector.md#_destroydownsubscription)
* [\_destroyUpSubscription](_connector_.connector.md#_destroyupsubscription)
* [\_el](_connector_.connector.md#_el)
* [\_parent](_connector_.connector.md#_parent)
* [id](_connector_.connector.md#id)

### Accessors

* [block](_connector_.connector.md#block)
* [connections](_connector_.connector.md#connections)
* [options](_connector_.connector.md#options)
* [position](_connector_.connector.md#position)

### Methods

* [complete](_connector_.connector.md#complete)
* [delete](_connector_.connector.md#delete)
* [getData](_connector_.connector.md#getdata)
* [removeConnection](_connector_.connector.md#removeconnection)
* [setBlockParent](_connector_.connector.md#setblockparent)
* [startConnection](_connector_.connector.md#startconnection)
* [update](_connector_.connector.md#update)

### Object literals

* [\_options](_connector_.connector.md#_options)

## Constructors

### constructor

\+ **new Connector**(`id`: string, `element`: HTMLElement, `area`: [BlockArea](_blockarea_.blockarea.md), `options`: [ConnectorOptions](../interfaces/_connector_.connectoroptions.md), `extraData?`: any): [Connector](_connector_.connector.md)

*Defined in [connector.ts:26](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`element` | HTMLElement |
`area` | [BlockArea](_blockarea_.blockarea.md) |
`options` | [ConnectorOptions](../interfaces/_connector_.connectoroptions.md) |
`extraData?` | any |

**Returns:** [Connector](_connector_.connector.md)

## Properties

### \_area

• `Private` **\_area**: [BlockArea](_blockarea_.blockarea.md)

*Defined in [connector.ts:14](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L14)*

___

### \_connections

• `Private` **\_connections**: [Connection](_connection_.connection.md)[] = []

*Defined in [connector.ts:21](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L21)*

___

### \_data

• `Private` **\_data**: any

*Defined in [connector.ts:22](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L22)*

___

### \_destroyDownSubscription

• `Private` **\_destroyDownSubscription**: () => void

*Defined in [connector.ts:23](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L23)*

___

### \_destroyUpSubscription

• `Private` **\_destroyUpSubscription**: () => void

*Defined in [connector.ts:24](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L24)*

___

### \_el

• `Private` **\_el**: HTMLElement

*Defined in [connector.ts:16](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L16)*

___

### \_parent

• `Private` **\_parent**: [Block](_block_.block.md) \| null = null

*Defined in [connector.ts:15](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L15)*

___

### id

•  **id**: string

*Defined in [connector.ts:26](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L26)*

## Accessors

### block

• get **block**(): [Block](_block_.block.md) \| null

*Defined in [connector.ts:66](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L66)*

**Returns:** [Block](_block_.block.md) \| null

___

### connections

• get **connections**(): [Connection](_connection_.connection.md)[]

*Defined in [connector.ts:70](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L70)*

**Returns:** [Connection](_connection_.connection.md)[]

___

### options

• get **options**(): [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)

*Defined in [connector.ts:74](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L74)*

**Returns:** [ConnectorOptions](../interfaces/_connector_.connectoroptions.md)

___

### position

• get **position**(): [BlockPoint](../interfaces/_models_.blockpoint.md) \| undefined

*Defined in [connector.ts:55](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L55)*

**Returns:** [BlockPoint](../interfaces/_models_.blockpoint.md) \| undefined

## Methods

### complete

▸ **complete**(`conn`: [Connection](_connection_.connection.md)): void

*Defined in [connector.ts:91](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`conn` | [Connection](_connection_.connection.md) |

**Returns:** void

___

### delete

▸ **delete**(`removeConnections`: boolean, `removeElement`: boolean): void

*Defined in [connector.ts:101](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L101)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`removeConnections` | boolean | false |
`removeElement` | boolean | false |

**Returns:** void

___

### getData

▸ **getData**\<T>(): T

*Defined in [connector.ts:83](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L83)*

#### Type parameters:

Name |
------ |
`T` |

**Returns:** T

___

### removeConnection

▸ **removeConnection**(`conn`: [Connection](_connection_.connection.md)): void

*Defined in [connector.ts:115](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L115)*

#### Parameters:

Name | Type |
------ | ------ |
`conn` | [Connection](_connection_.connection.md) |

**Returns:** void

___

### setBlockParent

▸ **setBlockParent**(`block`: [Block](_block_.block.md)): void

*Defined in [connector.ts:87](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`block` | [Block](_block_.block.md) |

**Returns:** void

___

### startConnection

▸ `Private`**startConnection**(`mouseEvent`: PointerEvent): void

*Defined in [connector.ts:78](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`mouseEvent` | PointerEvent |

**Returns:** void

___

### update

▸ **update**(): void

*Defined in [connector.ts:95](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L95)*

**Returns:** void

## Object literals

### \_options

▪ `Private` **\_options**: object

*Defined in [connector.ts:17](https://github.com/igloo15/block-drop/blob/cf013cb/src/connector.ts#L17)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`alternateConnCurve` | false | false |
`isInput` | false | false |
