# Select 组件海外版迁移 - 数据模型

> **更新日期**: 2026-02-27

## 1. Props 类型定义

### 1.1 海外版扩展 Props

```typescript
/** 海外版 Select 扩展属性（已在 type.ts 中添加到 TdSelectProps） */
interface OverseasSelectExtendedProps {
  /** 
   * 自定义后缀图标名称
   * 海外版默认使用 bulletpoint 图标替换标准版的箭头图标
   * 设置后启用海外版模式（作为海外版标识）
   * @default 'bulletpoint'
   */
  suffixIconOs?: string;
  
  /** 
   * 单选时是否使用 Tag 标签样式展示选中值
   * Tag 关闭按钮位于文本左侧（RTL 风格，flex-direction: row-reverse）
   * @default true
   */
  singleUseTag?: boolean;
  
  /** 
   * 单选时是否显示前置 Label（与 singleUseTag 配合使用）
   * @default false
   */
  singleUseLabel?: boolean;
  
  /** 
   * Option 文本是否换行显示（false=省略, true=换行）
   * 同时控制多选 Tag 的 excessTagsDisplayType: 'break-line'
   * @default false
   */
  optionWarp?: boolean;
}
```

### 1.2 valueType 扩展

```typescript
/** 
 * 用于控制选中值的类型
 * - 'value': 仅返回 value 值
 * - 'object': 返回完整对象 { label, value }
 * - 'label': 返回 label 值（海外版扩展）
 */
type SelectValueType = 'value' | 'object' | 'label';
```

### 1.3 Option 扩展 Props

```typescript
/** option.tsx 中新增的 prop */
interface OptionExtendedProps {
  /** Option 文本是否换行显示，由 SelectPanel 透传 */
  optionWarp?: boolean;
}
```

## 2. 样式变量

### 2.1 尺寸变量

```less
// 文件：packages/components/select/style/overseas/_var.less
// 导入全局变量：../../../../overseas/style/_variables.less

// 输入框高度
@select-height-s: 28px;           // 小尺寸
@select-height-default: 40px;     // 默认尺寸
@select-height-l: 48px;           // 大尺寸

// Tag 高度
@select-tag-height: 24px;         // 默认
@select-tag-height-s: 16px;       // 小尺寸
@select-tag-height-l: 32px;       // 大尺寸

// 选项高度
@select-option-height-s: 28px;
@select-option-height-default: 32px;
@select-option-height-l: 48px;

// 下拉面板
@select-dropdown-max-height: 300px;

// 间距
@select-padding-horizontal: 8px;
@select-padding-vertical: 5px;
```

### 2.2 颜色变量

```less
// 背景色
@select-bg-color: @bg-color-specialcomponent;
@select-option-bg-color-hover: @bg-color-container-hover;
@select-option-bg-color-active: @bg-color-container-active;

// 边框色
@select-border-color: @border-level-2-color;
@select-border-color-active: @brand-color;

// 文字颜色
@select-option-color: @text-color-primary;
@select-placeholder-color: @text-color-placeholder;
@select-color-disabled: @text-color-disabled;

// 特殊颜色
@select-option-checkbox-label-color-hover: @text-color-brand;
@select-option-checkbox-input-color-hover: @brand-color;

// 图标颜色
@select-icon-color: @text-color-placeholder;
@select-icon-color-active: @brand-color;
```

## 3. CSS 类名规范

### 3.1 海外版容器类名

| 类名 | 说明 | 添加位置 |
|------|------|----------|
| `.t-select--overseas` | 海外版选择器标识（主样式作用域） | select.tsx `overseasClasses` |
| `.t-true-select` | 海外版选择器容器 | select.tsx `overseasClasses` |
| `.t-select-tag-true` | 单选启用 Tag 样式 | select.tsx `overseasClasses`（`singleUseTag && !multiple`） |
| `.t-select-tag-false` | 单选禁用 Tag 样式 | select.tsx `overseasClasses` |
| `.t-select--filterable` | 可过滤模式标识 | select.tsx `overseasClasses`（`filterable`） |
| `.t-select--option-warp` | 选项文本换行模式 | select.tsx `overseasClasses`（`optionWarp`） |
| `.t-select__dropdown--overseas` | 海外版下拉面板（挂载在 body） | select.tsx `popupProps` |

### 3.2 状态类名

| 类名 | 说明 | 添加位置 |
|------|------|----------|
| `.t-is-disabled` | 禁用状态 | 原有 |
| `.t-is-selected` | 选中状态 | 原有 |
| `.t-is-mouseDown` | 鼠标按下状态 | option.tsx（通过 `STATUS.value.mouseDown`） |
| `.t-input--focused` | 焦点状态 | 原有 |

### 3.3 后缀图标类名

| 类名 | 说明 |
|------|------|
| `.t-select-input__suffix-icon--overseas` | 海外版后缀图标 |
| `.t-select-input__suffix-icon--active` | 后缀图标激活状态（展开时） |

### 3.4 尺寸类名

| 类名 | 说明 |
|------|------|
| `.t-size-s` | 小尺寸 |
| `.t-size-m` | 中尺寸（默认） |
| `.t-size-l` | 大尺寸 |

---

## 4. 海外版样式特殊说明

### 4.1 Tag 关闭按钮位置

海外版 Tag 组件的关闭按钮位于**文本左侧**（RTL 风格），与标准版不同：

```
标准版 Tag:  [文本内容] [×]
海外版 Tag:  [×] [文本内容]
```

**CSS 实现** (`_select.less`):
```less
.t-select--overseas .t-tag {
  flex-direction: row-reverse;
  font-size: 14px; // 统一字体大小
}
```

### 4.2 后缀图标

海外版使用 `bulletpoint` 图标替换标准版的箭头图标：

```
标准版后缀图标:  ▼ (FakeArrow，展开时旋转 180°)
海外版后缀图标:  • (BulletpointIcon，无旋转动画)
```

**TSX 实现** (`select.tsx`):
```tsx
// suffixIconOs 存在时使用 BulletpointIcon
<BulletpointIcon class={[
  't-select-input__suffix-icon--overseas',
  { 't-select-input__suffix-icon--active': popupVisible }
]} />
```

**CSS 实现** (`_select.less`):
```less
.t-select--overseas .t-fake-arrow {
  transform: none !important; // 禁止旋转动画
}
```

### 4.3 下拉面板定位

海外版下拉面板与选择器**紧贴（margin-top: -3.5px）**：

**CSS 实现** (`_select.less`):
```less
.t-select__dropdown--overseas {
  &.t-popup[data-popper-placement^='bottom'] {
    .t-popup__content {
      margin-top: -3.5px;
    }
  }
  &.t-popup[data-popper-placement^='top'] {
    .t-popup__content {
      margin-bottom: -3.5px;
    }
  }
}
```

### 4.4 可过滤模式布局

海外版可过滤模式下布局：

```
未聚焦时：
┌──────────────────────────────────┐
│ [Tag1] [Tag2] [Tag3]        [•]  │
└──────────────────────────────────┘
（搜索输入框隐藏）

聚焦时：
┌──────────────────────────────────┐
│ [搜索输入框..................] [•] │
│ [Tag1] [Tag2] [Tag3]             │
└──────────────────────────────────┘
```

**CSS 实现** (`_select.less`):
```less
.t-select--filterable {
  // suffix 绝对定位
  .t-input__suffix {
    position: absolute;
    top: 0;
    right: 8px;
    height: @select-height-default;
  }
  // 内容区预留空间
  .t-input {
    padding-right: 36px !important;
  }
  // 聚焦时输入框独占一行
  .t-input.t-input--focused {
    flex-wrap: wrap;
    height: auto;
  }
}
```

### 4.5 下拉框宽度精度

使用 `getBoundingClientRect().width` 替代 `offsetWidth` 获取精确的小数宽度：

**TS 实现** (`useOverlayInnerStyle.ts`):
```typescript
const matchWidthFunc = (triggerElement: HTMLElement, _popupElement: HTMLElement) => {
  const width = triggerElement.getBoundingClientRect().width;
  return { width: `${width}px`, ...otherOverlayInnerStyle };
};
```

### 4.6 单选 Tag 模式样式

```less
.t-select-tag-true {
  .t-tag {
    flex-direction: row-reverse;
    > span { text-align: left; }
  }
  .t-input__prefix:not(:empty) {
    margin-right: 0;
  }
}
```

### 4.7 鼠标按下状态

选项在鼠标按下时显示品牌色背景+白色文字：

**TS 实现** (`option.tsx`):
```typescript
const isMouseDown = ref(false);
const handleMouseDown = () => { isMouseDown.value = true; };
const handleMouseUp = () => { isMouseDown.value = false; };
const handleMouseLeave = () => { isMouseDown.value = false; };
// 类名：STATUS.value.mouseDown (即 .t-is-mouseDown)
```

**CSS 实现** (`_select.less`):
```less
.t-select__dropdown--overseas .t-select-option.t-is-mouseDown {
  background-color: @brand-color;
  color: #fff;
}
```

---

## 5. 组件关系图

```
Select (select.tsx)
├── Props: suffixIconOs, singleUseTag, singleUseLabel, optionWarp
├── overseasClasses → 外层 div 类名
├── renderValueDisplay → renderSingleTag() / renderTag()
├── BulletpointIcon (替代 FakeArrow)
├── autoWidth: false (强制)
│
├── SelectInput (select-input.tsx)
│   ├── watch actualVisible → auto focus
│   ├── TagInput (tag-input.tsx)
│   │   └── expose: { focus(), blur() }
│   └── useOverlayInnerStyle.ts
│       └── getBoundingClientRect().width
│
├── SelectPanel (select-panel.tsx)
│   └── optionWarp → 透传
│       └── Option (option.tsx)
│           ├── optionWarp → wrap/nowrap class
│           └── isMouseDown → .t-is-mouseDown
│
└── Style (style/overseas/)
    ├── _var.less
    ├── _select.less (466 lines)
    └── index.less
```
