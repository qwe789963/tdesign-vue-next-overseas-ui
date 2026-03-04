# t-copyright 组件快速开始指南

## 概述

本文档描述如何在 TDesign Vue 3 海外版组件库中新增 `t-copyright` 版权声明组件。

## 前置条件

- Node.js >= 18
- pnpm 9.15.9
- 项目依赖已安装（`pnpm install`）

## 实施步骤概览

### 步骤 1：扩展 ConfigProvider 类型定义

**文件**：`packages/components/config-provider/type.ts`

1. 新增 `CopyrightConfig` 接口定义
2. 在 `GlobalConfigProvider` 接口中添加 `copyright?: CopyrightConfig` 字段

### 步骤 2：创建组件目录和文件

在 `packages/components/copyright/` 下创建以下文件：

```
copyright/
├── copyright.tsx       # 组件实现（defineComponent + setup + TSX）
├── index.ts            # 入口（withInstall 包装）
├── props.ts            # Props 定义
├── type.ts             # 类型定义
├── copyright.md        # 中文文档
├── copyright.en-US.md  # 英文文档
├── style/
│   ├── index.js        # Less 入口（引用 overseas 样式）
│   ├── css.js          # CSS 入口
│   └── overseas/
│       ├── index.less  # 海外样式入口
│       ├── _index.less # 主样式
│       ├── _var.less   # 组件变量
│       └── _mixin.less # Mixin
└── _example/
    └── base.vue        # 基础示例
```

### 步骤 3：注册组件到主包

1. **`packages/components/components.ts`**：添加 `export * from './copyright';`
2. **`packages/common/js/components.ts`**：在 `WEB_COMPONENT_MAP` 中添加 `copyright: ['Copyright']`

### 步骤 4：验证

```bash
# 类型检查
pnpm run lint:tsc

# ESLint 检查
pnpm run lint

# 启动开发服务器查看示例
pnpm run dev:vue
```

## 关键实现参考

| 参考组件 | 参考内容 |
|----------|----------|
| Alert (`packages/components/alert/`) | 组件整体结构、ConfigProvider 消费模式、海外样式架构 |
| Button (`packages/components/button/`) | 海外样式入口切换方式 |
| Vue 2 Copyright (`s2-overseas-ui/.../copyright/`) | 原始业务逻辑和样式定义 |

## 注意事项

1. `props.ts` 和 `type.ts` 在该项目中通常由脚本自动生成，但 copyright 组件极简，可手动创建
2. locale 数据 `zh_CN.ts` 已包含 copyright 配置，无需修改
3. 海外样式变量（`@font-size-s` 等）已在全局变量中定义，无需新增
