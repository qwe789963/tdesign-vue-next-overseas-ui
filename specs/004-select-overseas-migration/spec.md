# 功能规格：Select 组件海外版样式迁移

**功能编号**: 005  
**创建日期**: 2026-02-24  
**更新日期**: 2026-02-27  
**状态**: 实施中  
**优先级**: 高

---

## 1. 功能概述

### 1.1 目标

将 `tdesign-vue-overseas`（Vue 2）项目中的 Select（下拉选择器）组件的海外版样式和交互特性迁移到当前项目（`tdesign-vue-next-overseas`，Vue 3），确保迁移后的组件在样式、功能和交互效果上与 Vue 2 版本**完全一致**。

### 1.2 背景

- 当前项目（Vue 3）的 Select 组件基于 TDesign 官方组件库，缺少海外版特有的样式和交互特性
- `tdesign-vue-overseas`（Vue 2）版本包含海外业务定制的样式和属性，如：
  - 自定义后缀图标（`suffixIconOs`）
  - 单选 Tag 标签样式（`singleUseTag`）
  - 单选前置 Label 样式（`singleUseLabel`）
  - Option 文本省略控制（`optionWarp`）
  - 特定的边框、颜色、尺寸规范
- 需要将这些特性迁移到 Vue 3 版本，保持与 Vue 2 版本的视觉和交互一致性
- 代码迁移应遵循精简复用原则，最大化利用现有 Vue 3 组件结构

### 1.3 范围

**包含**:
- 海外版特有 Props 迁移（`suffixIconOs`、`singleUseTag`、`singleUseLabel`、`optionWarp`）
- 样式文件迁移（`_select.less`、`_var.less` 等）
- 交互逻辑对齐（焦点样式、hover 状态、选中状态、鼠标按下状态等）
- 尺寸规范对齐（small/medium/large 三种尺寸）
- 下拉面板样式对齐
- TagInput 组件 focus/blur 方法暴露（支持多选过滤模式自动聚焦）
- 下拉框宽度精度修复（getBoundingClientRect 替代 offsetWidth）
- 海外版强制屏蔽 autoWidth 功能

**不包含**:
- 单元测试编写（保留原有测试结构）
- 新功能添加（严格对齐 Vue 2 版本）
- 文档内容修改（保持 TDesign 官方文档结构）

---

## 2. 用户场景 

### 2.1 主要用户场景

#### 场景 1: 开发者使用海外版 Select 单选模式
**角色**: 前端开发者  
**目标**: 在 Vue 3 项目中使用海外版 Select 组件的单选功能  
**前提条件**: 已安装海外版 Vue 3 组件库

**流程**:
1. 开发者在 Vue 3 项目中导入 Select 组件
2. 开发者设置 `singleUseTag` 属性启用 Tag 标签样式
3. 开发者配置 options 数据
4. Select 组件正常渲染，显示海外版样式
5. 用户点击选择选项，选中项以 Tag 形式展示

**预期结果**:
- 输入框高度为 40px（medium 尺寸）
- 选中项以 Tag 形式显示在输入框内，Tag 文本左对齐，字体 14px
- 右侧显示海外版专用下拉图标（bulletpoint），无旋转动画
- 焦点状态显示 2px 品牌色边框，无 box-shadow
- 下拉面板样式与 Vue 2 版本一致，宽度精确匹配 trigger 宽度

#### 场景 2: 开发者使用海外版 Select 多选模式
**角色**: 前端开发者  
**目标**: 在 Vue 3 项目中使用海外版 Select 组件的多选功能  
**前提条件**: 已安装海外版 Vue 3 组件库

**流程**:
1. 开发者设置 `multiple` 属性启用多选
2. 开发者可选设置 `minCollapsedNum` 控制折叠数量
3. 用户点击多个选项
4. 选中项以多个 Tag 形式展示
5. 超出折叠数量的项显示为 `+N`

**预期结果**:
- 多个选中项以 Tag 形式并排显示，Tag 字体 14px
- Tag 高度为 24px（medium 尺寸），关闭按钮位于文本左侧（RTL 风格）
- 超出宽度自动换行或折叠
- 每个 Tag 支持单独删除

#### 场景 3: 多选+过滤模式交互
**角色**: 终端用户  
**目标**: 在多选过滤模式下流畅搜索和选择  
**前提条件**: Select 组件开启 `multiple` 和 `filterable`

**流程**:
1. 用户点击 Select 输入框，下拉面板展开
2. 过滤输入框自动获得焦点，用户可直接输入搜索
3. 用户选择选项后，过滤框保持聚焦状态
4. 用户点击外部区域，下拉面板关闭，选择器完全退出聚焦状态

**预期结果**:
- 下拉展开时过滤输入框自动聚焦（无需二次点击）
- 选中选项后过滤框保持聚焦
- 点击外部时选择器完全退出聚焦状态（边框恢复、过滤框隐藏）
- 可过滤模式下输入框独占一行，Tag 在下方显示
- suffix 图标绝对定位，内容区预留 padding-right 避免重叠

#### 场景 4: 用户与 Select 下拉面板交互
**角色**: 终端用户  
**目标**: 通过点击或键盘操作选择选项  
**前提条件**: 页面中渲染了 Select 组件

**流程**:
1. 用户点击 Select 输入框
2. 下拉面板展开，显示海外版样式
3. 用户 hover 选项，选项高亮显示
4. 用户鼠标按下选项，选项变为品牌色背景+白色文字
5. 用户松开鼠标确认选择
6. 下拉面板收起，输入框显示选中值

**预期结果**:
- 下拉面板边框为 2px 品牌色，无 box-shadow
- 下拉面板与选择器紧贴（margin-top: -3.5px）
- 选项 hover 时背景色变化
- 选中项背景为浅品牌色
- 鼠标按下时选项变为品牌色背景+白色文字（`.t-is-mouseDown`）
- 面板内无内边距（padding: 0）
- 选项无圆角（border-radius: unset）
- 下拉框宽度与 trigger 精确一致（含小数）

#### 场景 5: 键盘导航操作
**角色**: 使用键盘导航的用户  
**目标**: 通过键盘完成选择操作  
**前提条件**: Select 组件未禁用

**流程**:
1. 用户按 Tab 键聚焦到 Select
2. 按空格或下箭头打开面板
3. 使用上下箭头键导航选项
4. 按 Enter 键确认选择
5. 按 Escape 键关闭面板

**预期结果**:
- 焦点样式清晰可见（2px 品牌色边框）
- 键盘导航时选项有高亮提示
- 操作响应与 Vue 2 版本一致

---

## 3. 功能需求

### 3.1 组件 Props 对齐

#### FR-001: 新增海外版特有 Props
**描述**: 在 Vue 3 Select 组件中添加海外版特有的属性支持  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] `suffixIconOs`: 自定义后缀图标，默认值 `'bulletpoint'`
- [x] `singleUseTag`: 单选时是否使用 Tag 标签样式，默认值 `true`
- [x] `singleUseLabel`: 单选时是否显示前置 Label，默认值 `false`
- [x] `optionWarp`: Option 文本是否省略（换行/不换行），默认值 `false`

#### FR-002: 保持原有 Props 兼容
**描述**: 确保现有 TDesign Select 的所有 Props 功能正常  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 所有现有 Props 功能保持不变
- [x] `v-model` 双向绑定正常工作
- [x] `multiple` 多选模式正常工作
- [x] `filterable` 搜索过滤功能正常
- [x] `clearable` 清除功能正常

### 3.2 样式对齐

#### FR-003: 输入框样式迁移
**描述**: 迁移海外版 Select 输入框的样式规范  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] Medium 尺寸输入框最小高度 40px
- [x] Small 尺寸输入框最小高度符合海外版规范
- [x] 边框颜色使用 `@border-level-2-color`
- [x] 焦点状态边框 2px 品牌色，无 box-shadow
- [x] Hover 状态边框颜色变化
- [x] 禁用状态样式正确

#### FR-004: Tag 标签样式迁移
**描述**: 迁移选中项 Tag 的样式规范  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] Medium 尺寸 Tag 高度 24px
- [x] Small 尺寸 Tag 高度 16px
- [x] Tag 字体大小统一 14px
- [x] Tag 内边距和字体大小符合规范
- [x] 多选时 Tag 正确换行
- [x] **Tag 关闭按钮位于文本左侧**（RTL 风格布局，`flex-direction: row-reverse`）
- [x] 单选 Tag 文本左对齐
- [x] 单选 Tag `.t-input__prefix:not(:empty)` 清除多余右 margin

#### FR-005: 下拉面板样式迁移
**描述**: 迁移海外版下拉面板的样式规范  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 面板边框 2px 品牌色
- [x] 面板圆角 4px
- [x] 面板内部无 padding
- [x] 最大高度 300px，超出滚动
- [x] 滚动条样式符合规范
- [x] **下拉面板与选择器紧贴（margin-top: -3.5px）**
- [x] 下拉框宽度与 trigger 精确一致（使用 getBoundingClientRect）

#### FR-006: Option 选项样式迁移
**描述**: 迁移下拉选项的样式规范  
**优先级**: P0  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 选项最小高度 32px
- [x] 选项无圆角（`border-radius: unset`）
- [x] Hover 状态背景色正确
- [x] 选中状态背景色为浅品牌色
- [x] 禁用状态样式正确
- [x] 支持文本省略和换行两种模式（`optionWarp` 控制）
- [x] 鼠标按下状态：品牌色背景 + 白色文字（`.t-is-mouseDown`）

### 3.3 交互对齐

#### FR-007: 后缀图标交互
**描述**: 迁移海外版的后缀图标交互逻辑  
**优先级**: P1  
**状态**: ✅ 已完成  
**验收标准**:
- [x] **默认使用 `bulletpoint` 图标替换标准版的箭头图标**
- [x] 焦点/展开状态图标颜色变为品牌色
- [x] 支持通过 `suffixIconOs` 自定义图标
- [x] 图标无旋转动画（`transform: none !important`）

#### FR-008: 可过滤模式布局
**描述**: 迁移海外版可过滤模式的布局规范  
**优先级**: P1  
**状态**: ✅ 已完成  
**验收标准**:
- [x] **可过滤模式下，文本输入框独占一行**
- [x] 聚焦时 Tag 与输入框分行显示（`flex-wrap: wrap`）
- [x] Tag 与输入框之间有适当间距
- [x] 搜索功能正常工作
- [x] suffix 图标绝对定位，内容区 `padding-right: 36px` 避免重叠
- [x] 未聚焦时隐藏搜索输入框

#### FR-009: 鼠标按下状态
**描述**: 迁移选项鼠标按下时的样式反馈  
**优先级**: P1  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 鼠标按下时选项背景变为品牌色
- [x] 鼠标按下时文本颜色变为白色
- [x] 鼠标松开或离开时恢复正常状态

#### FR-010: 多选过滤模式自动聚焦
**描述**: 确保多选+过滤模式下输入框自动聚焦  
**优先级**: P1  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 下拉展开时过滤输入框自动获得焦点
- [x] 选中选项后过滤框保持聚焦
- [x] 点击外部时选择器完全退出聚焦状态
- [x] TagInput 组件暴露 focus/blur 方法

#### FR-011: 下拉框宽度精度
**描述**: 下拉框宽度与 trigger 宽度精确一致  
**优先级**: P1  
**状态**: ✅ 已完成  
**验收标准**:
- [x] 使用 `getBoundingClientRect().width` 替代 `offsetWidth` 获取精确小数宽度
- [x] 海外版强制屏蔽 `autoWidth` 功能，下拉框宽度始终跟随 trigger

---

## 4. 非功能需求

### NFR-001: 代码复用
**描述**: 最大化复用现有 Vue 3 Select 组件代码  
**验收标准**:
- [x] 不重复实现已有逻辑
- [x] 通过扩展而非重写方式添加功能
- [x] 样式文件采用覆盖方式而非替换

### NFR-004: 组件隔离性
**描述**: 确保迁移工作不影响其他组件  
**验收标准**:
- [x] 修改范围主要限于 Select、SelectInput、Option 组件
- [x] 公共组件修改已评估影响（TagInput expose、useCommonClassName mouseDown 类名）
- [x] 样式覆盖仅在海外版类名作用域内生效
- [x] 对公共组件的修改仅为新增项（不影响已有功能）

### NFR-005: 版本一致性确认
**描述**: Vue 3 与 Vue 2 版本功能不一致时需要确认处理方式  
**验收标准**:
- [x] 发现功能差异时，记录差异点并询问处理方式
- [x] 不自行决定功能变更，等待明确指示
- [x] 保持变更记录，便于追溯决策原因

### NFR-002: 性能要求
**描述**: 确保组件性能不下降  
**验收标准**:
- [ ] 下拉面板展开时间小于 100ms
- [ ] 大数据量（1000+ 选项）时虚拟滚动正常工作

### NFR-003: 兼容性
**描述**: 确保跨浏览器兼容  
**验收标准**:
- [ ] 支持 Chrome、Firefox、Safari 最新版本
- [ ] 支持 Edge 最新版本

---

## 5. 成功指标

- [x] 所有海外版 Props 功能可用
- [x] 样式与 Vue 2 版本视觉对比无差异
- [x] 交互行为与 Vue 2 版本一致
- [x] 现有功能不受影响
- [x] 多选过滤模式自动聚焦正常
- [x] 下拉框宽度精确匹配 trigger

---

## 6. 依赖关系

### 6.1 内部依赖
- `packages/components/select/` - 现有 Select 组件
- `packages/components/select-input/` - SelectInput 组件
- `packages/components/tag-input/` - TagInput 组件（expose focus/blur）
- `packages/components/tag/` - Tag 组件
- `packages/components/popup/` - Popup 组件
- `packages/shared/hooks/` - 共享 Hooks（useCommonClassName）

### 6.2 外部依赖
- `tdesign-vue-overseas` - Vue 2 海外版源码（参考）
- `tdesign-icons-vue-next` - 图标库（BulletpointIcon）

---

## 7. 假设

1. 假设海外版的样式变量可以直接复用或映射到 Vue 3 版本
2. 假设 Vue 3 的 SelectInput 组件支持海外版需要的扩展属性
3. 假设样式迁移采用 overseas 子目录的覆盖方式

---

## 8. 附录

### 8.1 参考文件

**Vue 2 海外版源码位置**:
- 组件：`tdesign-vue-overseas/packages/overseas/src/select/`
- 样式：`tdesign-vue-overseas/packages/overseas/src/select/style/`

**Vue 3 目标位置**:
- 组件：`packages/components/select/`
- 样式：`packages/components/select/style/overseas/`

### 8.2 实际修改文件清单

| 文件 | 改动类型 | 关键改动 |
|------|----------|----------|
| `select/props.ts` | 修改 | +4 个海外版 props，valueType 扩展 `'label'` |
| `select/type.ts` | 修改 | +4 个海外版类型定义，valueType 扩展 |
| `select/select.tsx` | 修改 | 海外版类名、BulletpointIcon、单选 Tag 渲染、autoWidth 屏蔽、optionWarp 透传 |
| `select/option.tsx` | 修改 | +optionWarp prop、mouseDown/mouseUp/mouseLeave 事件、wrap/nowrap class |
| `select/components/select-panel.tsx` | 修改 | +optionWarp prop 透传给 Option |
| `select/style/overseas/_var.less` | 新增 | 海外版样式变量（62 行） |
| `select/style/overseas/_select.less` | 新增 | 海外版核心样式（466 行） |
| `select/style/overseas/index.less` | 新增 | 样式入口文件 |
| `select/style/index.js` | 修改 | 新增海外版样式导入 |
| `shared/hooks/useCommonClassName/index.ts` | 修改 | STATUS 新增 `mouseDown` 类名 |
| `tag-input/tag-input.tsx` | 修改 | expose focus/blur 方法 |
| `select-input/select-input.tsx` | 修改 | popup 打开时自动聚焦过滤输入框 |
| `select-input/hooks/useOverlayInnerStyle.ts` | 修改 | getBoundingClientRect 替代 offsetWidth |
| `popup/popup.tsx` | 修改 | 海外版相关适配 |

### 8.3 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-02-24 | 初始版本 | AI |
| 0.2.0 | 2026-02-27 | 根据实际代码改动更新：新增 FR-010/FR-011，更新所有任务状态为已完成，补充 TagInput expose、下拉框宽度精度、autoWidth 屏蔽等实际改动 | @plutoqin |
