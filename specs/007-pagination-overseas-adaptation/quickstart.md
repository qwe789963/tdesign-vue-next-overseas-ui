# Pagination 海外适配 快速开始指南

> **功能名称**: Pagination 分页组件海外样式适配  
> **创建日期**: 2026-03-02  
> **完成日期**: 2026-03-03  
> **状态**: ✅ 已完成

---

## 前置条件

- Node.js >= 18
- pnpm@9.15.9
- 已执行 `pnpm install`
- 已了解 TDesign Pagination 组件基本用法

---

## 文件变更总览

### 新建文件（4 个）
```
packages/components/pagination/style/overseas/
├── _var.less         # CSS 变量定义（46行，15个颜色变量 + 尺寸/字号/间距/过渡）
├── _mixin.less       # Mixin 工具（38行，3个mixin）
├── _mini.less        # PaginationMini 样式（43行，含 padding 修复）
└── index.less        # 主样式文件（318行，完整分页样式）
```

### 修改文件（6 个）
```
packages/components/pagination/
├── type.ts           # 新增 pageSizeDsc、totalPage 类型
├── props.ts          # 新增 pageSizeDsc/totalPage prop，调整 foldedMaxPageBtn/maxPageBtn/pageEllipsisMode 默认值
├── pagination.tsx    # 7 处逻辑修改（图标、文案、Select、折叠逻辑）
├── _example/base.vue       # 更新示例
├── _example-ts/base.vue    # 更新示例（TS版）
└── style/index.js    # 切换样式入口

packages/components/select/
└── select.tsx        # Select 组件海外属性支持
```

---

## 已实施的变更

### 步骤 1: Props 变更（type.ts + props.ts）

**type.ts** — 新增属性：
```typescript
/** 每一页数据量的描述文字，非空时在分页大小选择器左侧渲染标签 @default '' */
pageSizeDsc?: string;
/** 用于自定义总页数呈现内容。默认显示总页数，值为 false 则不显示 @default true */
totalPage?: boolean | TNode;
```

**props.ts** — 关键默认值变更：
```typescript
foldedMaxPageBtn: { type: Number, default: 3 },  // 原 5
maxPageBtn: { type: Number, default: 3 },         // 原 10
pageEllipsisMode: { type: String, default: '' },  // 原 'mid'，海外不需要折叠省略号
pageSizeDsc: { type: String, default: '' },        // 新增
totalPage: { type: [Boolean, Function], default: true },  // 新增
```

### 步骤 2: 组件逻辑修改（pagination.tsx）

共 7 处修改：

1. **图标替换** — `PageFirstIcon`/`PageLastIcon` 完全移除，使用 `ChevronLeftDoubleIcon`/`ChevronRightDoubleIcon`
2. **总量统计文案** — 计算 startIndex/endIndex，显示 "X-Y of Z items"（含 total=0 边界处理）
3. **总页数** — 独立 `totalPage` 渲染插槽，显示 "of X pages"
4. **跳转文案** — 去掉"跳至"前缀，使用 `TInputAdornment` 包裹 `TInputNumber`
5. **分页大小选项 label** — `String(option)` 纯数字
6. **pageSizeDsc 渲染** — Select 前新增 `<div class="page-size-dsc">`
7. **Select 默认属性** — `{...(props.selectProps || { singleUseTag: false, suffixIconOs: 'caret-down-small' })}`
8. **页码折叠逻辑** — 注释掉中间省略号逻辑，始终保持最多 `foldedMaxPageBtn` 个按钮

### 步骤 3: 海外样式文件

**布局顺序**（从左到右）：
pageSizeDsc → Select → total → 首页 → 上一页 → 页码列表 → Simple跳转 → 下一页 → 末页 → Default跳转 → totalPage

**关键样式差异**：
- 页码按钮去除边框，高度 `@comp-size-s`（28px），min-width 28px
- 跳转区域去除背景色，使用 `inline-flex` + `gap` 布局
- 输入框边框色 `@gray-color-6`，宽度 `70px`
- `.page-size-dsc { font-weight: bold }`
- 总计区域颜色 `@font-gray-4`，`margin-right: 10px`
- PaginationMini: 修复 `variant-text + shape-square` 时 padding 覆盖

### 步骤 4: 样式入口切换（style/index.js）

```javascript
// import '@tdesign/common-style/web/components/pagination/_index.less';
import './overseas/index.less';
```

---

## 验证方式

### 开发环境验证
```bash
pnpm run dev:vue
```
在组件库 Demo 页面中找到 Pagination 组件，验证以下场景：
1. ✅ 页码按钮为无边框圆角矩形
2. ✅ 首页/末页图标为双箭头 `«` / `»`
3. ✅ 总量统计显示 "X-Y of Z items"
4. ✅ 总页数显示 "of X pages"
5. ✅ 分页大小选项为纯数字
6. ✅ `pageSizeDsc="Items per page"` 渲染正确
7. ✅ PaginationMini 图标正常显示（medium 尺寸 padding 修复）

### 类型检查
```bash
pnpm run lint:tsc
```

### 单元测试
```bash
pnpm run test:vue
```

---

## 参考资料

| 资料 | 路径 |
|------|------|
| 规格说明书 | `specs/007-pagination-overseas-adaptation/spec.md` |
| 研究报告 | `specs/007-pagination-overseas-adaptation/research.md` |
| 数据模型 | `specs/007-pagination-overseas-adaptation/data-model.md` |
| CSS 变量契约 | `specs/007-pagination-overseas-adaptation/contracts/css-variables.md` |
| Props 契约 | `specs/007-pagination-overseas-adaptation/contracts/pagination-props.ts` |
| Vue2 海外参考 | `s2-overseas-ui/packages/overseas/src/pagination/` |
| 海外全局 Token | `overseas/style/_variables.less` |
| 现有 Pagination 源码 | `packages/components/pagination/` |
