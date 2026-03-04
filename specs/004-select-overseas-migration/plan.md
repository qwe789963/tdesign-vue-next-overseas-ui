# Select 组件海外版迁移 - 实施计划

> **规范引用**: 本实施计划遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | select-overseas-migration |
| 规格版本 | 0.2.0 |
| 计划版本 | 0.2.0 |
| 创建日期 | 2026-02-24 |
| 更新日期 | 2026-02-27 |
| 预计完成 | 2026-02-27 |

---

## 实施概览

### 目标

将 `s2-overseas-ui`（Vue 2）项目中的 Select 组件海外版样式和交互特性迁移到当前项目（`tdesign-vue-next-overseas`，Vue 3），确保：

1. **样式一致性**：迁移后的组件在视觉上与 Vue 2 版本完全一致
2. **交互一致性**：所有交互效果（焦点、hover、按下状态等）与原版相同
3. **代码精简**：最大化复用现有 Vue 3 组件代码，采用扩展而非重写方式
4. **兼容性**：不影响现有功能，保持向后兼容

### 范围

**包含**:
- 海外版特有 Props 迁移（`suffixIconOs`、`singleUseTag`、`singleUseLabel`、`optionWarp`）
- 样式文件迁移（输入框、Tag、下拉面板、选项样式）
- 交互逻辑对齐（焦点样式、hover 状态、鼠标按下状态）
- 尺寸规范对齐（small/medium/large 三种尺寸）
- TagInput 组件 focus/blur 方法暴露
- 下拉框宽度精度优化
- 海外版 autoWidth 功能屏蔽

**不包含**:
- 单元测试编写
- 新功能添加
- 文档内容修改

---

## 技术上下文

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.x | 前端框架 |
| TypeScript | 5.x | 类型系统 |
| TSX | - | 组件语法 |
| Less | - | 样式预处理器 |

### 关键依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| `@tdesign/components` | workspace | 组件源码 |
| `@tdesign/shared-hooks` | workspace | 共享 Hooks |
| `tdesign-icons-vue-next` | catalog:tdesign | 图标库（BulletpointIcon） |

### 文件位置映射

| 用途 | Vue 2 海外版位置 | Vue 3 目标位置 |
|------|-----------------|----------------|
| 组件主文件 | `s2-overseas-ui/.../select/select.tsx` | `packages/components/select/select.tsx` |
| Props 定义 | `s2-overseas-ui/.../select/props.ts` | `packages/components/select/props.ts` |
| 主样式 | `s2-overseas-ui/.../select/style/_select.less` | `packages/components/select/style/overseas/_select.less` |
| 样式变量 | `s2-overseas-ui/.../select/style/_var.less` | `packages/components/select/style/overseas/_var.less` |
| SelectInput | - | `packages/components/select-input/` |
| TagInput | - | `packages/components/tag-input/tag-input.tsx` |

---

## 宪法检查

基于 `.specify/memory/constitution.md` 的规范要求：

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 代码规范 - 通用规范 | ✅ | 遵循 JSDOC 注释、访问修饰符等要求 |
| 代码规范 - 命名规范 | ✅ | 使用 camelCase/PascalCase 命名 |
| 非说明文件命名规范 | ✅ | 样式文件使用 `_select.less` 格式 |
| 目录结构规范 | ✅ | 样式放置在 `style/overseas/` 子目录 |
| TypeScript 规范 | ✅ | 完整的类型定义 |
| CSS 规范 | ✅ | 使用 Less 变量和 BEM 命名 |
| 前端安全规范 | N/A | 无用户输入处理 |
| 前端性能规范 | ✅ | 不影响现有性能 |

---

## 阶段划分

### 阶段 0: 研究和设计 ✅ 已完成

**目标**: 完成技术调研和设计文档

**交付物**:
- [x] `research.md` - 技术研究文档
- [x] `data-model.md` - 数据模型定义
- [x] `contracts/select-style-api.md` - API 合约
- [x] `quickstart.md` - 快速开始指南

---

### 阶段 1: Props 迁移 ✅ 已完成

**目标**: 在 Vue 3 Select 组件中添加海外版特有的属性支持

#### 1.1 Props 定义 ✅
**文件**: `packages/components/select/props.ts`

**实际改动**:
- 新增 `suffixIconOs`（String, default: `'bulletpoint'`）
- 新增 `singleUseTag`（Boolean, default: `true`）
- 新增 `singleUseLabel`（Boolean, default: `false`）
- 新增 `optionWarp`（Boolean, default: `false`）
- `valueType` validator 扩展支持 `'label'` 值

#### 1.2 类型定义更新 ✅
**文件**: `packages/components/select/type.ts`

**实际改动**:
- `TdSelectProps` 接口新增 4 个海外版属性类型声明
- `valueType` 类型扩展为 `'value' | 'object' | 'label'`

#### 1.3 组件逻辑集成 ✅
**文件**: `packages/components/select/select.tsx`

**实际改动**:
- 导入 `BulletpointIcon` 和 `Tag` 组件
- `placeholderText` 增加 `!props.singleUseTag` 条件判断
- 新增 `renderSingleTag()` 函数：单选 Tag 渲染（含 closable、禁用状态）
- 新增 `renderTag()` 函数：多选 Tag 渲染，Tag 内容用 `<span>` 包裹
- 新增 `overseasClasses` 计算属性：动态添加 `t-true-select`、`t-select-tag-true`、`t-select--filterable`、`t-select--overseas`、`t-select--option-warp` 类名
- `autoWidth` 强制为 `false`（海外版下拉框宽度跟随 trigger）
- `suffixIconOs` 存在时使用 `BulletpointIcon` 替换 `FakeArrow`
- `optionWarp` 透传到 `tagInputProps` 和 `SelectPanel`

---

### 阶段 2: 样式迁移 ✅ 已完成

**目标**: 迁移海外版 Select 组件的样式规范

#### 2.1 样式目录结构 ✅
```
packages/components/select/style/overseas/
├── index.less          # 样式入口（22 行）
├── _var.less           # 变量定义（62 行）
└── _select.less        # 主样式（466 行）
```

#### 2.2 样式变量 ✅
**文件**: `packages/components/select/style/overseas/_var.less`

导入全局变量 `../../../../overseas/style/_variables.less`，定义海外版尺寸、颜色、间距等变量。

#### 2.3 主样式 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

**两大部分**:

1. **`.t-select--overseas`**（主选择器样式）：
   - 输入框样式：min-height、border、padding
   - 焦点状态：2px 品牌色边框，无 box-shadow
   - 尺寸变体（s/l）
   - 后缀图标 `transform: none !important` 禁止旋转
   - Tag `flex-direction: row-reverse`：关闭按钮左置
   - Tag 字体 14px
   - `optionWarp` 换行模式
   - 可过滤模式：`flex-wrap: wrap` 输入框独占一行
   - suffix 绝对定位 + `padding-right: 36px` 避免重叠
   - 未聚焦时隐藏搜索输入框
   - 单选 Tag 模式：文本左对齐、清除 prefix 右 margin
   - 禁用状态样式

2. **`.t-select__dropdown--overseas`**（下拉面板，挂载在 body）：
   - 上下弹出时 `margin-top/margin-bottom: -3.5px` 与选择器紧贴
   - 2px 品牌色边框，无 shadow
   - 选项无圆角
   - hover/选中/鼠标按下/禁用四种状态样式
   - 隐藏 ripple 效果
   - 选项尺寸变体

#### 2.4 样式集成 ✅
**文件**: `packages/components/select/style/overseas/index.less` + `packages/components/select/style/index.js`

---

### 阶段 3: 交互迁移 ✅ 已完成

**目标**: 迁移海外版的交互逻辑

#### 3.1 后缀图标处理 ✅
**实际改动** (`select.tsx`):
- `suffixIconOs` 存在时渲染 `BulletpointIcon`，添加 `--overseas` 和 `--active` 类名
- CSS 中 `transform: none !important` 禁止旋转动画

#### 3.2 鼠标按下状态 ✅
**实际改动** (`option.tsx`):
- 新增 `isMouseDown` ref 追踪鼠标按下状态
- 类名动态添加 `.t-is-mouseDown`（通过 `STATUS.value.mouseDown`）
- `handleMouseDown`: 设置 `isMouseDown = true`
- `handleMouseUp`: 设置 `isMouseDown = false`
- `handleMouseLeave`: 重置 `isMouseDown = false`
- 渲染模板绑定 `onMousedown`、`onMouseup` 事件

**公共组件修改** (`shared/hooks/useCommonClassName/index.ts`):
- STATUS 计算属性中新增 `mouseDown` 类名映射

#### 3.3 Option 文本换行控制 ✅
**实际改动** (`option.tsx`):
- 新增 `optionWarp` prop
- 根据 `optionWarp` 动态使用 `wrap` 或 `nowrap` class

**透传** (`select-panel.tsx`):
- 新增 `optionWarp` prop，透传给每个 Option

#### 3.4 多选过滤模式自动聚焦 ✅
**实际改动**:
- `tag-input.tsx`: 通过 `expose` 暴露 `focus()`/`blur()` 方法，转发给内部 TInput 实例
- `select-input.tsx`: 新增 watch `actualVisible`，popup 打开时自动聚焦（多选 `tagInputRef.focus()`，单选 `inputRef.focus()`）

#### 3.5 下拉框宽度精度优化 ✅
**实际改动** (`select-input/hooks/useOverlayInnerStyle.ts`):
- `matchWidthFunc`: `triggerElement.offsetWidth` → `triggerElement.getBoundingClientRect().width`
- `getAutoWidthPopupStyleWidth`: 同样替换为 `getBoundingClientRect().width`

#### 3.6 海外版屏蔽 autoWidth ✅
**实际改动** (`select.tsx`):
- `autoWidth` 强制设为 `false`，下拉框宽度始终跟随 trigger

---

### 阶段 4: 验证测试（进行中）

**目标**: 完成功能验证和视觉对比

#### 4.1 功能验证

| 测试项 | 验证内容 | 状态 |
|--------|----------|------|
| 单选模式 | Tag 样式显示、清除功能、文本左对齐 | 进行中 |
| 多选模式 | 多 Tag 显示、折叠功能、14px 字体 | 进行中 |
| 搜索过滤 | 自动聚焦、输入框独占一行、suffix 不重叠 | 进行中 |
| 键盘导航 | 上下箭头、Enter、Escape | 待验证 |
| 禁用状态 | 样式、交互禁止 | 待验证 |
| 下拉框宽度 | 与 trigger 精确一致（含小数） | 进行中 |

#### 4.2 样式对比

| 对比项 | Vue 2 版本 | Vue 3 版本 | 状态 |
|--------|-----------|-----------|------|
| 输入框高度 | 40px | 40px | ✅ |
| Tag 高度 | 24px | 24px | ✅ |
| Tag 字体 | 14px | 14px | ✅ |
| 焦点边框 | 2px 品牌色 | 2px 品牌色 | ✅ |
| 下拉面板边框 | 2px 品牌色 | 2px 品牌色 | ✅ |
| Tag 关闭按钮位置 | 左侧 | 左侧 | ✅ |
| 后缀图标 | bulletpoint | bulletpoint | ✅ |

---

## 技术决策

### 决策 1: 样式隔离策略

**决定**: 选择 `overseas` 子目录 + 海外版类名（`.t-select--overseas`）

**理由**:
- 样式文件完全隔离，不影响标准版
- 通过 `.t-select--overseas` 类名限定作用域
- 下拉面板使用 `.t-select__dropdown--overseas` 类名（挂载在 body 上）
- 便于后续维护和扩展

### 决策 2: Props 扩展方式

**决定**: 扩展现有 `Select` 组件的 props

**理由**:
- 最小化代码变更
- 保持 API 一致性
- 用户无感知升级

### 决策 3: 单选 Tag 渲染实现

**决定**: 在 `select.tsx` 中通过 `renderValueDisplay` 内新增 `renderSingleTag()` 函数渲染

**实际实现**:
- 当 `singleUseTag` 为 true 且有选中值时，渲染 Tag 组件
- Tag 支持 closable、禁用状态判断
- Tag 内容用 `<span>` 包裹以便 CSS 样式控制

### 决策 4: TagInput focus/blur 暴露

**决定**: 在 `tag-input.tsx` 中通过 Vue 3 `expose` 暴露 focus/blur 方法

**理由**:
- TagInput 内部使用 TInput 组件（已 expose focus/blur）
- 外部通过 `tagInputRef.value?.focus?.()` 调用
- 解决多选过滤模式下 popup 打开时无法自动聚焦的问题

### 决策 5: 下拉框宽度精度

**决定**: 使用 `getBoundingClientRect().width` 替代 `offsetWidth`

**理由**:
- `offsetWidth` 返回取整值，特定宽度下 trigger 存在小数（如 199.5px）但下拉框宽度被舍入
- `getBoundingClientRect().width` 保留小数精度

### 决策 6: 海外版屏蔽 autoWidth

**决定**: 海外版强制将 `autoWidth` 设为 `false`

**理由**:
- 海外版设计要求下拉框宽度始终与 trigger 一致
- 屏蔽后避免 auto-width 模式下宽度不一致的问题

---

## 风险管理

| 风险 | 影响 | 概率 | 缓解措施 | 状态 |
|------|------|------|----------|------|
| SelectInput 不支持扩展属性 | 高 | 中 | 同时修改 SelectInput 组件 | ✅ 已解决 |
| 样式变量命名冲突 | 中 | 低 | 使用海外版特有的变量前缀 | ✅ 已解决 |
| 类型定义不兼容 | 低 | 低 | 使用 TypeScript 联合类型扩展 | ✅ 已解决 |
| 影响其他组件 | 高 | 中 | 样式作用域隔离 + 公共修改仅新增项 | ✅ 已解决 |
| TagInput 未 expose focus/blur | 高 | 高 | 在 TagInput 中添加 expose | ✅ 已解决 |
| 下拉框宽度小数精度丢失 | 中 | 高 | getBoundingClientRect 替代 offsetWidth | ✅ 已解决 |

---

## 实施约束

### 约束 1: 组件隔离性原则

**实际执行情况**:
1. **主要修改范围**：`select/`、`select-input/` 目录
2. **公共组件修改**（已评估影响，均为新增项）：
   - `tag-input/tag-input.tsx`: expose focus/blur（新增，不影响已有功能）
   - `shared/hooks/useCommonClassName/index.ts`: STATUS 新增 `mouseDown` 类名（新增，不影响已有功能）
3. **样式作用域隔离**：使用 `.t-select--overseas` 和 `.t-select__dropdown--overseas` 类名限定

### 约束 2: Vue 2/3 功能一致性确认

**已记录的差异处理**：发现差异时均已与用户确认后再处理。

---

## 里程碑

| 里程碑 | 日期 | 交付物 | 状态 |
|--------|------|--------|------|
| M0 | 2026-02-24 | 研究和设计完成 | ✅ 完成 |
| M1 | 2026-02-24 | Props 迁移完成 | ✅ 完成 |
| M2 | 2026-02-25 | 样式迁移完成 | ✅ 完成 |
| M3 | 2026-02-26 | 交互迁移完成 | ✅ 完成 |
| M4 | 2026-02-27 | 验证测试进行中 | 🔄 进行中 |

---

## 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-02-24 | 初始版本 | AI |
| 0.2.0 | 2026-02-27 | 根据实际代码改动全面更新：补充 TagInput expose、下拉框宽度精度、autoWidth 屏蔽、Tag 字体/对齐/margin 修复等实际改动；更新所有阶段状态 | @plutoqin |
