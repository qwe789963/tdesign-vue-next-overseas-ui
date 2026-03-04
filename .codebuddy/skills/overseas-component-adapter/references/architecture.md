# 海外适配架构参考文档

## 项目目录结构

```
tdesign-vue-next-s2/                          # Vue 3 主仓库（当前项目）
├── overseas/                                  # 海外版全局样式覆盖层
│   └── style/
│       ├── base.less                          # 基础样式（导入变量 + 工具类）
│       ├── _variables.less                    # 全局 Less 变量定义（400+ 行）
│       ├── mixins/                            # 通用 Less Mixins
│       │   ├── _layout.less                   # Flex / 绝对定位 / 列表重置
│       │   ├── _reset.less                    # 组件重置 mixin
│       │   ├── _scrollbar.less                # 滚动条样式（Firefox + Chrome）
│       │   └── _text.less                     # 文本省略 mixin（单行/多行）
│       └── theme/                             # 海外版主题 Design Tokens
│           ├── _index.less                    # 聚合入口
│           ├── _light.less                    # 浅色主题（192 行）
│           ├── _dark.less                     # 深色主题（169 行）
│           ├── _font.less                     # 字体系统（Arial + 思源黑体）
│           ├── _radius.less                   # 圆角 token
│           └── _size.less                     # 尺寸/间距 token
│
├── packages/
│   └── components/                            # Vue 3 组件库（79 个组件）
│       ├── style/
│       │   └── index.js                       # 全局样式入口（加载海外主题）
│       ├── select/                            # 示例：Select 组件
│       │   ├── select.tsx                     # 组件逻辑
│       │   ├── props.ts                       # Props 定义
│       │   ├── type.ts                        # TypeScript 类型
│       │   └── style/
│       │       ├── index.js                   # 样式入口（含海外导入）
│       │       └── overseas/                  # 海外样式覆盖
│       │           ├── index.less
│       │           ├── _var.less
│       │           └── _select.less
│       └── ...（其他组件）
│
└── s2-overseas-ui/                      # Vue 2 海外版独立仓库（参考源）
    └── packages/
        └── overseas/
            └── src/                           # Vue 2 组件源码（80+ 组件）
                ├── index.ts
                ├── components.ts
                ├── config.ts                  # prefix = 't'
                ├── hooks/
                ├── utils/
                ├── select/                    # Vue 2 Select 海外版
                ├── popup/                     # Vue 2 Popup 海外版
                └── ...
```

## 全局样式入口

文件：`packages/components/style/index.js`

```javascript
import '@tdesign/common-style/web/_global.less';
import '@tdesign/common-style/web/theme/_index.less';
// 海外版本主题（覆盖官方主题变量）
import '../../../overseas/style/theme/_index.less';
```

加载顺序：
1. TDesign 官方全局样式
2. TDesign 官方主题 tokens
3. **海外版主题 token 覆盖**（CSS 变量覆盖）

## 已有海外样式的组件

以下 20 个组件已有 `style/overseas/` 目录：

| 组件 | 已有海外样式 | 已有逻辑变更 |
|------|------------|------------|
| alert | ✅ | ❌ |
| breadcrumb | ✅ | ❌ |
| button | ✅ | ❌ |
| checkbox | ✅ | ❌ |
| collapse | ✅ | ❌ |
| dialog | ✅ | ❌ |
| dropdown | ✅ | ❌ |
| form | ✅ | ❌ |
| input | ✅ | ❌ |
| link | ✅ | ❌ |
| menu | ✅ | ❌ |
| message | ✅ | ❌ |
| radio | ✅ | ✅（focus 外圈） |
| select | ✅ | ✅（suffixIconOs、singleUseTag、optionWarp） |
| switch | ✅ | ❌ |
| table | ✅ | ❌ |
| tabs | ✅ | ❌ |
| textarea | ✅ | ❌ |
| tooltip | ✅ | ❌ |
| upload | ✅ | ❌ |

## 关键 Design Token 值

### 颜色 Tokens（浅色主题 - `overseas/style/theme/_light.less`）

| Token | 海外版值 | 用途 |
|-------|---------|------|
| `--td-brand-color` | `#1B72E3` | 品牌主色 |
| `--td-brand-color-hover` | `#4B91E8` | 悬停状态 |
| `--td-brand-color-active` | `#1564CC` | 按压/激活状态 |
| `--td-brand-color-light` | `#ECF2FE` | 浅色变体背景 |
| `--td-warning-color` | `#FFA126` | 警告色 / 次要操作色 |
| `--td-error-color` | `#E34D59` | 错误状态 |
| `--td-success-color` | `#2BA471` | 成功状态 |

### 字体 Tokens（`overseas/style/theme/_font.less`）

```css
--td-font-family: Arial, "SourceHanSansCN-Regular", "Microsoft YaHei", sans-serif;
```

### 圆角 Tokens（`overseas/style/theme/_radius.less`）

| Token | 值 |
|-------|------|
| `--td-radius-default` | `4px` |
| `--td-radius-medium` | `8px` |
| `--td-radius-large` | `12px` |

### 尺寸 Tokens（`overseas/style/theme/_size.less`）

| Token | Small | Default | Large |
|-------|-------|---------|-------|
| 组件高度 | `28px` | `40px` | `48px` |
| 字体大小 | `12px` | `14px` | `16px` |
| 水平内边距 | `8px` | `12px` | `16px` |

## Vue 2 海外版库结构

Vue 2 海外版库（`s2-overseas-ui/`）是一个独立的 monorepo：

- **包名**：`@tencent/s2-overseas-ui`
- **Vue 版本**：Vue 2.6 + `@vue/composition-api`
- **编码风格**：混合 — 部分组件使用 Composition API，部分使用 Options API + mixins
- **关键文件**：
  - `packages/overseas/src/index.ts` — Install 函数 + 全量导出
  - `packages/overseas/src/components.ts` — 组件注册列表
  - `packages/overseas/src/config.ts` — `export const prefix = 't'`

### 优先级组件（来自工作区配置）

Vue 2 海外版库的工作区配置（`s2-overseas-ui.code-workspace`）列出了以下优先开发组件：
- `input`、`popup`、`tag`、`tag-input`、`select`、`select-input`、`time-picker`、`date-picker`
