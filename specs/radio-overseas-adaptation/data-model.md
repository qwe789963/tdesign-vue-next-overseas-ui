# Radio 组件数据模型

---

## 组件状态模型

### 状态枚举

```typescript
/** 选中状态 */
type CheckedState = 'checked' | 'unchecked';

/** 禁用状态 */
type DisabledState = 'enabled' | 'disabled';

/** Focus 状态 (通过 CSS 类名管理) */
type FocusState = 'focused' | 'blurred';
```

### 组件 Props

```typescript
interface RadioProps {
  /** Radio 的值 */
  value: string | number | boolean;
  
  /** 是否选中 */
  checked?: boolean;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 标签文本 */
  label?: string;
  
  /** name 属性 (用于原生 form) */
  name?: string;
}
```

### 内部状态

```typescript
interface RadioState {
  /** 是否选中 (响应式) */
  isChecked: Ref<boolean>;
  
  /** 是否禁用 (响应式) */
  isDisabled: Ref<boolean>;
  
  /** 是否聚焦 (通过 CSS 类名管理，非响应式) */
  isFocused: 'focusInput' | 'normalInput';
}
```

---

## 样式状态映射

### CSS 类名映射

| 组件状态 | CSS 类名 | 样式效果 |
|---------|---------|---------|
| `checked=true` | `.t-is-checked` | 显示圆环 (`border: 5px solid #1b72e3`) |
| `disabled=true` | `.t-is-disabled` | 背景色 `#F0F1F2`，光标 `not-allowed` |
| `disabled=true & checked=true` | `.t-is-disabled.t-is-checked` | 圆环颜色 `#a1aab3`，背景白色 |
| `focused (keyboard/mouse)` | `.focusInput` | 外圈显示 (`border: 2px solid #1b72e3`) |
| `blurred` | `.normalInput` | 外圈隐藏 |

### 样式优先级

```
基础样式 (.t-radio__input)
  ↓
选中态 (.t-is-checked)
  ↓
禁用态 (.t-is-disabled)
  ↓
禁用选中态 (.t-is-disabled.t-is-checked)
  ↓
Focus 状态 (.focusInput)
```

---

## DOM 结构

```html
<label class="t-radio t-is-checked t-is-disabled" tabindex="0">
  <!-- 原生 input (隐藏) -->
  <input
    type="radio"
    class="t-radio__former"
    checked
    disabled
    tabindex="-1"
  />
  
  <!-- 自定义样式容器 -->
  <span class="t-radio__input focusInput">
    <!-- Focus 外圈元素 -->
    <span class="focusBox"></span>
    
    <!-- 圆环通过 ::after 伪元素实现 -->
  </span>
  
  <!-- 标签文本 -->
  <span class="t-radio__label">Label Text</span>
</label>
```

---

## 状态转换图

```
[未选中 + 未聚焦]
    ↓ (click / space)
[已选中 + 未聚焦]
    ↓ (tab / click label)
[已选中 + 已聚焦]  ← 显示 Focus 外圈
    ↓ (blur / click elsewhere)
[已选中 + 未聚焦]  ← 外圈消失
```

**关键点**:
- Focus 状态与选中状态**完全独立**
- Focus 状态仅影响外圈显示，不影响圆环
- Blur 后外圈立即消失，无论是否选中

---

## CSS 变量模型

### 尺寸变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `@radio-size` | `18px` | Radio 外圈直径 |
| `@radio-dot-size` | `9px` | 圆环中心位置计算 (`@radio-size / 2`) |
| `@radio-input-label-spacer` | `12px` | Radio 与 Label 间距 |

### 颜色变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `@radio-border-color` | `@border-level-2-color` | 外圈边框颜色 |
| `@radio-input-color` | `@bg-color-container` | 背景色 |
| `@radio-input-color-disabled` | `#F0F1F2` | 禁用态背景色 |
| `@radio-dot-color` | `#1b72e3` | 选中态圆环颜色 |
| `@radio-dot-color-disabled-checked` | `#CED3D9` | 禁用选中态边框色 |
| `@radio-label-color` | `@text-color-primary` | 标签文本颜色 |

### 动画变量

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `@anim-duration-base` | `0.2s` | 过渡动画时长 |
| `@anim-time-fn-ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 缓动函数 |

---

## 事件模型

### 输入事件

```typescript
interface RadioEvents {
  /** 选中状态变化 */
  onChange: (value: string | number | boolean) => void;
  
  /** Focus 事件 */
  onFocus: (e: FocusEvent) => void;
  
  /** Blur 事件 */
  onBlur: (e: FocusEvent) => void;
  
  /** 点击事件 */
  onClick: (e: MouseEvent) => void;
}
```

### 事件触发顺序

**鼠标点击**:
```
click (label) → focus (label) → focus (input) → change → blur (input)
```

**键盘操作**:
```
tab → focus (label) → focus (input) → space → change
```

---

## 验证规则

### Props 验证

```typescript
// value: 必填
if (!props.value) {
  console.warn('[Radio] value prop is required');
}

// checked: 可选，但不应与 RadioGroup 的 modelValue 冲突
// (宽松模式：不抛出错误，RadioGroup 优先)
```

### 状态一致性

```typescript
// Focus 状态与 DOM 一致性检查
if (document.activeElement === inputElement) {
  assert(inputElement.classList.contains('focusInput'));
} else {
  assert(inputElement.classList.contains('normalInput'));
}
```

---

## 性能指标

| 指标 | 目标值 | 测量方式 |
|------|--------|---------|
| 首次渲染时间 | < 50ms | 参考指标 (不强制) |
| Focus 切换响应 | < 16ms (60fps) | 参考指标 (不强制) |
| 内存占用 | 无泄漏 | 必须通过 |
