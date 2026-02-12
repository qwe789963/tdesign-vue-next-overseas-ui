# Switch 组件 API 契约

**功能编号**: 001  
**版本**: 1.0  
**创建日期**: 2026-02-11  
**契约类型**: Vue 组件接口规范

---

## 1. 契约概述

### 1.1 组件标识

- **组件名称**: `TSwitch`
- **导出路径**: `@tdesign/vue-next-overseas-ui/switch`
- **类型定义**: `packages/components/switch/type.ts`
- **Vue 版本**: 3.2+

---

### 1.2 契约范围

本契约定义了 Switch 组件的：
1. **Props 接口**（输入参数）
2. **Events 接口**（输出事件）
3. **Slots 接口**（插槽）
4. **公开方法**（Expose API）
5. **类型定义**（TypeScript）

---

## 2. Props 接口

### 2.1 完整接口定义

```typescript
export interface TdSwitchProps<T = SwitchValue> {
  // ========== 异步验证 ==========
  beforeChange?: () => boolean | Promise<boolean>;

  // ========== 自定义值 ==========
  customValue?: Array<SwitchValue>;

  // ========== 状态控制 ==========
  disabled?: boolean;
  loading?: boolean;

  // ========== 文本标签 ==========
  label?: Array<string | TNode> | TNode;

  // ========== 尺寸样式 ==========
  size?: 'small' | 'medium' | 'large';

  // ========== 值绑定 ==========
  value?: T;
  defaultValue?: T;
  modelValue?: T;

  // ========== 事件回调 ==========
  onChange?: (value: T, context: { e: MouseEvent }) => void;
}
```

---

### 2.2 Props 详细规范

#### 2.2.1 `beforeChange` - 异步验证

**类型**: `() => boolean | Promise<boolean>`  
**默认值**: `undefined`  
**必填**: ❌

**功能描述**:
- 状态切换前的钩子函数
- 返回 `false` 或 `Promise.reject()` 阻止切换
- 返回 `true` 或 `Promise.resolve(true)` 允许切换

**使用示例**:
```vue
<template>
  <t-switch v-model="checked" :before-change="handleBeforeChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);

// 同步验证
const handleBeforeChange = () => {
  return window.confirm('确定要切换状态吗？');
};

// 异步验证
const handleBeforeChangeAsync = async () => {
  const result = await api.checkPermission();
  return result.allowed;
};
</script>
```

**契约要求**:
- ✅ 必须返回 `boolean` 或 `Promise<boolean>`
- ✅ 如果返回 `undefined`，视为 `false`
- ✅ 如果抛出异常，捕获后阻止切换

---

#### 2.2.2 `customValue` - 自定义值

**类型**: `Array<SwitchValue>`  
**默认值**: `undefined`  
**必填**: ❌

**功能描述**:
- 自定义开关的开启/关闭值
- 数组格式：`[activeValue, inactiveValue]`
- 未设置时默认为 `[true, false]`

**使用示例**:
```vue
<!-- 数字值 -->
<t-switch v-model="status" :custom-value="[1, 0]" />

<!-- 字符串值 -->
<t-switch v-model="state" :custom-value="['on', 'off']" />

<!-- 枚举值 -->
<t-switch v-model="mode" :custom-value="['dark', 'light']" />
```

**契约要求**:
- ✅ 数组长度必须为 2（第一个为选中值，第二个为未选中值）
- ✅ `v-model` 的值必须是 `customValue` 数组中的某一个
- ✅ 如果值不在数组中，开发模式下抛出错误

**验证规则**:
```typescript
watch(innerValue, (val) => {
  if (props.customValue && props.customValue.length) {
    if (!props.customValue.includes(val)) {
      throw new Error(
        `value is ${val} not in ${JSON.stringify(props.customValue)}`
      );
    }
  }
});
```

---

#### 2.2.3 `disabled` - 禁用状态

**类型**: `boolean`  
**默认值**: `false`  
**必填**: ❌

**功能描述**:
- 禁用开关，无法点击切换
- 禁用状态下焦点样式不显示

**使用示例**:
```vue
<t-switch v-model="checked" disabled />
```

**契约要求**:
- ✅ `disabled=true` 时，点击无响应
- ✅ `disabled=true` 时，焦点边框不显示（CSS: `display: none !important`）
- ✅ 禁用状态添加 `t-is-disabled` 类名

**CSS 契约**:
```less
.t-switch.t-is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
  
  .focusInput .focusBox,
  .normalInput .focusBox {
    display: none !important;  // 强制隐藏焦点边框
  }
}
```

---

#### 2.2.4 `loading` - 加载状态

**类型**: `boolean`  
**默认值**: `false`  
**必填**: ❌

**功能描述**:
- 显示 Loading 图标，表示异步操作进行中
- 加载状态下无法点击切换

**使用示例**:
```vue
<template>
  <t-switch v-model="checked" :loading="isLoading" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
const isLoading = ref(false);

const handleToggle = async () => {
  isLoading.value = true;
  try {
    await api.updateStatus(checked.value);
  } finally {
    isLoading.value = false;
  }
};
</script>
```

**契约要求**:
- ✅ `loading=true` 时，显示 `<TLoading size="small" />` 组件
- ✅ `loading=true` 时，点击无响应
- ✅ 加载状态添加 `t-is-loading` 类名

---

#### 2.2.5 `label` - 文本标签

**类型**: `Array<string | TNode> | TNode`  
**默认值**: `undefined`  
**必填**: ❌

**功能描述**:
- 开关上显示的文本或图标
- 支持 3 种形式：字符串、数组、渲染函数

**使用示例**:

**形式 1: 单个字符串**
```vue
<t-switch v-model="checked" label="开关" />
```

**形式 2: 数组（选中/未选中文本）**
```vue
<t-switch v-model="checked" :label="['开', '关']" />
```

**形式 3: 渲染函数**
```vue
<t-switch
  v-model="checked"
  :label="(h, { value }) => value ? '✓ 开启' : '✗ 关闭'"
/>
```

**形式 4: 插槽**
```vue
<t-switch v-model="checked">
  <template #label="{ value }">
    <span>{{ value ? '🌙 夜间' : '☀️ 白天' }}</span>
  </template>
</t-switch>
```

**契约要求**:
- ✅ 字符串形式：始终显示该文本
- ✅ 数组形式：`label[0]` 为选中状态文本，`label[1]` 为未选中状态文本
- ✅ 函数形式：接收 `(h, { value })` 参数，返回 VNode
- ✅ 插槽形式：优先级高于 `label` prop

**处理逻辑**:
```typescript
const content = computed<VNodeChild>(() => {
  // 优先级 1: 插槽
  if (slots.label) {
    return slots.label({ value: innerValue.value });
  }
  
  // 优先级 2: label prop
  if (isFunction(props.label)) {
    return props.label(h, { value: innerValue.value });
  }
  
  if (isString(props.label)) {
    return props.label;
  }
  
  if (isArray(props.label) && props.label.length) {
    const label = innerValue.value === activeValue.value 
      ? props.label[0] 
      : props.label[1];
    
    if (isString(label)) {
      return label;
    }
    
    if (isFunction(label)) {
      return label(h);
    }
  }
  
  return null;
});
```

---

#### 2.2.6 `size` - 尺寸

**类型**: `'small' | 'medium' | 'large'`  
**默认值**: `'medium'`  
**必填**: ❌

**功能描述**:
- 控制开关的尺寸大小
- 影响组件宽高、手柄大小、焦点边框尺寸

**使用示例**:
```vue
<t-switch v-model="checked" size="small" />
<t-switch v-model="checked" size="medium" />
<t-switch v-model="checked" size="large" />
```

**契约要求** - 尺寸规格（参照 Vue2 版本）:

| 尺寸 | 宽度 | 高度 | 手柄直径 | focusBox 宽高 |
|------|------|------|---------|--------------|
| Small | 40px | 20px | 16px | - |
| Medium | 60px | 28px | 24px | - |
| Large | 60px | 28px | 24px | 68px × 36px |

**CSS 类名映射**:
```typescript
const classes = computed(() => [
  't-switch',
  {
    't-size-s': props.size === 'small',
    't-size-m': props.size === 'medium',
    't-size-l': props.size === 'large',
  }
]);
```

---

#### 2.2.7 `value` / `defaultValue` / `modelValue` - 值绑定

**类型**: `T` (泛型，默认为 `SwitchValue`)  
**默认值**: `undefined`  
**必填**: ❌

**功能描述**:
- `value`: 非受控模式的当前值
- `defaultValue`: 非受控模式的默认值
- `modelValue`: 受控模式的当前值（v-model）

**使用示例**:

**受控模式（推荐）**:
```vue
<template>
  <t-switch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

**非受控模式**:
```vue
<template>
  <t-switch :default-value="true" @change="handleChange" />
</template>

<script setup lang="ts">
const handleChange = (value: boolean) => {
  console.log('新值:', value);
};
</script>
```

**契约要求**:
- ✅ `value` 和 `modelValue` 不能同时设置（由 `useVModel` 处理）
- ✅ 值类型必须匹配 `customValue` 数组中的类型
- ✅ 受控模式下，值更新必须触发 `update:modelValue` 事件

**实现机制**:
```typescript
const [innerValue, setSwitchVal] = useVModel(
  value,
  modelValue,
  props.defaultValue,
  props.onChange
);
```

---

#### 2.2.8 `onChange` - 变更回调

**类型**: `(value: T, context: { e: MouseEvent }) => void`  
**默认值**: `undefined`  
**必填**: ❌

**功能描述**:
- 状态切换时触发的回调函数
- 接收新值和事件上下文

**使用示例**:
```vue
<template>
  <t-switch
    v-model="checked"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);

const handleChange = (value: boolean, context: { e: MouseEvent }) => {
  console.log('新值:', value);
  console.log('点击位置:', context.e.clientX, context.e.clientY);
  console.log('点击元素:', context.e.target);
};
</script>
```

**契约要求**:
- ✅ 回调参数顺序：`(value, context)`
- ✅ `context` 对象必须包含 `e: MouseEvent`
- ✅ 在 `beforeChange` 返回 `true` 后触发
- ✅ 禁用/加载状态下不触发

---

## 3. Events 接口

### 3.1 标准事件

| 事件名 | 参数 | 触发时机 | 说明 |
|--------|------|---------|------|
| `update:modelValue` | `(value: T)` | 状态切换后 | v-model 双向绑定 |
| `change` | `(value: T, context: { e: MouseEvent })` | 状态切换后 | 通用变更事件 |

---

### 3.2 事件触发顺序

```typescript
// 正常切换流程
onClick → beforeChange (可选) → handleToggle → setSwitchVal → [
  emit('update:modelValue', value),  // 先更新 v-model
  emit('change', value, { e })        // 再触发 change 事件
]
```

---

### 3.3 事件契约

#### `update:modelValue` 事件

**触发条件**:
- ✅ 用户点击 Switch（非禁用/加载状态）
- ✅ `beforeChange` 返回 `true`（如果存在）
- ✅ 编程式调用 `setSwitchVal()`

**参数**:
```typescript
value: T  // 新的开关值
```

**示例**:
```vue
<t-switch
  :model-value="checked"
  @update:model-value="checked = $event"
/>
```

---

#### `change` 事件

**触发条件**:
- 同 `update:modelValue`

**参数**:
```typescript
value: T                    // 新的开关值
context: {
  e: MouseEvent            // 原始点击事件
}
```

**示例**:
```vue
<t-switch
  v-model="checked"
  @change="(value, { e }) => console.log(value, e)"
/>
```

---

## 4. Slots 接口

### 4.1 可用插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `label` | `{ value: SwitchValue }` | 自定义开关标签内容 |

---

### 4.2 `label` 插槽

**参数**:
```typescript
{
  value: SwitchValue  // 当前开关值（选中/未选中）
}
```

**使用示例**:
```vue
<template>
  <t-switch v-model="checked">
    <template #label="{ value }">
      <span class="custom-label">
        <Icon :name="value ? 'check' : 'close'" />
        {{ value ? '已开启' : '已关闭' }}
      </span>
    </template>
  </t-switch>
</template>
```

**契约要求**:
- ✅ 插槽优先级高于 `label` prop
- ✅ 参数 `value` 实时反映当前状态
- ✅ 插槽内容渲染在 `.t-switch__content` 容器中

---

## 5. 公开方法（Expose API）

Switch 组件**不暴露**任何公开方法。所有交互通过 Props 和 Events 完成。

---

## 6. 类型定义契约

### 6.1 导出类型

```typescript
// 主接口
export interface TdSwitchProps<T = SwitchValue> { /* ... */ }

// 值类型
export type SwitchValue = string | number | boolean;

// 事件上下文
export interface SwitchEventContext {
  e: MouseEvent;
}

// 渲染函数类型
export type TNode<T = undefined> = T extends undefined
  ? (h: typeof import('vue').h) => VNode
  : (h: typeof import('vue').h, props: T) => VNode;
```

---

### 6.2 泛型使用

**组件泛型声明**:
```typescript
import { TdSwitchProps } from './type';

export default defineComponent<TdSwitchProps<number>>({
  name: 'TSwitch',
  props: /* ... */
});
```

**用户使用泛型**:
```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { TdSwitchProps } from 'tdesign-vue-next-overseas-ui';

// 明确指定值类型为 number
const status = ref<number>(1);

const switchProps: TdSwitchProps<number> = {
  modelValue: status.value,
  customValue: [1, 0],
};
</script>

<template>
  <t-switch v-bind="switchProps" @update:model-value="status = $event" />
</template>
```

---

## 7. 焦点交互契约（海外版特性）

### 7.1 焦点状态

**DOM 结构契约**:
```tsx
<div
  class="t-switch"
  tabindex={-1}         // 允许编程式聚焦，但不参与 Tab 导航
  onFocus={handleFocus}
  onBlur={handleBlur}
>
  <span class="t-switch__handle">{loadingContent}</span>
  <div class="t-switch__content">{switchContent}</div>
  <div ref={focusBoxRef} class="focusBoxParrent" style="display: contents">
    <span class="focusBox"></span>
  </div>
</div>
```

---

### 7.2 焦点行为契约

| 交互 | DOM 操作 | CSS 效果 |
|------|---------|---------|
| 聚焦（Tab 键） | `focusBoxRef.classList.add('focusInput')` | `.focusBox { display: inline-block; }` |
| 失焦（Tab 离开） | `focusBoxRef.classList.add('normalInput')` | `.focusBox { display: none; }` |
| 禁用状态 | 无操作 | `.t-is-disabled .focusBox { display: none !important; }` |

---

### 7.3 焦点样式契约

**CSS 规范**:
```less
.focusBox {
  box-sizing: border-box;
  position: absolute;
  display: none;
  width: 68px;          // large 尺寸
  height: 36px;
  margin-left: -4px;    // 左偏移 4px
  border-radius: 18px;  // 圆角与 Switch 一致
  border: 2px solid #1b72e3;  // 蓝色边框
}

.focusInput .focusBox {
  display: inline-block;  // 聚焦时显示
}

.normalInput .focusBox {
  display: none;          // 失焦时隐藏
}

// 禁用状态下强制隐藏
.t-is-disabled {
  .focusInput .focusBox,
  .normalInput .focusBox {
    display: none !important;
  }
}
```

---

## 8. 性能契约

### 8.1 渲染性能

- **首次渲染**: ≤ 16ms（60fps）
- **状态切换**: ≤ 8ms
- **动画流畅度**: 60fps（使用 CSS transition）

---

### 8.2 内存契约

- **组件实例大小**: ≤ 2KB
- **DOM 节点数**: 4 个（root + handle + content + focusBox）
- **事件监听器**: 3 个（click + focus + blur）

---

### 8.3 构建产物

- **压缩后大小**: ≤ 5KB（不含样式）
- **样式文件大小**: ≤ 8KB（含 overseas 样式）
- **Tree-shaking**: 支持按需导入

---

## 9. 浏览器兼容性契约

| 浏览器 | 最低版本 | 关键特性 |
|--------|---------|---------|
| Chrome | 90+ | CSS `display: contents` |
| Edge | 90+ | CSS `display: contents` |
| Firefox | 88+ | CSS `display: contents` |
| Safari | 14+ | CSS `display: contents` |

**关键 CSS 特性**:
- `display: contents` (用于 focusBoxParrent)
- `position: absolute` (用于 focusBox)
- CSS Transitions (动画)

---

## 10. 无障碍访问契约

### 10.1 键盘导航

- ✅ `tabindex="-1"` 允许编程式聚焦
- ✅ Tab 键可聚焦 Switch
- ✅ 聚焦时显示明显的焦点指示器（蓝色边框）
- ✅ 禁用状态下焦点指示器隐藏

---

### 10.2 屏幕阅读器支持

**建议添加（未来优化）**:
```tsx
<div
  class="t-switch"
  role="switch"
  aria-checked={isChecked}
  aria-disabled={disabled}
  aria-label={ariaLabel}
>
  {/* ... */}
</div>
```

---

## 11. 错误处理契约

### 11.1 开发模式错误

| 错误场景 | 错误消息 | 处理方式 |
|---------|---------|---------|
| `customValue` 值不匹配 | `"value is ${val} not in ${JSON.stringify(props.customValue)}"` | 抛出 Error |
| `beforeChange` 异常 | `"Switch: some error occurred: ${e}"` | 抛出 Error |

---

### 11.2 生产模式错误

- **静默失败**: 禁用/加载状态下点击无响应
- **防御性编程**: 使用 `?.` 可选链避免 `undefined` 错误

---

## 12. 变更日志

### 12.1 Vue2 → Vue3 变更

| 变更项 | Vue2 | Vue3 | 影响 |
|--------|------|------|------|
| v-model 绑定 | `value` prop | `modelValue` prop | ✅ 向下兼容 |
| 异步验证 | ❌ 不支持 | `beforeChange` | ✅ 新特性 |
| DOM 引用 | `this.$el.children[2]` | `ref<HTMLElement>()` | ✅ 内部实现 |
| 事件绑定 | `this.$emit('change')` | `emit('change')` | ✅ 内部实现 |

---

### 12.2 契约版本历史

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| 1.0 | 2026-02-11 | 初始契约创建 |

---

## 13. 契约验收标准

### 13.1 功能验收

- [ ] 所有 Props 按契约正常工作
- [ ] 所有 Events 按预期触发
- [ ] Slots 正确渲染内容
- [ ] 焦点样式符合契约规范

---

### 13.2 类型验收

- [ ] TypeScript 类型检查通过（`npx vue-tsc --noEmit`）
- [ ] 泛型使用正确
- [ ] 导出类型完整

---

### 13.3 性能验收

- [ ] 渲染性能达标（≤ 16ms）
- [ ] 状态切换流畅（60fps）
- [ ] 构建产物大小符合预期

---

### 13.4 兼容性验收

- [ ] Chrome 90+ 测试通过
- [ ] Edge 90+ 测试通过
- [ ] Firefox 88+ 测试通过
- [ ] Safari 14+ 测试通过

---

## 14. 契约使用指南

### 14.1 开发者使用

**引入组件**:
```typescript
import { Switch as TSwitch } from '@tdesign/vue-next-overseas-ui';
```

**TypeScript 支持**:
```typescript
import type { TdSwitchProps, SwitchValue } from '@tdesign/vue-next-overseas-ui';
```

**完整示例**:
```vue
<template>
  <t-switch
    v-model="status"
    :custom-value="[1, 0]"
    :label="['开', '关']"
    size="large"
    :before-change="handleBeforeChange"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TdSwitchProps } from '@tdesign/vue-next-overseas-ui';

const status = ref<number>(1);

const handleBeforeChange = () => {
  return window.confirm('确定切换吗？');
};

const handleChange = (value: number, { e }: { e: MouseEvent }) => {
  console.log('新值:', value);
};
</script>
```

---

### 14.2 测试者使用

**单元测试契约验证**:
```typescript
import { mount } from '@vue/test-utils';
import TSwitch from '../switch';

describe('Switch 契约验证', () => {
  it('应符合 Props 接口契约', () => {
    const wrapper = mount(TSwitch, {
      props: {
        modelValue: false,
        size: 'large',
        disabled: false,
      },
    });
    
    expect(wrapper.classes()).toContain('t-switch');
    expect(wrapper.classes()).toContain('t-size-l');
  });

  it('应符合 Events 接口契约', async () => {
    const wrapper = mount(TSwitch, {
      props: { modelValue: false },
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')[0][0]).toBe(true);
  });

  it('应符合焦点交互契约', async () => {
    const wrapper = mount(TSwitch);
    
    await wrapper.trigger('focus');
    expect(wrapper.find('.focusInput').exists()).toBe(true);
    
    await wrapper.trigger('blur');
    expect(wrapper.find('.normalInput').exists()).toBe(true);
  });
});
```

---

## 15. 附录

### 15.1 参考文档

- [Vue 3 官方文档 - 组件 Props](https://vuejs.org/guide/components/props.html)
- [Vue 3 官方文档 - 组件事件](https://vuejs.org/guide/components/events.html)
- [TDesign 设计规范](https://tdesign.tencent.com/)

---

### 15.2 契约联系人

- **负责人**: AI Assistant
- **审核人**: 待指定
- **最后更新**: 2026-02-11

---

**契约状态**: ✅ 完成  
**下一步**: 创建快速开始指南（quickstart.md）
