**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / ["zoom"](../modules/_zoom_.md) / Zoom

# Class: Zoom

## Hierarchy

* **Zoom**

## Index

### Constructors

* [constructor](_zoom_.zoom.md#constructor)

### Properties

* [\_el](_zoom_.zoom.md#_el)
* [\_onZoom](_zoom_.zoom.md#_onzoom)
* [\_parent](_zoom_.zoom.md#_parent)
* [\_zoomInterval](_zoom_.zoom.md#_zoominterval)
* [destroy](_zoom_.zoom.md#destroy)

### Methods

* [mouseWheel](_zoom_.zoom.md#mousewheel)

## Constructors

### constructor

\+ **new Zoom**(`el`: HTMLElement, `parent`: HTMLElement, `onZoom`: [ZoomFunction](../modules/_zoom_.md#zoomfunction), `zoomInterval`: number): [Zoom](_zoom_.zoom.md)

*Defined in [zoom.ts:11](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L11)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`el` | HTMLElement | - |
`parent` | HTMLElement | - |
`onZoom` | [ZoomFunction](../modules/_zoom_.md#zoomfunction) | - |
`zoomInterval` | number | 0.1 |

**Returns:** [Zoom](_zoom_.zoom.md)

## Properties

### \_el

• `Private` **\_el**: HTMLElement

*Defined in [zoom.ts:7](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L7)*

___

### \_onZoom

• `Private` **\_onZoom**: Function

*Defined in [zoom.ts:9](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L9)*

___

### \_parent

• `Private` **\_parent**: HTMLElement

*Defined in [zoom.ts:8](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L8)*

___

### \_zoomInterval

• `Private` **\_zoomInterval**: number

*Defined in [zoom.ts:10](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L10)*

___

### destroy

•  **destroy**: () => void

*Defined in [zoom.ts:11](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L11)*

## Methods

### mouseWheel

▸ **mouseWheel**(`e`: WheelEvent): void

*Defined in [zoom.ts:27](https://github.com/igloo15/block-drop/blob/cf013cb/src/zoom.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`e` | WheelEvent |

**Returns:** void
