**[@igloo15/block-drop](../README.md)**

> [Globals](../globals.md) / "lib/utils"

# Module: "lib/utils"

## Index

### Functions

* [listenEvent](_lib_utils_.md#listenevent)
* [listenWindow](_lib_utils_.md#listenwindow)

## Functions

### listenEvent

▸ **listenEvent**\<K>(`el`: HTMLElement, `event`: K, `handler`: (e: HTMLElementEventMap[K]) => void): (Anonymous function)

*Defined in [lib/utils.ts:11](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/utils.ts#L11)*

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

*Defined in [lib/utils.ts:2](https://github.com/igloo15/block-drop/blob/8f4b6bb/src/lib/utils.ts#L2)*

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
