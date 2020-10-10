**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / "utils"

# Module: "utils"

## Index

### Functions

* [listenEvent](_utils_.md#listenevent)
* [listenWindow](_utils_.md#listenwindow)

## Functions

### listenEvent

▸ **listenEvent**\<K>(`el`: HTMLElement, `event`: K, `handler`: (e: HTMLElementEventMap[K]) => void): (Anonymous function)

*Defined in [utils.ts:11](https://github.com/igloo15/block-drop/blob/cf013cb/src/utils.ts#L11)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof HTMLElementEventMap |

#### Parameters:

Name | Type |
------ | ------ |
`el` | HTMLElement |
`event` | K |
`handler` | (e: HTMLElementEventMap[K]) => void |

**Returns:** (Anonymous function)

___

### listenWindow

▸ **listenWindow**\<K>(`event`: K, `handler`: (e: WindowEventMap[K]) => void): (Anonymous function)

*Defined in [utils.ts:2](https://github.com/igloo15/block-drop/blob/cf013cb/src/utils.ts#L2)*

#### Type parameters:

Name | Type |
------ | ------ |
`K` | keyof WindowEventMap |

#### Parameters:

Name | Type |
------ | ------ |
`event` | K |
`handler` | (e: WindowEventMap[K]) => void |

**Returns:** (Anonymous function)
