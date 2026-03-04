---
name: overseas-component-adapter
description: "MUST be loaded when ANY of these conditions is true: (1) The user message contains keywords: 海外, overseas, 海外样式, 海外组件, overseas adaptation, overseas UI, overseas style. (2) A spec document being implemented (via speckit.implement or similar) contains '海外' or 'overseas' in its tasks.md file — the AI MUST scan the tasks.md content after reading it and load this skill if matched. (3) The spec.md frontmatter or metadata contains 'skill: overseas-component-adapter'. (4) The task involves creating or modifying components under the TDesign overseas style system (style/overseas/ directories, overseas/ global styles). This skill provides the complete workflow for adapting TDesign Vue 3 components to overseas UI styles by migrating from the Vue 2 overseas component library."
---

# 海外组件适配器

将 TDesign Vue 3 组件适配为海外 UI 样式。通过迁移 Vue 2 海外版 TDesign 组件库（`s2-overseas-ui/`）的样式和逻辑，遵循项目已建立的三层适配架构进行改造。

## 触发条件

> ⚠️ **必须**：满足以下**任意一个**条件时，AI **必须**通过 `use_skill` 工具加载此技能，**不得跳过**。

满足以下任意条件时激活此技能：

1. **直接描述**：用户消息中提到"海外"、"overseas"、"海外样式规范"、"海外样式改造"、"海外组件"、"overseas adaptation"、"overseas UI"、"overseas style"等关键字。
2. **截图/设计稿**：用户提供了海外风格 UI 组件的截图或设计规范，要求实现。
3. **Tasks 文档内容匹配**（关键）：执行 `speckit.implement` 或类似实现命令时，AI 在读取 `implementation/tasks.md` 文件后，**必须检查**任务列表的标题、任务描述、故事名称中是否包含"海外"、"overseas"、"海外样式"、"overseas style"等关键字。若匹配，**必须立即加载此 skill 后再继续实现**。
4. **Spec 元信息绑定**：spec.md 的元信息表格中包含 `skill` 字段且值为 `overseas-component-adapter`。
5. **文件路径匹配**：任务涉及创建或修改 `style/overseas/` 目录、`overseas/` 全局样式目录下的文件。
6. **明确请求**：用户明确要求将某个 TDesign 组件转换为海外样式。

## 项目架构概览

海外适配采用**三层架构**：

| 层级 | 位置 | 作用 |
|------|------|------|
| **全局 Design Tokens** | `overseas/style/theme/` | CSS 变量覆盖（颜色、字体、圆角、尺寸），在 `packages/components/style/index.js` 中加载 |
| **组件级样式覆盖** | `packages/components/<组件>/style/overseas/` | 针对单个组件的样式调整，通过 `style/index.js` 导入 |
| **组件逻辑适配** | `packages/components/<组件>/*.tsx` | 通过 Props 和条件 CSS 类名控制海外专属行为 |

详细架构文档请阅读 `references/architecture.md`。

## 工作流程

按以下步骤依次对每个组件进行适配：

### 步骤 1：研究 Vue 2 海外版实现

1. **定位 Vue 2 源码**：在 `s2-overseas-ui/packages/overseas/src/<组件>/` 下找到对应组件
2. **阅读 Vue 2 组件源码**（`.tsx` 文件），了解：
   - 海外专属 Props（如 `suffixIconOs`、`singleUseTag`、`optionWarp`）
   - 海外专属 CSS 类名（如 `.t-select--overseas`、`.t-<组件>--overseas`）
   - 与标准 TDesign 版本不同的条件逻辑
3. **阅读 Vue 2 样式文件**：查找 Vue 2 组件样式目录中的 Less 文件
4. **记录所有差异**：对比 Vue 2 海外版本与标准 TDesign 版本的区别

### 步骤 2：检查当前 Vue 3 组件

1. **阅读 Vue 3 组件源码**：`packages/components/<组件>/<组件>.tsx`
2. **阅读 Vue 3 Props 定义**：`packages/components/<组件>/props.ts`
3. **阅读 Vue 3 类型定义**：`packages/components/<组件>/type.ts`
4. **阅读当前样式入口**：`packages/components/<组件>/style/index.js`
5. **检查海外样式是否已存在**：查找 `packages/components/<组件>/style/overseas/` 目录
6. **参考已有海外组件的模式**：以下 20 个组件已有海外样式目录，可作为参考模板：
   - alert、breadcrumb、button、checkbox、collapse、dialog、dropdown、form
   - input、link、menu、message、radio、select、switch、table、tabs、textarea、tooltip、upload

### 步骤 3：实现样式适配

详细指导请阅读 `references/style-adaptation-guide.md`。

> ⚠️ **优先级**：优先使用和迭代根目录 `overseas/` 文件夹中的样式。新增全局变量或 token 应写入 `overseas/style/` 下的文件，仅单组件专属样式才放在组件的 `style/overseas/` 目录中。

**关键步骤：**

1. **创建海外样式目录**（如不存在）：
   ```
   packages/components/<组件>/style/overseas/
   ├── index.less           # 样式入口
   ├── _var.less            # 组件专属 CSS 变量
   └── _<组件>.less         # 主样式覆盖
   ```

2. **创建 `_var.less`**：定义组件专属变量，引用全局变量 `overseas/style/_variables.less`：
   ```less
   @import '../../../../overseas/style/_variables.less';
   // 组件专属变量定义
   ```

3. **创建 `_<组件>.less`**：编写样式覆盖。对海外专属选择器使用 `.t-<组件>--overseas` 命名模式。

4. **创建 `index.less`**：导入变量和主样式文件：
   ```less
   @import './_var.less';
   @import './_<组件>.less';
   ```

5. **更新 `style/index.js`**：追加海外样式导入：
   ```javascript
   import '@tdesign/common-style/web/components/<组件>/_index.less';
   import './overseas/index.less';  // 追加此行
   ```

### 步骤 4：实现逻辑适配（按需）

详细指导请阅读 `references/component-logic-adaptation-guide.md`。

并非所有组件都需要逻辑变更。仅在以下情况修改 `.tsx` 文件：
- Vue 2 海外版有额外的 Props
- Vue 2 海外版有条件渲染逻辑
- Vue 2 海外版有不同的事件处理

**关键模式：**
- 在 `props.ts` 和 `type.ts` 中添加海外专属 Props
- 使用计算属性 CSS 类名有条件地应用海外样式
- 参考 `select.tsx` 中的现有模式：`suffixIconOs` prop 触发 `.t-select--overseas` 类

> ⚠️ **Props 变更必须询问**：若新增或移除了 Props，必须主动询问用户是否需要同步修改 example 示例，并记录结果。

### 步骤 5：验证适配结果

1. **样式编译检查**：确保所有 Less 文件编译无错误
2. **影响范围检查**：若改动可能影响当前描述之外的组件，必须主动列出受影响组件并说明原因
3. **视觉对比**：将 Vue 3 海外组件与 Vue 2 海外版本进行视觉对比
4. **交互验证**：验证 hover、focus、active、disabled 状态与 Vue 2 版本一致
5. **尺寸变体**：检查 small、default、large 尺寸变体（如适用）

### 步骤 6：记录变更

对于 Spec 相关变更，更新 spec 文档的变更日志，包含：
- 组件名称和版本
- 创建或修改的文件
- 样式和逻辑变更摘要
- **影响范围**：列出可能受影响的其他组件及原因（如有）
- **Props 变更记录**：新增/移除的 Props 及 example 同步状态（如有）

## 重要约定

### 样式文件优先级【必须】

样式适配**优先使用和迭代根目录下 `overseas/` 文件夹中的样式文件**，而非在组件内部重新定义：

1. **全局变量和 tokens**：优先在 `overseas/style/_variables.less` 及 `overseas/style/theme/` 下维护
2. **新增全局样式**：如果样式改动具有通用性（如新增全局变量、调整通用 token），应写入 `overseas/style/` 下的对应文件
3. **组件级样式**：仅当改动仅影响单个组件、且不适合提升为全局变量时，才放在 `packages/components/<组件>/style/overseas/` 中
4. **已有海外样式文件**：在 `overseas/` 目录下已存在的 Less 文件列表：
   ```
   overseas/
   ├── style/
   │   ├── _variables.less          # 全局变量（优先在此维护）
   │   ├── base.less                # 基础样式入口
   │   ├── mixins/
   │   │   ├── _layout.less         # 布局 mixin
   │   │   ├── _reset.less          # 重置 mixin
   │   │   ├── _scrollbar.less      # 滚动条 mixin
   │   │   └── _text.less           # 文本 mixin
   │   └── theme/
   │       ├── _index.less          # 主题入口
   │       ├── _dark.less           # 深色主题
   │       ├── _font.less           # 字体
   │       ├── _light.less          # 浅色主题
   │       ├── _radius.less         # 圆角
   │       └── _size.less           # 尺寸
   └── index.less                   # 总入口
   ```

### 影响范围主动说明【必须】

若当前适配改动**可能影响到当前描述之外的其他组件**，必须遵循以下规则：

1. **主动说明**：在实施变更前，列出所有可能受影响的组件及影响方式
2. **格式要求**：使用以下格式输出影响分析：
   ```
   ⚠️ **影响范围分析**：
   本次改动可能影响以下组件：
   - `<组件A>`：原因说明
   - `<组件B>`：原因说明
   建议：[是否需要同步修改 / 后续关注]
   ```
3. **记录变更**：在步骤 6（记录变更）中，将影响范围一并记录到 spec 或变更日志中
4. **常见影响场景**：
   - 修改 `overseas/style/_variables.less` 中的全局变量 → 影响所有引用该变量的组件
   - 修改全局 theme token → 影响所有使用该 token 的组件
   - 修改公共组件（如 Popup、Icon）→ 影响所有依赖该组件的上层组件

### Props 变更与 Example 同步【必须】

若适配过程中存在**新增或移除 Props（属性）**，必须遵循以下流程：

#### 新增 Props 的 Example 处理

1. **检查 Vue 2 海外版示例**：在 `s2-overseas-ui/` 中查找该组件是否有对应的 example/demo 使用了新增的 prop
2. **有示例** → 询问用户是否在当前项目中增加对应示例：
   ```
   ❓ **新增 Props 示例确认**：
   本次为 `<组件>` 组件新增了以下 Props：
   - `propA`（用途说明）— 在 Vue 2 海外版中有示例：`s2-overseas-ui/.../xxx-demo.vue`
   - `propB`（用途说明）— 在 Vue 2 海外版中有示例：`s2-overseas-ui/.../yyy-demo.vue`
   
   是否需要在当前项目中增加对应的 example 示例？
   示例文件位置：`packages/components/<组件>/_example/`
   ```
3. **无示例** → 忽略，不需要询问用户

#### 移除/屏蔽 Props 的 Example 处理

1. **检查当前项目示例**：在 `packages/components/<组件>/_example/` 中搜索是否有 example 使用了被移除/屏蔽的 prop
2. **有使用** → 询问用户是否移除相关示例，并说明移除后的影响：
   ```
   ❓ **移除 Props 示例确认**：
   本次为 `<组件>` 组件移除/屏蔽了以下 Props：
   - `propC`（移除原因）— 当前项目中以下 example 使用了此属性：
     - `packages/components/<组件>/_example/xxx.vue` 第 XX 行
     - `packages/components/<组件>/_example/yyy.vue` 第 XX 行
   
   移除后影响：[说明移除该 prop 后示例的表现变化]
   是否需要同步移除/修改这些 example？
   ```
3. **无使用** → 忽略，不需要询问用户

#### 变更记录

无论上述流程结果如何，都需要在变更日志中记录：
```
📝 **Props 变更记录**：
- 组件：<组件名>
- 新增 Props：propA, propB
  - Vue 2 海外版示例：有 / 无
  - Example 同步：已增加 / 用户选择暂不增加 / 无需处理（Vue 2 无示例）
- 移除 Props：propC
  - 当前项目示例引用：有（文件列表）/ 无
  - Example 同步：已移除 / 用户选择保留 / 无需处理（无引用）
```

### 命名约定
- 海外样式目录：`style/overseas/`
- 变量文件：`_var.less`
- 主样式文件：`_<组件>.less`
- 入口文件：`index.less`
- 海外 CSS 类修饰符：`.t-<组件>--overseas`

### 样式层级关系
```
overseas/style/_variables.less                        （全局变量）
    ↓
overseas/style/theme/_light.less                      （浅色主题 tokens）
overseas/style/theme/_dark.less                       （深色主题 tokens）
overseas/style/theme/_font.less                       （字体系统）
overseas/style/theme/_radius.less                     （圆角 tokens）
overseas/style/theme/_size.less                       （尺寸/间距 tokens）
    ↓
packages/components/<组件>/style/overseas/_var.less    （组件变量）
packages/components/<组件>/style/overseas/_<组件>.less （组件样式）
```

### 海外版与标准 TDesign 的关键 Design Token 差异
- **主色调**：`#1B72E3`（海外版）vs `#0052D9`（标准版）
- **字体**：`Arial, SourceHanSansCN-Regular`（海外版）vs TDesign 默认字体
- **圆角**：默认 `4px`，中等 `8px`（海外版）vs TDesign 默认值
- **按钮配色**：黄色系（`#FFA126`）和蓝色系（`#1B72E3`）两种按钮颜色方案

### Vue 2 到 Vue 3 迁移注意事项
- Vue 2 使用 `@vue/composition-api` — 需转换为 Vue 3 原生 Composition API
- Vue 2 部分组件使用 `mixins`（如 Popup）— 需重构为 composables
- 导入路径不同：Vue 2 使用相对路径 `../hooks/`，Vue 3 使用 `@tdesign/shared/`
- Vue 2 事件处理使用 `emitEvent()` 工具函数 — Vue 3 使用原生 `emit()`

## 参考文件

- `references/architecture.md` — 详细的项目架构和文件组织说明
- `references/style-adaptation-guide.md` — 样式适配分步指南及示例
- `references/component-logic-adaptation-guide.md` — 逻辑适配模式及示例
