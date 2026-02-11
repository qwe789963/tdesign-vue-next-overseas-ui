# Button 按钮组件海外适配 规格说明书

> **规范引用**: 本规格说明书遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | button-overseas-adaptation |
| 版本 | 0.1.0 |
| 状态 | Draft |
| 创建日期 | 2026-02-11 |
| 作者 | AI Assistant |

## 概述

### 功能简介

将 TDesign Vue2 版本的海外 Button 组件样式适配到 Vue3 版本，确保按钮在海外系统中的视觉表现（颜色、边框、圆角、尺寸等）与 Vue2 版本完全一致。此功能专注于样式层面的迁移，不涉及功能逻辑的修改。

### 目标用户

- **前端开发人员**：使用 TDesign Vue3 组件库开发海外系统的工程师
- **UI/UX 设计师**：需要确保海外系统视觉一致性的设计团队
- **产品经理**：负责海外产品的产品管理人员

### 成功指标

- [ ] Button 组件的所有变体（base、outline、dashed、text）样式与 Vue2 版本视觉一致
- [ ] 所有主题色（primary、success、warning、danger、default）渲染效果与 Vue2 版本一致
- [ ] 所有尺寸（xs、s、m、l）的按钮尺寸、圆角与 Vue2 版本一致
- [ ] 所有形状（circle、round、square）的按钮样式与 Vue2 版本一致
- [ ] 按钮的交互状态（hover、active、disabled、loading）视觉效果与 Vue2 版本一致
- [ ] Ghost 模式（幽灵按钮）样式与 Vue2 版本一致

## 需求详情

### 功能需求

#### FR-001: 创建海外样式目录结构
**描述**: 在 Vue3 Button 组件的 style 目录下创建 `overseas/` 子目录，用于存放海外适配的样式文件  
**优先级**: P0  
**验收标准**:
- [ ] 创建 `packages/components/button/style/overseas/` 目录
- [ ] 创建 `index.less` 主样式文件
- [ ] 创建 `_var.less` CSS 变量定义文件
- [ ] 创建 `_mixin.less` 样式 mixin 工具文件（如需要）
- [ ] 目录结构与 Vue2 版本对应保持一致

#### FR-002: 迁移 CSS 变量定义
**描述**: 将 Vue2 版本的 `_var.less` 中定义的所有 CSS 变量（颜色、尺寸、圆角、边框等）迁移到 Vue3 版本  
**优先级**: P0  
**验收标准**:
- [ ] 所有尺寸变量（`@btn-height-*`、`@btn-width-*`）与 Vue2 版本数值一致
- [ ] 所有圆角变量（`@btn-border-radius`、`@btn-shape-border-radius-*`）与 Vue2 版本一致
- [ ] 所有字号变量（`@btn-font-*`）与 Vue2 版本一致
- [ ] 所有图标尺寸变量（`@btn-icon-size-*`）与 Vue2 版本一致
- [ ] 所有内边距变量（`@btn-padding-horizontal-*`）与 Vue2 版本一致
- [ ] 所有颜色变量（主题色、状态色、背景色、边框色、文本色）与 Vue2 版本一致
- [ ] 变量引用的基础 token（如 `@brand-color`、`@success-color` 等）可正确解析

#### FR-003: 迁移按钮变体样式
**描述**: 将 Vue2 版本的四种按钮变体（base、outline、dashed、text）的完整样式迁移到 Vue3  
**优先级**: P0  
**验收标准**:
- [ ] Base 变体（填充按钮）样式与 Vue2 版本一致
- [ ] Outline 变体（描边按钮）样式与 Vue2 版本一致
- [ ] Dashed 变体（虚线按钮）样式与 Vue2 版本一致
- [ ] Text 变体（文字按钮）样式与 Vue2 版本一致
- [ ] 每个变体的 hover、active、disabled 状态样式与 Vue2 版本一致
- [ ] 文字按钮的下划线装饰与 Vue2 版本一致

#### FR-004: 迁移主题色样式
**描述**: 为每个按钮变体实现五种主题色（default、primary、success、warning、danger）的样式  
**优先级**: P0  
**验收标准**:
- [ ] Default 主题色（灰色）样式与 Vue2 版本一致
- [ ] Primary 主题色（品牌色）样式与 Vue2 版本一致
- [ ] Success 主题色（成功色）样式与 Vue2 版本一致
- [ ] Warning 主题色（警告色）样式与 Vue2 版本一致
- [ ] Danger 主题色（危险色）样式与 Vue2 版本一致
- [ ] 每种主题色在不同变体下的表现与 Vue2 版本一致
- [ ] Disabled 状态下的主题色表现与 Vue2 版本一致

#### FR-005: 迁移尺寸样式
**描述**: 实现四种按钮尺寸（xs、s、m、l）的样式，包括高度、宽度、字号、内边距、图标尺寸  
**优先级**: P0  
**验收标准**:
- [ ] XS 尺寸按钮的所有样式属性与 Vue2 版本一致
- [ ] S 尺寸按钮的所有样式属性与 Vue2 版本一致
- [ ] M（默认）尺寸按钮的所有样式属性与 Vue2 版本一致
- [ ] L 尺寸按钮的所有样式属性与 Vue2 版本一致
- [ ] 最小宽度（`min-width`）设置与 Vue2 版本一致
- [ ] 不同尺寸的圆角值与 Vue2 版本一致

#### FR-006: 迁移形状样式
**描述**: 实现三种按钮形状（circle、round、square）的样式  
**优先级**: P0  
**验收标准**:
- [ ] Circle 形状（圆形按钮）样式与 Vue2 版本一致
- [ ] Round 形状（圆角按钮）样式与 Vue2 版本一致
- [ ] Square 形状（方形按钮）样式与 Vue2 版本一致
- [ ] 不同形状在各种尺寸下的表现与 Vue2 版本一致
- [ ] 文字按钮不应用 round 形状的圆角（与 Vue2 行为一致）

#### FR-007: 迁移 Ghost 模式样式
**描述**: 实现幽灵按钮（Ghost Button）的样式，适用于深色背景场景  
**优先级**: P0  
**验收标准**:
- [ ] Ghost 模式的背景透明效果与 Vue2 版本一致
- [ ] Ghost 模式的文字和边框颜色与 Vue2 版本一致
- [ ] Ghost 模式在各种变体下的表现与 Vue2 版本一致
- [ ] Ghost 模式在各种主题色下的表现与 Vue2 版本一致
- [ ] Ghost 模式的 hover、active、disabled 状态与 Vue2 版本一致
- [ ] Ghost 模式的 ripple 效果颜色与 Vue2 版本一致

#### FR-008: 迁移交互状态样式
**描述**: 实现按钮的 hover、active、loading、disabled 等交互状态的样式  
**优先级**: P0  
**验收标准**:
- [ ] Hover 状态的颜色变化与 Vue2 版本一致
- [ ] Active 状态的颜色变化与 Vue2 版本一致
- [ ] Loading 状态的样式与 Vue2 版本一致
- [ ] Disabled 状态的样式与 Vue2 版本一致
- [ ] Disabled 状态的鼠标指针（`cursor: not-allowed`）与 Vue2 版本一致
- [ ] Ripple 水波纹效果的颜色与 Vue2 版本一致

#### FR-009: 迁移图标和加载样式
**描述**: 实现按钮内图标和加载图标的样式  
**优先级**: P0  
**验收标准**:
- [ ] 图标的尺寸在不同按钮尺寸下与 Vue2 版本一致
- [ ] 图标与文字的间距（`margin-left`）与 Vue2 版本一致
- [ ] 加载图标的尺寸与 Vue2 版本一致
- [ ] 加载图标与文字的间距与 Vue2 版本一致
- [ ] Suffix 后缀内容的间距与 Vue2 版本一致

#### FR-010: 迁移特殊场景样式
**描述**: 实现全宽按钮、文字按钮特殊内边距等特殊场景的样式  
**优先级**: P1  
**验收标准**:
- [ ] 全宽按钮（`t-size-full-width`）样式与 Vue2 版本一致
- [ ] 文字按钮的特殊内边距（`padding-left/right`）与 Vue2 版本一致
- [ ] 最小宽度的排除条件（shape、full-width、text variant）与 Vue2 版本一致

#### FR-011: 更新样式入口文件
**描述**: 修改 `style/index.js` 文件，切换到海外样式入口  
**优先级**: P0  
**验收标准**:
- [ ] 将 `style/index.js` 的导入路径从 TDesign 通用样式改为海外样式
- [ ] 确保样式加载顺序正确（基础样式 → 变量定义 → 组件样式）
- [ ] 样式文件可以被正确打包和加载

#### FR-012: 移除交互示例面板
**描述**: 删除 `_usage/` 目录，与 Vue2 文档保持一致（不显示交互示例面板）  
**优先级**: P1  
**验收标准**:
- [ ] 删除 `packages/components/button/_usage/` 目录
- [ ] 文档页面不显示交互示例面板
- [ ] Demo 标签页的示例保持完整

### 非功能需求

#### NFR-001: 样式一致性
- Vue3 版本的 Button 组件在所有场景下的视觉表现必须与 Vue2 版本 100% 一致
- 颜色值、尺寸值、圆角值等必须精确匹配，误差为 0

#### NFR-002: 浏览器兼容性
- 样式必须兼容 Chrome、Firefox、Safari、Edge 的最新两个主要版本
- CSS 变量和 calc() 函数必须能在目标浏览器中正常工作

#### NFR-003: 可维护性
- 样式代码结构清晰，易于维护
- CSS 变量命名与 Vue2 版本保持一致，便于后续维护和对比
- 使用 LESS 预处理器特性（变量、mixin）提高代码复用性

#### NFR-004: 性能要求
- 样式文件大小不应超过 Vue2 版本的 120%
- 样式加载不影响组件的渲染性能

## 技术设计

### 目录结构

```
packages/components/button/
├── style/
│   ├── overseas/              # 新增：海外样式目录
│   │   ├── index.less         # 主样式文件
│   │   ├── _var.less          # CSS 变量定义
│   │   └── _mixin.less        # 样式 mixin（可选）
│   ├── css.js                 # 现有：CSS 入口
│   └── index.js               # 修改：切换到海外样式
├── _example/                  # 现有：Demo 示例
├── _usage/                    # 待删除：交互示例面板
├── button.tsx                 # 现有：组件实现
├── index.ts                   # 现有：组件导出
└── ...
```

### 样式变量映射

| 类别 | Vue2 变量 | Vue3 变量 | 说明 |
|------|----------|----------|------|
| 尺寸 | `@btn-height-default` | `@btn-height-default` | 按钮高度 |
| 宽度 | `@btn-width-default` | `@btn-width-default` | 最小宽度 |
| 圆角 | `@btn-border-radius` | `@btn-border-radius` | 默认圆角 |
| 字号 | `@btn-font-default` | `@btn-font-default` | 字体大小 |
| 内边距 | `@btn-padding-horizontal-default` | `@btn-padding-horizontal-default` | 水平内边距 |
| 主题色 | `@btn-color-primary` | `@btn-color-primary` | Primary 主题色 |
| ... | ... | ... | 其他变量同理 |

### 样式实现策略

1. **完全迁移策略**：将 Vue2 的 `_button.less` 和 `_var.less` 完整复制到 Vue3 的 `overseas/` 目录
2. **变量对齐**：确保所有引用的基础 token（如 `@brand-color`、`@border-radius-default`）在 Vue3 中存在
3. **类名对齐**：确认 Vue3 的 TSX 组件生成的 className 与 Vue2 一致
4. **Mixin 迁移**：如果 Vue2 使用了自定义 mixin（如 `.button-size()`），需同步迁移

### 样式加载流程

```
style/index.js (修改)
    ↓
import 'overseas/index.less'
    ↓
@import 'base.less'           (基础样式)
@import '_var.less'           (变量定义)
@import '_mixin.less'         (mixin工具)
@import '_button.less'        (按钮样式)
```

## 依赖关系

### 内部依赖

- **基础样式系统**：依赖 `overseas/style/base.less` 提供全局基础样式
- **基础 Token**：依赖 `overseas/style/` 目录下的基础颜色、尺寸 token
- **Reset Mixin**：依赖 `overseas/style/mixins/_reset.less` 提供样式重置
- **Button 组件 TSX**：依赖现有的 `button.tsx` 生成正确的 className

### 外部依赖

- **LESS 预处理器**：用于编译 `.less` 样式文件
- **构建系统**：依赖现有的 Vite/Webpack 构建配置处理样式导入

## 风险评估

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 基础 Token 不存在或值不一致 | 高 | 中 | 在迁移前对比 Vue2 和 Vue3 的基础 Token，补齐缺失的变量 |
| TSX 生成的 className 与 Vue2 不一致 | 高 | 低 | 对比 Vue2 和 Vue3 的 DOM 结构，调整样式选择器 |
| Mixin 函数在 Vue3 中不可用 | 中 | 中 | 将 mixin 函数一并迁移，或使用 CSS 变量替代 |
| 样式文件加载顺序错误 | 中 | 低 | 按照 Vue2 的加载顺序组织 `@import` 语句 |
| 浏览器兼容性问题 | 低 | 低 | 使用标准 CSS 属性，避免实验性特性 |

## 验收测试场景

### 场景 1：基础按钮渲染
**前置条件**：使用默认配置渲染按钮  
**操作步骤**：
1. 在 Demo 页面渲染 `<t-button>按钮</t-button>`
2. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- 按钮高度、宽度、圆角、字号、内边距与 Vue2 完全一致
- 按钮颜色、边框、文字颜色与 Vue2 完全一致

### 场景 2：所有变体渲染
**前置条件**：渲染四种变体的按钮  
**操作步骤**：
1. 渲染 `variant="base"`、`variant="outline"`、`variant="dashed"`、`variant="text"`
2. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- 每种变体的样式与 Vue2 完全一致
- 边框样式（实线/虚线）、背景色、文字装饰与 Vue2 一致

### 场景 3：所有主题色渲染
**前置条件**：渲染五种主题色的按钮  
**操作步骤**：
1. 渲染 `theme="default"`、`theme="primary"`、`theme="success"`、`theme="warning"`、`theme="danger"`
2. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- 每种主题色的颜色值与 Vue2 完全一致
- 主题色在不同变体下的表现与 Vue2 一致

### 场景 4：所有尺寸渲染
**前置条件**：渲染四种尺寸的按钮  
**操作步骤**：
1. 渲染 `size="xs"`、`size="small"`、`size="medium"`、`size="large"`
2. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- 每种尺寸的高度、宽度、字号、内边距与 Vue2 完全一致
- 圆角值与 Vue2 一致

### 场景 5：交互状态测试
**前置条件**：测试按钮的交互状态  
**操作步骤**：
1. 鼠标悬停按钮（hover）
2. 鼠标按下按钮（active）
3. 设置按钮为 disabled 状态
4. 设置按钮为 loading 状态

**预期结果**：
- Hover 状态的颜色变化与 Vue2 一致
- Active 状态的颜色变化与 Vue2 一致
- Disabled 状态的样式与 Vue2 一致
- Loading 状态的样式与 Vue2 一致

### 场景 6：形状测试
**前置条件**：测试三种形状的按钮  
**操作步骤**：
1. 渲染 `shape="circle"`、`shape="round"`、`shape="square"`
2. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- Circle 形状的圆角为 50%，宽度等于高度
- Round 形状的圆角为高度的一半
- Square 形状的圆角为默认值，宽度等于高度

### 场景 7：Ghost 模式测试
**前置条件**：测试幽灵按钮  
**操作步骤**：
1. 在深色背景上渲染 `ghost` 按钮
2. 测试不同主题色的 ghost 按钮
3. 对比 Vue2 和 Vue3 的渲染结果

**预期结果**：
- 背景透明，边框和文字颜色为白色或主题色
- Ghost 模式的交互状态与 Vue2 一致

### 场景 8：图标按钮测试
**前置条件**：测试带图标的按钮  
**操作步骤**：
1. 渲染带前置图标的按钮
2. 渲染带后置图标的按钮
3. 渲染纯图标按钮（无文字）

**预期结果**：
- 图标尺寸与 Vue2 一致
- 图标与文字的间距与 Vue2 一致

## 假设和约束

### 假设
1. Vue3 项目已经有 `overseas/style/` 目录，提供基础的颜色、尺寸 token
2. Vue3 的 Button 组件 TSX 实现生成的 className 与 Vue2 一致（如 `t-button`、`t-button--variant-base` 等）
3. 构建系统已配置支持 LESS 预处理器
4. 项目已引入 TDesign 的基础样式和 reset 样式

### 约束
1. 只修改样式文件，不修改组件的 TSX 逻辑
2. 保持与 Vue2 版本 100% 的视觉一致性，不做任何改进或优化
3. 样式变量命名必须与 Vue2 版本完全一致，便于后续维护
4. 不引入新的依赖库或工具

## 附录

### 参考资料
- Vue2 Button 样式源码：`c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\button\style\`
- Vue3 Button 组件源码：`c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui\packages\components\button\`
- Vue3 Checkbox 海外适配示例：`packages\components\checkbox\style\overseas\`

### 变更历史
| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-02-11 | 初始版本 | AI Assistant |
