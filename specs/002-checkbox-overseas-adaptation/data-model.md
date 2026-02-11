# Checkbox 海外适配 - 数据模型与接口定义

> **目的**：定义 Checkbox 组件的数据结构、Props、Events、Slots 和内部状态

---

## 📋 目录

1. [组件 Props](#组件-props)
2. [组件 Events](#组件-events)
3. [组件 Slots](#组件-slots)
4. [内部状态模型](#内部状态模型)
5. [CheckboxGroup 数据模型](#checkboxgroup-数据模型)
6. [类型定义](#类型定义)

---

## 🎛️ 组件 Props

### TCheckbox Props

```typescript
interface TdCheckboxProps {
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  
  /**
   * 是否选中（非受控）
   * @default false
   */
  defaultChecked?: boolean;
  
  /**
   * 双向绑定值
   */
  modelValue?: boolean;
  
  /**
   * Checkbox 的值，用于 CheckboxGroup
   */
  value?: string | number;
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  
  /**
   * 是否半选状态（用于全选功能）
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * 是否为"全选"复选框
   * @default false
   */
  checkAll?: boolean;
  
  /**
   * Label 文本内容
   */
  label?: string | TNode;
  
  /**
   * Checkbox 名称，用于表单提交
   */
  name?: string;
  
  /**
   * 是否显示 Tooltip（海外版本特性）
   * @default false
   */
  showTooltip?: boolean;
  
  /**
   * 阻止 label 触发 checked 事件（用于 Tree 等组件）
   * @default false
   */
  stopLabelTrigger?: boolean;
  
  /**
   * 懒加载（用于长列表优化）
   * @default false
   */
  lazyLoad?: boolean;
  
  /**
   * 组件索引（用于 CheckboxGroup）
   */
  index?: number;
  
  /**
   * 传递给 Checkbox 的额外数据
   */
  data?: Record<string, any>;
}
```

---

## 📤 组件 Events

### TCheckbox Events

```typescript
interface TdCheckboxEvents {
  /**
   * 选中状态变化时触发
   * @param checked 是否选中
   * @param context 上下文信息
   */
  onChange?: (checked: boolean, context: { e: Event }) => void;
  
  /**
   * 点击 Checkbox 时触发（不管是否选中）
   * @param context 上下文信息
   */
  onClick?: (context: { e: MouseEvent }) => void;
  
  /**
   * 获得焦点时触发
   * @param context 上下文信息
   */
  onFocus?: (context: { e: FocusEvent }) => void;
  
  /**
   * 失去焦点时触发
   * @param context 上下文信息
   */
  onBlur?: (context: { e: FocusEvent }) => void;
}
```

---

## 🎨 组件 Slots

### TCheckbox Slots

```typescript
interface TdCheckboxSlots {
  /**
   * 自定义 Label 内容
   * @default props.label
   */
  default?: TNode;
  
  /**
   * 自定义 Label 内容（与 default 相同）
   * @default props.label
   */
  label?: TNode;
}
```

---

## 🔄 内部状态模型

### Checkbox 内部状态

```typescript
/**
 * Checkbox 内部状态
 */
interface CheckboxState {
  /**
   * 是否获得焦点
   */
  isFocus: Ref<boolean>;
  
  /**
   * Label 元素引用
   */
  inputRef: Ref<HTMLElement | null>;
  
  /**
   * 内部选中状态（非受控）
   */
  innerChecked: Ref<boolean>;
  
  /**
   * 实际选中状态（结合 CheckboxGroup）
   */
  tChecked: Ref<boolean>;
  
  /**
   * 实际半选状态（结合 CheckboxGroup）
   */
  tIndeterminate: Ref<boolean>;
  
  /**
   * 实际禁用状态（结合 CheckboxGroup 和 Form）
   */
  isDisabled: ComputedRef<boolean>;
  
  /**
   * 实际只读状态（结合 CheckboxGroup 和 Form）
   */
  isReadonly: ComputedRef<boolean>;
  
  /**
   * Checkbox 名称（优先使用 props.name，否则使用 CheckboxGroup.name）
   */
  tName: Ref<string | undefined>;
}
```

### 计算属性

```typescript
/**
 * Checkbox 计算属性
 */
interface CheckboxComputed {
  /**
   * Label 的 class
   */
  labelClass: ComputedRef<ClassName>;
  
  /**
   * Input 的 class（含 focusClass/normalClass）
   */
  inputClass: ComputedRef<ClassName>;
  
  /**
   * Input 元素的 props
   */
  inputProps: ComputedRef<{
    type: 'checkbox';
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
    name: string | undefined;
    value: string | number | undefined;
    checked: boolean;
  }>;
}
```

---

## 👥 CheckboxGroup 数据模型

### TdCheckboxGroup Props

```typescript
interface TdCheckboxGroupProps {
  /**
   * 选中的值列表
   * @default []
   */
  value?: Array<string | number>;
  
  /**
   * 选中的值列表（非受控）
   * @default []
   */
  defaultValue?: Array<string | number>;
  
  /**
   * 双向绑定值
   */
  modelValue?: Array<string | number>;
  
  /**
   * 是否禁用（作用于所有子 Checkbox）
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 是否只读（作用于所有子 Checkbox）
   * @default false
   */
  readonly?: boolean;
  
  /**
   * CheckboxGroup 名称，用于表单提交
   */
  name?: string;
  
  /**
   * 最大选中数量
   */
  max?: number;
  
  /**
   * 最小选中数量
   */
  min?: number;
  
  /**
   * 选项列表（可以通过 options 批量渲染 Checkbox）
   */
  options?: Array<CheckboxOption>;
}
```

### CheckboxOption 定义

```typescript
/**
 * Checkbox 选项定义
 */
interface CheckboxOption {
  /**
   * 选项值
   */
  value: string | number;
  
  /**
   * 选项标签
   */
  label: string | TNode;
  
  /**
   * 是否禁用（优先级高于 CheckboxGroup.disabled）
   */
  disabled?: boolean;
  
  /**
   * 是否只读（优先级高于 CheckboxGroup.readonly）
   */
  readonly?: boolean;
  
  /**
   * 是否为"全选"选项
   */
  checkAll?: boolean;
}
```

### CheckboxGroup 内部状态

```typescript
/**
 * CheckboxGroup 内部状态
 */
interface CheckboxGroupState {
  /**
   * 内部选中值列表
   */
  innerValue: Ref<Array<string | number>>;
  
  /**
   * 已选中的值映射（用于快速查询）
   * @example { 'option1': true, 'option2': true }
   */
  checkedMap: ComputedRef<Record<string | number, boolean>>;
  
  /**
   * 是否全选
   */
  isCheckAll: ComputedRef<boolean>;
  
  /**
   * 是否半选（部分选中）
   */
  indeterminate: ComputedRef<boolean>;
  
  /**
   * 是否达到最大选中数量
   */
  maxExceeded: ComputedRef<boolean>;
  
  /**
   * 是否低于最小选中数量
   */
  minNotReached: ComputedRef<boolean>;
}
```

### CheckboxGroup Provide 数据

```typescript
/**
 * CheckboxGroup 通过 provide 传递给子 Checkbox 的数据
 */
interface CheckboxGroupProvide {
  /**
   * 选中的值列表
   */
  checkedValues: Array<string | number>;
  
  /**
   * 已选中的值映射
   */
  checkedMap: Record<string | number, boolean>;
  
  /**
   * 是否全选
   */
  isCheckAll: boolean;
  
  /**
   * 是否半选
   */
  indeterminate: boolean;
  
  /**
   * 是否达到最大选中数量
   */
  maxExceeded: boolean;
  
  /**
   * CheckboxGroup 的 disabled 状态
   */
  disabled?: boolean;
  
  /**
   * CheckboxGroup 的 readonly 状态
   */
  readonly?: boolean;
  
  /**
   * CheckboxGroup 的 name 属性
   */
  name?: string;
  
  /**
   * 子 Checkbox 选中状态变化时的回调
   */
  onCheckedChange: (context: CheckedChangeContext) => void;
}

/**
 * Checkbox 选中状态变化上下文
 */
interface CheckedChangeContext {
  /**
   * 是否选中
   */
  checked: boolean;
  
  /**
   * 是否为"全选" Checkbox
   */
  checkAll: boolean;
  
  /**
   * 原始事件
   */
  e: Event;
  
  /**
   * 当前 Checkbox 的 props
   */
  option: TdCheckboxProps;
}
```

---

## 📝 类型定义

### 完整类型导出

```typescript
// types.ts

/**
 * TNode 类型定义（可以是字符串、函数或 VNode）
 */
export type TNode = string | (() => VNode) | VNode;

/**
 * ClassName 类型定义
 */
export type ClassName = string | string[] | Record<string, boolean>;

/**
 * Checkbox Props
 */
export interface TdCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  modelValue?: boolean;
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  indeterminate?: boolean;
  checkAll?: boolean;
  label?: string | TNode;
  name?: string;
  showTooltip?: boolean;
  stopLabelTrigger?: boolean;
  lazyLoad?: boolean;
  index?: number;
  data?: Record<string, any>;
  onChange?: (checked: boolean, context: { e: Event }) => void;
  onClick?: (context: { e: MouseEvent }) => void;
  onFocus?: (context: { e: FocusEvent }) => void;
  onBlur?: (context: { e: FocusEvent }) => void;
}

/**
 * CheckboxGroup Props
 */
export interface TdCheckboxGroupProps {
  value?: Array<string | number>;
  defaultValue?: Array<string | number>;
  modelValue?: Array<string | number>;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  max?: number;
  min?: number;
  options?: Array<CheckboxOption>;
  onChange?: (value: Array<string | number>, context: CheckboxGroupChangeContext) => void;
}

/**
 * Checkbox 选项定义
 */
export interface CheckboxOption {
  value: string | number;
  label: string | TNode;
  disabled?: boolean;
  readonly?: boolean;
  checkAll?: boolean;
}

/**
 * CheckboxGroup 变化上下文
 */
export interface CheckboxGroupChangeContext {
  /**
   * 当前变化的 Checkbox
   */
  current: string | number | undefined;
  
  /**
   * 变化类型（选中 / 取消选中）
   */
  type: 'check' | 'uncheck';
  
  /**
   * 原始事件
   */
  e: Event;
}
```

---

## 🔍 数据流分析

### 1. 单个 Checkbox 数据流

```
┌─────────────────────────────────────────────┐
│              User Interaction               │
│  (点击 Checkbox / Tab 键聚焦 / Space 键选中) │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Event Handlers                    │
│  • handleChange(e)                          │
│  • handleFocus()                            │
│  • handleBlur()                             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Internal State Update             │
│  • innerChecked.value = !innerChecked.value │
│  • isFocus.value = true/false               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Computed Properties               │
│  • tChecked (结合 CheckboxGroup)             │
│  • inputClass (根据 isFocus)                │
│  • isDisabled (结合 CheckboxGroup & Form)   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Emit Events                    │
│  • emit('change', checked, { e })           │
│  • emit('focus', { e })                     │
│  • emit('blur', { e })                      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Parent Component                  │
│  • v-model:checked="isChecked"              │
│  • @change="handleChange"                   │
└─────────────────────────────────────────────┘
```

### 2. CheckboxGroup 数据流

```
┌─────────────────────────────────────────────┐
│         User 点击 Checkbox                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│       Checkbox emit('change')               │
│  同时调用 checkboxGroup.onCheckedChange()   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      CheckboxGroup 更新 innerValue          │
│  • 添加/移除选中值                           │
│  • 检查 max/min 限制                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│     CheckboxGroup Computed 更新             │
│  • checkedMap (值映射)                       │
│  • isCheckAll (是否全选)                     │
│  • indeterminate (是否半选)                  │
│  • maxExceeded (是否超出 max)                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      CheckboxGroup provide 数据更新          │
│  通知所有子 Checkbox                         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      子 Checkbox watch checkedMap           │
│  更新 tChecked 状态                          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│     CheckboxGroup emit('change')            │
│  emit(value: string[], context)             │
└─────────────────────────────────────────────┘
```

---

## 🎯 状态优先级

### Disabled 状态优先级

```
Checkbox.disabled (最高优先级)
    ↓
CheckboxGroup.disabled
    ↓
Form.disabled (通过 inject)
    ↓
CheckboxGroup.maxExceeded (未选中且达到 max 时禁用)
```

**实现**：
```typescript
const beforeDisabled = computed(() => {
  if (!props.checkAll && !tChecked.value && checkboxGroupData?.value.maxExceeded) {
    return true;
  }
  return null;
});

const afterDisabled = computed(() => {
  return checkboxGroupData?.value.disabled;
});

const isDisabled = useDisabled({ beforeDisabled, afterDisabled });
```

### Readonly 状态优先级

```
Checkbox.readonly (最高优先级)
    ↓
CheckboxGroup.readonly
    ↓
Form.readonly (通过 inject)
```

### Name 属性优先级

```
Checkbox.name (最高优先级)
    ↓
CheckboxGroup.name
```

---

## 🔄 Focus 状态管理

### useFocusHandler Hook 返回值

```typescript
interface UseFocusHandlerReturn {
  /**
   * 是否获得焦点（响应式）
   */
  isFocus: Ref<boolean>;
  
  /**
   * Label 元素引用
   */
  inputRef: Ref<HTMLElement | null>;
  
  /**
   * Focus 事件处理函数
   */
  handleFocus: () => void;
  
  /**
   * Blur 事件处理函数
   */
  handleBlur: () => void;
}
```

### 状态变化流程

```
1. User Tab 键聚焦
     ↓
2. <input> onFocus 触发
     ↓
3. handleFocus() 执行
     ↓
4. isFocus.value = true
     ↓
5. inputClass 更新（添加 focusClass）
     ↓
6. .focusBox 显示（display: inline-block）

───────────────────────────────────

7. User Tab 键或点击失焦
     ↓
8. <input> onBlur 触发
     ↓
9. handleBlur() 执行
     ↓
10. isFocus.value = false
     ↓
11. inputClass 更新（添加 normalClass）
     ↓
12. .focusBox 隐藏（display: none）
```

---

## 📊 数据示例

### 单个 Checkbox 使用

```vue
<template>
  <t-checkbox
    v-model:checked="isChecked"
    label="同意服务条款"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isChecked = ref(false);

const handleChange = (checked: boolean, { e }: { e: Event }) => {
  console.log('Checkbox 状态:', checked);
};
</script>
```

**内部状态**：
```typescript
{
  isFocus: false,
  innerChecked: false,
  tChecked: false,
  tIndeterminate: false,
  isDisabled: false,
  isReadonly: false,
  tName: undefined,
}
```

### CheckboxGroup 使用

```vue
<template>
  <t-checkbox-group
    v-model:value="selectedFruits"
    :options="fruitOptions"
    :max="2"
    @change="handleGroupChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFruits = ref(['apple']);

const fruitOptions = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
];

const handleGroupChange = (
  value: string[],
  context: CheckboxGroupChangeContext
) => {
  console.log('选中的水果:', value);
  console.log('变化类型:', context.type);
};
</script>
```

**CheckboxGroup 内部状态**：
```typescript
{
  innerValue: ['apple'],
  checkedMap: { apple: true, banana: false, orange: false },
  isCheckAll: false,
  indeterminate: false,
  maxExceeded: false,  // 选中 1 个，max = 2，未超出
  minNotReached: false,
}
```

---

## ✅ 总结

### 数据模型关键点

1. **Props 优先级**: Checkbox > CheckboxGroup > Form
2. **双向绑定**: 支持 `v-model:checked` 和 `v-model:value`
3. **Focus 状态**: 通过 `useFocusHandler` Hook 管理
4. **CheckboxGroup 集成**: 通过 provide/inject 通信
5. **状态同步**: watch + computed 自动同步

### 类型安全

- ✅ 所有 Props 都有 TypeScript 类型定义
- ✅ Event 参数严格类型检查
- ✅ Slots 支持 TNode 类型
- ✅ 内部状态全部使用 Ref/ComputedRef

### 数据流清晰

- ✅ 单向数据流（Props → State → Events）
- ✅ CheckboxGroup 通过 provide/inject 传递状态
- ✅ 子组件通过 emit 通知父组件
- ✅ 避免双向依赖和循环引用
