# Radio 海外适配 - 研究报告

---

## R1: Vue2 错误处理机制研究

### 研究目标
确认 Vue2 版本 RadioGroup 集成的边界情况处理逻辑

### 研究结论

**场景 1: Radio 的 `name` 属性与 RadioGroup 冲突**
- Vue2 行为: RadioGroup 的 `name` 优先，子 Radio 的 `name` 被忽略
- 无错误抛出，无控制台警告

**场景 2: RadioGroup 的 `modelValue` 与子 Radio 的 `checked` 不同步**
- Vue2 行为: `modelValue` 优先，`checked` 被覆盖
- 无错误抛出，无控制台警告

**场景 3: 动态添加/删除 Radio 子组件**
- Vue2 行为: 自动同步状态，无需手动处理
- 无错误抛出，无控制台警告

### Vue3 实施建议
- 采用相同的"宽松模式"，优先级: RadioGroup > Radio
- 不添加错误抛出或控制台警告
- 依赖 Vue 的响应式系统自动同步状态

---

## R2: Focus 状态持久性研究

### 研究目标
确认 Focus 外圈在不同场景下的显示时机

### 测试场景

#### 场景 1: 点击 Radio A → 检查外圈是否保持
**结果**: 
- 点击后外圈**立即消失**
- Focus 状态仅在元素持有焦点时显示

#### 场景 2: Tab 到 Radio B → 检查 Radio A 外圈是否消失
**结果**:
- Radio A 的外圈**立即消失**
- Radio B 的外圈**显示**
- Focus 状态与选中状态独立

#### 场景 3: 空格键选中 → 检查外圈行为
**结果**:
- 空格键触发选中
- 外圈**保持显示**（因为焦点未移动）
- 再次 Tab 后外圈消失

### 结论
- **Focus 外圈仅在当前聚焦时显示**
- **失焦后立即消失**，无论是否选中
- **Focus 状态与选中状态完全独立**

### Vue3 实施建议
```typescript
// Focus 外圈显示逻辑
const handleFocus = () => {
  inputElement?.classList.add('focusInput');
  inputElement?.classList.remove('normalInput');
};

const handleBlur = () => {
  inputElement?.classList.add('normalInput');
  inputElement?.classList.remove('focusInput');
};
```

---

## R3: Less 变量可用性研究

### 研究目标
确认 TDesign 的 Less 变量是否完全支持海外版本所需变量

### 变量检查结果

#### 可用的 TDesign 基础变量
| 变量名 | 文件位置 | 值 | 状态 |
|--------|---------|-----|------|
| `@border-level-2-color` | `_light.less` | `#dcdcdc` | ✅ 可用 |
| `@bg-color-container` | `_light.less` | `#ffffff` | ✅ 可用 |
| `@brand-color-active` | `_light.less` | `#0052d9` | ✅ 可用 |
| `@bg-color-component-disabled` | `_light.less` | `#f3f3f3` | ✅ 可用 |
| `@text-color-primary` | `_light.less` | `#000000` | ✅ 可用 |
| `@anim-duration-base` | `_light.less` | `0.2s` | ✅ 可用 |
| `@anim-time-fn-ease-out` | `_light.less` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | ✅ 可用 |
| `@border-radius-circle` | `_light.less` | `50%` | ✅ 可用 |

#### 需要自定义的海外版本变量
| 变量名 | Vue2 值 | 用途 | 状态 |
|--------|---------|------|------|
| `@radio-size` | `18px` | Radio 尺寸 | ❌ 需自定义 |
| `@radio-dot-size` | `9px` | 圆环中心位置计算 | ❌ 需自定义 |
| `@radio-input-label-spacer` | `12px` | 标签间距 | ❌ 需自定义 |
| `@radio-input-color-disabled` | `#F0F1F2` | 禁用态背景 | ❌ 需自定义 |
| `@radio-dot-color-disabled-checked` | `#CED3D9` | 禁用选中态边框 | ❌ 需自定义 |

### 颜色值差异对比

#### 海外版本 vs TDesign 官方
| 场景 | TDesign 官方 | 海外版本 | 差异 |
|------|-------------|---------|------|
| 外圈边框 | `#dcdcdc` | `#dcdcdc` | ✅ 一致 |
| 选中态主色 | `#0052d9` | `#1b72e3` | ❌ **不同** |
| 禁用态背景 | `#f3f3f3` | `#F0F1F2` | ⚠️ 略有差异 |
| 禁用选中边框 | - | `#a1aab3` | ❌ 海外独有 |

### Vue3 实施建议

**_var.less 结构**:
```less
// 1. 导入 TDesign 基础变量
@import '../../../common/style/web/theme/_light.less';

// 2. 海外版本自定义变量
@radio-cls: ~"@{prefix}-radio";

// 尺寸
@radio-size: 18px;
@radio-dot-size: (@radio-size / 2);
@radio-input-label-spacer: 12px;

// 颜色 (覆盖官方值)
@radio-dot-color: #1b72e3;  // 选中态主色
@radio-input-color-disabled: #F0F1F2;
@radio-dot-color-disabled-checked: #CED3D9;

// 继承 TDesign 基础变量
@radio-border-color: @border-level-2-color;
@radio-input-color: @bg-color-container;
@radio-label-color: @text-color-primary;
```

---

## 技术选择汇总

### 最佳实践

#### 1. Focus 处理
**选择**: DOM 类名切换 (与 Vue2 一致)  
**替代方案**: 
- ❌ 响应式状态 (`ref<boolean>`) - 增加复杂度
- ❌ CSS `:focus-visible` - 与 Vue2 行为不同

#### 2. 样式隔离
**选择**: 独立目录 `style/overseas/`  
**替代方案**:
- ❌ CSS 变量覆盖 - 无法完全控制样式
- ❌ 修饰类 `.t-radio--overseas` - 增加使用复杂度

#### 3. 错误处理
**选择**: 宽松模式，无错误抛出  
**替代方案**:
- ❌ 严格模式 - 可能破坏现有业务

---

## 未解决问题

**无** - 所有研究任务已完成

---

## 参考资料

- Vue2 源码: `c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui/packages/overseas/src/radio/`
- TDesign 变量: `packages/common/style/web/theme/_light.less`
- Vue3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
