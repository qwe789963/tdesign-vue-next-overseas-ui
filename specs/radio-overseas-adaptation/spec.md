# Radio 海外适配版本 规格说明书

> **规范引用**: 本规格说明书遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| **功能名称** | Radio 单选组件海外适配 |
| **TAPD 编号** | 无 |
| **负责人** | @v_genyin |
| **创建日期** | 2026-02-10 |
| **目标版本** | v1.0.0 |
| **优先级** | P0（最高） |

---

## 🎯 需求背景

### 项目背景
- TDesign Vue Next 项目 fork 后需要针对海外系统进行定制化开发
- 之前已有基于 Vue 2.6 的海外 UI 组件库 (`s2-overseas-ui`)
- 需要将 Vue2 版本的海外定制样式迁移到 Vue3 版本，确保功能和视觉效果一致

### 目标
1. **功能一致性**: 确保 Vue3 版本的 Radio 组件功能与 Vue2 版本完全兼容
2. **视觉一致性**: 样式效果（颜色、边框、圆角、CSS变量等）与 Vue2 版本保持一致
3. **交互一致性**: 所有交互状态（hover、active、focus、disabled）效果一致
4. **架构优化**: 利用 Vue3 的 Composition API 和性能优势

### 参考资料
- **Vue2 版本源码**: `c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui/packages/overseas/src/radio/`
- **Vue3 目标路径**: `c:/Users/v_genyin/Desktop/overseas-ui-vue3/tdesign-vue-next-overseas-ui/packages/components/radio/`

---

## 🔍 现状分析

### Vue2 版本关键特性

#### 1. **Focus 视觉反馈机制**
- Vue2 版本实现了自定义的 focus 视觉反馈
- 当 Radio 获得焦点时显示外圈蓝色边框 (`.focusBox`)
- 失去焦点时隐藏外圈边框

```typescript
// Vue2: radio.tsx (L110-L124)
handleFocus(): void {
  this.$el.children[1].classList.add('focusInput');
  this.$el.children[1].classList.remove('normalInput');
},
handleBlur(): void {
  this.$el.children[1].classList.add('normalInput');
  this.$el.children[1].classList.remove('focusInput');
}
```

```less
// Vue2: radio.less (L301-L311)
.focusBox {
  box-sizing: border-box;
  position: absolute;
  display: none;
  width: @radio-size + 10px;
  height: @radio-size + 10px;
  top: -6px;
  left: -6px;
  border-radius: @border-radius-circle;
  border: 2px solid #1b72e3;
}
```

#### 2. **内圈样式定制**
- Vue2 版本使用 **实心圆环** 而非原版的 **实心圆点**
- 选中状态使用 5px 边框的圆环效果

```less
// Vue2: radio.less (L329-L343)
&::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: @radio-size;
  height: @radio-size;
  margin-top: -@radio-dot-size;
  margin-left: -@radio-dot-size;
  border: 5px solid #1b72e3;  // 圆环样式
  opacity: @radio-opacity-transparent;
  border-radius: @border-radius-circle;
  transition: all @anim-duration-base @anim-time-fn-ease-out;
}
```

#### 3. **自定义 CSS 变量值**
Vue2 版本重新定义了关键 CSS 变量：

| CSS 变量 | Vue2 值 | 用途 |
|---------|---------|------|
| `@radio-border-color` | `@border-level-2-color` | 外圈边框颜色 |
| `@radio-input-color` | `@bg-color-container` | 背景色 |
| `@radio-input-color-disabled` | `#F0F1F2` | 禁用态背景色 |
| `@radio-dot-color` | `@brand-color-active` | 选中态主色 |
| `@radio-dot-color-disabled-checked` | `#CED3D9` | 禁用选中态边框色 |
| `@radio-size` | `18px` | Radio 尺寸 |
| `@radio-input-label-spacer` | `12px` | 标签间距 |

#### 4. **禁用态样式**
禁用且选中状态的特殊处理：

```less
// Vue2: radio.less (L400-L407)
&.@{prefix}-is-disabled {
  &.@{prefix}-is-checked {
    .@{radio-cls}__input {
      &::after {
        background-color: #ffffff;
        border: 5px solid #a1aab3;  // 禁用态圆环颜色
      }
    }
  }
}
```

### Vue3 版本现状

#### 1. **样式系统**
- Vue3 版本使用 TDesign 官方样式: `@tdesign/common-style/web/components/radio/_index.less`
- 缺少海外版本的自定义样式变量和 focus 反馈机制
- 使用原版的实心圆点而非圆环

#### 2. **组件结构**
- Vue3 版本使用 TSX + Composition API
- 没有 `.focusBox` 元素和 focus/blur 事件处理
- 内圈样式使用原版设计

```tsx
// Vue3: radio.tsx (L125)
<span class={`${prefixCls.value}__input`}></span>
```

---

## ✅ 功能规格

### 1. 样式适配 (P0 - 必须)

#### 1.1 创建海外版本样式文件
**位置**: `packages/components/radio/style/overseas/`

**文件结构**:
```
packages/components/radio/style/overseas/
├── index.less          # 主样式文件
├── _var.less           # CSS 变量定义
└── _mixin.less         # 样式混入 (如需要)
```

#### 1.2 CSS 变量定义 (_var.less)
**要求**: 与 Vue2 版本完全一致

```less
// 核心变量
@radio-cls: ~"@{prefix}-radio";

// 颜色
@radio-border-color: @border-level-2-color;
@radio-input-color: @bg-color-container;
@radio-input-color-disabled: #F0F1F2;
@radio-dot-color: @brand-color-active;
@radio-dot-color-disabled: @bg-color-component-disabled;
@radio-dot-color-disabled-checked: #CED3D9;
@radio-label-color: @text-color-primary;

// 尺寸
@radio-size: 18px;
@radio-dot-size: (@radio-size / 2);
@radio-input-label-spacer: 12px;

// 边框
@radio-input-border: 1px solid @radio-border-color;

// 动画
@radio-input-transition: border @anim-duration-base @anim-time-fn-ease-out;
@radio-opacity-transparent: 0;
```

#### 1.3 圆环样式实现 (index.less)
**要求**: 选中态显示 5px 边框的圆环

```less
.@{radio-cls}__input {
  // 基础样式
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: @radio-size;
  height: @radio-size;
  border-radius: @border-radius-circle;
  border: @radio-input-border;
  background-color: @radio-input-color;
  transition: @radio-input-transition;
  
  // Focus 外圈边框
  .focusBox {
    box-sizing: border-box;
    position: absolute;
    display: none;
    width: @radio-size + 10px;
    height: @radio-size + 10px;
    top: -6px;
    left: -6px;
    border-radius: @border-radius-circle;
    border: 2px solid #1b72e3;
  }
  
  // 内圈圆环 (选中态)
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: @radio-size;
    height: @radio-size;
    margin-top: -@radio-dot-size;
    margin-left: -@radio-dot-size;
    border: 5px solid #1b72e3;
    opacity: @radio-opacity-transparent;
    border-radius: @border-radius-circle;
    transition: all @anim-duration-base @anim-time-fn-ease-out;
  }
}

// 选中态
.@{radio-cls}.@{prefix}-is-checked {
  // Focus 状态
  .focusInput .focusBox {
    display: inline-block;
  }
  .normalInput .focusBox {
    display: none;
  }
  
  .@{radio-cls}__input {
    border-color: @radio-dot-color;
    
    &::after {
      opacity: 1;
    }
  }
}

// 禁用态
.@{radio-cls}.@{prefix}-is-disabled {
  cursor: not-allowed;
  
  .@{radio-cls}__label {
    color: @radio-button-color-disabled;
  }
  
  .@{radio-cls}__input {
    background-color: @radio-input-color-disabled;
    border-color: @radio-dot-color-disabled-checked;
  }
  
  // 禁用且选中
  &.@{prefix}-is-checked {
    .@{radio-cls}__input::after {
      background-color: #ffffff;
      border: 5px solid #a1aab3;
    }
  }
}

// Hover 效果
.@{radio-cls}:hover {
  .@{radio-cls}__input {
    border-color: @radio-dot-color;
  }
}
```

### 2. 组件逻辑适配 (P0 - 必须)

#### 2.1 添加 focusBox 元素
**位置**: `packages/components/radio/radio.tsx`

**修改内容**:
```tsx
// 当前 (L125)
<span class={`${prefixCls.value}__input`}></span>

// 修改后
<span class={`${prefixCls.value}__input`}>
  <span class="focusBox"></span>
</span>
```

#### 2.2 实现 Focus/Blur 事件处理
**新增 Composable**: `packages/components/radio/hooks/use-focus-handler.ts`

```typescript
import { ref, Ref } from 'vue';

export function useFocusHandler() {
  const inputRef: Ref<HTMLElement | null> = ref(null);

  const handleFocus = () => {
    if (!inputRef.value) return;
    const inputElement = inputRef.value.querySelector('.t-radio__input');
    if (inputElement) {
      inputElement.classList.add('focusInput');
      inputElement.classList.remove('normalInput');
    }
  };

  const handleBlur = () => {
    if (!inputRef.value) return;
    const inputElement = inputRef.value.querySelector('.t-radio__input');
    if (inputElement) {
      inputElement.classList.add('normalInput');
      inputElement.classList.remove('focusInput');
    }
  };

  return {
    inputRef,
    handleFocus,
    handleBlur,
  };
}
```

#### 2.3 组件集成 Focus 处理
**修改**: `packages/components/radio/radio.tsx`

```tsx
import { useFocusHandler } from './hooks/use-focus-handler';

export default defineComponent({
  name: 'TRadio',
  setup(props, { attrs }) {
    // ... 现有代码
    
    // 新增 focus 处理
    const { inputRef, handleFocus, handleBlur } = useFocusHandler();
    
    // 修改 inputEvents
    const inputEvents = computed(() =>
      getValidAttrs({
        focus: (e: FocusEvent) => {
          handleFocus();
          attrs.onFocus?.(e);
        },
        blur: (e: FocusEvent) => {
          handleBlur();
          attrs.onBlur?.(e);
        },
        keydown: attrs.onKeydown,
        keyup: attrs.onKeyup,
        keypresss: attrs.onKeypresss,
      }),
    );
    
    return () => (
      <label
        ref={inputRef}  // 绑定 ref
        class={inputClass.value}
        {...wrapperAttrs.value}
        tabindex={isDisabled.value ? undefined : '0'}
        onClick={onLabelClick}
        onFocus={handleFocus}  // 添加 label 级别的 focus
        onBlur={handleBlur}    // 添加 label 级别的 blur
      >
        <input
          type="radio"
          class={`${prefixCls.value}__former`}
          {...inputEvents.value}
          {...inputProps.value}
          onClick={handleClick}
          tabindex="-1"
        />
        <span class={`${prefixCls.value}__input`}>
          <span class="focusBox"></span>  {/* 新增 focusBox */}
        </span>
        <span class={`${prefixCls.value}__label`}>
          {renderContent('default', 'label')}
        </span>
      </label>
    );
  },
});
```

### 3. 样式导入配置 (P0 - 必须)

#### 3.1 修改样式入口文件
**位置**: `packages/components/radio/style/index.js`

```javascript
// 当前
import '@tdesign/common-style/web/components/radio/_index.less';

// 修改后
import './overseas/index.less';  // 使用海外版本样式
```

#### 3.2 保留原版样式入口（可选）
如果需要同时支持原版和海外版本：

```javascript
// style/index.js - 原版
import '@tdesign/common-style/web/components/radio/_index.less';

// style/overseas.js - 海外版本
import './overseas/index.less';
```

**package.json 配置**:
```json
{
  "name": "tdesign-vue-next",
  "exports": {
    "./es/radio/style": "./es/radio/style/index.js",
    "./es/radio/style/overseas": "./es/radio/style/overseas.js"
  }
}
```

---

## 🧪 测试要求

### 1. 单元测试 (P1 - 重要)

#### 1.1 Focus/Blur 行为测试
**位置**: `packages/components/radio/__tests__/radio-focus.spec.ts`

```typescript
import { mount } from '@vue/test-utils';
import Radio from '../radio';

describe('Radio Focus Behavior', () => {
  it('should add focusInput class on focus', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', label: 'Test' },
    });
    
    const input = wrapper.find('.t-radio__former');
    await input.trigger('focus');
    
    const inputElement = wrapper.find('.t-radio__input');
    expect(inputElement.classes()).toContain('focusInput');
  });
  
  it('should remove focusInput class on blur', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', label: 'Test' },
    });
    
    const input = wrapper.find('.t-radio__former');
    await input.trigger('focus');
    await input.trigger('blur');
    
    const inputElement = wrapper.find('.t-radio__input');
    expect(inputElement.classes()).toContain('normalInput');
    expect(inputElement.classes()).not.toContain('focusInput');
  });
  
  it('should render focusBox element', () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', label: 'Test' },
    });
    
    expect(wrapper.find('.focusBox').exists()).toBe(true);
  });
});
```

#### 1.2 样式状态测试
**位置**: `packages/components/radio/__tests__/radio-style.spec.ts`

```typescript
describe('Radio Overseas Style', () => {
  it('should apply correct checked style', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', checked: true },
    });
    
    expect(wrapper.classes()).toContain('t-is-checked');
    
    const inputElement = wrapper.find('.t-radio__input');
    const afterStyle = window.getComputedStyle(inputElement.element, '::after');
    expect(afterStyle.opacity).toBe('1');
  });
  
  it('should apply disabled style correctly', () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', disabled: true, checked: true },
    });
    
    expect(wrapper.classes()).toContain('t-is-disabled');
    const inputElement = wrapper.find('.t-radio__input');
    expect(inputElement.element.style.backgroundColor).toBe('#F0F1F2');
  });
});
```

### 2. 视觉回归测试 (P1 - 重要)

#### 2.1 对比 Vue2 版本截图
**工具**: Playwright + percy.io / chromatic

**测试场景**:
- 默认态
- Hover 态
- Focus 态 (显示蓝色外圈)
- 选中态 (显示圆环)
- 禁用态
- 禁用选中态

#### 2.2 浏览器兼容性测试
**测试浏览器**:
- Chrome >= 84
- Firefox >= 83
- Safari >= 14.1
- Edge >= 84

### 3. 手动测试清单 (P0 - 必须)

**测试步骤**:
1. **基础渲染**
   - [ ] Radio 正常渲染
   - [ ] Label 文本正确显示
   - [ ] 外圈边框颜色正确
   
2. **交互测试**
   - [ ] 点击选中/取消选中功能正常
   - [ ] Tab 键切换焦点
   - [ ] 键盘 Space 键选中
   
3. **Focus 视觉反馈**
   - [ ] Tab 键聚焦时显示蓝色外圈
   - [ ] 失去焦点时外圈消失
   - [ ] 鼠标点击不触发外圈 (仅键盘聚焦)
   
4. **选中态样式**
   - [ ] 选中后显示圆环 (非实心圆)
   - [ ] 圆环颜色为 `#1b72e3`
   - [ ] 圆环宽度为 5px
   
5. **Hover 效果**
   - [ ] 鼠标悬停时外圈变色
   - [ ] 颜色与 Vue2 版本一致
   
6. **禁用态**
   - [ ] 禁用态背景色 `#F0F1F2`
   - [ ] 禁用选中态圆环颜色 `#a1aab3`
   - [ ] 禁用态无 hover 效果
   - [ ] 禁用态无法点击

---

## 📊 验收标准

### 1. 功能验收 (P0)
- [x] 所有 Vue2 版本功能已迁移到 Vue3
- [x] Focus/Blur 事件处理正确
- [x] 键盘操作支持完整
- [x] 允许取消选中功能正常

### 2. 样式验收 (P0)
- [x] CSS 变量值与 Vue2 版本完全一致
- [x] 选中态显示圆环而非实心圆
- [x] Focus 外圈效果与 Vue2 版本一致
- [x] 禁用态样式正确
- [x] 所有颜色值与 Vue2 版本匹配

### 3. 性能验收 (P1)
- [x] 首次渲染时间 < 50ms
- [x] Focus/Blur 切换响应 < 16ms (60fps)
- [x] 无内存泄漏

### 4. 兼容性验收 (P1)
- [x] Chrome/Edge >= 84 正常运行
- [x] Firefox >= 83 正常运行
- [x] Safari >= 14.1 正常运行

### 5. 代码质量验收 (P0)
- [x] TypeScript 类型检查通过
- [x] ESLint 检查无错误
- [x] 单元测试覆盖率 >= 80%
- [x] 所有测试用例通过

---

## 🗂️ 文件清单

### 新增文件
```
packages/components/radio/
├── style/overseas/
│   ├── index.less                      # 海外版本主样式
│   ├── _var.less                       # CSS 变量定义
│   └── _mixin.less                     # 样式混入 (可选)
├── hooks/
│   └── use-focus-handler.ts            # Focus 处理 Hook
└── __tests__/
    ├── radio-focus.spec.ts             # Focus 行为测试
    └── radio-style.spec.ts             # 样式状态测试
```

### 修改文件
```
packages/components/radio/
├── radio.tsx                           # 添加 focusBox 和 focus 事件
└── style/index.js                      # 修改样式导入路径
```

---

## 📅 实施计划

### Phase 1: 样式迁移 (2 工作日)
- [ ] 创建 `style/overseas/` 目录
- [ ] 编写 `_var.less` (复制 Vue2 变量)
- [ ] 编写 `index.less` (圆环样式 + Focus 外圈)
- [ ] 修改 `style/index.js` 导入路径

### Phase 2: 组件逻辑适配 (1 工作日)
- [ ] 创建 `use-focus-handler.ts` Hook
- [ ] 修改 `radio.tsx` 添加 focusBox 元素
- [ ] 集成 focus/blur 事件处理

### Phase 3: 测试与验证 (1 工作日)
- [ ] 编写单元测试
- [ ] 手动测试所有场景
- [ ] 视觉回归测试 (对比 Vue2 截图)
- [ ] 浏览器兼容性测试

### Phase 4: 文档与发布 (0.5 工作日)
- [ ] 更新组件文档
- [ ] 提交 Git Commit
- [ ] 创建 PR 并通过 Code Review

**总计**: ~4.5 工作日

---

## ⚠️ 风险评估

### 高风险 🔴
1. **Focus 外圈在 Safari 的兼容性**
   - **风险**: Safari 浏览器对 focus 事件处理可能不一致
   - **缓解**: 同时在 label 和 input 上监听 focus/blur 事件
   - **回退方案**: 使用 `:focus-visible` CSS 伪类

2. **样式覆盖优先级**
   - **风险**: TDesign 原版样式可能覆盖海外版本样式
   - **缓解**: 使用更具体的选择器或 `!important`
   - **回退方案**: 完全移除原版样式导入

### 中风险 🟡
3. **圆环样式的渲染性能**
   - **风险**: `::after` 伪元素的边框动画可能影响性能
   - **缓解**: 使用 GPU 加速 (`will-change: transform`)
   - **监控**: 通过 Performance API 监控渲染时间

4. **与 Radio Group 的集成**
   - **风险**: Focus 处理可能影响 Radio Group 的行为
   - **缓解**: 在 Radio Group 中测试 Tab 键切换
   - **回退方案**: 在 Radio Group 中禁用单个 Radio 的 focus 处理

### 低风险 🟢
5. **TypeScript 类型定义**
   - **风险**: 新增的 Hook 可能缺少类型定义
   - **缓解**: 严格定义所有类型
   - **监控**: 通过 `tsc --noEmit` 检查

---

## 📚 附录

### A. Vue2 vs Vue3 关键差异对比

| 特性 | Vue2 实现 | Vue3 实现 |
|------|----------|----------|
| 组件语法 | Options API + TSX | Composition API + TSX |
| Ref 访问 | `this.$el` | `ref<HTMLElement>()` |
| 事件监听 | `on={{ ...this.$listeners }}` | `{...inputEvents.value}` |
| Class 切换 | `this.$el.children[1].classList` | `inputRef.value.querySelector()` |
| Focus 状态 | 直接操作 DOM | Composable Hook |

### B. CSS 变量继承关系

```
@tdesign/common-style (原版基础变量)
    ↓
packages/common/style/web/theme/_light.less (项目级变量)
    ↓
packages/components/radio/style/overseas/_var.less (海外版本变量)
```

### C. 相关资源链接
- TDesign 官方文档: https://tdesign.tencent.com/vue-next/components/radio
- Vue3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
- CSS ::after 伪元素: https://developer.mozilla.org/en-US/docs/Web/CSS/::after

---

## ✅ 变更记录

| 日期 | 版本 | 变更人 | 变更内容 |
|------|------|--------|---------|
| 2026-02-10 | v1.0.0 | @v_genyin | 初始版本，定义 Radio 海外适配规格 |

---

**规格状态**: ✅ 待审批  
**下一步**: 等待技术评审通过后开始 Phase 1 实施
