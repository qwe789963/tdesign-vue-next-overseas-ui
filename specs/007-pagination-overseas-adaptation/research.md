# Pagination 海外适配 研究报告

> **功能名称**: Pagination 分页组件海外样式适配  
> **创建日期**: 2026-03-02  
> **状态**: ✅ 已完成（所有研究结论已在实现中验证通过）

---

## R1: Vue2 海外分页实现分析

### 研究内容
阅读 `s2-overseas-ui/packages/overseas/src/pagination/` 源码，确认所有海外差异点。

### 发现

**参考文件**: `s2-overseas-ui/packages/overseas/src/pagination/pagination.tsx`

海外版 Vue2 分页组件与标准版的核心差异如下：

| 差异点 | 标准版 | 海外版 |
|--------|--------|--------|
| 首页/末页图标 | `PageFirstIcon` / `PageLastIcon` | `ChevronLeftDoubleIcon` / `ChevronRightDoubleIcon` |
| 总量统计文案 | `共 {count} 条数据` | `{currentItemsDetail} of {total} items` |
| 跳转文案 | `跳至 [N] / M 页` | `[N] of M pages` |
| 分页大小选项 label | `{size} 条/页` | 纯数字 `String(option)` |
| 新增 prop | 无 | `pageSizeDsc`（选择器左侧描述文字） |
| Select 属性透传 | 默认属性 | `{ singleUseTag: false, suffixIconOs: 'caret-down-small' }` |
| Select 宽度 | 自适应 | `width: '70px'` |
| Select clearable | 默认 | `clearable: false` |

**海外版特有的 `pageSizeDsc` 渲染逻辑**:
```tsx
{this.pageSizeDsc && <div class="page-size-dsc">{this.pageSizeDsc}</div>}
```

**海外版总量统计计算**:
```tsx
const startIndex = (this.current - 1) * this.pageSize + 1;
const endIndex = Math.min(this.current * this.pageSize, total);
const currentItemsDetail = startIndex >= total ? `${startIndex}` : `${startIndex}-${endIndex}`;
```

### 决策
**决定**: 完全参照 Vue2 海外版实现方式迁移到 Vue3  
**理由**: 确保视觉和行为与 Vue2 海外版完全一致

---

## R2: 国际化 key 可用性

### 研究内容
确认 `globalConfig.value.total` 和其他 pagination i18n key 是否支持参数化格式。

### 发现

**当前 locale 配置** (`packages/common/js/global-config/locale/zh_CN.ts`):
```typescript
pagination: {
  itemsPerPage: '{size} 条/页',
  jumpTo: '跳至',
  page: '页',
  total: '共 {count} 条数据',
}
```

**ConfigProvider 类型定义**:
```typescript
itemsPerPage?: string;
jumpTo?: string;
page?: string;
total?: string;
```

**关键发现**:
1. `total` 仅支持 `{count}` 占位符，**不支持** `{currentItemsDetail}` 参数
2. 不存在 `totalPages` key
3. 翻译函数 `t()` 使用模板字符串替换机制

### 决策
**决定**: 不通过 globalConfig 国际化 key，直接在组件中硬编码英文文案  
**理由**: 
- 项目为纯海外版本，不需要多语言切换
- 现有 i18n key 不支持海外版需要的参数格式（如 `{currentItemsDetail}`）
- 与 Vue2 海外版实现方式一致（直接硬编码）
**考虑的替代方案**: 
- 方案 A: 新增 locale key（如 `totalOverseas`） — 但增加了配置复杂度，且纯海外版无需多语言
- 方案 B: 修改现有 `total` key 格式 — 但会影响所有使用该 key 的项目

---

## R3: Select selectProps 透传机制

### 研究内容
确认 `singleUseTag` 和 `suffixIconOs` 属性在当前 Select 组件中是否可用。

### 发现

**`singleUseTag`** — ✅ 已支持

| 位置 | 内容 |
|------|------|
| `select/type.ts` (第229行) | `singleUseTag?: boolean` — 海外版扩展属性 |
| `select/props.ts` (第210-213行) | `default: true` — 默认开启 Tag 标签显示 |
| `select/select.tsx` | 3处逻辑引用，控制 Tag/纯文本切换和 CSS 类名 |

**`suffixIconOs`** — ✅ 已支持

| 位置 | 内容 |
|------|------|
| `select/type.ts` (第219-223行) | `suffixIconOs?: string` — 默认 `'bulletpoint'` |
| `select/props.ts` (第201-204行) | `default: 'bulletpoint'` |
| `select/select.tsx` | 4处逻辑引用，控制图标替换和海外版 CSS 类名 |

**Select 海外版扩展属性完整列表**:
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `suffixIconOs` | `string` | `'bulletpoint'` | 后缀图标名称 |
| `singleUseTag` | `boolean` | `true` | 单选是否使用 Tag |
| `singleUseLabel` | `boolean` | `false` | 单选是否显示前置 Label |
| `optionWarp` | `boolean` | `false` | 选项文本是否换行 |

### 决策
**决定**: 通过 `selectProps` 透传 `{ singleUseTag: false, suffixIconOs: 'caret-down-small' }` 作为默认值  
**理由**: 
- 两个属性均已在 Select 组件中完整实现
- 透传方式不影响全局 Select，仅在 Pagination 内生效
- 与 Vue2 海外版实现方式完全一致

---

## R4: 海外全局 Token 可用性

### 研究内容
检查 `overseas/style/_variables.less` 中的 token 是否满足 Pagination 的样式需求。

### 发现

**文件**: `overseas/style/_variables.less`（共 407 行）

**所需 Token 可用性检查**:

| 所需 Token | 是否存在 | 行号 | 定义 |
|-----------|----------|------|------|
| `@comp-size-s` | ✅ 存在 | 248 | `var(--td-comp-size-s)` |
| `@comp-size-m` | ✅ 存在 | 249 | `var(--td-comp-size-m)` |
| `@comp-margin-xs` | ✅ 存在 | 284 | `var(--td-comp-margin-xs)` |
| `@comp-margin-xxs` | ✅ 存在 | 283 | `var(--td-comp-margin-xxs)` |
| `@gray-color-6` | ✅ 存在 | 55 | `var(--td-gray-color-6)` |
| `@font-gray-4` | ✅ 存在 | 75 | `var(--td-font-gray-4)` |
| `@border-radius-default` | ✅ 存在 | 347 | `var(--td-radius-default)` |
| `@border-radius-medium` | ✅ 存在 | 348 | `var(--td-radius-medium)` |
| `@bg-color-secondarycontainer` | ✅ 存在 | — | 通过全局变量引用 |
| `@brand-color` | ✅ 存在 | — | 通过全局变量引用 |

### 决策
**决定**: 所有需要的全局 Token 均已存在，可直接引用  
**理由**: `_variables.less` 提供了完整的组件尺寸、间距、颜色、圆角变量

---

## R5: 现有海外样式文件结构

### 研究内容
对比已适配组件（Radio、Checkbox、Button、Select）的 `style/overseas/` 目录结构。

### 发现

已适配组件的海外样式目录结构统一为：
```
packages/components/{component}/style/overseas/
├── index.less        # 主样式文件
├── _var.less         # CSS 变量定义
├── _mixin.less       # Mixin 工具（可选）
└── _mini.less        # Mini 变体样式（可选）
```

**样式入口切换方式** (`style/index.js`):
```javascript
// 注释掉原版导入
// import '@tdesign/common-style/web/components/{component}/_index.less';
// 切换到海外版
import './overseas/index.less';
```

**变量文件引用方式**:
```less
@import '../../../../overseas/style/_variables.less';  // 全局海外 token
@import './_var.less';                                 // 组件局部变量
```

### 决策
**决定**: Pagination 海外适配采用完全相同的目录结构和引用方式  
**理由**: 保持项目内海外适配组件的一致性

---

## 总结

所有 5 项研究任务均已完成，关键结论：

1. **Vue2 参考实现明确** — 6 处逻辑差异和样式差异已完整梳理
2. **国际化方案** — 直接硬编码英文文案，不扩展 locale key
3. **Select 透传可行** — `singleUseTag` 和 `suffixIconOs` 属性已在 Select 中完整实现
4. **Token 完备** — 所有需要的全局样式 Token 均已存在
5. **目录结构明确** — 遵循现有海外适配组件的统一结构

无需澄清的项，可进入阶段 1。
