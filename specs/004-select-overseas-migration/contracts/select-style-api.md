# Select 组件海外版样式 API 合约

> **更新日期**: 2026-02-27

## 1. Props 合约

### 1.1 海外版新增 Props

```typescript
/** 已在 TdSelectProps 中实现 */
interface OverseasSelectExtendedProps {
  /**
   * 自定义后缀图标名称（同时作为海外版模式标识）
   * 设置后启用海外版模式：添加海外版类名、BulletpointIcon、autoWidth=false
   * @type {string}
   * @default 'bulletpoint'
   */
  suffixIconOs: string;

  /**
   * 单选时是否使用 Tag 标签样式展示选中值
   * Tag 关闭按钮位于文本左侧（RTL 风格，flex-direction: row-reverse）
   * Tag 文本左对齐，字体 14px
   * @type {boolean}
   * @default true
   */
  singleUseTag: boolean;

  /**
   * 单选时是否显示前置 Label（与 singleUseTag 配合使用）
   * @type {boolean}
   * @default false
   */
  singleUseLabel: boolean;

  /**
   * Option 选项文本是否换行显示
   * - false: 文本超出时省略（ellipsis）
   * - true: 文本超出时换行（word-wrap: break-word）
   * 同时控制多选 Tag 的 excessTagsDisplayType: 'break-line'
   * @type {boolean}
   * @default false
   */
  optionWarp: boolean;
}
```

### 1.2 valueType 扩展

```typescript
/**
 * 选中值类型（海外版扩展）
 */
type OverseasSelectValueType = 
  | 'value'   // 返回选项的 value 值
  | 'object'  // 返回完整的 { label, value } 对象
  | 'label';  // 返回选项的 label 值（海外版新增）
```

### 1.3 Option 扩展 Props

```typescript
/** option.tsx 中新增 */
interface OptionExtendedProps {
  /** Option 文本是否换行，由 SelectPanel 透传 */
  optionWarp?: boolean;
}
```

## 2. 样式合约

### 2.1 Less 变量（`_var.less`）

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `@select-height-s` | `28px` | 小尺寸高度 |
| `@select-height-default` | `40px` | 默认高度 |
| `@select-height-l` | `48px` | 大尺寸高度 |
| `@select-tag-height` | `24px` | Tag 高度 |
| `@select-tag-height-s` | `16px` | 小尺寸 Tag 高度 |
| `@select-tag-height-l` | `32px` | 大尺寸 Tag 高度 |
| `@select-dropdown-max-height` | `300px` | 下拉最大高度 |
| `@select-padding-horizontal` | `8px` | 水平内边距 |
| `@select-padding-vertical` | `5px` | 垂直内边距 |

### 2.2 样式作用域

所有海外版样式通过以下两个类名限定作用域，确保不影响标准版：

- **`.t-select--overseas`**：主选择器样式（添加到 select 外层 div）
- **`.t-select__dropdown--overseas`**：下拉面板样式（添加到 popup overlayClassName，挂载在 body）

### 2.3 实际样式覆盖

```less
// ✅ 主选择器样式（.t-select--overseas 作用域）

// 输入框焦点
.t-select--overseas .t-input--focused {
  border: 2px solid @brand-color;
  box-shadow: none;
}

// Tag 关闭按钮左置 + 字体
.t-select--overseas .t-tag {
  flex-direction: row-reverse;
  font-size: 14px;
}

// 后缀图标禁止旋转
.t-select--overseas .t-fake-arrow {
  transform: none !important;
}

// 可过滤模式 - suffix 绝对定位
.t-select--overseas.t-select--filterable .t-input__suffix {
  position: absolute;
  top: 0;
  right: 8px;
  height: @select-height-default;
}

// 可过滤模式 - 内容区预留空间
.t-select--overseas.t-select--filterable .t-input {
  padding-right: 36px !important;
}

// 单选 Tag 文本左对齐
.t-select--overseas.t-select-tag-true .t-tag > span {
  text-align: left;
}

// 单选 Tag prefix 清除右 margin
.t-select--overseas.t-select-tag-true .t-input__prefix:not(:empty) {
  margin-right: 0;
}
```

```less
// ✅ 下拉面板样式（.t-select__dropdown--overseas 作用域，body 上）

// 面板紧贴选择器
.t-select__dropdown--overseas.t-popup[data-popper-placement^='bottom'] .t-popup__content {
  margin-top: -3.5px;
  border: 2px solid @brand-color;
  box-shadow: none;
}

// 选项无圆角
.t-select__dropdown--overseas .t-select-option {
  border-radius: unset;
}

// 鼠标按下状态
.t-select__dropdown--overseas .t-select-option.t-is-mouseDown {
  background-color: @brand-color;
  color: #fff;
}
```

```less
// ❌ 错误示例：以下写法会影响其他组件，禁止使用！

.t-tag { flex-direction: row-reverse; }         // 影响所有 Tag
.t-input--focused { border-width: 2px; }        // 影响所有 Input
.t-popup__content { border: 2px solid ...; }    // 影响所有 Popup
```

## 3. 事件合约

### 3.1 继承事件

所有 TDesign Select 原有事件保持不变：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `(value, context)` | 值变化时触发 |
| `blur` | `({ e, value })` | 失焦时触发 |
| `focus` | `({ e, value })` | 聚焦时触发 |
| `clear` | `({ e })` | 清除时触发 |
| `remove` | `({ value, data, e })` | 多选移除时触发 |
| `search` | `(value, { e })` | 搜索时触发 |
| `popup-visible-change` | `(visible, context)` | 面板显隐时触发 |

## 4. 插槽合约

### 4.1 继承插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `label` | - | 左侧内容 |
| `prefixIcon` | - | 前置图标 |
| `suffix` | - | 后置内容 |
| `suffixIcon` | - | 后置图标 |
| `valueDisplay` | `{ value, onClose }` | 自定义选中值展示 |
| `collapsedItems` | `{ value, count, collapsedSelectedItems }` | 折叠项内容 |
| `empty` | - | 空状态内容 |
| `loadingText` | - | 加载中文本 |
| `panelTopContent` | - | 面板顶部内容 |
| `panelBottomContent` | - | 面板底部内容 |

## 5. 组件内部 API

### 5.1 TagInput expose

```typescript
// tag-input.tsx 新增 expose
expose({
  /** 聚焦内部 TInput */
  focus: () => tagInputRef.value?.focus?.(),
  /** 失焦内部 TInput */
  blur: () => tagInputRef.value?.blur?.(),
});
```

### 5.2 下拉框宽度计算

```typescript
// useOverlayInnerStyle.ts
const matchWidthFunc = (triggerElement: HTMLElement) => {
  // 使用 getBoundingClientRect 获取精确小数宽度
  const width = triggerElement.getBoundingClientRect().width;
  return { width: `${width}px` };
};
```

### 5.3 海外版类名计算

```typescript
// select.tsx overseasClasses 计算属性
const overseasClasses = computed(() => ({
  't-select--overseas': !!props.suffixIconOs,
  't-true-select': !!props.suffixIconOs,
  't-select-tag-true': props.singleUseTag && !props.multiple,
  't-select--filterable': props.filterable,
  't-select--option-warp': props.optionWarp,
}));
```
