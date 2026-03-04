# 组件逻辑适配指南

本指南说明何时以及如何修改 Vue 3 组件逻辑（`.tsx`、`props.ts`、`type.ts` 文件）以实现海外适配。

## 何时需要逻辑适配

大多数海外适配**仅需样式变更** — 只需修改 Less 文件。仅在 Vue 2 海外版组件存在以下情况时才需要逻辑适配：

1. **额外的 Props** — 标准 TDesign 中没有的属性（如 `suffixIconOs`、`singleUseTag`、`optionWarp`）
2. **条件渲染** — 与标准版本不同的渲染逻辑
3. **不同的事件处理** — 或状态管理方式
4. **额外的 DOM 元素** — 如 focus 外圈包裹元素

## 模式：添加海外专属 Props

### 第一步：在 `type.ts` 中定义 prop 类型

```typescript
export interface TdComponentProps {
  // ... 现有 props

  /**
   * 是否使用海外 UI 样式
   * @default false
   */
  overseasStyle?: boolean;
}
```

### 第二步：在 `props.ts` 中添加 prop 定义

```typescript
export default {
  // ... 现有 props

  /** 是否使用海外 UI 样式 */
  overseasStyle: {
    type: Boolean,
    default: false,
  },
};
```

### 第三步：在组件 `.tsx` 中使用 prop

```tsx
// 条件添加海外 CSS 类
const overseasClasses = computed(() => ({
  [`${COMPONENT_NAME.value}--overseas`]: props.overseasStyle,
}));

// 合并到现有类名中
const componentClasses = computed(() => [
  COMPONENT_NAME.value,
  // ... 现有类名
  overseasClasses.value,
]);
```

## 实际示例：Select 组件

Select 组件（`packages/components/select/select.tsx`）展示了最完整的海外逻辑适配：

### 海外专属 Props

| Prop | 类型 | 默认值 | 用途 |
|------|------|--------|------|
| `suffixIconOs` | `Boolean` | `false` | 启用海外模式（触发 `.t-select--overseas` 类） |
| `singleUseTag` | `Boolean` | `false` | 单选时使用 Tag 样式展示 |
| `optionWarp` | `Boolean` | `false` | 允许选项文本换行 |

### 海外 CSS 类名（计算属性）

```tsx
const overseasClasses = computed(() => [
  `${COMPONENT_NAME.value}__wrap`,
  {
    't-true-select': props.suffixIconOs,
    't-select-tag-true': props.singleUseTag && !props.multiple,
    't-select--filterable': isFilterable.value,
    't-select--overseas': props.suffixIconOs,
    't-select--option-warp': props.optionWarp,
  },
]);
```

### 海外下拉面板类名

```tsx
const dropdownClasses = computed(() => ({
  't-select__dropdown--overseas': props.suffixIconOs,
}));
```

## 实际示例：Radio 组件

Radio 组件展示了海外版 focus 外圈适配：

### 额外的 DOM 元素

海外版添加了 focus 外圈元素：

```tsx
// 标准 TDesign
<span class="t-radio__input"></span>

// 海外版添加 focus 外圈包裹
<span class="t-radio__input-overseas">
  <span class="t-radio__input"></span>
  <span class="t-radio__focus-ring"></span>  {/* 海外版新增 */}
</span>
```

### 样式差异

| 特性 | 标准 TDesign | 海外版 |
|------|-------------|--------|
| 选中指示器 | 实心圆点 | 圆环（5px border） |
| Focus 反馈 | 浏览器默认 | 自定义外圈 |
| 选中颜色 | `#0052D9` | `#1B72E3` |

## Vue 2 到 Vue 3 迁移模式

将 Vue 2 海外组件逻辑迁移到 Vue 3 时的转换模式：

### Composition API 迁移

```typescript
// Vue 2（@vue/composition-api）
import { computed, defineComponent, ref } from '@vue/composition-api';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

// Vue 3（原生）
import { computed, defineComponent, ref } from 'vue';
import useVModel from '@tdesign/shared/hooks/useVModel';
import useDefaultValue from '@tdesign/shared/hooks/useDefaultValue';
```

### Options API / Mixins 迁移

```typescript
// Vue 2（Options API + mixins）
import mixins from '../utils/mixins';
const classPrefixMixins = getClassPrefixMixins('popup');

export default mixins(classPrefixMixins).extend({
  name: 'TPopup',
  data() { return { ... }; },
  methods: { ... },
});

// Vue 3（Composition API）
import { defineComponent, ref, computed } from 'vue';
import { usePrefixClass } from '@tdesign/shared/hooks/useConfig';

export default defineComponent({
  name: 'TPopup',
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('popup');
    // ... Composition API 逻辑
  },
});
```

### 事件触发迁移

```typescript
// Vue 2
import { emitEvent } from '../utils/event';
emitEvent(this, 'change', value);

// Vue 3
const emit = defineEmits(['change']);
emit('change', value);

// 或通过 context 参数
setup(props, { emit }) {
  emit('change', value);
}
```

### 渲染函数迁移

```tsx
// Vue 2（h 函数来自 context）
import { CreateElement } from 'vue';
render(h: CreateElement) {
  return h('div', { class: 'my-class' }, [children]);
}

// Vue 3（JSX/TSX — 本项目首选方式）
setup(props) {
  return () => (
    <div class="my-class">{children}</div>
  );
}
```

## Props 变更与 Example 同步【必须】

若适配过程中**新增或移除了 Props**，必须执行以下流程：

### 新增 Props

1. **检查 Vue 2 海外版示例**：在 `s2-overseas-ui/` 中查找该组件是否有 example/demo 使用了新增的 prop
2. **有示例** → 询问用户是否在当前项目中增加对应 example
   ```
   ❓ **新增 Props 示例确认**：
   - `propA`（用途）— Vue 2 海外版有示例：`s2-overseas-ui/.../xxx-demo.vue`
   是否在当前项目中增加对应 example？
   ```
3. **无示例** → 忽略，不询问

### 移除/屏蔽 Props

1. **检查当前项目示例**：在 `packages/components/<组件>/_example/` 中搜索被移除 prop 的使用情况
2. **有使用** → 询问用户是否移除，并说明影响
   ```
   ❓ **移除 Props 示例确认**：
   - `propC`（移除原因）— 当前 example 中以下文件使用了此属性：
     - `_example/xxx.vue` 第 XX 行
   移除后影响：[表现变化说明]
   是否同步移除/修改这些 example？
   ```
3. **无使用** → 忽略，不询问

### 变更记录

```
📝 Props 变更记录：
- 组件：<组件名>
- 新增 Props：propA — Vue 2 示例：有/无 — Example 同步：已增加/暂不增加/无需处理
- 移除 Props：propC — 当前引用：有/无 — Example 同步：已移除/用户保留/无需处理
```

## 影响范围检查【必须】

逻辑适配可能引发连锁影响，提交前必须检查：

1. **修改公共 hooks / composables** → 检查所有调用方
2. **修改组件对外暴露的 Props / Events** → 检查是否有父组件依赖
3. **修改公共组件（Popup、Icon 等）** → 所有依赖组件均可能受影响

如有影响范围超出当前组件，必须输出以下格式说明：
```
⚠️ **影响范围分析**：
本次改动可能影响以下组件：
- `<组件A>`：原因
- `<组件B>`：原因
建议：[处理意见]
```

## 提交逻辑变更前的检查清单

- [ ] 新增 Props 已在 `type.ts` 和 `props.ts` 中同时定义
- [ ] 新增 Props 有完整的 JSDoc 注释
- [ ] 海外 CSS 类名遵循 `.t-<组件>--overseas` 命名模式
- [ ] 条件逻辑使用 `computed()` 保证响应性
- [ ] 未破坏现有（非海外版）组件的行为
- [ ] 默认值确保不设置海外 Props 时保持标准 TDesign 行为
- [ ] TypeScript 类型已正确更新
- [ ] 已询问用户是否同步修改 example 示例
- [ ] 影响范围已分析并记录
