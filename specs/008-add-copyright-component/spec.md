# t-copyright 海外版权声明组件 规格说明书

> **规范引用**: 本规格说明书遵循 `../../.codebuddy/.rules/team-rule.mdc` 中的规范要求

## 元信息

| 属性 | 值 |
|------|-----|
| 功能名称 | add-copyright-component |
| 版本 | 0.1.0 |
| 状态 | Draft |
| 创建日期 | 2026-03-04 |
| 作者 | @plutoqin |

## 概述

### 功能简介

在 TDesign Vue 3 海外版组件库中新增 `t-copyright`（版权声明）组件。该组件用于在页面底部展示统一的版权声明信息，包含版权年份范围和部门文本。现有 Vue 2 海外版已有该组件实现，本次需求是将其迁移至 Vue 3 体系，并遵循 Vue 3 组件库的架构规范（Composition API、TSX、海外样式三层架构等），同时提供相应的示例和文档。

### 目标用户

- 使用 TDesign Vue 3 海外版组件库的前端开发人员
- 需要在应用页面底部统一展示版权声明信息的产品团队

### 成功指标

- [ ] 用户可以通过 `<t-copyright />` 标签在页面中渲染出完整的版权声明内容
- [ ] 组件在所有主流浏览器（Chrome、Firefox、Safari、Edge 最新版本）中显示一致
- [ ] 组件提供至少 1 个可运行的基础示例
- [ ] 组件具备中英文 API 文档

## 需求详情

### 功能需求

#### FR-001: 基础版权声明展示

**描述**: 组件默认渲染两行文本内容——第一行为 `Copyright © 1998 - {当前年份} TENCENT. All Rights Reserved.`，第二行为部门文本（通过全局配置 `ConfigProvider` 提供）。
**优先级**: P0
**验收标准**:
- [ ] 组件渲染时，版权年份范围中的结束年份为当前系统年份（动态获取）
- [ ] 组件渲染出两行文本：版权行和部门行
- [ ] 部门文本通过全局配置注入，支持运行时自定义

#### FR-002: 海外样式适配

**描述**: 组件样式需遵循海外版样式规范，采用三层样式架构（`index.less` → `_index.less` → `_var.less` + `_mixin.less`），引用海外全局基础变量，确保与海外版整体视觉风格一致。
**优先级**: P0
**验收标准**:
- [ ] 字体大小使用海外版全局变量 `@font-size-s`（12px）
- [ ] 文本居中对齐
- [ ] 行高使用海外版全局变量 `@text-line-height-s`（20px）
- [ ] 文字颜色使用海外版全局变量 `@text-color-disabled`
- [ ] 样式文件目录结构遵循 `style/overseas/` 三层架构规范

#### FR-003: 组件注册与导出

**描述**: 组件需使用 `withInstall` 方法包装，支持全局注册和按需引入，导出符合组件库标准的类型定义。
**优先级**: P0
**验收标准**:
- [ ] 组件通过 `withInstall` 包装后导出
- [ ] 支持全局 `app.use(Copyright)` 注册
- [ ] 支持按需 `import { Copyright } from 'tdesign-vue-next'` 引入
- [ ] 导出 TypeScript 类型定义

#### FR-004: 示例与文档

**描述**: 提供基础用法示例及中英文 API 文档，方便开发者快速了解和使用该组件。
**优先级**: P1
**验收标准**:
- [ ] 在 `_example/` 目录下提供至少一个基础用法示例 `base.vue`
- [ ] 提供中文 API 文档 `copyright.md`，包含组件标题、描述、示例引用和 API 说明
- [ ] 提供英文 API 文档 `copyright.en-US.md`，内容与中文文档对应

### 非功能需求

#### NFR-001: Vue 3 架构合规

- 组件实现必须使用 Vue 3 `defineComponent` + Composition API（`setup`）
- 使用 TSX 编写渲染逻辑
- 遵循项目现有组件的文件结构和命名规范

#### NFR-002: 兼容性要求

- 支持 Chrome、Firefox、Safari、Edge 最新版本
- 支持移动端响应式适配（文本居中，字体大小随基准变量）

## 依赖关系

### 内部依赖

- 海外全局基础样式 `overseas/style/base.less`（提供全局变量和基础样式）
- 组件库基础设施 `withInstall` 方法（用于组件注册包装）
- 全局配置 `ConfigProvider` 机制（用于注入部门文本等全局配置）

### 外部依赖

- Vue 3.x
- Less 预处理器

## 假设

1. 全局配置 `ConfigProvider` 在 Vue 3 版本中已具备与 Vue 2 版本类似的全局文本注入能力，可以提供 `copyright.deptText` 配置项
2. 海外版全局变量 `@font-size-s`、`@text-line-height-s`、`@text-color-disabled` 已在 `overseas/style/_variables.less` 中定义
3. 组件无需支持复杂的 props 配置（如自定义版权年份起始年份等），保持简洁

## 风险评估

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| Vue 3 ConfigProvider 尚未支持 copyright 配置项 | 中 | 中 | 检查现有 ConfigProvider 实现，若不支持则需先扩展配置 |
| 海外基础样式变量缺失 | 低 | 低 | 复用已有变量（alert 等组件已验证可用） |

## 附录

### 参考资料

- Vue 2 海外版 copyright 组件实现：`s2-overseas-ui/packages/overseas/src/copyright/`
- Alert 组件海外适配实现（样式架构参考）：`packages/components/alert/`
- Button 组件海外适配实现（样式架构参考）：`packages/components/button/`

### 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 0.1.0 | 2026-03-04 | 初始版本 | @plutoqin |
