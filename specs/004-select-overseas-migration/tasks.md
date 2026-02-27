# Select 组件海外版迁移 - 任务分解

> **更新日期**: 2026-02-27

## 实施约束

### 约束 1: 组件隔离性
- **主要修改**：`select/`、`select-input/` 目录
- **公共组件修改**（已评估，均为新增项）：`tag-input/`（expose）、`shared/hooks/`（mouseDown 类名）
- 样式覆盖使用 `.t-select--overseas` / `.t-select__dropdown--overseas` 限定作用域

### 约束 2: Vue 2/3 功能一致性确认
- 发现功能差异时，**先询问再处理**
- 不自行决定功能变更

---

## 任务概览

| 阶段 | 任务数 | 状态 |
|------|--------|------|
| Props 迁移 | 3 | ✅ 全部完成 |
| 样式迁移 | 4 | ✅ 全部完成 |
| 交互迁移 | 6 | ✅ 全部完成 |
| 样式修复 | 4 | ✅ 全部完成 |
| 验证测试 | 3 | 🔄 进行中 |

---

## 阶段 1: Props 迁移 ✅

### Task 1.1: 添加海外版 Props 定义 ✅
**文件**: `packages/components/select/props.ts`

- [x] 添加 `suffixIconOs`（String, default: `'bulletpoint'`）
- [x] 添加 `singleUseTag`（Boolean, default: `true`）
- [x] 添加 `singleUseLabel`（Boolean, default: `false`）
- [x] 添加 `optionWarp`（Boolean, default: `false`）
- [x] 扩展 `valueType` validator 支持 `'label'`

### Task 1.2: 更新类型定义 ✅
**文件**: `packages/components/select/type.ts`

- [x] 在 `TdSelectProps` 接口新增 4 个海外版属性类型
- [x] `valueType` 类型扩展为 `'value' | 'object' | 'label'`

### Task 1.3: 组件逻辑集成 ✅
**文件**: `packages/components/select/select.tsx`

- [x] 导入 `BulletpointIcon` 和 `Tag` 组件
- [x] `placeholderText` 增加 `!props.singleUseTag` 条件
- [x] 新增 `renderSingleTag()` 函数（单选 Tag 渲染）
- [x] 新增 `renderTag()` 函数（多选 Tag 渲染，内容用 `<span>` 包裹）
- [x] 新增 `overseasClasses` 计算属性
- [x] `autoWidth` 强制为 `false`
- [x] `suffixIconOs` 存在时使用 `BulletpointIcon` 替换 `FakeArrow`
- [x] 下拉面板添加 `t-select__dropdown--overseas` 类名
- [x] `optionWarp` 透传到 `tagInputProps` 和 `SelectPanel`

---

## 阶段 2: 样式迁移 ✅

### Task 2.1: 创建样式目录结构 ✅
**目录**: `packages/components/select/style/overseas/`

- [x] 创建 `index.less`（22 行）
- [x] 创建 `_var.less`（62 行）
- [x] 创建 `_select.less`（466 行）

### Task 2.2: 迁移样式变量 ✅
**文件**: `packages/components/select/style/overseas/_var.less`

- [x] 导入全局变量 `../../../../overseas/style/_variables.less`
- [x] 迁移尺寸变量（高度、Tag 高度、选项高度等）
- [x] 迁移颜色变量（边框色、背景色、图标色等）
- [x] 迁移间距变量（padding、margin 等）

### Task 2.3: 迁移主样式 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

**`.t-select--overseas` 主选择器**:
- [x] 输入框样式（min-height、border、padding）
- [x] 焦点样式（2px 品牌色边框，无 box-shadow）
- [x] 尺寸变体（s/l）
- [x] 后缀图标 `transform: none !important` 禁止旋转
- [x] Tag `flex-direction: row-reverse`（关闭按钮左置）
- [x] Tag 字体 14px
- [x] `optionWarp` 换行模式
- [x] 可过滤模式（suffix 绝对定位 + padding-right 避免重叠）
- [x] 可过滤聚焦模式（flex-wrap: wrap 输入框独占一行）
- [x] 未聚焦时隐藏搜索输入框
- [x] 单选 Tag 模式（文本左对齐、清除 prefix 右 margin）
- [x] 禁用状态样式

**`.t-select__dropdown--overseas` 下拉面板**:
- [x] `margin-top: -3.5px` / `margin-bottom: -3.5px` 紧贴选择器
- [x] 2px 品牌色边框，无 shadow
- [x] 选项无圆角（`border-radius: unset`）
- [x] hover / 选中 / 鼠标按下 / 禁用四种状态样式
- [x] 隐藏 ripple 效果
- [x] 选项尺寸变体

### Task 2.4: 样式集成 ✅
**文件**: `packages/components/select/style/overseas/index.less` + `style/index.js`

- [x] 导入变量文件和主样式文件
- [x] 更新 `style/index.js` 添加海外版样式导入

---

## 阶段 3: 交互迁移 ✅

### Task 3.1: 后缀图标替换 ✅
**文件**: `packages/components/select/select.tsx`

- [x] `suffixIconOs` 存在时渲染 `BulletpointIcon`
- [x] 添加 `--overseas` 和 `--active` 类名
- [x] CSS 中 `transform: none !important` 禁止旋转

### Task 3.2: 鼠标按下状态 ✅
**文件**: `packages/components/select/option.tsx`

- [x] 新增 `isMouseDown` ref
- [x] `handleMouseDown`: 设置 `isMouseDown = true`
- [x] `handleMouseUp`: 设置 `isMouseDown = false`
- [x] `handleMouseLeave`: 重置 `isMouseDown = false`
- [x] 类名动态添加 `STATUS.value.mouseDown`
- [x] 渲染模板绑定 `onMousedown`、`onMouseup`

### Task 3.3: 公共类名扩展 ✅
**文件**: `packages/shared/hooks/useCommonClassName/index.ts`

- [x] STATUS 新增 `mouseDown: \`${classPrefix.value}-is-mouseDown\``

### Task 3.4: Option 文本换行控制 ✅
**文件**: `packages/components/select/option.tsx` + `select-panel.tsx`

- [x] `option.tsx` 新增 `optionWarp` prop
- [x] 根据 `optionWarp` 动态使用 `wrap` / `nowrap` class
- [x] `select-panel.tsx` 新增 `optionWarp` prop 并透传

### Task 3.5: 多选过滤模式自动聚焦 ✅
**文件**: `packages/components/tag-input/tag-input.tsx` + `select-input/select-input.tsx`

- [x] `tag-input.tsx`: 通过 `expose` 暴露 `focus()`/`blur()` 方法
- [x] `select-input.tsx`: watch `actualVisible`，popup 打开时自动聚焦

### Task 3.6: 下拉框宽度精度优化 ✅
**文件**: `packages/components/select-input/hooks/useOverlayInnerStyle.ts`

- [x] `matchWidthFunc`: `offsetWidth` → `getBoundingClientRect().width`
- [x] `getAutoWidthPopupStyleWidth`: 同样替换
- [x] `select.tsx`: 海外版 `autoWidth` 强制为 `false`

---

## 阶段 4: 样式修复 ✅

### Task 4.1: suffix 图标与内容重叠修复 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

- [x] 可过滤模式下 `.t-input` 添加 `padding-right: 36px`

### Task 4.2: 单选 Tag 文本对齐修复 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

- [x] `.t-select-tag-true .t-tag > span` 添加 `text-align: left`

### Task 4.3: 单选 Tag prefix 右 margin 修复 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

- [x] `.t-select-tag-true .t-input__prefix:not(:empty)` 添加 `margin-right: 0`

### Task 4.4: Tag 字体统一 ✅
**文件**: `packages/components/select/style/overseas/_select.less`

- [x] `.t-tag` 添加 `font-size: 14px`

---

## 阶段 5: 验证测试 🔄

### Task 5.1: 功能验证
- [x] 验证单选模式（Tag 样式、清除、文本左对齐）
- [x] 验证多选模式（多 Tag 显示、折叠、14px 字体）
- [x] 验证搜索过滤（自动聚焦、输入框独占一行、suffix 不重叠）
- [ ] 验证键盘导航
- [ ] 验证禁用状态

### Task 5.2: 样式对比
- [x] 对比输入框样式
- [x] 对比下拉面板样式
- [x] 对比选项样式
- [x] 验证 Tag 关闭按钮位于文本左侧
- [x] 验证后缀图标为 bulletpoint 且无旋转
- [x] 验证下拉框宽度精确匹配 trigger
- [ ] 对比各尺寸样式（s/l）

### Task 5.3: 回归测试
- [ ] 运行现有单元测试
- [ ] 确保原有功能不受影响

---

## 实际修改文件清单

| 文件 | 改动类型 | 关键改动 |
|------|----------|----------|
| `select/props.ts` | 修改 | +4 海外版 props，valueType 扩展 `'label'` |
| `select/type.ts` | 修改 | +4 海外版类型定义 |
| `select/select.tsx` | 修改 | 海外版类名、BulletpointIcon、单选 Tag、autoWidth=false、optionWarp 透传 |
| `select/option.tsx` | 修改 | +optionWarp、mouseDown/mouseUp/mouseLeave、wrap/nowrap |
| `select/components/select-panel.tsx` | 修改 | +optionWarp 透传 |
| `select/style/overseas/_var.less` | **新增** | 海外版样式变量 |
| `select/style/overseas/_select.less` | **新增** | 海外版核心样式（466 行） |
| `select/style/overseas/index.less` | **新增** | 样式入口 |
| `select/style/index.js` | 修改 | 海外版样式导入 |
| `shared/hooks/useCommonClassName/index.ts` | 修改 | STATUS +mouseDown 类名 |
| `tag-input/tag-input.tsx` | 修改 | expose focus/blur |
| `select-input/select-input.tsx` | 修改 | popup 打开时自动聚焦 |
| `select-input/hooks/useOverlayInnerStyle.ts` | 修改 | getBoundingClientRect 替代 offsetWidth |
| `popup/popup.tsx` | 修改 | 海外版适配 |

---

## 依赖关系

```
阶段 1: Props 迁移
  Task 1.1 (props.ts) → Task 1.2 (type.ts) → Task 1.3 (select.tsx)

阶段 2: 样式迁移
  Task 2.1 (目录) → Task 2.2 (_var.less) → Task 2.3 (_select.less) → Task 2.4 (index)

阶段 3: 交互迁移
  Task 3.1 (后缀图标) ─────────────────────────────┐
  Task 3.2 (鼠标按下) → Task 3.3 (公共类名) ────────┤
  Task 3.4 (文本换行) ─────────────────────────────┤
  Task 3.5 (自动聚焦: TagInput expose) ────────────┤
  Task 3.6 (宽度精度: getBoundingClientRect) ──────┤
                                                    v
阶段 4: 样式修复 ──────────────────────────────> 阶段 5: 验证测试
```
