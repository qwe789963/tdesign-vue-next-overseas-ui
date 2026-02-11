# Checkbox 海外适配版本 规格说明书

> **规范引用**: 本规格说明书遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| **功能名称** | Checkbox 多选组件海外适配 |
| **TAPD 编号** | 无 |
| **负责人** | @v_genyin |
| **创建日期** | 2026-02-11 |
| **目标版本** | v1.0.0 |
| **优先级** | P0（最高） |

---

## 🎯 需求背景

### 项目背景
- TDesign Vue Next 项目 fork 后需要针对海外系统进行定制化开发
- 之前已有基于 Vue 2.6 的海外 UI 组件库 (`s2-overseas-ui`)
- 需要将 Vue2 版本的海外定制样式迁移到 Vue3 版本，确保功能和视觉效果一致

### 目标
1. **功能一致性**: 确保 Vue3 版本的 Checkbox 组件功能与 Vue2 版本完全兼容
2. **视觉一致性**: 样式效果（颜色、边框、圆角、CSS变量等）与 Vue2 版本保持一致
3. **交互一致性**: 所有交互状态（hover、active、focus、disabled、indeterminate）效果一致
4. **架构优化**: 利用 Vue3 的 Composition API 和性能优势

### 参考资料
- **Vue2 版本源码**: `c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui/packages/overseas/src/checkbox/`
- **Vue3 目标路径**: `c:/Users/v_genyin/Desktop/overseas-ui-vue3/tdesign-vue-next-overseas-ui/packages/components/checkbox/`

---

## 🔍 现状分析

### Vue2 版本关键特性

#### 1. **Focus 视觉反馈机制**
- Vue2 版本实现了自定义的 focus 视觉反馈
- 当 Checkbox 获得焦点时显示外框蓝色边框 (`.focusBox`)
- 使用 `isFocus` 状态管理焦点状态

```typescript
// Vue2: checkbox.tsx (L136-L141)
addFocusClass(event) {
  this.isFocus = true
},
cancelFocusClass() {
  this.isFocus = false
}
```

```typescript
// Vue2: checkbox.tsx (L50-L58)
focusClasses(): ClassName {
  return [
    `${this.componentName}__input`,
    {
      focusClass: this.isFocus,
      normalClass: !this.isFocus,
    },
  ];
}
```

```less
// Vue2: _index.less (L45-L56)
.focusBox {
  box-sizing: border-box;
  position: absolute;
  display: none;
  width: @checkbox-size + 10px;
  height: @checkbox-size + 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  border: 2px solid @checkbox-input-color-checked;
}
```

#### 2. **勾选标记样式定制**
- Vue2 版本使用**斜向勾选标记**（`√` 形状）
- 勾选框尺寸为 18px × 18px
- 勾选标记使用 `::after` 伪元素 + CSS transform

```less
// Vue2: _index.less (L97-L109)
&::after {
  opacity: 1;
  top: ((@checkbox-size) / 2 - 2px);
  left: ((@checkbox-size) / 2 - 5px);
  width: @checkbox-check-width;     // 5px
  height: @checkbox-check-height;   // 9px
  border: 2px solid @checkbox-check-color;
  border-radius: 0 0 1px;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
  background: transparent;
}
```

#### 3. **半选态样式（Indeterminate）**
- 半选态显示短横线而非勾选标记
- 横线宽度 16px，高度 4px

```less
// Vue2: _index.less (L120-L129)
&::after {
  opacity: 1;
  width: @checkbox-indeterminate-width;   // 16px
  height: @checkbox-indeterminate-height; // 4px
  right: 0;
  top: ((@checkbox-size - 2 - @checkbox-indeterminate-height) * .5);
  border: unset;
  transform: scale(.5);
  background-color: @checkbox-indeterminate-color;
}
```

#### 4. **自定义 CSS 变量值**
Vue2 版本重新定义了关键 CSS 变量：

| CSS 变量 | Vue2 值 | 用途 |
|---------|---------|------|
| `@checkbox-border-color` | `@border-level-2-color` | 未选中边框颜色 |
| `@checkbox-border-color-checked` | `@brand-color` | 选中态边框颜色 |
| `@checkbox-border-color-hover` | `@brand-color` | 悬停态边框颜色 |
| `@checkbox-input-color` | `@bg-color-container` | 背景色 |
| `@checkbox-input-color-checked` | `@brand-color` | 选中态背景色 |
| `@checkbox-input-color-disabled` | `@bg-color-component-disabled` | 禁用态背景色 |
| `@checkbox-check-color` | `@text-color-anti` | 勾选标记颜色（白色） |
| `@checkbox-size` | `18px` | Checkbox 尺寸 |
| `@checkbox-border-radius` | `2px` | 圆角（海外版本使用小圆角） |
| `@checkbox-input-label-spacer` | `@spacer-l` | 标签间距 |

#### 5. **禁用态样式**
禁用态的特殊颜色处理：

```less
// Vue2: _index.less (L133-L160)
&.@{prefix}-is-disabled {
  cursor: not-allowed;
  
  .t-checkbox__label {
    color: @checkbox-check-color-disabled;
  }
  
  .t-checkbox__input {
    background-color: @checkbox-input-color-disabled;
    border: 1px solid #CED3D9;  // 禁用态边框
  }
  
  // 禁用且选中
  &.@{prefix}-is-checked {
    .t-checkbox__input {
      border-color: #A1AAB3;
      background-color: #A1AAB3;
    }
  }
  
  // 禁用且半选
  &.@{prefix}-is-indeterminate {
    .t-checkbox__input {
      border-color: #A1AAB3;
      background-color: #A1AAB3;
    }
  }
}
```

#### 6. **Tooltip 支持**
Vue2 版本支持在 Label 上显示 Tooltip：

```tsx
// Vue2: checkbox.tsx (L104-L109)
{this.showTooltip?<t-tooltip content={renderContent(this, 'default', 'label')} placement="top">
<span class={`${this.componentName}__label`} onClick={this.handleLabelClick}>
  {renderContent(this, 'default', 'label')}
</span></t-tooltip>:<span class={`${this.componentName}__label`} onClick={this.handleLabelClick}>
  {renderContent(this, 'default', 'label')}
</span>}
```

### Vue3 版本现状

#### 1. **样式系统**
- Vue3 版本使用 TDesign 官方样式: `@tdesign/common-style/web/components/checkbox/_index.less`
- 缺少海外版本的自定义样式变量和 focus 反馈机制
- 使用官方的勾选标记样式和尺寸

#### 2. **组件结构**
- Vue3 版本使用 TSX + Composition API
- 没有 `.focusBox` 元素和 focus/blur 事件处理
- 内圈样式使用原版设计

```tsx
// Vue3: checkbox.tsx
<span class={inputClass.value}></span>
```

---

## ✅ 功能规格

### 1. 样式适配 (P0 - 必须)

#### 1.1 创建海外版本样式文件
**位置**: `packages/components/checkbox/style/overseas/`

**文件结构**:
```
packages/components/checkbox/style/overseas/
├── index.less          # 主样式文件
├── _var.less           # CSS 变量定义
└── _mixin.less         # 样式混入 (保留为空)
```

#### 1.2 CSS 变量定义 (_var.less)
**要求**: 与 Vue2 版本完全一致

```less
// 组件变量定义
@checkbox-cls: ~"@{prefix}-checkbox";

// 颜色
@checkbox-border-color: @border-level-2-color;
@checkbox-border-color-checked: @brand-color;
@checkbox-border-color-hover: @brand-color;

@checkbox-input-color: @bg-color-container;
@checkbox-input-color-checked: @brand-color;
@checkbox-input-color-disabled: @bg-color-component-disabled;

@checkbox-check-color: @text-color-anti;
@checkbox-check-color-disabled: @text-color-disabled;
@checkbox-check-icon-disabled-color: @text-color-disabled;

@checkbox-input-color-indeterminate: @brand-color;
@checkbox-indeterminate-color-disabled: @text-color-disabled;

@checkbox-label-color: @text-color-primary;

// 尺寸
@checkbox-size: 18px;
@checkbox-border-radius: 2px;
@checkbox-margin-right: @comp-margin-s;

@checkbox-check-width: 5px;
@checkbox-check-height: 9px;
@checkbox-check-size: (
  (@checkbox-check-width + @checkbox-check-height) / sqrt(2)
);
@checkbox-check-left: 3px;

@checkbox-indeterminate-width: 16px;
@checkbox-indeterminate-height: 4px;
@checkbox-indeterminate-color: @font-white-1;

// 字号
@checkbox-font: @font-body-medium;

// padding
@checkbox-input-label-spacer: @spacer-l;

// 组合复选框margin
@checkbox-group-gap: @spacer-2;
// 单个复选框margin
@checkbox-margin: inherit;
```

#### 1.3 勾选框样式实现 (index.less)
**要求**: 选中态显示斜向勾选标记，半选态显示横线

```less
// 组件允许单个组件打包，因此默认引入公共基础样式
@import "../../../../overseas/style/base.less";
@import "./_var.less";
@import "./_mixin.less";

// Checkbox Group
.t-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: @checkbox-group-gap;
}

// Checkbox
.t-checkbox {
  padding-left: 6px;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: @checkbox-label-color;

  & + .t-checkbox {
    margin-left: @checkbox-margin;
  }

  &__former {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &__input {
    position: relative;
    display: inline-block;
    width: @checkbox-size;
    height: @checkbox-size;
    vertical-align: middle;
    border: 1px solid @checkbox-border-color;
    border-radius: @checkbox-border-radius;
    background-color: @checkbox-input-color;
    box-sizing: border-box;
    
    // Focus 外框
    .focusBox {
      box-sizing: border-box;
      position: absolute;
      display: none;
      width: @checkbox-size + 10px;
      height: @checkbox-size + 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 6px;
      border: 2px solid @checkbox-input-color-checked;
    }

    &::after {
      content: "";
      position: absolute;
      opacity: 0;
      box-sizing: border-box;
    }
  }

  &__label {
    display: inline-block;
    margin-left: @checkbox-input-label-spacer;
    vertical-align: middle;
    font: @checkbox-font;
  }

  // Hover 效果
  &:hover {
    .t-checkbox__input {
      border-color: @checkbox-border-color-hover;
      transition: border-color @anim-duration-base linear;
    }
  }

  // 选中态
  &.@{prefix}-is-checked {
    .t-checkbox__input {
      border-color: @checkbox-border-color-checked;
      background-color: @checkbox-input-color-checked;
      transition: background-color @anim-duration-base @anim-time-fn-ease-in;
      
      // Focus 状态
      &.normalClass {
        .focusBox { 
          display: none;
        }
      }
      &.focusClass {
        .focusBox { 
          display: inline-block;
        }
      }
      
      // 勾选标记（√ 形状）
      &::after {
        opacity: 1;
        top: ((@checkbox-size) / 2 - 2px);
        left: ((@checkbox-size) / 2 - 5px);
        width: @checkbox-check-width;
        height: @checkbox-check-height;
        border: 2px solid @checkbox-check-color;
        border-radius: 0 0 1px;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        background: transparent;
      }
    }
  }

  // 半选态
  &.@{prefix}-is-indeterminate {
    .t-checkbox__input {
      border-color: @checkbox-input-color-indeterminate;
      background-color: @checkbox-input-color-indeterminate;
      transition: background-color @anim-duration-base @anim-time-fn-ease-in;

      // 横线标记
      &::after {
        opacity: 1;
        width: @checkbox-indeterminate-width;
        height: @checkbox-indeterminate-height;
        right: 0;
        top: ((@checkbox-size - 2 - @checkbox-indeterminate-height) * .5);
        border: unset;
        transform: scale(.5);
        background-color: @checkbox-indeterminate-color;
      }
    }
  }

  // 禁用态
  &.@{prefix}-is-disabled {
    cursor: not-allowed;

    .t-checkbox__label {
      color: @checkbox-check-color-disabled;
    }

    .t-checkbox__input {
      background-color: @checkbox-input-color-disabled;
      border: 1px solid #CED3D9;
    }

    // 禁用且选中
    &.@{prefix}-is-checked {
      .t-checkbox__input {
        border-color: #A1AAB3;
        background-color: #A1AAB3;
      }
    }

    // 禁用且半选
    &.@{prefix}-is-indeterminate {
      .t-checkbox__input {
        border-color: #A1AAB3;
        background-color: #A1AAB3;
      }
    }
  }
}
```

### 2. 组件逻辑适配 (P0 - 必须)

#### 2.1 添加 focusBox 元素
**位置**: `packages/components/checkbox/checkbox.tsx`

**修改内容**:
```tsx
// 当前
<span class={inputClass.value}></span>

// 修改后
<span class={inputClass.value}>
  <span class="focusBox"></span>
</span>
```

#### 2.2 实现 Focus/Blur 事件处理
**新增 Composable**: `packages/components/checkbox/hooks/use-focus-handler.ts`

```typescript
import { ref, Ref } from 'vue';

/**
 * Checkbox Focus 处理 Hook
 * 管理 focusBox 元素的显示/隐藏
 */
export function useFocusHandler() {
  const isFocus = ref(false);
  const inputRef: Ref<HTMLElement | null> = ref(null);

  const handleFocus = () => {
    isFocus.value = true;
    if (!inputRef.value) return;
    const inputElement = inputRef.value.querySelector('.t-checkbox__input');
    if (inputElement) {
      inputElement.classList.add('focusClass');
      inputElement.classList.remove('normalClass');
    }
  };

  const handleBlur = () => {
    isFocus.value = false;
    if (!inputRef.value) return;
    const inputElement = inputRef.value.querySelector('.t-checkbox__input');
    if (inputElement) {
      inputElement.classList.add('normalClass');
      inputElement.classList.remove('focusClass');
    }
  };

  return {
    isFocus,
    inputRef,
    handleFocus,
    handleBlur,
  };
}
```

#### 2.3 组件集成 Focus 处理
**修改**: `packages/components/checkbox/checkbox.tsx`

```tsx
import { useFocusHandler } from './hooks/use-focus-handler';

export default defineComponent({
  name: 'TCheckbox',
  setup(props) {
    // ... 现有代码
    
    // 新增 focus 处理
    const { isFocus, inputRef, handleFocus, handleBlur } = useFocusHandler();
    
    // 修改 inputClass 计算（添加 focusClass/normalClass）
    const inputClass = computed(() => {
      return [
        `${prefixCls.value}__input`,
        {
          focusClass: isFocus.value,
          normalClass: !isFocus.value,
        },
      ];
    });
    
    return () => (
      <label
        ref={inputRef}  // 绑定 ref
        class={labelClass.value}
        onClick={handleLabelClick}
      >
        <input
          type="checkbox"
          class={`${prefixCls.value}__former`}
          onFocus={handleFocus}  // 添加 focus 事件
          onBlur={handleBlur}    // 添加 blur 事件
          {...inputProps.value}
        />
        <span class={inputClass.value}>
          <span class="focusBox"></span>  {/* 新增 focusBox */}
        </span>
        <span class={`${prefixCls.value}__label`}>
          {renderTNodeJSX('default', 'label')}
        </span>
      </label>
    );
  },
});
```

### 3. 样式导入配置 (P0 - 必须)

#### 3.1 修改样式入口文件
**位置**: `packages/components/checkbox/style/index.js`

```javascript
// 当前
import '@tdesign/common-style/web/components/checkbox/_index.less';

// 修改后
import './overseas/index.less';  // 使用海外版本样式
```

#### 3.2 保留原版样式入口（可选）
如果需要同时支持原版和海外版本：

```javascript
// style/index.js - 原版
import '@tdesign/common-style/web/components/checkbox/_index.less';

// style/overseas.js - 海外版本
import './overseas/index.less';
```

---

## 🧪 测试要求

### 1. 单元测试 (P1 - 重要)

#### 1.1 Focus/Blur 行为测试
**位置**: `packages/components/checkbox/__tests__/checkbox-focus.spec.ts`

```typescript
import { mount } from '@vue/test-utils';
import Checkbox from '../checkbox';

describe('Checkbox Focus Behavior', () => {
  it('should add focusClass on focus', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', label: 'Test' },
    });
    
    const input = wrapper.find('.t-checkbox__former');
    await input.trigger('focus');
    
    const inputElement = wrapper.find('.t-checkbox__input');
    expect(inputElement.classes()).toContain('focusClass');
  });
  
  it('should remove focusClass on blur', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', label: 'Test' },
    });
    
    const input = wrapper.find('.t-checkbox__former');
    await input.trigger('focus');
    await input.trigger('blur');
    
    const inputElement = wrapper.find('.t-checkbox__input');
    expect(inputElement.classes()).toContain('normalClass');
    expect(inputElement.classes()).not.toContain('focusClass');
  });
  
  it('should render focusBox element', () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', label: 'Test' },
    });
    
    expect(wrapper.find('.focusBox').exists()).toBe(true);
  });
});
```

#### 1.2 样式状态测试
**位置**: `packages/components/checkbox/__tests__/checkbox-style.spec.ts`

```typescript
describe('Checkbox Overseas Style', () => {
  it('should apply correct checked style', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', checked: true },
    });
    
    expect(wrapper.classes()).toContain('t-is-checked');
    
    const inputElement = wrapper.find('.t-checkbox__input');
    const afterStyle = window.getComputedStyle(inputElement.element, '::after');
    expect(afterStyle.opacity).toBe('1');
  });
  
  it('should apply indeterminate style correctly', () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', indeterminate: true },
    });
    
    expect(wrapper.classes()).toContain('t-is-indeterminate');
  });
  
  it('should apply disabled style correctly', () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'test', disabled: true, checked: true },
    });
    
    expect(wrapper.classes()).toContain('t-is-disabled');
    const inputElement = wrapper.find('.t-checkbox__input');
    expect(inputElement.element.style.backgroundColor).toBe('#A1AAB3');
  });
});
```

### 2. 视觉回归测试 (P1 - 重要)

#### 2.1 对比 Vue2 版本截图
**工具**: Playwright + percy.io / chromatic

**测试场景**:
- 默认态（未选中）
- Hover 态
- Focus 态（显示蓝色外框）
- 选中态（显示勾选标记）
- 半选态（显示横线）
- 禁用态
- 禁用选中态
- 禁用半选态

#### 2.2 浏览器兼容性测试
**测试浏览器**:
- Chrome >= 84
- Firefox >= 83
- Safari >= 14.1
- Edge >= 84

### 3. 手动测试清单 (P0 - 必须)

**测试步骤**:
1. **基础渲染**
   - [ ] Checkbox 正常渲染
   - [ ] Label 文本正确显示
   - [ ] 外框边框颜色正确
   
2. **交互测试**
   - [ ] 点击选中/取消选中功能正常
   - [ ] Tab 键切换焦点
   - [ ] 键盘 Space 键选中
   
3. **Focus 视觉反馈**
   - [ ] Tab 键聚焦时显示蓝色外框
   - [ ] 失去焦点时外框消失
   - [ ] 鼠标点击不触发外框（仅键盘聚焦）
   
4. **选中态样式**
   - [ ] 选中后显示白色勾选标记（√ 形状）
   - [ ] 勾选标记位置居中
   - [ ] 背景色变为品牌色
   
5. **半选态样式**
   - [ ] 半选态显示白色横线
   - [ ] 横线宽度和位置正确
   - [ ] 背景色变为品牌色
   
6. **Hover 效果**
   - [ ] 鼠标悬停时边框变色
   - [ ] 颜色与 Vue2 版本一致
   
7. **禁用态**
   - [ ] 禁用态背景色 `@bg-color-component-disabled`
   - [ ] 禁用选中态背景色 `#A1AAB3`
   - [ ] 禁用态无 hover 效果
   - [ ] 禁用态无法点击

---

## 📊 验收标准

### 1. 功能验收 (P0)
- [ ] 所有 Vue2 版本功能已迁移到 Vue3
- [ ] Focus/Blur 事件处理正确
- [ ] 键盘操作支持完整
- [ ] 选中/取消选中功能正常
- [ ] 半选态功能正常
- [ ] CheckboxGroup 集成正常

### 2. 样式验收 (P0)
- [ ] CSS 变量值与 Vue2 版本完全一致
- [ ] 选中态显示勾选标记而非实心圆
- [ ] Focus 外框效果与 Vue2 版本一致
- [ ] 半选态横线样式正确
- [ ] 禁用态样式正确
- [ ] 所有颜色值与 Vue2 版本匹配

### 3. 性能验收 (P1)
- [ ] 首次渲染时间 < 50ms
- [ ] Focus/Blur 切换响应 < 16ms (60fps)
- [ ] 无内存泄漏

### 4. 兼容性验收 (P1)
- [ ] Chrome/Edge >= 84 正常运行
- [ ] Firefox >= 83 正常运行
- [ ] Safari >= 14.1 正常运行

### 5. 代码质量验收 (P0)
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查无错误
- [ ] 单元测试覆盖率 >= 80%
- [ ] 所有测试用例通过

---

## 🗂️ 文件清单

### 新增文件
```
packages/components/checkbox/
├── style/overseas/
│   ├── index.less                      # 海外版本主样式
│   ├── _var.less                       # CSS 变量定义
│   └── _mixin.less                     # 样式混入 (空文件)
├── hooks/
│   └── use-focus-handler.ts            # Focus 处理 Hook
└── __tests__/
    ├── checkbox-focus.spec.ts          # Focus 行为测试
    └── checkbox-style.spec.ts          # 样式状态测试
```

### 修改文件
```
packages/components/checkbox/
├── checkbox.tsx                        # 添加 focusBox 和 focus 事件
└── style/index.js                      # 修改样式导入路径
```

---

## 📅 实施计划

### Phase 1: 样式迁移 (2 工作日)
- [ ] 创建 `style/overseas/` 目录
- [ ] 编写 `_var.less`（复制 Vue2 变量）
- [ ] 编写 `index.less`（勾选标记 + 横线 + Focus 外框）
- [ ] 修改 `style/index.js` 导入路径

### Phase 2: 组件逻辑适配 (1 工作日)
- [ ] 创建 `use-focus-handler.ts` Hook
- [ ] 修改 `checkbox.tsx` 添加 focusBox 元素
- [ ] 集成 focus/blur 事件处理

### Phase 3: 测试与验证 (1 工作日)
- [ ] 编写单元测试
- [ ] 手动测试所有场景
- [ ] 视觉回归测试（对比 Vue2 截图）
- [ ] 浏览器兼容性测试

### Phase 4: 文档与发布 (0.5 工作日)
- [ ] 更新组件文档
- [ ] 提交 Git Commit
- [ ] 创建 PR 并通过 Code Review

**总计**: ~4.5 工作日

---

## ⚠️ 风险评估

### 高风险 🔴
1. **Focus 外框在 Safari 的兼容性**
   - **风险**: Safari 浏览器对 focus 事件处理可能不一致
   - **缓解**: 同时在 label 和 input 上监听 focus/blur 事件
   - **回退方案**: 使用 `:focus-visible` CSS 伪类

2. **样式覆盖优先级**
   - **风险**: TDesign 原版样式可能覆盖海外版本样式
   - **缓解**: 使用更具体的选择器或 `!important`
   - **回退方案**: 完全移除原版样式导入

### 中风险 🟡
3. **勾选标记的渲染性能**
   - **风险**: `::after` 伪元素的 transform 动画可能影响性能
   - **缓解**: 使用 GPU 加速（`will-change: transform`）
   - **监控**: 通过 Performance API 监控渲染时间

4. **与 CheckboxGroup 的集成**
   - **风险**: Focus 处理可能影响 CheckboxGroup 的行为
   - **缓解**: 在 CheckboxGroup 中测试 Tab 键切换
   - **回退方案**: 在 CheckboxGroup 中禁用单个 Checkbox 的 focus 处理

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
| Focus 状态 | `data() { isFocus: false }` | `const isFocus = ref(false)` |
| Class 切换 | `this.focusClasses` computed | `inputClass` computed + ref |
| 事件监听 | `onFocus={this.addFocusClass}` | `onFocus={handleFocus}` |
| 模板渲染 | `render(): VNode` | `setup() return () => JSX` |

### B. CSS 变量继承关系

```
@tdesign/common-style (原版基础变量)
    ↓
packages/common/style/web/theme/_light.less (项目级变量)
    ↓
packages/components/checkbox/style/overseas/_var.less (海外版本变量)
```

### C. 相关资源链接
- TDesign 官方文档: https://tdesign.tencent.com/vue-next/components/checkbox
- Vue3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
- CSS ::after 伪元素: https://developer.mozilla.org/en-US/docs/Web/CSS/::after

---

## ✅ 变更记录

| 日期 | 版本 | 变更人 | 变更内容 |
|------|------|--------|---------|
| 2026-02-11 | v1.0.0 | @v_genyin | 初始版本，定义 Checkbox 海外适配规格 |

---

**规格状态**: ✅ 待审批  
**下一步**: 等待技术评审通过后开始 Phase 1 实施
