# Button 按钮组件海外适配 任务清单

> **规范引用**: 本任务清单遵循 `../../../.codebuddy/.rules/team-rule.md` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | button-overseas-adaptation |
| 计划版本 | 0.1.0 |
| 任务版本 | 0.1.0 |
| 创建日期 | 2026-02-11 |
| 总任务数 | 21 |
| 完成进度 | 0% |

## 任务状态说明

- 🔴 **待开始** - 任务尚未开始
- 🟡 **进行中** - 任务正在进行
- 🟢 **已完成** - 任务已完成
- ⚫ **已取消** - 任务已取消
- 🔵 **已阻塞** - 任务被阻塞

## 任务列表

### 阶段 0: 研究和准备 (0.5 Day)

#### T0.1: 对比 Vue2 和 Vue3 的基础 Token
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1h
- **描述**: 检查 Vue2 样式文件中引用的基础 Token（如 `@brand-color`、`@success-color`）在 Vue3 中是否存在，对比颜色值、尺寸值是否一致
- **验收标准**:
  - [ ] 已列出所有 Vue2 样式中引用的基础 Token
  - [ ] 已检查每个 Token 在 Vue3 中是否存在
  - [ ] 已对比 Token 值是否一致
  - [ ] 生成 Token 对比表并记录在 `research.md`
- **相关文件**:
  - `s2-overseas-ui/packages/overseas/src/button/style/_var.less` (Vue2)
  - `tdesign-vue-next-overseas-ui/packages/components/button/style/` (Vue3)
  - `tdesign-vue-next-overseas-ui/overseas/style/` (Vue3 基础样式)

#### T0.2: 对比 Button 组件的 DOM 结构和 className
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1h
- **依赖**: 无
- **描述**: 在 Vue2 和 Vue3 中渲染相同配置的按钮，检查生成的 className 是否一致（如 `t-button--variant-base`），记录差异点
- **验收标准**:
  - [ ] 已在 Vue2 和 Vue3 中渲染相同配置的按钮
  - [ ] 已对比 DOM 结构和 className
  - [ ] 记录差异点在 `research.md`
- **相关文件**:
  - `packages/components/button/button.tsx` (Vue3)

#### T0.3: 检查 Mixin 和工具函数
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 0.5h
- **依赖**: 无
- **描述**: 分析 Vue2 的 `_mixin.less` 中定义的函数（如 `.button-size()`），确认 Vue3 中是否有对应的 mixin，确定是否需要迁移
- **验收标准**:
  - [ ] 已分析 Vue2 的所有 mixin 函数
  - [ ] 确认 Vue3 中是否有对应 mixin
  - [ ] 确定 mixin 迁移策略
  - [ ] 记录分析结果在 `research.md`
- **相关文件**:
  - `s2-overseas-ui/packages/overseas/src/button/style/_mixin.less` (Vue2)

#### T0.4: 确认样式加载机制
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 0.5h
- **依赖**: 无
- **描述**: 检查 Vue3 的 `style/index.js` 的当前实现，确认如何切换到海外样式，确定样式文件的加载顺序
- **验收标准**:
  - [ ] 已阅读 `style/index.js` 文件
  - [ ] 确认样式加载机制
  - [ ] 确定样式切换方式
  - [ ] 记录加载流程在 `research.md`
- **相关文件**:
  - `packages/components/button/style/index.js` (Vue3)

---

### 阶段 1: 样式文件迁移 (1 Day)

#### T1.1: 创建海外样式目录结构
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 0.5h
- **依赖**: T0.1, T0.2, T0.3, T0.4
- **描述**: 在 Vue3 Button 组件的 `style/` 目录下创建 `overseas/` 子目录
- **验收标准**:
  - [ ] 目录 `packages/components/button/style/overseas/` 已创建
  - [ ] 目录结构符合规范
- **相关文件**:
  - `packages/components/button/style/overseas/` (待创建)

#### T1.2: 迁移 _var.less (CSS 变量定义)
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 2h
- **依赖**: T1.1
- **描述**: 复制 Vue2 的 `_var.less` 到 Vue3 `overseas/` 目录，确认所有引用的基础 Token 存在，如有缺失 Token，添加补充定义或调整引用
- **验收标准**:
  - [ ] 文件 `style/overseas/_var.less` 已创建
  - [ ] 所有 CSS 变量已定义
  - [ ] 所有引用的基础 Token 已验证存在或已补充定义
  - [ ] 文件可被正确编译（无 LESS 语法错误）
- **相关文件**:
  - `packages/components/button/style/overseas/_var.less` (待创建)
  - `s2-overseas-ui/packages/overseas/src/button/style/_var.less` (Vue2 源)

#### T1.3: 迁移 _mixin.less (样式 mixin)
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1h
- **依赖**: T1.1
- **描述**: 复制 Vue2 的 `_mixin.less` 到 Vue3 `overseas/` 目录，确认 mixin 函数语法兼容，测试 mixin 函数可正常调用
- **验收标准**:
  - [ ] 文件 `style/overseas/_mixin.less` 已创建
  - [ ] 所有 mixin 函数已定义
  - [ ] Mixin 语法兼容 Vue3 的 LESS 编译器
  - [ ] 文件可被正确编译（无 LESS 语法错误）
- **相关文件**:
  - `packages/components/button/style/overseas/_mixin.less` (待创建)
  - `s2-overseas-ui/packages/overseas/src/button/style/_mixin.less` (Vue2 源)

#### T1.4: 迁移 _button.less (按钮样式)
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 2h
- **依赖**: T1.2, T1.3
- **描述**: 复制 Vue2 的 `_button.less` 到 Vue3 `overseas/` 目录，确认选择器与 Vue3 生成的 className 匹配，调整不一致的选择器（如有）
- **验收标准**:
  - [ ] 文件 `style/overseas/_button.less` 已创建
  - [ ] 所有按钮样式规则已定义
  - [ ] 选择器与 Vue3 的 className 匹配
  - [ ] 文件可被正确编译（无 LESS 语法错误）
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less` (待创建)
  - `s2-overseas-ui/packages/overseas/src/button/style/_button.less` (Vue2 源)

#### T1.5: 创建 index.less (主样式文件)
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 0.5h
- **依赖**: T1.2, T1.3, T1.4
- **描述**: 创建样式入口文件，按正确顺序导入：base.less → _var.less → _mixin.less → _button.less，确认导入路径正确
- **验收标准**:
  - [ ] 文件 `style/overseas/index.less` 已创建
  - [ ] 所有样式文件按正确顺序导入
  - [ ] 导入路径正确
  - [ ] 文件可被正确编译（无 LESS 语法错误）
- **相关文件**:
  - `packages/components/button/style/overseas/index.less` (待创建)

#### T1.6: 更新 style/index.js
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 0.5h
- **依赖**: T1.5
- **描述**: 修改样式入口，从 TDesign 通用样式切换到海外样式，确认样式加载顺序正确
- **验收标准**:
  - [ ] 文件 `style/index.js` 已更新
  - [ ] 样式导入路径已切换到 `./overseas/index.less`
  - [ ] 本地开发服务器可以正常启动
  - [ ] 样式可以正确加载
- **相关文件**:
  - `packages/components/button/style/index.js` (待修改)

---

### 阶段 2: 样式验证和调整 (1 Day)

#### T2.1: 基础变体验证
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1.5h
- **依赖**: T1.6
- **描述**: 渲染 base、outline、dashed、text 四种变体，对比 Vue2 和 Vue3 的渲染效果，调整不一致的样式
- **验收标准**:
  - [ ] 已渲染所有四种变体
  - [ ] 已对比 Vue2 和 Vue3 的渲染效果
  - [ ] 所有变体的样式与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less`

#### T2.2: 主题色验证
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1.5h
- **依赖**: T1.6
- **描述**: 渲染 default、primary、success、warning、danger 五种主题色，对比每种主题色在不同变体下的表现，调整颜色值差异
- **验收标准**:
  - [ ] 已渲染所有五种主题色
  - [ ] 已对比每种主题色在不同变体下的表现
  - [ ] 所有主题色的颜色值与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_var.less`
  - `packages/components/button/style/overseas/_button.less`

#### T2.3: 尺寸验证
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1h
- **依赖**: T1.6
- **描述**: 渲染 xs、s、m、l 四种尺寸，测量高度、宽度、圆角、字号、内边距，调整尺寸差异
- **验收标准**:
  - [ ] 已渲染所有四种尺寸
  - [ ] 已测量所有尺寸属性
  - [ ] 所有尺寸的样式属性与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_var.less`
  - `packages/components/button/style/overseas/_button.less`

#### T2.4: 形状验证
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 1h
- **依赖**: T1.6
- **描述**: 渲染 circle、round、square 三种形状，对比圆角和尺寸，调整形状样式
- **验收标准**:
  - [ ] 已渲染所有三种形状
  - [ ] 已对比圆角和尺寸
  - [ ] 所有形状的样式与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less`

#### T2.5: 交互状态验证
- **状态**: 🔴 待开始
- **优先级**: P0
- **预估工时**: 1.5h
- **依赖**: T1.6
- **描述**: 测试 hover、active、disabled、loading 状态，对比颜色变化和视觉效果，调整交互状态样式
- **验收标准**:
  - [ ] 已测试所有四种交互状态
  - [ ] 已对比颜色变化和视觉效果
  - [ ] 所有交互状态的样式与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less`

#### T2.6: Ghost 模式验证
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 1h
- **依赖**: T1.6
- **描述**: 在深色背景上渲染 ghost 按钮，测试不同主题色的 ghost 按钮，对比透明度和颜色，调整 ghost 模式样式
- **验收标准**:
  - [ ] 已在深色背景上渲染 ghost 按钮
  - [ ] 已测试不同主题色的 ghost 按钮
  - [ ] Ghost 模式的样式与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less`

#### T2.7: 图标按钮验证
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 1h
- **依赖**: T1.6
- **描述**: 渲染带前置图标、后置图标、纯图标的按钮，检查图标尺寸和间距，调整图标样式
- **验收标准**:
  - [ ] 已渲染带前置图标、后置图标、纯图标的按钮
  - [ ] 已检查图标尺寸和间距
  - [ ] 图标按钮的样式与 Vue2 完全一致
  - [ ] 记录验证结果
- **相关文件**:
  - `packages/components/button/style/overseas/_button.less`

---

### 阶段 3: 文档优化和清理 (0.5 Day)

#### T3.1: 删除交互示例面板
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 0.5h
- **依赖**: T2.1, T2.2, T2.3, T2.4, T2.5, T2.6, T2.7
- **描述**: 删除 `packages/components/button/_usage/` 目录，隐藏交互示例面板
- **验收标准**:
  - [ ] 目录 `_usage/` 已删除
  - [ ] 交互示例面板已隐藏
  - [ ] 文档页面正常显示
- **相关文件**:
  - `packages/components/button/_usage/` (待删除)

#### T3.2: 验证文档页面
- **状态**: 🔴 待开始
- **优先级**: P1
- **预估工时**: 0.5h
- **依赖**: T3.1
- **描述**: 确认交互示例面板已隐藏，确认 Demo 标签页的示例仍然完整，确认 API 文档仍然完整
- **验收标准**:
  - [ ] 交互示例面板已隐藏
  - [ ] Demo 标签页的示例完整显示
  - [ ] API 文档完整显示
  - [ ] 无控制台错误
- **相关文件**:
  - Button 组件文档页面

#### T3.3: 更新 CHANGELOG
- **状态**: 🔴 待开始
- **优先级**: P2
- **预估工时**: 0.5h
- **依赖**: T3.1, T3.2
- **描述**: 记录海外适配的变更内容，说明删除交互示例面板的原因
- **验收标准**:
  - [ ] CHANGELOG 已更新
  - [ ] 变更内容清晰完整
  - [ ] 版本号已确定
- **相关文件**:
  - `CHANGELOG.md` (待更新)

#### T3.4: 创建实施总结报告
- **状态**: 🔴 待开始
- **优先级**: P2
- **预估工时**: 1h
- **依赖**: T3.1, T3.2, T3.3
- **描述**: 总结实施过程中的关键步骤，记录遇到的问题和解决方案，提供样式对比截图
- **验收标准**:
  - [ ] 实施总结报告已完成
  - [ ] 包含关键步骤、问题和解决方案
  - [ ] 提供样式对比截图
  - [ ] 记录在 `implementation/summary.md`
- **相关文件**:
  - `specs/003-button-overseas-adaptation/implementation/summary.md` (待创建)

---

## 进度统计

| 阶段 | 总任务 | 已完成 | 进行中 | 待开始 | 完成率 |
|------|--------|--------|--------|--------|--------|
| 阶段0: 研究和准备 | 4 | 0 | 0 | 4 | 0% |
| 阶段1: 样式文件迁移 | 6 | 0 | 0 | 6 | 0% |
| 阶段2: 样式验证和调整 | 7 | 0 | 0 | 7 | 0% |
| 阶段3: 文档优化和清理 | 4 | 0 | 0 | 4 | 0% |
| **总计** | **21** | **0** | **0** | **21** | **0%** |

---

## 任务执行规则

### 依赖关系
- **阶段间依赖**: 必须按阶段 0 → 1 → 2 → 3 的顺序执行
- **阶段内依赖**: 标记了"依赖"字段的任务必须等待依赖任务完成后才能开始
- **并行任务**: 无依赖关系的任务可以并行执行（标记为 [P]）

### 执行流程
1. **阶段 0**: 所有研究任务可以并行执行
2. **阶段 1**: T1.1 必须先完成，然后 T1.2 和 T1.3 可以并行，T1.4 依赖 T1.2 和 T1.3，T1.5 依赖 T1.4，T1.6 依赖 T1.5
3. **阶段 2**: 所有验证任务依赖 T1.6，但可以并行执行
4. **阶段 3**: T3.1 依赖所有阶段 2 任务，其他任务依次执行

---

## 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-02-11 | 初始版本 - 基于 plan.md 创建任务清单 | AI Assistant |
