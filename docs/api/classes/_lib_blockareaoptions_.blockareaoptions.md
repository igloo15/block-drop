**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["lib/blockareaoptions"](../modules/_lib_blockareaoptions_.md) / BlockAreaOptions

# Class: BlockAreaOptions

## Hierarchy

* **BlockAreaOptions**

## Index

### Constructors

* [constructor](_lib_blockareaoptions_.blockareaoptions.md#constructor)

### Properties

* [heightMax](_lib_blockareaoptions_.blockareaoptions.md#heightmax)
* [lockToArea](_lib_blockareaoptions_.blockareaoptions.md#locktoarea)
* [pathCurvature](_lib_blockareaoptions_.blockareaoptions.md#pathcurvature)
* [pathStyleClass](_lib_blockareaoptions_.blockareaoptions.md#pathstyleclass)
* [validators](_lib_blockareaoptions_.blockareaoptions.md#validators)
* [widthMax](_lib_blockareaoptions_.blockareaoptions.md#widthmax)
* [zoomInterval](_lib_blockareaoptions_.blockareaoptions.md#zoominterval)
* [zoomMax](_lib_blockareaoptions_.blockareaoptions.md#zoommax)
* [zoomMin](_lib_blockareaoptions_.blockareaoptions.md#zoommin)

### Methods

* [renderFunction](_lib_blockareaoptions_.blockareaoptions.md#renderfunction)

## Constructors

### constructor

\+ **new BlockAreaOptions**(`options?`: [IBlockAreaOptions](../interfaces/_lib_blockareaoptions_.iblockareaoptions.md)): [BlockAreaOptions](_lib_blockareaoptions_.blockareaoptions.md)

*Defined in [lib/blockareaoptions.ts:71](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [IBlockAreaOptions](../interfaces/_lib_blockareaoptions_.iblockareaoptions.md) |

**Returns:** [BlockAreaOptions](_lib_blockareaoptions_.blockareaoptions.md)

## Properties

### heightMax

•  **heightMax**: number = 4000

*Defined in [lib/blockareaoptions.ts:62](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L62)*

___

### lockToArea

•  **lockToArea**: boolean = false

*Defined in [lib/blockareaoptions.ts:64](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L64)*

___

### pathCurvature

•  **pathCurvature**: number = 0.4

*Defined in [lib/blockareaoptions.ts:66](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L66)*

___

### pathStyleClass

•  **pathStyleClass**: string = "main-path"

*Defined in [lib/blockareaoptions.ts:67](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L67)*

___

### validators

•  **validators**: [ConnectionValidator](_lib_blockareaoptions_.connectionvalidator.md)[] = []

*Defined in [lib/blockareaoptions.ts:71](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L71)*

___

### widthMax

•  **widthMax**: number = 4000

*Defined in [lib/blockareaoptions.ts:61](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L61)*

___

### zoomInterval

•  **zoomInterval**: number = 0.1

*Defined in [lib/blockareaoptions.ts:59](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L59)*

___

### zoomMax

•  **zoomMax**: number = 2

*Defined in [lib/blockareaoptions.ts:58](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L58)*

___

### zoomMin

•  **zoomMin**: number = 0.52

*Defined in [lib/blockareaoptions.ts:57](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L57)*

## Methods

### renderFunction

▸ **renderFunction**(`value`: string): string

*Defined in [lib/blockareaoptions.ts:69](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/blockareaoptions.ts#L69)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** string
