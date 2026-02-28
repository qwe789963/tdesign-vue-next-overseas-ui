# Select 组件海外版迁移 - 技术研究

> **状态**: 已完成  
> **更新日期**: 2026-02-27

## 概述

本文档记录了 Select 组件海外版迁移的技术研究结果，包括现状分析、差异分析、迁移策略和风险评估。

---

## 1. 现状分析

### 1.1 Vue 2 海外版组件结构

```
tdesign-vue-overseas/packages/overseas/src/select/
├── __tests__/           # 测试文件
├── _example/            # 示例文件
├── hooks/               # 自定义 Hooks
├── style/               # 样式文件
│   ├── _select.less     # 主样式
│   ├── _var.less        # 变量定义
│   ├── css.js
│   └── index.js
├── index.ts             # 导出
├── props.ts             # Props 定义
├── select.tsx           # 主组件
├── select-panel.tsx     # 下拉面板
├── option.tsx           # 选项组件
├── optionGroup.tsx      # 选项分组
└── type.ts              # 类型定义
```

### 1.2 Vue 3 目标组件结构（实际修改后）

```
packages/components/select/
├── __tests__/
├── components/
│   └── select-panel.tsx       # ✏️ 修改：+optionWarp 透传
├── hooks/
├── style/
│   ├── overseas/              # ✨ 新增：海外版样式
│   │   ├── index.less
│   │   ├── _var.less
│   │   └── _select.less
│   ├── css.js
│   └── index.js               # ✏️ 修改：+海外版导入
├── utils/
├── constants/
├── index.ts
├── props.ts                   # ✏️ 修改：+4 海外版 props
├── select.tsx                 # ✏️ 修改：核心改动
├── option.tsx                 # ✏️ 修改：+optionWarp、mouseDown
├── option-group.tsx
└── type.ts                    # ✏️ 修改：+4 海外版类型

packages/components/select-input/
├── select-input.tsx           # ✏️ 修改：+自动聚焦 watch
└── hooks/
    └── useOverlayInnerStyle.ts # ✏️ 修改：+getBoundingClientRect

packages/components/tag-input/
└── tag-input.tsx              # ✏️ 修改：+expose focus/blur

packages/shared/hooks/useCommonClassName/
└── index.ts                   # ✏️ 修改：+mouseDown 类名
```

## 2. Props 差异分析

### 2.1 Vue 2 海外版特有 Props（已全部迁移）

| 属性 | 类型 | 默认值 | Vue 3 状态 |
|------|------|--------|-----------|
| `suffixIconOs` | String | `'bulletpoint'` | ✅ 已迁移 |
| `singleUseTag` | Boolean | `true` | ✅ 已迁移 |
| `singleUseLabel` | Boolean | `false` | ✅ 已迁移 |
| `optionWarp` | Boolean | `false` | ✅ 已迁移 |
| `valueType` | String | `'value'` | ✅ 已扩展支持 `'label'` |

### 2.2 valueType 差异（已对齐）

**Vue 2 海外版**：`'value' | 'object' | 'label'`  
**Vue 3 迁移后**：`'value' | 'object' | 'label'` ✅

## 3. 样式差异分析

### 3.1 主要样式差异点（已全部对齐）

| 样式项 | Vue 2 海外版 | Vue 3 迁移后 | 状态 |
|--------|-------------|-------------|------|
| 输入框高度 | min-height: 40px | min-height: 40px | ✅ |
| 焦点边框 | 2px 品牌色，无 shadow | 2px 品牌色，无 shadow | ✅ |
| 下拉面板边框 | 2px 品牌色 | 2px 品牌色 | ✅ |
| 下拉面板间距 | margin-top: -3.5px | margin-top: -3.5px | ✅ |
| 选项圆角 | unset | unset | ✅ |
| Tag 高度 | 24px/16px/32px | 24px/16px/32px | ✅ |
| Tag 字体 | 14px | 14px | ✅ |
| Tag 关闭按钮 | 左侧（row-reverse） | 左侧（row-reverse） | ✅ |
| 后缀图标 | bulletpoint，无旋转 | bulletpoint，无旋转 | ✅ |
| 鼠标按下 | 品牌色背景+白色文字 | 品牌色背景+白色文字 | ✅ |

### 3.2 关键 CSS 类名（已实现）

```less
// 海外版类名（select.tsx overseasClasses 计算属性）
.t-select--overseas            // 主选择器样式作用域
.t-true-select                 // 海外版标识
.t-select-tag-true             // 单选 Tag 模式
.t-select-tag-false            // 非 Tag 模式
.t-select--filterable          // 可过滤模式
.t-select--option-warp         // 选项换行模式
.t-select__dropdown--overseas  // 下拉面板（body 上）

// 状态类名
.t-is-mouseDown                // 鼠标按下状态（option.tsx）
```

## 4. 交互差异分析

### 4.1 后缀图标（已对齐）

- **Vue 2 海外版**：使用 `SelectMenu` 组件（bulletpoint 图标）
- **Vue 3 迁移后**：使用 `BulletpointIcon`（来自 tdesign-icons-vue-next），无旋转动画 ✅

### 4.2 状态反馈（已对齐）

- **鼠标按下**：`option.tsx` 新增 `isMouseDown` ref + mousedown/mouseup/mouseleave 事件 ✅
- **公共类名**：`useCommonClassName` 新增 `mouseDown` 类名映射 ✅

### 4.3 多选过滤自动聚焦（新增解决）

- **问题**：TagInput 未 expose focus/blur，导致 popup 打开时无法自动聚焦
- **解决**：`tag-input.tsx` 添加 `expose({ focus, blur })`，`select-input.tsx` 添加 watch 自动聚焦 ✅

### 4.4 下拉框宽度精度（新增解决）

- **问题**：`offsetWidth` 取整导致下拉框与 trigger 宽度不一致
- **解决**：`useOverlayInnerStyle.ts` 使用 `getBoundingClientRect().width` 保留小数精度 ✅

## 5. 迁移策略（已执行）

### 5.1 Props 迁移 ✅

1. 在 `props.ts` 中添加 4 个海外版属性
2. 在 `type.ts` 中添加类型定义
3. 在 `select.tsx` 中处理渲染逻辑和类名

### 5.2 样式迁移 ✅

1. 在 `style/overseas/` 目录下创建 3 个样式文件
2. 采用覆盖方式，通过 `.t-select--overseas` 类名限定作用域
3. 下拉面板样式通过 `.t-select__dropdown--overseas` 限定（挂载在 body）

### 5.3 交互迁移 ✅

1. 复用现有键盘导航逻辑
2. Option 新增 mouseDown/mouseUp/mouseLeave 事件处理
3. 替换后缀图标为 BulletpointIcon
4. TagInput expose focus/blur 支持自动聚焦
5. getBoundingClientRect 解决宽度精度问题

## 6. 风险评估（已全部解决）

| 风险 | 影响 | 概率 | 缓解措施 | 状态 |
|------|------|------|----------|------|
| SelectInput 不支持扩展属性 | 高 | 中 | 同时修改 SelectInput 组件 | ✅ 已解决 |
| 样式冲突 | 中 | 低 | overseas 子目录 + 类名隔离 | ✅ 已解决 |
| 类型定义不兼容 | 低 | 低 | 扩展现有类型定义 | ✅ 已解决 |
| 影响其他组件 | 高 | 中 | 公共修改仅新增项 | ✅ 已解决 |
| TagInput 未 expose focus/blur | 高 | 高 | 添加 expose | ✅ 已解决 |
| 下拉框宽度精度丢失 | 中 | 高 | getBoundingClientRect | ✅ 已解决 |

---

## 7. 技术决策记录

### 7.1 样式隔离策略

**决策**: 采用 `overseas` 子目录 + 海外版类名隔离

**实际实现**:
- `.t-select--overseas`：主选择器样式作用域（通过 `overseasClasses` 计算属性添加到外层 div）
- `.t-select__dropdown--overseas`：下拉面板样式（挂载在 body 上，通过 `popupProps.overlayClassName` 添加）

### 7.2 Props 扩展方式

**决策**: 扩展现有 Select 组件的 props

**实际实现**: 在 `props.ts` 和 `type.ts` 中直接添加，在 `select.tsx` 中通过 `props.suffixIconOs` 作为海外版标识。

### 7.3 单选 Tag 渲染实现

**决策**: 在 `select.tsx` 的 `renderValueDisplay` 函数中实现

**实际实现**:
- 新增 `renderSingleTag()` 函数：渲染 Tag 组件，支持 closable、禁用状态
- 新增 `renderTag()` 函数：多选 Tag 渲染，内容用 `<span>` 包裹便于 CSS 控制

### 7.4 TagInput focus/blur 暴露

**决策**: 在 `tag-input.tsx` 中通过 Vue 3 `expose` 暴露

**实际实现**:
```typescript
expose({
  focus: () => tagInputRef.value?.focus?.(),
  blur: () => tagInputRef.value?.blur?.(),
});
```

### 7.5 下拉框宽度精度

**决策**: 使用 `getBoundingClientRect().width` 替代 `offsetWidth`

**实际实现**: 在 `useOverlayInnerStyle.ts` 的 `matchWidthFunc` 和 `getAutoWidthPopupStyleWidth` 两个函数中替换。

### 7.6 海外版屏蔽 autoWidth

**决策**: 海外版强制 `autoWidth: false`

**实际实现**: `select.tsx` 中 `autoWidth: false`（注释保留原 `props.autoWidth`）。

### 7.7 下拉面板紧贴

**决策**: 使用 CSS `margin-top: -3.5px` 实现

**实际实现**:
```less
.t-select__dropdown--overseas {
  &.t-popup[data-popper-placement^='bottom'] .t-popup__content {
    margin-top: -3.5px;
  }
  &.t-popup[data-popper-placement^='top'] .t-popup__content {
    margin-bottom: -3.5px;
  }
}
```

### 7.8 可过滤模式布局

**决策**: suffix 绝对定位 + 聚焦时 flex-wrap

**实际实现**:
- `.t-input__suffix` 绝对定位（`position: absolute; top: 0; right: 8px`）
- `.t-input` 添加 `padding-right: 36px` 避免内容与图标重叠
- 聚焦时 `flex-wrap: wrap`，输入框独占一行

---

## 8. 已解决的澄清项

| 澄清项 | 解决方案 |
|--------|----------|
| Tag 关闭按钮位置？ | 左侧（RTL 风格，`flex-direction: row-reverse`） |
| 后缀图标？ | `BulletpointIcon`，无旋转动画，`transform: none !important` |
| 下拉面板定位？ | `margin-top: -3.5px` 紧贴选择器 |
| 可过滤模式布局？ | suffix 绝对定位 + `padding-right: 36px` + 聚焦时 `flex-wrap: wrap` |
| 多选过滤自动聚焦？ | TagInput `expose` focus/blur + `select-input.tsx` watch 自动聚焦 |
| 下拉框宽度精度？ | `getBoundingClientRect().width` 替代 `offsetWidth` |
| 海外版 autoWidth？ | 强制 `false`，下拉框宽度跟随 trigger |
| Tag 字体大小？ | 统一 14px |
| 单选 Tag 文本对齐？ | `text-align: left` |
| 单选 Tag prefix margin？ | `.t-input__prefix:not(:empty) { margin-right: 0 }` |
| suffix 与内容重叠？ | `padding-right: 36px` 预留空间 |

---

## 9. 结论

本次迁移已完成核心实现：

1. **Props 迁移** ✅：扩展现有 props，添加 4 个海外版特有属性
2. **样式迁移** ✅：创建 `overseas` 子目录，466 行核心样式
3. **交互迁移** ✅：后缀图标替换、鼠标按下状态、文本换行控制
4. **功能增强** ✅：TagInput expose、自动聚焦、宽度精度、autoWidth 屏蔽
5. **样式修复** ✅：suffix 重叠、Tag 对齐、字体统一、margin 清理

当前处于验证测试阶段，持续进行视觉对比和功能验证。
