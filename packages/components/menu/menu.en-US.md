## Examples

### S2 Navigation Bar

S2 specification top navigation with mouse hover trigger support.

{{ s2-menu }}

### Side Navigation

#### Tiled Side Navigation

Set `s2` to `false` to display side navigation. Side navigation can host 1-3 levels of page navigation and display them in a tiled manner. Suitable for websites with deep hierarchies. You can set the expansion mode of third-level navigation through `thirdExpandType`, default is `popup`.

{{ multi-side }}

## API

### Menu Props

name | type | default | description | required
-- | -- | -- | -- | --
collapsed | Boolean | false | \- | N
expandMutex | Boolean | false | \- | N
expandType | String | normal | options：normal/popup | N
thirdExpandType | String | popup | Third-level menu expansion mode, tile expansion and floating layer expansion. Options: popup/normal. If `expandType` is `popup`, this option is invalid | N
s2 | Boolean | true | Whether it is displayed in S2 overseas system mode. When `false`, it will be displayed directly in tile mode | N
mouseOverTrigger | Boolean | false | Whether the left menu bar can be opened when the mouse is moved in. When `true`, it is triggered | N
trigger | Slot / Function | - | S2 menu trigger button. Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expanded | Array | [] | `v-model:expanded` is supported。Typescript：`Array<MenuValue>` | N
defaultExpanded | Array | [] | uncontrolled property。Typescript：`Array<MenuValue>` | N
logo | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
operations | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
width | String / Number / Array | '400px' | Typescript：`string \| number \| Array<string \| number>` | N
onChange | Function |  | Typescript：`(value: MenuValue) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<MenuValue>) => void`<br/> | N

### Menu Events

name | params | description
-- | -- | --
change | `(value: MenuValue)` | \-
expand | `(value: Array<MenuValue>)` | \-

### HeadMenu Props

name | type | default | description | required
-- | -- | -- | -- | --
s2Menu | Function / Slot | - | S2 overseas system menu. Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | Y
expandType | String | normal | options：normal/popup | N
expanded | Array | [] | `v-model:expanded` is supported。Typescript：`Array<MenuValue>` | N
defaultExpanded | Array | [] | uncontrolled property。Typescript：`Array<MenuValue>` | N
logo | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
operations | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | light | options：light/dark | N
value | String / Number | - | `v-model` and `v-model:value` is supported。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
defaultValue | String / Number | - | uncontrolled property。Typescript：`MenuValue` `type MenuValue = string \| number`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
onChange | Function |  | Typescript：`(value: MenuValue) => void`<br/> | N
onExpand | Function |  | Typescript：`(value: Array<MenuValue>) => void`<br/> | N

### HeadMenu Events

name | params | description
-- | -- | --
change | `(value: MenuValue)` | \-
expand | `(value: Array<MenuValue>)` | \-

### Submenu Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
popupProps | Object | - | Transparent all feature props of the Popup。Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | Typescript：`MenuValue` | N

### MenuItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | \- | N
href | String | - | \- | N
icon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
replace | Boolean | false | \- | N
router | Object | - | Typescript：`Record<string, any>` | N
routerLink | Boolean | - | `1.3.11`。This API is valid if and only if the Router exists. Enable menu item content to be rendered as an `<a />` consistent with router-link behavior. | N
target | String | _self | options：_blank/_self/_parent/_top | N
to | String / Object | - | Typescript：`MenuRoute` `interface MenuRoute { path?: string; name?: string; hash?: string; query?: MenuQueryData; params?: MenuQueryData }` `type MenuQueryData = { [key: string]: string \| string[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
value | String / Number | - | Typescript：`MenuValue` | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/>trigger on click | N

### MenuItem Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | trigger on click

### MenuGroup Props

name | type | default | description | required
-- | -- | -- | -- | --
title | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
