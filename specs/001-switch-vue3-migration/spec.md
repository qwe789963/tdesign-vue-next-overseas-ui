# 功能规格：Switch 组件 Vue2 到 Vue3 迁移改造

**功能编号**: 001  
**创建日期**: 2026-02-11  
**状态**: 规划中  
**优先级**: 高

---

## 1. 功能概述

### 1.1 目标

将 TDesign 海外版 UI 组件库的 Switch（开关）组件从 Vue 2.6 版本迁移到 Vue 3，确保迁移后的组件在样式、功能和交互效果上与 Vue2 版本**完全一致**。

### 1.2 背景

- 现有的海外版 UI 组件库基于 Vue 2.6 构建，无法兼容 Vue 3 项目
- 需要从 TDesign 官方仓库 fork 代码，创建海外版 Vue 3 分支
- Switch 组件是基础交互组件之一，需要优先完成迁移
- 必须保持与 Vue2 版本的视觉和交互一致性

### 1.3 范围

**包含**:
- Switch 组件核心功能迁移（TSX 文件）
- 样式文件完整迁移（LESS 文件）
- 焦点样式特性（focusBox）迁移
- 类型定义更新
- 示例代码验证

**不包含**:
- 单元测试编写（已有测试文件）
- 文档内容修改（保持 TDesign 官方文档结构）
- 新功能添加（严格对齐 Vue2 版本）

---

## 2. 用户场景

### 2.1 主要用户场景

#### 场景 1: 开发者使用 Switch 组件
**角色**: 前端开发者  
**目标**: 在 Vue 3 项目中使用海外版 Switch 组件  
**前提条件**: 已安装海外版 Vue 3 组件库  

**流程**:
1. 开发者在 Vue 3 项目中导入 Switch 组件
2. 开发者设置 Switch 的 props（size、loading、disabled 等）
3. 开发者绑定 v-model 实现双向绑定
4. Switch 正常渲染并响应用户交互
5. 样式和交互效果与 Vue2 版本一致

**预期结果**:
- Switch 组件正确渲染
- 所有 Vue2 版本的功能特性可用
- 焦点样式（蓝色边框）正常显示
- 加载状态、禁用状态表现正确

#### 场景 2: 用户与 Switch 交互
**角色**: 终端用户  
**目标**: 通过点击切换开关状态  
**前提条件**: 页面中渲染了 Switch 组件  

**流程**:
1. 用户看到 Switch 组件（开启/关闭状态）
2. 用户点击 Switch
3. Switch 状态切换（视觉反馈+值变更）
4. 如果设置了 `beforeChange`，等待异步验证
5. 状态切换完成，触发 `change` 事件

**预期结果**:
- 点击响应灵敏（无延迟）
- 状态切换动画流畅
- 加载中/禁用状态下无法点击
- 焦点状态下显示蓝色边框

#### 场景 3: 键盘焦点导航
**角色**: 使用键盘导航的用户  
**目标**: 通过 Tab 键聚焦并操作 Switch  
**前提条件**: Switch 组件未禁用  

**流程**:
1. 用户按 Tab 键导航到 Switch
2. Switch 获得焦点，显示蓝色边框（focusBox）
3. 用户点击或按空格键切换状态
4. 用户按 Tab 键移走焦点
5. 蓝色边框消失

**预期结果**:
- 焦点样式清晰可见（蓝色 2px 边框）
- 焦点状态与 Vue2 版本一致
- 禁用状态下焦点样式不显示

---

## 3. 功能需求

### 3.1 组件 API 对齐

| 属性 | Vue2 版本 | Vue3 版本（目标） | 迁移要求 |
|------|----------|------------------|---------|
| `customValue` | ✅ Array<SwitchValue> | ✅ 已存在 | 保持不变 |
| `disabled` | ✅ boolean | ✅ 已存在 | 保持不变 |
| `label` | ✅ Array/TNode | ✅ 已存在 | 保持不变 |
| `loading` | ✅ boolean | ✅ 已存在 | 保持不变 |
| `size` | ✅ small/medium/large | ✅ 已存在 | 保持不变 |
| `value` | ✅ SwitchValue | ✅ 已存在 | 保持不变 |
| `onChange` | ✅ function | ✅ 已存在 | 保持不变 |
| `beforeChange` | ❌ 不存在 | ✅ 已存在 | **保留**（Vue3 新特性） |

**要求**:
- Vue3 版本的 `beforeChange` 特性保留（异步验证场景）
- 其他 API 完全对齐 Vue2 版本

### 3.2 焦点样式特性（关键差异）

**Vue2 版本实现**:
```tsx
// 组件渲染
<div
  class={classes}
  onClick={toggle}
  tabindex="-1"
  onFocus={this.handleFocus}
  onBlur={this.handleBlur}
>
  <span class={nodeClasses}>{loadingContent}</span>
  <div class={contentClasses}>{switchContent}</div>
  <div class="focusBoxParrent" style="display: contents">
    <span class="focusBox"></span>
  </div>
</div>

// 焦点处理方法
handleFocus(): void {
  this.$el.children[2].classList.add('focusInput');
  this.$el.children[2].classList.remove('normalInput');
}
handleBlur(): void {
  this.$el.children[2].classList.add('normalInput');
  this.$el.children[2].classList.remove('focusInput');
}
```

**Vue3 版本当前实现**（缺失焦点特性）:
```tsx
<div class={classes.value} onClick={toggle}>
  <span class={nodeClasses.value}>{loadingContent}</span>
  <div class={contentClasses.value}>{switchContent}</div>
</div>
```

**迁移要求**:
1. ✅ **添加 `focusBoxParrent` 和 `focusBox` DOM 结构**
2. ✅ **实现 `handleFocus` 和 `handleBlur` 方法**
3. ✅ **添加 `tabindex="-1"` 属性**
4. ✅ **绑定 `onFocus` 和 `onBlur` 事件**

### 3.3 样式文件完整性

**Vue2 版本样式文件**:
```
style/
├── _docs.less       # 文档样式
├── _mixin.less      # Mixin 工具
├── _var.less        # 样式变量
├── css.js           # CSS 入口
├── index.js         # 样式入口
└── switch.less      # 主样式文件
```

**Vue3 版本当前样式**（严重缺失）:
```
style/
├── css.js           # ✅ 已存在
└── index.js         # ✅ 已存在
```

**迁移要求**:
1. ✅ **创建 `overseas/` 目录**（海外版样式）
2. ✅ **迁移 `_var.less`**（样式变量）
3. ✅ **迁移 `_mixin.less`**（Mixin 工具）
4. ✅ **迁移 `switch.less`** 并重命名为 `_switch.less`
5. ✅ **创建 `overseas/index.less`** 作为入口
6. ✅ **确保焦点样式（focusBox）完整迁移**

### 3.4 关键样式特性

#### 焦点样式（focusBox）
```less
.focusBox {
  box-sizing: border-box;
  position: absolute;
  display: none;
  width: 68px;      // large 尺寸
  height: 36px;
  margin-left: -4px;
  border-radius: 18px;
  border: 2px solid #1b72e3;  // 蓝色边框
}

.focusInput .focusBox {
  display: inline-block;  // 聚焦时显示
}

.normalInput .focusBox {
  display: none;          // 失焦时隐藏
}
```

#### 禁用状态下隐藏焦点
```less
.@{prefix}-is-disabled {
  .focusInput .focusBox,
  .normalInput .focusBox {
    display: none !important;  // 禁用时始终隐藏
  }
}
```

#### 尺寸适配
- **Small**: 默认尺寸（无特殊 focusBox 样式）
- **Medium**: 默认尺寸（无特殊 focusBox 样式）
- **Large**: `width: 68px; height: 36px;`

**要求**:
- 焦点样式在所有尺寸下正确显示
- 禁用状态下焦点样式不显示
- 边框颜色、宽度与 Vue2 版本一致

### 3.5 交互行为对齐

| 交互场景 | Vue2 行为 | Vue3 要求 |
|---------|----------|----------|
| 点击切换 | ✅ 正常切换 | ✅ 必须一致 |
| 加载中点击 | ❌ 阻止切换 | ✅ 必须一致 |
| 禁用状态点击 | ❌ 阻止切换 | ✅ 必须一致 |
| 获得焦点 | ✅ 显示蓝色边框 | ✅ **必须实现** |
| 失去焦点 | ✅ 隐藏边框 | ✅ **必须实现** |
| Active 状态 | ✅ 手柄拉伸效果 | ✅ 必须一致 |

---

## 4. 成功标准

### 4.1 功能完整性

- [ ] Switch 组件所有 Props 与 Vue2 版本一致
- [ ] 双向绑定（v-model）正常工作
- [ ] 自定义值（customValue）功能正常
- [ ] label 属性（字符串/数组/函数）全部支持
- [ ] 加载状态（loading）正确显示 Loading 图标
- [ ] 禁用状态（disabled）阻止交互

### 4.2 样式一致性

- [ ] 所有样式文件完整迁移到 `style/overseas/` 目录
- [ ] 三种尺寸（small/medium/large）渲染正确
- [ ] 选中/未选中状态颜色与 Vue2 一致
- [ ] 加载/禁用状态样式与 Vue2 一致
- [ ] 手柄（handle）位置和动画效果一致
- [ ] Active 状态手柄拉伸效果一致

### 4.3 焦点样式（关键验证）

- [ ] 聚焦时显示蓝色边框（2px, #1b72e3）
- [ ] 失焦时边框消失
- [ ] 禁用状态下焦点边框不显示
- [ ] Large 尺寸焦点边框尺寸正确（68x36px）
- [ ] 焦点边框圆角与组件一致

### 4.4 用户体验

- [ ] 点击响应无延迟
- [ ] 状态切换动画流畅（与 Vue2 一致）
- [ ] 键盘导航（Tab 键）正常工作
- [ ] 浏览器兼容性测试通过（Chrome/Firefox/Safari/Edge）

### 4.5 代码质量

- [ ] TypeScript 类型检查通过（无错误）
- [ ] ESLint 检查通过
- [ ] 代码结构清晰，注释完整
- [ ] 遵循 Vue 3 Composition API 最佳实践

---

## 5. 技术约束

### 5.1 技术栈

- **框架**: Vue 3.x（Composition API）
- **构建工具**: Vite
- **语言**: TypeScript 4.x + TSX
- **样式**: LESS
- **依赖**: @tdesign/shared-hooks

### 5.2 兼容性要求

- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: 18.x
- **Vue**: 3.2+

### 5.3 不允许的修改

- ❌ 不得修改 Props 定义（除非与 Vue2 对齐）
- ❌ 不得删除 Vue2 版本的任何功能特性
- ❌ 不得修改组件的视觉外观
- ❌ 不得改变交互行为逻辑

---

## 6. 关键实体

### 6.1 组件接口

```typescript
export interface TdSwitchProps<T = SwitchValue> {
  beforeChange?: () => boolean | Promise<boolean>;  // 异步验证（仅 Vue3）
  customValue?: Array<SwitchValue>;                 // 自定义值
  disabled?: boolean;                                // 禁用状态
  label?: Array<string | TNode> | TNode;            // 开关标签
  loading?: boolean;                                 // 加载状态
  size?: 'small' | 'medium' | 'large';              // 尺寸
  value?: T;                                         // 当前值
  defaultValue?: T;                                  // 默认值
  modelValue?: T;                                    // v-model
  onChange?: (value: T, context: { e: MouseEvent }) => void;  // 变更回调
}

export type SwitchValue = string | number | boolean;
```

### 6.2 焦点状态类

```typescript
// 焦点状态类名
type FocusClassName = 'focusInput' | 'normalInput';

// 焦点 DOM 结构
interface FocusBoxStructure {
  parent: HTMLElement;   // class="focusBoxParrent"
  box: HTMLElement;      // class="focusBox"
}
```

---

## 7. 依赖与假设

### 7.1 依赖

- ✅ Vue 3 项目已初始化
- ✅ `@tdesign/shared-hooks` 包已安装
- ✅ Loading 组件已迁移
- ✅ LESS 编译环境已配置

### 7.2 假设

- Vue2 版本的 Switch 组件功能正确无误
- 样式变量（`_var.less`）中的颜色值符合海外版设计规范
- 焦点样式的蓝色边框颜色 `#1b72e3` 为海外版标准色
- 开发环境已安装所有必需的依赖包

### 7.3 风险

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 焦点样式在不同浏览器表现不一致 | 中 | 多浏览器测试验证 |
| Vue3 响应式系统导致 DOM 操作失效 | 高 | 使用 `ref` 和 `nextTick` |
| 样式变量缺失导致编译失败 | 高 | 完整迁移所有 LESS 文件 |
| TypeScript 类型不兼容 | 中 | 参照 Vue2 版本类型定义 |

---

## 8. 验收标准

### 8.1 视觉验收

**方法**: 对比截图
1. 在 Vue2 项目中截取 Switch 组件各状态截图
2. 在 Vue3 项目中截取相同状态截图
3. 逐像素对比，确保一致

**状态清单**:
- [ ] 未选中状态（small/medium/large）
- [ ] 选中状态（small/medium/large）
- [ ] 加载状态（未选中/选中）
- [ ] 禁用状态（未选中/选中）
- [ ] 焦点状态（未选中/选中）
- [ ] Active 状态（点击按下）

### 8.2 功能验收

**测试用例**:
1. **基本切换**
   - 点击未选中的 Switch → 变为选中状态
   - 点击选中的 Switch → 变为未选中状态
   - 验证 `onChange` 事件触发

2. **自定义值**
   - 设置 `customValue={[1, 0]}`
   - 验证切换后值为 1 或 0（非 true/false）

3. **禁用状态**
   - 设置 `disabled={true}`
   - 点击 Switch → 无响应
   - 验证焦点样式不显示

4. **加载状态**
   - 设置 `loading={true}`
   - 验证显示 Loading 图标
   - 点击 Switch → 无响应

5. **焦点交互**
   - 按 Tab 键聚焦 → 显示蓝色边框
   - 再按 Tab 键移走焦点 → 边框消失

6. **异步验证**（Vue3 特有）
   - 设置 `beforeChange={() => new Promise(resolve => setTimeout(() => resolve(true), 1000))}`
   - 点击 Switch → 等待 1 秒 → 状态切换

### 8.3 回归测试

- [ ] 运行 `npm run test` 通过所有单元测试
- [ ] 运行 `npm run lint` 无 ESLint 错误
- [ ] 运行 `npx vue-tsc --noEmit` 无 TypeScript 错误
- [ ] 运行 `npm run build` 构建成功

---

## 9. 实施计划

### 9.1 迁移步骤

**阶段 1: 样式文件迁移**（优先级：最高）
1. 创建 `style/overseas/` 目录结构
2. 复制 Vue2 版本的 `_var.less`、`_mixin.less`
3. 复制 `switch.less` 并重命名为 `_switch.less`
4. 创建 `overseas/index.less` 入口文件
5. 验证样式编译无错误

**阶段 2: 焦点特性实现**（优先级：高）
1. 在 TSX 中添加 `focusBoxParrent` 和 `focusBox` DOM 结构
2. 实现 `handleFocus` 和 `handleBlur` 方法（使用 Vue3 方式）
3. 绑定 `onFocus` 和 `onBlur` 事件
4. 添加 `tabindex="-1"` 属性
5. 测试焦点样式显示/隐藏逻辑

**阶段 3: 功能验证**（优先级：中）
1. 测试所有 Props 功能
2. 验证双向绑定（v-model）
3. 测试加载、禁用状态
4. 验证自定义值功能
5. 测试 label 属性各种形式

**阶段 4: 最终验收**（优先级：中）
1. 多浏览器兼容性测试
2. 视觉对比验证（截图对比）
3. 性能测试（渲染性能）
4. 文档和示例代码检查

### 9.2 时间估算

| 阶段 | 预计时间 | 风险缓冲 |
|------|---------|---------|
| 阶段 1 | 2 小时 | +30 分钟 |
| 阶段 2 | 3 小时 | +1 小时 |
| 阶段 3 | 2 小时 | +30 分钟 |
| 阶段 4 | 1 小时 | +30 分钟 |
| **总计** | **8 小时** | **+2.5 小时** |

---

## 10. 附录

### 10.1 Vue2 vs Vue3 关键差异

| 特性 | Vue2 实现 | Vue3 实现 |
|------|----------|----------|
| API 风格 | Options API | Composition API + setup() |
| 响应式 | `data()` 返回对象 | `ref()` / `reactive()` |
| 生命周期 | `mounted()`/`watch` | `onMounted()`/`watchEffect()` |
| DOM 操作 | `this.$el.children[2]` | `ref<HTMLElement>()` + `.value` |
| 类名计算 | `computed` 返回数组 | `computed()` 返回 `ComputedRef` |
| 事件绑定 | `this.$emit('change')` | `emit('change')` |

### 10.2 焦点样式实现差异

**Vue2 方式**（直接 DOM 操作）:
```typescript
handleFocus(): void {
  this.$el.children[2].classList.add('focusInput');
}
```

**Vue3 推荐方式**（使用 ref）:
```typescript
const focusBoxRef = ref<HTMLElement>();

const handleFocus = () => {
  focusBoxRef.value?.classList.add('focusInput');
};
```

### 10.3 参考资料

- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [TDesign Vue 3 组件开发规范](https://tdesign.tencent.com/)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)
- Vue2 源代码: `c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\switch\`

---

## 11. 变更记录

| 日期 | 变更人 | 变更类型 | 变更内容 |
|------|--------|---------|---------|
| 2026-02-11 | AI Assistant | feat | 初始规格文档创建 |

---

## 12. 备注

**关键注意事项**:
1. 焦点样式（focusBox）是 Vue2 版本的**核心特性**，必须完整迁移
2. 禁用状态下焦点样式必须隐藏（`display: none !important`）
3. Large 尺寸的焦点边框尺寸与其他尺寸不同（需单独处理）
4. Vue3 的 `beforeChange` 特性是新增功能，需保留
5. 所有样式变量必须从 `_var.less` 中引用，不要硬编码

**测试提示**:
- 使用 Chrome DevTools 的"Toggle device toolbar"测试不同屏幕尺寸
- 使用 Tab 键测试焦点导航
- 使用 VoiceOver/NVDA 测试无障碍访问
- 对比 Vue2 和 Vue3 版本的 DOM 结构是否一致

---

**文档状态**: ✅ 规格完成，等待实施
