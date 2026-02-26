---
title: Menu 导航菜单
description: 用于承载网站的架构，并提供跳转的菜单列表。
isComponent: true
usage: { title: '', description: '' }
spline: navigation
---

### S2 导航栏

S2 规范的顶部导航，支持鼠标移入触发菜单展开。

{{ s2-menu }}

### 侧边导航

#### 平铺式侧边导航

将 `s2` 设置为 `false`，可以显示侧边导航。侧边导航可承载1-3级页面导航，并平铺展示。适用于层级较深的网站。可通过 `thirdExpandType` 设置三级导航展开方式，默认为 `popup`。

{{ multi-side }}

## API
### Menu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
collapsed | Boolean | false | 是否收起菜单 | N
expandMutex | Boolean | false | 同级别互斥展开 | N
expandType | String | normal | 二级菜单展开方式，平铺展开和浮层展开。可选项：normal/popup | N
thirdExpandType | String | popup | 三级菜单展开方式，平铺展开和浮层展开。可选项：popup/normal。若 `expandType` 为 `popup`，则此选项无效 | N
s2 | Boolean | true | 是否为 S2 海外系统展示方式，为 `false` 时将直接平铺显示 | N
mouseOverTrigger | Boolean | false | 是否可鼠标移入打开左侧菜单栏，为 `true` 时触发 | N
trigger | Slot / Function | - | S2 菜单触发按钮。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expanded | Array | [] | 子菜单展开的导航集合。支持语法糖 `v-model:expanded`。TS 类型：`Array<MenuValue>` | N
defaultExpanded | Array | [] | 子菜单展开的导航集合。非受控属性。TS 类型：`Array<MenuValue>` | N
logo | Slot / Function | - | 站点 LOGO。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
operations | Slot / Function | - | 导航操作区域。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | 激活菜单项。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`MenuValue` `type MenuValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
defaultValue | String / Number | - | 激活菜单项。非受控属性。TS 类型：`MenuValue` `type MenuValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
width | String / Number / Array | '400px' | 菜单宽度。值类型为数组时，分别表示菜单展开和折叠的宽度。[ 展开时的宽度, 折叠时的宽度 ]，示例：['200px', '80px']。TS 类型：`string \| number \| Array<string \| number>` | N
onChange | Function |  | TS 类型：`(value: MenuValue) => void`<br/>激活菜单项发生变化时触发 | N
onExpand | Function |  | TS 类型：`(value: Array<MenuValue>) => void`<br/>展开的菜单项发生变化时触发 | N

### Menu Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: MenuValue)` | 激活菜单项发生变化时触发
expand | `(value: Array<MenuValue>)` | 展开的菜单项发生变化时触发

### HeadMenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
s2Menu | Function / Slot | - | S2 海外系统菜单。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | Y
expandType | String | normal | 二级菜单展开方式，平铺展开和浮层展开。可选项：normal/popup | N
expanded | Array | [] | 展开的子菜单集合。支持语法糖 `v-model:expanded`。TS 类型：`Array<MenuValue>` | N
defaultExpanded | Array | [] | 展开的子菜单集合。非受控属性。TS 类型：`Array<MenuValue>` | N
logo | Slot / Function | - | 站点 LOGO。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
operations | Slot / Function | - | 导航操作区域。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | light | 可选项：light/dark | N
value | String / Number | - | 激活菜单项。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`MenuValue` `type MenuValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
defaultValue | String / Number | - | 激活菜单项。非受控属性。TS 类型：`MenuValue` `type MenuValue = string \| number`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
onChange | Function |  | TS 类型：`(value: MenuValue) => void`<br/>激活菜单项发生变化时触发 | N
onExpand | Function |  | TS 类型：`(value: Array<MenuValue>) => void`<br/>展开的菜单项发生变化时触发 | N

### HeadMenu Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: MenuValue)` | 激活菜单项发生变化时触发
expand | `(value: Array<MenuValue>)` | 展开的菜单项发生变化时触发

### Submenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 菜单项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | 菜单项内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | 是否禁用菜单项展开/收起/跳转等功能 | N
icon | Slot / Function | - | 菜单项图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
popupProps | Object | - | 透传 Popup 组件全部特性。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
title | String / Slot / Function | - | 二级菜单内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number | - | 菜单项唯一标识。TS 类型：`MenuValue` | N

### MenuItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 菜单项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | 菜单项内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | 是否禁用菜单项展开/收起/跳转等功能 | N
href | String | - | 跳转链接 | N
icon | Slot / Function | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
replace | Boolean | false | 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录） | N
router | Object | - | 路由对象。如果项目存在 Router，则默认使用 Router。TS 类型：`Record<string, any>` | N
routerLink | Boolean | - | `1.3.11`。当且仅当 Router 存在时，该 API 有效。开启菜单项内容渲染为与router-link行为一致的`<a />`标签。 | N
target | String | _self | 链接或路由跳转方式。可选项：_blank/_self/_parent/_top | N
to | String / Object | - | 路由跳转目标，当且仅当 Router 存在时，该 API 有效。TS 类型：`MenuRoute` `interface MenuRoute { path?: string; name?: string; hash?: string; query?: MenuQueryData; params?: MenuQueryData }` `type MenuQueryData = { [key: string]: string \| string[] }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/menu/type.ts) | N
value | String / Number | - | 菜单项唯一标识。TS 类型：`MenuValue` | N
onClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击时触发 | N

### MenuItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 点击时触发

### MenuGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
title | String / Slot / Function | - | 菜单组标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
