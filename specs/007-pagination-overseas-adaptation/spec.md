# Pagination 分页组件海外样式适配 规格说明书

> **规范引用**: 本规格说明书遵循 `../../.codebuddy/.rules/team-rule.mdc` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | pagination-overseas-adaptation |
| 版本 | 1.0.0 |
| 状态 | Completed |
| 创建日期 | 2026-03-02 |
| 完成日期 | 2026-03-03 |
| 作者 | AI Assistant |

## 概述

### 功能简介

将 TDesign Vue Next 的 Pagination 分页组件调整为海外样式。本项目为纯海外版本，所有修改直接应用于组件本身，无需兼容国内版本。适配范围包括**样式调整**和**组件逻辑修改**两部分。需注意各组件之间的相互影响。

根据目标截图和当前 UI 截图的对比分析，主要差异包括：

**样式差异**：
1. **页码按钮**：当前版本使用带边框的方形按钮，目标使用无边框的圆角矩形按钮
2. **当前页高亮**：当前版本为蓝色方形填充，目标为蓝色圆角矩形填充
3. **页码按钮尺寸变小**：目标的页码按钮高度和宽度比当前版本更小
4. **页码按钮圆角**：目标页码按钮圆角值更大，视觉更柔和
5. **前进/后退按钮**：目标的箭头按钮无边框、无背景，hover 时显示圆角背景
6. **分页器整体风格**：目标更加简洁，去掉了页码按钮的默认边框

**逻辑差异（需修改组件 TSX）**：
7. **首页/末页按钮图标替换**：当前使用 `PageFirstIcon`（`|<`）和 `PageLastIcon`（`>|`），需替换为双箭头图标 `ChevronLeftDoubleIcon`（`«`）和 `ChevronRightDoubleIcon`（`»`）
8. **总量统计文案格式变化**：当前格式"共 30 条数据"，目标格式"1-20 of 101 items"（当前条数范围 of 总条数）
9. **快速跳转文案格式变化**：当前格式"跳至 [1] / 3 页"，目标格式"[1] of 6 pages"（去掉"跳至"前缀，后缀改为"of X pages"）
10. **分页大小选择器位置和格式**：当前格式"10 条/页"位于左侧统计旁，目标选择器显示为纯数字（如"20"），文字标签改为"Items per page"前置于选择器左侧

**分页内 Select 下拉适配（参考 s2-overseas-ui）**：
11. **新增 pageSizeDsc prop**：参照 `s2-overseas-ui` 实现 `pageSizeDsc` 属性，用于在选择器左侧显示"Items per page"等每页条数说明文字
12. **分页内 Select 局部样式调整**：由于之前对 Select 组件的海外改造影响了分页中的下拉选择器，需在 Pagination 作用域内局部调整 Select 的表现：
    - 默认宽度缩小（约 70px），仅显示纯数字
    - 下拉图标改为小型下拉箭头（`caret-down-small`），不使用默认的列表图标
    - 已选项用纯文本显示，不用 Tag 标签显示（`singleUseTag: false`）
    - 禁用清除按钮（`clearable: false`）
    - **必须通过 `selectProps` 透传或 Pagination 作用域样式实现，不能影响全局 Select 组件和其他使用 Select 的组件**

### 目标用户

- **前端开发人员**：使用 TDesign Vue3 组件库开发海外系统的工程师
- **UI/UX 设计师**：需要确保海外系统视觉一致性的设计团队

### 成功指标

- [x] Pagination 组件在海外样式下的视觉表现与目标截图一致
- [x] 页码按钮尺寸变小，在默认、hover、active、选中、禁用等状态下样式正确
- [x] 不同尺寸（small、medium）下的分页样式表现正确
- [x] 首页/末页按钮图标替换为双箭头（`«`/`»`），不再使用竖线箭头
- [x] 前进/后退按钮、更多按钮的样式和交互状态与目标一致
- [x] 总量统计格式从"共 X 条数据"改为"X-Y of Z items"
- [x] 快速跳转格式从"跳至 [N] / M 页"改为"[N] of M pages"（实际实现为独立的 `totalPage` 渲染插槽，显示 "of X pages"）
- [x] 分页大小选择器显示为纯数字，前置"Items per page"标签（通过 `pageSizeDsc` prop）
- [x] 分页内 Select 下拉宽度缩小、图标正确、已选项为纯文本非 Tag
- [x] 分页内 Select 的局部调整不影响全局 Select 组件和其他场景
- [x] PaginationMini 子组件的样式适配正确（含 variant-text + shape-square padding 修复）
- [x] 修改不影响其他组件（如 Select、InputNumber、Button 等）的正常功能

## 需求详情

### 功能需求

#### FR-001: 创建海外样式目录结构
**描述**: 在 Pagination 组件的 style 目录下创建 `overseas/` 子目录，用于存放海外适配的样式文件
**优先级**: P0
**验收标准**:
- [x] 创建 `packages/components/pagination/style/overseas/` 目录
- [x] 创建 `index.less` 主样式文件（318行，含完整分页样式）
- [x] 创建 `_var.less` CSS 变量定义文件（46行，含颜色/尺寸/字号/间距/过渡变量）
- [x] 创建 `_mixin.less` 样式 mixin 工具文件（38行，含 3 个 mixin）
- [x] 创建 `_mini.less` PaginationMini 样式文件（43行，含 variant-text padding 修复）
- [x] 目录结构与项目海外组件适配规范保持一致

#### FR-002: 适配页码按钮基础样式（含尺寸缩小）
**描述**: 将页码按钮从带边框方形样式调整为无边框圆角矩形样式，并缩小按钮尺寸
**优先级**: P0
**验收标准**:
- [x] 页码按钮默认状态：无边框、透明背景（`@bg-color-container`）、圆角矩形
- [x] 页码按钮 hover 状态：显示品牌色文字（`@brand-color-hover`）
- [x] 页码按钮 active 状态：品牌色背景（`@brand-color`）、白色文字
- [x] 页码按钮选中状态（is-current）：品牌色圆角矩形填充背景、白色文字
- [x] 页码按钮禁用状态：文字变灰（`#9a9a9a`）、不可点击
- [x] 页码按钮的圆角值使用海外设计规范中的 `@border-radius-default`
- [x] 页码按钮默认高度 `@comp-size-s`（28px），min-width 28px
- [x] 页码按钮内的文字字号使用 `@font-body-medium`

#### FR-003: 适配前进/后退按钮样式
**描述**: 调整前进/后退导航按钮为海外版样式
**优先级**: P0
**验收标准**:
- [x] 前进/后退按钮默认状态：无背景、无边框
- [x] 前进/后退按钮 hover 状态：显示圆角浅色背景（`@bg-color-secondarycontainer-hover`）
- [x] 前进/后退按钮 active 状态：背景色加深（`@bg-color-secondarycontainer-active`）
- [x] 前进/后退按钮禁用状态：图标变灰（`#9a9a9a`）、不可点击
- [x] 按钮尺寸与页码按钮高度一致（`@pagination-height-default`），使用 `.pagination-btn()` mixin

#### FR-004: 适配更多（省略号）按钮样式
**描述**: 调整"更多"按钮（省略号）的样式与海外版一致。注意：海外版 `pageEllipsisMode` 默认为空字符串，`isMidEllipsis` 为 false，因此省略号按钮在默认配置下不会渲染
**优先级**: P0
**验收标准**:
- [x] 更多按钮默认状态：无边框（`border: 0 none`）、无内边距
- [x] 更多按钮 hover 状态：显示圆角浅色背景，图标变为品牌色文字色
- [x] 更多按钮 active 状态：背景色加深
- [x] 更多按钮禁用状态：无背景
- [x] 海外版默认不渲染省略号（`pageEllipsisMode` 默认 `''`，`isMidEllipsis` 为 false）

#### FR-005: 替换首页/末页按钮图标（逻辑修改）
**描述**: 将首页和末页按钮的图标从竖线箭头（`PageFirstIcon` / `PageLastIcon`，即 `|<` / `>|`）替换为双箭头图标（`ChevronLeftDoubleIcon` / `ChevronRightDoubleIcon`，即 `«` / `»`）
**优先级**: P0
**验收标准**:
- [x] 首页按钮图标从 `PageFirstIcon`（`|<`）改为 `ChevronLeftDoubleIcon`（`«`）—— 已完成，`PageFirstIcon` 和 `PageLastIcon` 已从导入中移除
- [x] 末页按钮图标从 `PageLastIcon`（`>|`）改为 `ChevronRightDoubleIcon`（`»`）
- [x] 图标替换后点击功能不受影响（首页按钮跳转到第 1 页，末页按钮跳转到最后一页）
- [x] 图标在禁用状态下显示正确
- [x] 图标替换不影响其他使用相同图标的组件

#### FR-006: 适配总量统计文案格式（逻辑修改）
**描述**: 将数据统计区域的文案格式从"共 X 条数据"改为"X-Y of Z items"格式，展示当前条数范围和总条数
**优先级**: P0
**验收标准**:
- [x] 总量统计格式改为 "{startIndex}-{endIndex} of {total} items"
- [x] startIndex 计算正确：`(current - 1) * pageSize + 1`
- [x] endIndex 计算正确：`Math.min(current * pageSize, total)`
- [x] 在第一页时显示如 "1-20 of 101 items"
- [x] 在最后一页时，当 startIndex >= total 时只显示单个数字（如 "101 of 101 items"）
- [x] total 为 0 时显示 "0 of 0 items"
- [x] 总量统计文字颜色使用 `@font-gray-4`，带 `margin-right: 10px`

#### FR-007: 适配快速跳转文案格式（逻辑修改）
**描述**: 将快速跳转区域重构为独立的 `totalPage` 渲染插槽，显示 "of X pages" 格式。跳转输入框独立渲染，不再包含前缀文字
**优先级**: P0
**验收标准**:
- [x] 跳转区域不再包含"跳至"前缀文字
- [x] 总页数通过独立的 `totalPage` 渲染插槽显示 "of {pageCount} pages"（使用 `renderTNodeJSX('totalPage', ...)`）
- [x] 跳转区域使用 `TInputAdornment` 包裹 `TInputNumber`
- [x] 跳转区域样式：`display: inline-flex`、`margin-left: 6px`、`margin-right: 12px`、`gap: @comp-margin-s`
- [x] 跳转功能不受影响（回车或失焦触发跳转）

#### FR-008: 适配分页大小选择器格式（逻辑修改）
**描述**: 将分页大小选择器从"10 条/页"格式改为纯数字显示，并新增 `pageSizeDsc` prop 支持前置标签文字
**优先级**: P0
**验收标准**:
- [x] 选择器选项从"10 条/页"格式改为纯数字显示（如 "10"、"20"、"50"），使用 `String(option)` 作为 label
- [x] 新增 `pageSizeDsc` prop（字符串类型，默认空字符串），当非空时在选择器左侧渲染标签文字（如 "Items per page"）
- [x] `pageSizeDsc` 标签使用 `page-size-dsc` CSS 类名，`font-weight: bold`
- [x] 选择器宽度 `70px`，设置 `autoWidth: true`
- [x] 切换分页大小功能不受影响
- [x] 参考 `s2-overseas-ui` 的实现方式

#### FR-009: 适配分页跳转区域样式
**描述**: 调整跳转输入框和标签区域的样式
**优先级**: P1
**验收标准**:
- [x] 跳转区域去掉背景色容器包裹，`background-color: transparent`
- [x] 输入框使用带边框样式（`border-color: @gray-color-6`）
- [x] 输入框宽度 `70px`（`.t-input__wrap { width: 70px }`）
- [x] "of X pages" 文字颜色 `@font-gray-4`，使用 `totalPage` 渲染插槽
- [x] 跳转区域间距：`margin-left: 6px; margin-right: 12px; gap: @comp-margin-s`

#### FR-010: 适配数据统计区域样式
**描述**: 调整总量统计区域的样式，配合新的文案格式
**优先级**: P1
**验收标准**:
- [x] "X-Y of Z items" 文字颜色 `@font-gray-4`，字号 `@font-body-medium`
- [x] 统计区域溢出省略（`text-overflow: ellipsis; overflow: hidden; white-space: nowrap`）
- [x] 统计区域 `margin-right: 10px`

#### FR-011: 适配分页大小选择器样式（含 Select 局部调整）
**描述**: 调整分页大小选择器的样式，包括在 Pagination 作用域内局部调整 Select 组件的表现，解决之前 Select 海外改造对分页下拉的影响
**优先级**: P0
**验收标准**:
- [x] Select 组件在 Pagination 内的宽度为 `70px`（通过 `style={{ width: '70px' }}` 内联样式）
- [x] Select 下拉图标改为小型下拉箭头（通过 `selectProps` 透传 `suffixIconOs: 'caret-down-small'`）
- [x] Select 已选项显示为纯文本，不使用 Tag 标签（通过 `selectProps` 透传 `singleUseTag: false`）
- [x] Select 禁用清除按钮（`clearable={false}`）
- [x] Select 设置 `autoWidth={true}` 使宽度自适应
- [x] "Items per page" 标签（`pageSizeDsc`）`font-weight: bold`
- [x] `.t-pagination__select` 作用域内覆盖 Select 的 `.t-input` min-height、`.t-icon` font-size、`.t-input__suffix` position
- [x] 以上调整仅影响 Pagination 内的 Select，不影响全局 Select 组件
- [x] 使用 `{...(props.selectProps || { singleUseTag: false, suffixIconOs: 'caret-down-small' })}` 展开传递

#### FR-012: 适配 small 尺寸的分页样式
**描述**: 确保 small 尺寸下的分页样式也符合海外版设计
**优先级**: P0
**验收标准**:
- [x] small 尺寸页码按钮高度 `@comp-size-xs`、字号 `@font-body-small`、min-width `@comp-size-xs`
- [x] small 尺寸页码按钮无边框（`border: 0 none`）
- [x] small 尺寸前进/后退按钮使用 `.pagination-btn(@pagination-height-s)`
- [x] small 尺寸跳转区域高度 `@comp-size-xs`、输入框宽度 `48px`
- [x] small 尺寸 Select 高度 `@pagination-height-s`、字号 `@font-size-s`

#### FR-013: 定义海外版 CSS 变量
**描述**: 创建 `_var.less` 文件，定义所有海外版分页组件的样式变量
**优先级**: P0
**验收标准**:
- [x] 颜色变量：`@pagination-text-color`（`@text-color-secondary`）、`@pagination-text-color-disabled`（`#9a9a9a`）、`@pagination-bg-color-current`（`@brand-color`）等 15 个颜色变量
- [x] 尺寸变量：`@pagination-height-s`（`@comp-size-xs`）、`@pagination-height-default`（`@comp-size-s`）、`@pagination-input-width`（`70px`）
- [x] 字号变量：`@pagination-font-s`（`@font-body-small`）、`@pagination-font-default`（`@font-body-medium`）、`@pagination-btn-font-size`（`@font-body-large`）
- [x] 间距变量：`@pagination-btn-margin`、`@pagination-jump-margin`、`@pagination-select-margin`（`@comp-margin-l`）、`@pagination-pager-margin`（`@comp-margin-s`）等
- [x] 过渡变量：`@pagination-hover-transition`（`all @anim-duration-base @anim-time-fn-ease-in`）
- [x] 所有变量引用海外版全局 token（`../../../../overseas/style/_variables.less`）

#### FR-014: 适配 PaginationMini 组件样式
**描述**: 确保 PaginationMini 子组件的海外样式适配
**优先级**: P1
**验收标准**:
- [x] PaginationMini 的 outline 变体样式与海外版一致（prev/current/next 按钮组通过 `border-radius: 0`、`margin-left: -1px`、`z-index` 实现紧密相连效果）
- [x] PaginationMini 修复 variant-text + shape-square 时 padding 覆盖导致图标被挤压的问题（`.t-button.t-button--variant-text.t-button--shape-square { padding: 0 }`）
- [x] PaginationMini 按钮颜色使用 `@pagination-text-color`

#### FR-015: 更新样式入口文件
**描述**: 修改 `style/index.js`，切换到海外样式入口
**优先级**: P0
**验收标准**:
- [x] 将 `style/index.js` 的导入路径从 TDesign 通用样式改为海外样式（`import './overseas/index.less'`）
- [x] 原导入路径已注释保留（`// import '@tdesign/common-style/web/components/pagination/_index.less'`）
- [x] 样式文件可以被正确打包和加载

### 非功能需求

#### NFR-001: 样式一致性
- 海外版 Pagination 组件在所有场景下的视觉表现必须与目标截图一致
- 颜色值、尺寸值、圆角值等必须精确匹配海外设计规范

#### NFR-002: 浏览器兼容性
- 样式必须兼容 Chrome、Firefox、Safari、Edge 的最新两个主要版本
- CSS 变量和 calc() 函数必须能在目标浏览器中正常工作

#### NFR-003: 可维护性
- 样式代码结构清晰，易于维护
- CSS 变量命名与现有命名规范保持一致
- 使用 LESS 预处理器特性（变量、mixin）提高代码复用性
- 修改不影响其他组件的正常功能和样式

#### NFR-004: 性能要求
- 样式文件大小不应超过当前版本的 120%
- 样式加载不影响组件的渲染性能

## 依赖关系

### 内部依赖

- **海外基础样式系统**：依赖 `overseas/style/base.less` 提供全局基础样式
- **海外基础 Token**：依赖 `overseas/style/_variables.less` 提供全局颜色、尺寸等 token
- **海外 Mixin**：依赖 `overseas/style/mixins/` 提供样式重置等 mixin
- **Pagination 组件 TSX**：依赖现有的 `pagination.tsx` 和 `pagination-mini.tsx` 生成正确的 className
- **依赖组件样式**：Select、InputNumber、InputAdornment、Button 组件的海外样式（如已适配）

### 外部依赖

- **LESS 预处理器**：用于编译 `.less` 样式文件
- **构建系统**：依赖现有的 Vite 构建配置处理样式导入

## 风险评估

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 海外基础 Token 缺失或值不匹配 | 高 | 中 | 在开发前对比海外 `_variables.less` 与组件所需的 token，补齐缺失变量 |
| 依赖组件（Select、InputNumber）海外样式未适配 | 中 | 中 | 分页组件中嵌入的子组件样式可能需要额外处理，可使用局部覆盖 |
| TSX 生成的 className 结构差异 | 高 | 低 | 对比 DOM 结构，确保样式选择器与实际 className 一致 |
| 样式文件加载顺序错误 | 中 | 低 | 按照正确的依赖关系组织 `@import` 语句 |
| 与其他海外组件样式冲突 | 中 | 中 | 使用组件级别的 CSS 选择器隔离样式作用域，修改前后对比其他组件的渲染结果 |
| 首页/末页图标与"更多"按钮的双箭头图标混淆 | 中 | 低 | 确保首页/末页按钮和"更多"按钮在 hover 时有不同的视觉反馈，且位置分明 |
| 总量统计中 startIndex/endIndex 计算边界问题 | 中 | 低 | 添加边界条件处理，确保 total 为 0、最后一页不满等场景计算正确 |
| 修改 Pagination 样式/逻辑影响依赖的子组件（Select、InputNumber）| 高 | 中 | 样式覆盖使用精确的 Pagination 作用域选择器，避免全局污染 |
| 分页内 Select 局部调整泄露到全局 | 高 | 中 | 通过 `selectProps` 透传方式在组件逻辑层面控制，而非全局 CSS 覆盖；样式调整使用 `.t-pagination__select` 作用域选择器 |

## 验收测试场景

### 场景 1：基础分页渲染
**前置条件**：使用默认配置渲染分页组件
**操作步骤**：
1. 渲染 `<t-pagination :total="100" />`
2. 检查页码按钮的视觉样式

**预期结果**：
- 页码按钮为无边框圆角矩形样式
- 当前页（第 1 页）为蓝色圆角矩形填充背景、白色文字
- 其他页码为默认文字颜色、无背景

### 场景 2：页码交互状态
**前置条件**：渲染基础分页
**操作步骤**：
1. 鼠标悬停某个页码按钮
2. 点击某个页码按钮
3. 观察选中/取消选中的过渡效果

**预期结果**：
- Hover 时显示浅色圆角背景
- Active 时显示品牌色背景
- 选中状态显示蓝色圆角矩形填充
- 状态切换有平滑过渡动画

### 场景 3：首页/末页按钮图标
**前置条件**：渲染带首页/末页按钮的分页
**操作步骤**：
1. 渲染 `<t-pagination :total="100" showFirstAndLastPageBtn />`
2. 检查首页和末页按钮的图标

**预期结果**：
- 首页按钮显示 `«` 双左箭头图标（不再是 `|<` 竖线箭头）
- 末页按钮显示 `»` 双右箭头图标（不再是 `>|` 竖线箭头）
- 点击首页按钮跳转到第 1 页
- 点击末页按钮跳转到最后一页

### 场景 4：带数据统计的分页（海外格式）
**前置条件**：渲染带 totalContent 的分页
**操作步骤**：
1. 渲染 `<t-pagination :total="101" :pageSize="20" showPageSize showPageNumber pageSizeDsc="Items per page" />`
2. 检查数据统计区域的文案格式
3. 点击 Select 下拉展开选项列表
4. 检查 Select 的显示效果

**预期结果**：
- 数据统计显示 "1-20 of 101 items"（非"共 101 条数据"）
- "Items per page" 标签文字在选择器左侧，字体加粗
- 选择器显示纯数字（如 "20"，非 "20 条/页"），宽度约 70px
- 选择器已选项为纯文本显示，不是 Tag 标签
- 选择器下拉图标为小型下拉箭头，不是列表图标
- 下拉选项列表显示纯数字（5、10、20、50）
- 切换到第 2 页后统计显示 "21-40 of 101 items"
- 切换到最后一页统计显示 "101-101 of 101 items"

### 场景 5：分页 Select 不影响全局 Select
**前置条件**：页面中同时存在独立的 Select 组件和 Pagination 内的 Select
**操作步骤**：
1. 在同一页面渲染独立的 `<t-select>` 和 `<t-pagination showPageSize />`
2. 对比两个 Select 的显示效果

**预期结果**：
- 独立 Select 组件保持海外改造后的默认样式（Tag 标签显示、默认图标、默认宽度等）
- Pagination 内的 Select 为局部调整后的样式（纯文本、小箭头、窄宽度）
- 两者互不影响

### 场景 6：带跳转功能的分页（海外格式）
**前置条件**：渲染带跳转输入框的分页
**操作步骤**：
1. 渲染 `<t-pagination :total="100" showJumper />`
2. 检查跳转区域的视觉样式和文案

**预期结果**：
- 跳转区域没有"跳至"前缀文字
- 输入框后显示 "of X pages"（非 "/ X 页"）
- 输入框使用带边框的简洁样式
- 跳转功能正常（输入页码后回车或失焦跳转）

### 场景 7：small 尺寸分页
**前置条件**：渲染 small 尺寸的分页
**操作步骤**：
1. 渲染 `<t-pagination :total="100" size="small" />`
2. 对比与默认尺寸的差异

**预期结果**：
- 所有元素按比例缩小
- 页码按钮的高度和字号符合 small 规格
- 圆角值适当调整

### 场景 8：禁用状态分页
**前置条件**：渲染禁用状态的分页
**操作步骤**：
1. 渲染 `<t-pagination :total="100" disabled />`
2. 检查所有元素的禁用样式

**预期结果**：
- 所有页码按钮、导航按钮变灰
- 鼠标指针显示为 not-allowed
- 选中页码的禁用态样式正确

### 场景 9：更多页码折叠
**前置条件**：页数较多触发折叠
**操作步骤**：
1. 渲染 `<t-pagination :total="500" />`
2. 检查页码按钮数量
3. 点击不同页码观察页码切换

**预期结果**：
- 海外版 `pageEllipsisMode` 默认为空字符串，`isMidEllipsis` 为 false
- 不渲染省略号按钮和首尾固定页码
- `foldedMaxPageBtn` 默认为 3，最多显示 3 个页码按钮
- `maxPageBtn` 默认为 3，超过时启用折叠
- 页码切换时始终保持最多 3 个页码按钮，首尾不会多出一个

### 场景 10：PaginationMini 渲染
**前置条件**：渲染迷你分页组件
**操作步骤**：
1. 渲染 `<t-pagination-mini />`
2. 检查按钮样式

**预期结果**：
- 迷你分页按钮的样式与海外版一致
- 布局（horizontal/vertical）正确
- outline 变体的圆角合并效果正确

## 假设和约束

### 假设
1. Vue3 项目已经有 `overseas/style/` 目录，提供基础的颜色、尺寸 token
2. Pagination 组件 TSX 实现生成的 className 与现有一致（如 `t-pagination`、`t-pagination__number` 等）
3. 构建系统已配置支持 LESS 预处理器
4. 项目已引入 TDesign 的基础样式和 reset 样式
5. 品牌色通过 CSS 变量（`--td-brand-color`）控制
6. 页码按钮的圆角值采用设计规范中的 `@border-radius-default` 或 `@border-radius-medium`
7. 当前项目为纯海外版本，所有修改直接生效，无需兼容国内版本

### 约束
1. 修改不能影响其他组件（Select、InputNumber、Button 等）的正常功能和样式
2. 样式变量命名遵循现有命名规范
3. 不引入新的依赖库或工具
4. 图标替换、文案格式修改直接在组件中实现，无需条件分支

## 附录

### 参考资料
- 海外版目标截图：用户提供的目标 UI 截图
- 当前版本 UI：用户提供的当前 UI 截图
- **s2-overseas-ui 分页实现**：`s2-overseas-ui/packages/overseas/src/pagination/` — `pageSizeDsc` prop 和 Select 局部调整的参考实现
- 现有海外适配组件：`specs/003-button-overseas-adaptation/`
- Pagination 组件源码：`packages/components/pagination/`
- Pagination 样式源码：`packages/common/style/web/components/pagination/`
- 海外基础样式：`overseas/style/`

### 变更历史
| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 1.0.0 | 2026-03-03 | 实现完成：更新所有 FR 验收标准为已完成，补充实际实现细节（CSS 变量具体值、选择器写法、totalPage 渲染插槽、省略号模式禁用、PaginationMini padding 修复），状态改为 Completed | AI Assistant |
| 0.4.0 | 2026-03-02 | 补充：pageSizeDsc prop、分页内 Select 局部样式调整（宽度、图标、纯文本显示），参考 s2-overseas-ui | AI Assistant |
| 0.3.0 | 2026-03-02 | 更正：项目为纯海外版本，移除国内版兼容约束，增加组件间影响关注点 | AI Assistant |
| 0.2.0 | 2026-03-02 | 补充：首页/末页图标替换、按钮尺寸缩小、总量统计和跳转文案格式变化、分页大小选择器格式变化 | AI Assistant |
| 0.1.0 | 2026-03-02 | 初始版本 | AI Assistant |
