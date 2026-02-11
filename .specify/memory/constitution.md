<!--
  Sync Impact Report
  ===================
  Version change: 1.1.0 → 1.2.0

  Modified principles:
  - 更正项目名称: "Nuxt App" → "TDesign Vue Next Component Library"
  - 更新技术栈: 准确反映 Vue 3 组件库的实际技术栈
  - 补充开发命令: 添加组件库特定的开发和构建命令
  - 更新浏览器兼容性要求: 反映 TDesign 的实际兼容性标准
  - 补充 Monorepo 架构说明

  Added sections:
  - 组件库开发特定工作流
  - 浏览器兼容性要求
  - Monorepo 架构说明

  Removed sections: None

  Templates requiring updates:
  - ✅ plan-template.md (需修正 team-rule.mdc → team-rule.md)
  - ✅ spec-template.md (需修正 team-rule.mdc → team-rule.md)
  - ✅ tasks-template.md (需修正 team-rule.mdc → team-rule.md)
  - ✅ checklist-template.md (需修正 team-rule.mdc → team-rule.md)

  Follow-up TODOs: None

  Version upgrade rationale: MINOR version bump (1.1.0 → 1.2.0)
  - Reason: Substantial content updates and corrections to project identity
  - No breaking changes to governance structure or principles
  - Clarifications and alignment with actual project architecture
-->

# TDesign Vue Next Component Library Constitution

> **继承声明**: 本文件继承自 `../../.codebuddy/.rules/team-rule.md`，所有 `team-rule.md` 中的规范在本文件中同样适用。
> 当本文件与 `team-rule.md` 存在冲突时，以 `team-rule.md` 为准。

---

## 📌 继承规范

本文件继承以下规范文件的全部内容:

| 规范文件 | 路径 | 优先级 | 主要内容 |
|---------|------|--------|----------|
| 主规范 | `../../.codebuddy/.rules/team-rule.md` | 最高 | 代码规范、命名规范、目录结构、安全规范、精度计算规范 |
| TypeScript规范 | `../../.codebuddy/.rules/TypeScript官方规范.md` | 高 | TypeScript 语法和类型规范 |
| TypeScript开发指南 | `../../.codebuddy/.rules/TypeScript编程开发指南.md` | 高 | TypeScript 开发最佳实践 |
| CSS规范 | `../../.codebuddy/.rules/CSS官方规范.md` | 高 | CSS/Less 样式规范 |
| 执行指南 | `../../.codebuddy/.rules/UNIFIED_RULES.md` | 中 | 规范执行指南 |

**继承原则**:
- 所有继承规范中的【必须】级别要求，在本文件中同样为【必须】
- 所有继承规范中的【推荐】级别要求，在本文件中同样为【推荐】
- 本文件仅补充 TDesign Vue Next 组件库特定规范，不重复定义已有规范

**继承自 team-rule.md 的核心规范**(直接引用，不重复定义):
- 【必须】代码规范 - 通用规范、命名规范
- 【必须】非说明文件命名规范 - 前缀命名规则
- 【必须】目录结构和 index 文件规范
- 【必须】语言包规范
- 【必须】数据库操作规范
- 【必须】前端安全规范 - XSS 防护、安全工具集成
- 【必须】后端安全规范 - 请求限流、CSRF 防护、输入验证
- 【必须】前端数值计算规范 - 高精度计算工具
- 【必须】前端性能规范
- 【必须】文档规范
- 【推荐】代码组织最佳实践

---

## 项目特定配置

### I. 项目概述

**项目名称**: TDesign Vue Next  
**项目类型**: Vue 3 桌面端 UI 组件库  
**架构模式**: Monorepo (pnpm workspace)  
**开源协议**: MIT License  
**官方文档**: https://tdesign.tencent.com/  
**GitHub**: https://github.com/Tencent/tdesign-vue-next

**核心特性**:
- 适配桌面端交互的高质量 Vue 3 组件
- 与 TDesign 其他框架版本保持 API 和 UI 一致性
- 支持暗黑模式及主题定制
- 支持按需加载和 Tree Shaking

### II. Monorepo 架构

本项目采用 pnpm workspace 的 Monorepo 架构:

```
packages/
├── tdesign-vue-next/         # 主组件库包
├── tdesign-vue-next-chat/    # 聊天组件包
├── pro-components/           # Pro 组件
├── components/               # 组件源码
├── common/                   # 公共工具
├── shared/                   # 共享 Hooks
└── auto-import-resolver/     # 自动导入解析器
```

**包依赖关系**:
- `tdesign-vue-next` 依赖 `@tdesign/components`, `@tdesign/shared-hooks`, `@tdesign/shared-utils`
- 所有包共享 TypeScript 配置和构建工具

### III. 技术栈版本

| 技术 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | >= 18 | 运行时环境 |
| 包管理器 | pnpm@9.15.9 | 包管理器 |
| 前端框架 | Vue >= 3.1.0 | 前端框架 (peerDependency) |
| TypeScript | ^5.x | 语言 |
| 构建工具 | Vite | 开发服务器和构建工具 |
| 测试框架 | Vitest | 单元测试框架 |
| 包发布 | tdesign-publish-cli | 发布工具 |

> **注意**: 具体版本以项目根目录的 `package.json` 为准

### IV. 核心依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `vue` | >= 3.1.0 | Vue 3 核心 |
| `@popperjs/core` | catalog:deps | Popup 定位 |
| `dayjs` | catalog:deps | 日期处理 |
| `lodash-es` | catalog:deps | 工具函数 |
| `tdesign-icons-vue-next` | catalog:tdesign | TDesign 图标库 |
| `tinycolor2` | catalog:deps | 颜色处理 |
| `sortablejs` | catalog:deps | 拖拽排序 |

### V. 浏览器兼容性要求

TDesign Vue Next 支持以下浏览器版本:

| 浏览器 | 版本要求 |
|--------|----------|
| Chrome | >= 84 |
| Firefox | >= 83 |
| Safari | >= 14.1 |
| Edge | >= 84 |

**兼容性原则**:
- 使用现代浏览器 API，不支持 IE 浏览器
- 使用 Browserslist 配置管理兼容性
- 关键功能需在所有支持的浏览器中测试

详情参见: [TDesign 浏览器兼容性说明](https://github.com/Tencent/tdesign/wiki/Browser-Compatibility)

---

## Development Workflow

### I. Spec-Kit SDD 工作流

Spec-Kit 采用 SDD (Specification-Driven Development) 规约驱动开发模式:

```
/speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks → /speckit.implement
```

### II. 命令说明

| 命令 | 功能 |
|------|------|
| `/speckit.constitution` | 创建/更新项目宪法 |
| `/speckit.specify` | 创建功能规格说明 |
| `/speckit.clarify` | 澄清规格中的模糊点 |
| `/speckit.plan` | 创建技术实现计划 |
| `/speckit.tasks` | 生成任务列表 |
| `/speckit.checklist` | 生成质量检查清单 |
| `/speckit.analyze` | 一致性分析 |
| `/speckit.implement` | 执行实现 |

### III. 组件库开发流程

#### 1. 环境准备
```bash
# 使用指定 Node 版本
nvm use # 自动读取 .nvmrc 或使用 Node >= 18

# 安装依赖
pnpm install

# 初始化 Git 子模块
pnpm init
```

#### 2. 开发命令

**主组件库开发**:
```bash
# 启动主组件库开发服务器
pnpm run dev:vue

# 构建主组件库
pnpm run build:vue

# 运行测试
pnpm run test:vue

# 更新测试快照
pnpm run test:vue:update
```

**Chat 组件开发**:
```bash
# 启动 Chat 组件开发服务器
pnpm run dev:chat

# 构建 Chat 组件
pnpm run build:chat
```

**代码质量检查**:
```bash
# TypeScript 类型检查
pnpm run lint:tsc

# ESLint 检查
pnpm run lint

# ESLint 修复
pnpm run lint:fix
```

**其他命令**:
```bash
# 构建自动导入解析器
pnpm run build:auto-import-resolver

# 发布机器人消息
pnpm run robot
```

#### 3. 组件开发规范

**新增组件流程**:
1. 在 `packages/components/` 下创建组件目录
2. 遵循 TDesign 组件目录结构:
   ```
   component-name/
   ├── component-name.tsx       # 组件主文件
   ├── type.ts                  # 类型定义
   ├── style/
   │   └── index.js            # 样式入口
   ├── __tests__/              # 测试文件
   └── README.md               # 组件文档
   ```
3. 在 `components.ts` 中注册组件
4. 编写单元测试
5. 编写组件文档和示例

**组件命名规范**:
- 组件名使用 PascalCase: `ComponentName`
- 文件名使用 kebab-case: `component-name.tsx`
- 样式文件使用 kebab-case: `component-name.less`

**组件 API 设计原则**:
- 保持与 TDesign 其他框架版本 API 一致
- 遵循 Vue 3 Composition API 最佳实践
- 提供完整的 TypeScript 类型定义
- 支持插槽 (slots) 和事件 (events)

---

## Quality Gates

### I. Pre-commit 检查

自动执行以下检查 (通过 husky + lint-staged):
- Prettier 格式化
- ESLint 检查和修复
- TypeScript 类型检查 (可选)

配置位于 `package.json`:
```json
{
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": [
      "prettier --write --cache",
      "eslint --fix --cache"
    ]
  }
}
```

### II. CI/CD 检查

构建流程 MUST 通过以下检查:
1. TypeScript 类型检查 (`pnpm run lint:tsc`)
2. ESLint 检查 (`pnpm run lint`)
3. 单元测试 (`pnpm run test:vue`)
4. 构建验证 (`pnpm run build:vue`)

### III. 发布检查清单

发布前 MUST 确认:
- [ ] 所有测试通过
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已正确递增
- [ ] 文档已同步更新
- [ ] Breaking Changes 已在文档中说明
- [ ] 示例代码已验证
- [ ] 浏览器兼容性已测试

---

## Governance

### I. 宪法优先级

- Constitution 优先于其他所有实践和约定 (除继承的 team-rule.md)
- team-rule.md 优先级最高，当与 Constitution 冲突时以 team-rule.md 为准
- 项目特定规范 (本文档) 补充但不覆盖 team-rule.md

### II. 修改 Constitution

修改 Constitution 需要:
1. 文档化变更内容和理由
2. 更新版本号 (遵循语义化版本):
   - MAJOR: 治理结构或核心原则的重大变更
   - MINOR: 新增章节或实质性内容扩展
   - PATCH: 澄清、措辞修正、拼写修复
3. 同步更新依赖模板 (plan/spec/tasks/checklist)
4. 创建 Sync Impact Report (作为 HTML 注释)

### III. 合规审查

- 所有 PR/代码审查 MUST 验证是否符合 Constitution
- 定期审查 Constitution 的适用性和有效性 (每季度)
- 记录例外情况和理由

### IV. 版本策略

**Constitution 版本**: 采用语义化版本 (SemVer)
- 格式: `MAJOR.MINOR.PATCH`
- 当前版本: 1.2.0

**组件库版本**: 遵循 TDesign 版本策略
- 主版本: Breaking Changes
- 次版本: 新增功能
- 修订版本: Bug 修复

---

**Version**: 1.2.0 | **Ratified**: 2025-12-15 | **Last Amended**: 2026-02-10
