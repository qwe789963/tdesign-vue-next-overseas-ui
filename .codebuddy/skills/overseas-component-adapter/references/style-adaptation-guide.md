# 样式适配指南

本指南提供为 TDesign Vue 3 组件创建海外样式覆盖的分步说明。

## 样式文件优先级【必须】

样式适配**必须优先使用和迭代根目录下 `overseas/` 文件夹中的样式文件**：

| 优先级 | 文件位置 | 适用场景 |
|--------|---------|---------|
| **最高** | `overseas/style/_variables.less` | 全局变量新增/修改 |
| **高** | `overseas/style/theme/*.less` | 主题 token 新增/修改 |
| **中** | `overseas/style/base.less` | 全局基础样式 |
| **低** | `packages/components/<组件>/style/overseas/` | 仅影响单个组件的样式 |

**原则**：如果一个样式变量或 token 可能被多个组件使用，则**必须**放在 `overseas/` 目录下的全局文件中，而非在组件级样式中重复定义。

## 前置准备

开始之前，准备以下资源：
1. **根目录海外样式**（`overseas/style/`）— 优先检查是否已有可复用的变量和 token
2. Vue 2 海外组件样式（如果存在于 `s2-overseas-ui/`）
3. 当前 Vue 3 组件的样式目录
4. 全局海外变量文件（`overseas/style/_variables.less`）

## 分步流程

### 1. 创建海外样式目录

```
packages/components/<组件>/style/overseas/
├── index.less           # 入口文件 — 导入 _var.less 和 _<组件>.less
├── _var.less            # 组件专属变量
└── _<组件>.less         # 主样式覆盖
```

### 2. 创建 `_var.less`

导入全局海外变量并定义组件专属变量。

**模板：**

```less
// 导入全局海外变量
@import '../../../../overseas/style/_variables.less';

// 组件前缀类名（标准 TDesign 模式）
@<组件>-cls: ~"@{prefix}-<组件>";

// 组件专属尺寸变量
@<组件>-height-s: @comp-size-xxxs;      // 28px（小号）
@<组件>-height-default: @comp-size-xs;   // 40px（默认）
@<组件>-height-l: @comp-size-s;          // 48px（大号）

// 根据需要定义组件专属的间距、边框、颜色变量
// 尽可能引用 _variables.less 中的全局变量
```

**示例：Select 的 `_var.less`：**

```less
@import '../../../../overseas/style/_variables.less';

@select-cls: ~"@{prefix}-select";

// Select 专属尺寸
@select-input-height-s: @comp-size-xxxs;
@select-input-height-default: @comp-size-xs;
@select-input-height-l: @comp-size-s;

// Select 内部 Tag 高度
@select-tag-height-s: 16px;
@select-tag-height-default: 24px;
@select-tag-height-l: 32px;

// 选项尺寸
@select-option-height-s: 28px;
@select-option-height-default: 32px;
@select-option-height-l: 48px;

// 下拉面板
@select-dropdown-max-height: 300px;
@select-dropdown-border-width: 2px;

// 颜色（引用全局 tokens）
@select-border-color: @border-color;
@select-border-color-hover: @brand-color;
@select-bg-color-disabled: @bg-color-component-disabled;
```

### 3. 创建 `_<组件>.less`

编写实际的样式覆盖。遵循以下模式：

**模式 A：直接覆盖（最常见，适用于纯样式变更）**

通过同名选择器覆盖 TDesign 默认样式，使用海外专属值：

```less
@import './_var.less';

// 覆盖默认组件样式
.@{<组件>-cls} {
  // 基础样式
  border-radius: @radius-default;
  font-family: @font-family;
  
  // 尺寸变体
  &.@{prefix}--size-s {
    height: @<组件>-height-s;
  }
  
  &.@{prefix}--size-l {
    height: @<组件>-height-l;
  }
  
  // 状态覆盖
  &:hover {
    border-color: @<组件>-border-color-hover;
  }
  
  &.@{prefix}-is-disabled {
    background-color: @<组件>-bg-color-disabled;
  }
}
```

**模式 B：海外修饰符类（需要逻辑适配添加条件类名时使用）**

当组件通过 props 添加 `.t-<组件>--overseas` 类时：

```less
@import './_var.less';

.@{<组件>-cls}--overseas {
  // 仅在修饰符存在时生效的海外专属样式
  // 当同时需要逻辑适配时使用此模式
}
```

**模式 C：Portal/弹出层样式（用于带下拉框/弹出层的组件）**

Select、Dropdown、DatePicker 等组件将弹出层渲染到 `document.body`，需要独立选择器：

```less
// 主组件样式（原位渲染）
.@{<组件>-cls} {
  // ... 组件样式
}

// Portal/弹出层内容样式（挂载到 body）
.@{<组件>-cls}__dropdown--overseas {
  // 下拉面板样式
  border: @<组件>-dropdown-border-width solid @<组件>-border-color;
  border-radius: @radius-default;
  
  // 选项样式
  .@{<组件>-cls}__option {
    height: @<组件>-option-height-default;
    
    &:hover {
      background-color: @bg-color-container-hover;
    }
    
    &.@{prefix}-is-selected {
      color: @brand-color;
      background-color: @brand-color-light;
    }
  }
}
```

### 4. 创建 `index.less`

简单的入口文件，导入所有内容：

```less
@import './_var.less';
@import './_<组件>.less';
```

### 5. 更新 `style/index.js`

在组件样式入口中追加海外导入：

**修改前：**
```javascript
import '@tdesign/common-style/web/components/<组件>/_index.less';
```

**修改后：**
```javascript
import '@tdesign/common-style/web/components/<组件>/_index.less';
import './overseas/index.less';
```

## Vue 2 常见样式模式

从 Vue 2 海外版库迁移样式时，注意以下常见模式：

### Focus 状态
许多海外组件添加了可见的 focus 外圈：
```less
&:focus-visible,
&.@{prefix}-is-focused {
  outline: none;
  box-shadow: 0 0 0 2px @brand-color-focus;
}
```

### 按钮变体
海外设计使用两种按钮配色方案：
```less
// 蓝色主按钮
.@{prefix}-button--primary {
  background-color: @brand-color;  // #1B72E3
}

// 黄色警告/操作按钮
.@{prefix}-button--warning {
  background-color: @warning-color;  // #FFA126
}
```

### 输入类组件
输入类组件（Input、Select、TagInput）共享以下海外样式模式：
```less
// 边框使用变量控制
border: 1px solid @border-color;

// Hover 状态使用品牌色
&:hover {
  border-color: @brand-color;
}

// Focus 状态添加阴影
&.@{prefix}-is-focused {
  border-color: @brand-color;
  box-shadow: 0 0 0 2px rgba(27, 114, 227, 0.2);
}
```

### 尺寸体系
统一使用全局尺寸 tokens：

| 尺寸 | 组件高度 | 字体大小 | 内边距 |
|------|---------|---------|--------|
| small（`s`） | `28px`（`@comp-size-xxxs`） | `12px` | `0 8px` |
| default | `40px`（`@comp-size-xs`） | `14px` | `0 12px` |
| large（`l`） | `48px`（`@comp-size-s`） | `16px` | `0 16px` |

## 调试技巧

1. **样式不生效**：检查 `style/index.js` 中的导入顺序 — 海外导入必须在 TDesign 基础导入**之后**
2. **变量未定义**：确保 `_var.less` 导入了 `../../../../overseas/style/_variables.less`
3. **选择器优先级**：如果海外样式未能覆盖基础样式，提高选择器特异性或检查基础样式中是否有 `!important`
4. **Portal/弹出层样式**：带下拉框的组件将弹出层挂载到 `body` — 确认选择器指向正确的容器
