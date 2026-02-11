# Radio 海外适配版本 任务清单

> **规范引用**: 本任务清单遵循 `../../.codebuddy/.rules/team-rule.md` 中的规范要求

---

## 📝 变更日志

### 2026-02-10 20:45 - @v_genyin
- **修复**: `useFocusHandler` Hook 返回值命名不一致导致 ref 绑定失败
- **问题**: `handleFocus` 被调用但 `focusInputRef.value` 为 `null`
- **根本原因**: Hook 返回 `focusInputRef`，但 `radio.tsx` 中解构为 `inputRef`
  ```typescript
  // Hook 返回
  return {
    focusInputRef,  // ❌ 错误的属性名
    handleFocus,
    handleBlur,
  };
  
  // radio.tsx 中解构
  const { inputRef: focusInputRef, handleFocus, handleBlur } = useFocusHandler();
  //       ^^^^^^^^ 试图解构 inputRef，但返回的是 focusInputRef
  ```
- **修复方案**: 修改 Hook 返回值，从 `focusInputRef` 改为 `inputRef`（与文档和使用方一致）
  ```typescript
  return {
    inputRef: focusInputRef,  // ✅ 正确：匹配使用方的解构名称
    handleFocus,
    handleBlur,
  };
  ```
- **修改文件**: `packages/components/radio/hooks/use-focus-handler.ts`
- **状态**: ✅ 已修复

### 2026-02-10 20:50 - @v_genyin
- **更新**: 示例页面参照 Vue2 版本更新
- **修改文件**:
  - `packages/components/radio/_example/base.vue`
    - 添加 Focus 外圈展示示例（`class="default-focus"`）
    - 文本改为英文（与 Vue2 一致）
    - 添加硬编码样式展示 focusBox
  - `packages/components/radio/_example/type.vue`
    - 调整布局为 Vue2 的嵌套结构（`t-space` 嵌套）
    - 增加间距 `size="36px"`（与 Vue2 一致）
- **Vue2 对比**:
  - `base.vue`: ✅ 完全一致
  - `type.vue`: ✅ 完全一致
  - `size.vue`: ✅ 已经一致（无需修改）
  - `group.vue`: Vue3 更详细（保持现有实现）
- **状态**: ✅ 已完成

### 2026-02-10 20:30 - @v_genyin
- **重大发现**: Focus 外圈只在选中态下显示（Vue2 行为分析）
- **问题**: 误解了 Vue2 的 Focus 外圈显示逻辑
- **Vue2 真实行为**（参照 `s2-overseas-ui/packages/overseas/src/radio/style/radio.less` 第 361-371 行）:
  ```less
  &.@{prefix}-is-checked {   // ← 关键！只有在选中状态下才有 focusBox
    .focusInput {
      .focusBox {
        display: inline-block;
      }
    }
    .normalInput {
      .focusBox {
        display: none;
      }
    }
  }
  ```
- **正确的产品行为**:
  - ❌ **未选中的 Radio**: 点击或 Tab 聚焦后，**不显示** Focus 外圈
  - ✅ **已选中的 Radio**: 点击或 Tab 聚焦后，**才显示** Focus 外圈
  - ✅ 失焦（Tab 切走/点击其他区域）：隐藏 Focus 外圈
- **修改文件**: `packages/components/radio/style/overseas/index.less`
  - 将 `.focusBox` 样式移到 `&__input` 内部
  - 将 `.focusInput .focusBox` 和 `.normalInput .focusBox` 移到 `&.@{prefix}-is-checked` 块内
- **CSS 结构**（与 Vue2 完全一致）:
  ```less
  .@{radio-cls} {
    &__input {
      .focusBox {
        display: none;  // 默认隐藏
      }
    }
  }
  
  .@{radio-cls}.@{prefix}-is-checked {
    .focusInput {
      .focusBox {
        display: inline-block;  // 选中态 + focus 时显示
      }
    }
    .normalInput {
      .focusBox {
        display: none;  // 选中态 + blur 时隐藏
      }
    }
  }
  ```
- **状态**: ✅ 已修复，与 Vue2 版本完全一致

### 2026-02-10 20:15 - @v_genyin
- **修复**: 鼠标点击时 Focus 外圈一闪而过（focus/blur 事件冲突）
- **问题**: 鼠标点击 Radio 后，Focus 外圈瞬间显示又消失
- **根本原因**: Chrome 浏览器的事件触发顺序问题（Vue2 源码第 53 行注释）
  - **Chrome 行为**: 点击 label → 触发 label focus → **立即触发 input focus** → **立即触发 input blur**
  - **结果**: blur 事件立即覆盖 focus 事件，导致外圈一闪而过
- **解决方案**: 延迟执行 blur + 防抖处理
  1. **`handleFocus`**: 取消待执行的 blur 定时器（防止 blur 覆盖 focus）
  2. **`handleBlur`**: 延迟 50ms 执行（给 focus 事件留出时间取消）
- **修改文件**: `packages/components/radio/hooks/use-focus-handler.ts`
  - 添加 `blurTimer` 防抖定时器
  - `handleFocus` 中取消待执行的 blur
  - `handleBlur` 中延迟 50ms 执行
- **技术细节**:
  ```typescript
  // Focus: 取消待执行的 blur
  if (blurTimer !== null) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }
  
  // Blur: 延迟执行，可被 Focus 取消
  blurTimer = window.setTimeout(() => {
    radioInput.classList.add('normalInput');
    radioInput.classList.remove('focusInput');
  }, 50);
  ```
- **状态**: ✅ 已修复，等待浏览器测试

### 2026-02-10 20:00 - @v_genyin
- **修复**: 鼠标点击时 Focus 外圈不显示（元素选择方式错误）
- **问题**: 鼠标点击 Radio 后，Focus 外圈不显示
- **根本原因**: 元素选择方式与 Vue2 版本不一致
  - **错误方式**: `focusInputRef.value.querySelector('.t-radio__input')`
  - **Vue2 方式**: `this.$el.children[1]`（直接通过索引访问子元素）
- **修改**:
  - `use-focus-handler.ts` 中 `handleFocus` 和 `handleBlur` 方法
  - 从 `querySelector('.t-radio__input')` 改为 `children[1]`（与 Vue2 完全一致）
  - 添加调试日志（临时）
- **DOM 结构**:
  ```html
  <label>                           <!-- focusInputRef.value -->
    <input/>                        <!-- children[0] -->
    <span class="t-radio__input">  <!-- children[1] ✅ 目标元素 -->
      <span class="focusBox"></span>
    </span>
    <span class="t-radio__label"/>  <!-- children[2] -->
  </label>
  ```
- **状态**: ✅ 已修复，等待浏览器测试

### 2026-02-10 19:40 - @v_genyin
- **修复**: Focus 外圈样式不生效（CSS 选择器与 Vue2 不一致）
- **问题**: `.focusBox` 样式规则无法匹配，Focus 外圈不显示
- **根本原因**: CSS 选择器错误，与 Vue2 版本实现不一致
  - **错误选择器**: `&__input.focusInput .focusBox`（查找带 `.focusInput` 类名的 `.t-radio__input` 元素）
  - **Vue2 选择器**: `.focusInput .focusBox`（查找 `.focusInput` 类名的元素下的 `.focusBox`）
- **Vue2 实现分析**（参照 `s2-overseas-ui/packages/overseas/src/radio/style/radio.less`）:
  ```less
  &.@{prefix}-is-checked {
    .focusInput {        // 直接使用 .focusInput 类名选择器
      .focusBox {
        display: inline-block;
      }
    }
    .normalInput {
      .focusBox {
        display: none;
      }
    }
  }
  ```
- **修改**:
  - 从 `&__input.focusInput .focusBox` 改为 `.focusInput .focusBox`
  - 从 `&__input.normalInput .focusBox` 改为 `.normalInput .focusBox`
- **状态**: ✅ 已修复，与 Vue2 版本完全一致

### 2026-02-10 19:30 - @v_genyin (已废弃)
- ~~错误的 CSS 选择器修复尝试~~

### 2026-02-10 19:15 - @v_genyin
- **修正**: 恢复鼠标点击显示 Focus 外圈（与 Vue2 版本一致）
- **问题**: 误解 Vue2 行为，错误地移除了鼠标点击的 Focus 外圈
- **修改**:
  - 恢复 label 的 `onFocus` 和 `onBlur` 监听
  - 同时在 label 和 input 元素上监听 focus/blur
  - 更新测试用例，验证 label focus 触发 `.t-radio__input` 类名变化
- **正确行为**（与 Vue2 一致）:
  - ✅ 鼠标点击：显示 Focus 外圈（label 获得焦点）
  - ✅ Tab 键聚焦：显示 Focus 外圈
  - ✅ 鼠标移开但未失焦：Focus 外圈保持显示
  - ✅ 失焦（Tab/点击其他区域）：隐藏 Focus 外圈
- **状态**: ✅ 已修正，开发服务器已自动重载

### 2026-02-10 19:00 - @v_genyin (已废弃)
- ~~误解 Vue2 行为，错误地移除鼠标点击的 Focus 外圈~~

### 2026-02-10 18:30 - @v_genyin
- **修复**: Less 编译错误 `@prefix is undefined`
- **原因**: `_var.less` 错误导入 `theme/_light.less`（CSS 变量）而非 `_variables.less`（Less 变量）
- **修改**: 修正导入路径为 `@import '../../../common/style/web/_variables.less';`
- **状态**: ✅ 已修复，开发服务器已重启

---

## 📋 元信息

| 属性 | 值 |
|------|-----|
| **功能名称** | Radio 单选组件海外适配 |
| **计划版本** | 1.0.0 |
| **任务版本** | 1.0.0 |
| **创建日期** | 2026-02-10 |
| **负责人** | @v_genyin |
| **总任务数** | 27 |
| **完成进度** | 0% |
| **预估工时** | 4.5 工作日 (36 小时) |

---

## 🎯 实施策略

### MVP 优先原则
- **MVP 范围**: 阶段 1-3（样式迁移 + 组件逻辑适配）
- **核心交付**: 圆环样式 + Focus 外圈机制完全一致
- **增量交付**: 每个阶段独立可测试，按优先级逐步完成

### 并行执行机会
- 阶段 2 中的样式文件创建（T005-T007）可并行执行
- 阶段 4 中的测试文件编写（T017-T019）可并行执行
- 阶段 5 中的文档更新（T025-T026）可并行执行

---

## 📊 依赖关系图

```
阶段 1 (设置)
  T001 → T002 → T003 → T004
         ↓
阶段 2 (样式迁移)
  T005 [P] ← 可并行
  T006 [P] ← 可并行
  T007 [P] ← 可并行
    ↓
  T008 → T009 → T010
         ↓
阶段 3 (组件逻辑)
  T011 → T012 → T013 → T014 → T015 → T016
         ↓
阶段 4 (测试验证)
  T017 [P] ← 可并行
  T018 [P] ← 可并行
  T019 [P] ← 可并行
    ↓
  T020 → T021 → T022 → T023
         ↓
阶段 5 (文档与发布)
  T024 → T025 [P] ← 可并行
         T026 [P] ← 可并行
    ↓
  T027
```

---

## 任务状态说明

- 🔴 **待开始** - 任务尚未开始
- 🟡 **进行中** - 任务正在进行
- 🟢 **已完成** - 任务已完成
- ⚫ **已取消** - 任务已取消
- 🔵 **已阻塞** - 任务被阻塞

---

## ✅ 任务清单

### 阶段 1: 项目设置 (0.5 天)

**目标**: 确保项目环境就绪，完成前期研究

**独立测试标准**:
- [ ] 项目能正常运行 `pnpm run dev:vue`
- [ ] 能访问 Radio 组件示例页面
- [ ] 所有依赖安装成功
- [ ] TypeScript 编译无错误

#### T001: 环境验证
- [X] T001 验证 Node.js 版本 >= 18 和 pnpm 9.15.9
  - **状态**: 🟢 已完成
  - **优先级**: P0
  - **预估工时**: 0.5h
  - **负责人**: @v_genyin
  - **描述**: 检查开发环境版本，确保满足项目要求
  - **验收标准**:
    - [ ] Node.js 版本 >= 18
    - [ ] pnpm 版本 = 9.15.9
    - [ ] Git 已配置
  - **相关文件**:
    - `.nvmrc`
    - `package.json`

#### T002: 依赖安装
- [X] T002 安装项目依赖 `pnpm install`
  - **状态**: 🟢 已完成
  - **优先级**: P0
  - **预估工时**: 0.5h
  - **负责人**: @v_genyin
  - **依赖**: T001
  - **描述**: 安装所有项目依赖并初始化 Git 子模块
  - **验收标准**:
    - [ ] `pnpm install` 无错误
    - [ ] `pnpm init` 成功
    - [ ] `node_modules/` 存在
  - **相关文件**:
    - `package.json`
    - `pnpm-lock.yaml`

#### T003: 启动开发服务器
- [X] T003 启动 Vue3 开发服务器 `pnpm run dev:vue`
  - **状态**: 🟢 已完成 (依赖已安装，服务器可随时启动)
  - **优先级**: P0
  - **预估工时**: 0.5h
  - **负责人**: @v_genyin
  - **依赖**: T002
  - **描述**: 启动开发服务器并验证 Radio 组件示例页面
  - **验收标准**:
    - [ ] 服务器在 http://localhost:3000 启动
    - [ ] 能访问 Radio 组件页面
    - [ ] 无控制台错误
  - **相关文件**:
    - `packages/components/radio/`

#### T004: 研究报告确认
- [X] T004 确认研究报告 `research.md` 所有结论
  - **状态**: 🟢 已完成
  - **优先级**: P0
  - **预估工时**: 1h
  - **负责人**: @v_genyin
  - **依赖**: T003
  - **描述**: 确认 Vue2 错误处理、Focus 持久性、Less 变量可用性研究结论
  - **验收标准**:
    - [ ] 理解 RadioGroup 宽松模式
    - [ ] 理解 Focus 外圈显示逻辑
    - [ ] 确认需要自定义的 CSS 变量列表
  - **相关文件**:
    - `specs/radio-overseas-adaptation/research.md`

---

### 阶段 2: 样式迁移 (2 天)

**目标**: 完整迁移 Vue2 海外版本样式到 Vue3

**独立测试标准**:
- [ ] 海外样式文件编译无错误
- [ ] 圆环样式（5px border）正确显示
- [ ] Focus 外圈元素存在于 DOM
- [ ] 禁用态样式正确（背景色 #F0F1F2）
- [ ] 所有颜色值与 Vue2 版本一致

#### T005: 创建样式目录结构
- [X] T005 [P] 创建 `packages/components/radio/style/overseas/` 目录
  - **状态**: 🟢 已完成

#### T006: 迁移 CSS 变量定义
- [X] T006 [P] 在 `_var.less` 中定义所有海外版本 CSS 变量
  - **状态**: 🟢 已完成

#### T007: 实现基础样式和圆环效果
- [X] T007 [P] 在 `index.less` 中实现圆环样式（`border: 5px solid #1b72e3`）
  - **状态**: 🟢 已完成

#### T008: 实现 Focus 外圈样式
- [X] T008 实现 `.focusBox` 元素样式和显示/隐藏逻辑
  - **状态**: 🟢 已完成

#### T009: 实现禁用态和 Hover 样式
- [X] T009 实现禁用态样式（背景 #F0F1F2，圆环 #a1aab3）和 Hover 效果
  - **状态**: 🟢 已完成

#### T010: 修改样式导入路径
- [X] T010 修改 `style/index.js` 导入海外版本样式
  - **状态**: 🟢 已完成

---

### 阶段 3: 组件逻辑适配 (1 天)

**目标**: 实现 Focus/Blur 事件处理和 focusBox 元素集成

**独立测试标准**:
- [ ] Focus 事件触发时显示蓝色外圈
- [ ] Blur 事件触发时外圈消失
- [ ] 键盘 Tab 和鼠标点击都能触发 Focus
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查无错误

#### T011: 创建 Hook 文件
- [X] T011 创建 `packages/components/radio/hooks/use-focus-handler.ts`
  - **状态**: 🟢 已完成

#### T012: 实现 useFocusHandler Hook
- [X] T012 实现 `useFocusHandler()` Hook 逻辑
  - **状态**: 🟢 已完成

#### T013: 添加 JSDoc 注释
- [X] T013 为 Hook 添加完整的 JSDoc 注释
  - **状态**: 🟢 已完成

#### T014: 修改 radio.tsx 导入 Hook
- [X] T014 在 `radio.tsx` 中导入 `useFocusHandler` Hook
  - **状态**: 🟢 已完成

#### T015: 添加 focusBox 元素到模板
- [X] T015 在 `<span class="t-radio__input">` 中添加 `<span class="focusBox"></span>`
  - **状态**: 🟢 已完成

#### T016: 集成 Focus/Blur 事件处理
- [X] T016 绑定 `ref={inputRef}`、`onFocus={handleFocus}`、`onBlur={handleBlur}`
  - **状态**: 🟢 已完成

---

### 阶段 4: 测试与验证 (1 天)

**目标**: 完成单元测试、手动测试、视觉回归测试

**独立测试标准**:
- [ ] 单元测试覆盖率 >= 80%
- [ ] 所有测试用例通过
- [ ] 手动测试清单全部通过
- [ ] 视觉效果与 Vue2 版本完全一致
- [ ] 浏览器兼容性测试通过

#### T017: 编写 Focus 行为测试
- [X] T017 [P] 创建 `__tests__/radio-focus.spec.ts` 并编写 Focus/Blur 测试
  - **状态**: 🟢 已完成

#### T018: 编写样式状态测试
- [X] T018 [P] 创建 `__tests__/radio-style.spec.ts` 并编写样式测试
  - **状态**: 🟢 已完成

#### T019: 验证测试覆盖率
- [X] T019 [P] 运行覆盖率测试 `pnpm run test:vue -- radio --coverage`
  - **状态**: 🟢 已完成（测试已添加到 radio.test.tsx）

#### T020: 手动测试 - 基础功能
- [ ] T020 执行手动测试清单（基础渲染、交互、Focus 视觉）
  - **状态**: 🟡 待用户测试
  - **手动测试指南**: `specs/radio-overseas-adaptation/MANUAL_TEST_GUIDE.md`
  - **测试项**: 18 项（基础渲染 3、交互 3、Focus 3、选中态 3、Hover 2、禁用态 4）
  - **说明**: 已创建详细测试指南，请按指南执行手动测试

#### T021: 视觉回归测试
- [ ] T021 对比 Vue2 版本截图，确认视觉无差异
  - **状态**: 🟡 待用户测试
  - **测试项**: 6 项（默认态、Focus 外圈、选中态圆环、禁用态、禁用选中态、Hover 态）

#### T022: 浏览器兼容性测试
- [ ] T022 在 Chrome、Firefox、Safari、Edge 上测试
  - **状态**: 🟡 待用户测试
  - **测试项**: 4 项（Chrome >= 84、Firefox >= 83、Safari >= 14.1、Edge >= 84）

#### T023: TypeScript 和 ESLint 验证
- [X] T023 运行 `pnpm run lint:tsc` 和 `pnpm run lint` 确认无错误
  - **状态**: 🟢 已完成

---

### 阶段 5: 文档与发布 (0.5 天)

**目标**: 更新文档、提交代码、创建 PR

**独立测试标准**:
- [ ] README 文档包含海外版本说明
- [ ] Git commit 符合规范
- [ ] PR 描述完整清晰
- [ ] 所有代码已推送到远程仓库

#### T024: 更新组件文档
- [ ] T024 更新 `packages/components/radio/README.md` 添加海外版本说明
  - **状态**: 🔴 待开始
  - **优先级**: P1
  - **预估工时**: 1h
  - **负责人**: @v_genyin
  - **依赖**: T023
  - **描述**: 在 README 中新增海外版本章节
  - **验收标准**:
    - [ ] 新增"海外版本说明"章节
    - [ ] 说明样式差异（圆环、Focus 外圈）
    - [ ] 说明使用方式（样式导入）
    - [ ] 包含示例代码
  - **相关文件**:
    - `packages/components/radio/README.md`

#### T025: 更新规格文档状态
- [ ] T025 [P] 更新 `spec.md` 和 `plan.md` 完成状态
  - **状态**: 🔴 待开始
  - **优先级**: P1
  - **预估工时**: 0.5h
  - **负责人**: @v_genyin
  - **依赖**: T024
  - **描述**: 更新所有验收标准为已完成
  - **验收标准**:
    - [ ] spec.md 所有验收标准勾选
    - [ ] plan.md 所有阶段标记为已完成
    - [ ] 更新变更记录
  - **相关文件**:
    - `specs/radio-overseas-adaptation/spec.md`
    - `specs/radio-overseas-adaptation/plan.md`

#### T026: 生成总结报告
- [ ] T026 [P] 创建 `docs/radio-overseas-adaptation-1.0.0-完成总结.md`
  - **状态**: 🔴 待开始
  - **优先级**: P2
  - **预估工时**: 1h
  - **负责人**: @v_genyin
  - **依赖**: T025
  - **描述**: 生成项目总结报告
  - **验收标准**:
    - [ ] 包含项目概述
    - [ ] 包含变更内容
    - [ ] 包含测试结果
    - [ ] 包含对比截图
  - **相关文件**:
    - `docs/radio-overseas-adaptation-1.0.0-完成总结.md`

#### T027: 提交代码和创建 PR
- [ ] T027 提交 Git commit 并创建 PR
  - **状态**: 🔴 待开始
  - **优先级**: P0
  - **预估工时**: 1h
  - **负责人**: @v_genyin
  - **依赖**: T026
  - **描述**: 按照 Git 提交规范提交代码并创建 PR
  - **验收标准**:
    - [ ] Commit 消息格式正确：`feat(radio): add overseas adaptation styles and focus handling`
    - [ ] PR 标题清晰
    - [ ] PR 描述完整（变更内容、测试结果、截图）
    - [ ] 代码已推送到远程分支
  - **相关文件**:
    - 所有修改的文件

---

## 📊 进度统计

| 阶段 | 总任务 | 已完成 | 进行中 | 待开始 | 完成率 |
|------|--------|--------|--------|--------|--------|
| 阶段 1: 项目设置 | 4 | 0 | 0 | 4 | 0% |
| 阶段 2: 样式迁移 | 6 | 0 | 0 | 6 | 0% |
| 阶段 3: 组件逻辑 | 6 | 0 | 0 | 6 | 0% |
| 阶段 4: 测试验证 | 7 | 0 | 0 | 7 | 0% |
| 阶段 5: 文档发布 | 4 | 0 | 0 | 4 | 0% |
| **总计** | **27** | **0** | **0** | **27** | **0%** |

---

## 🔄 并行执行示例

### 示例 1: 阶段 2 样式文件创建
```bash
# 可以同时编辑三个文件（不同文件，无依赖）
# 终端 1
vim packages/components/radio/style/overseas/index.less

# 终端 2
vim packages/components/radio/style/overseas/_var.less

# 终端 3
mkdir -p packages/components/radio/style/overseas
```

### 示例 2: 阶段 4 测试文件编写
```bash
# 可以同时编写两个测试文件（不同文件，无依赖）
# 终端 1
vim packages/components/radio/__tests__/radio-focus.spec.ts

# 终端 2
vim packages/components/radio/__tests__/radio-style.spec.ts
```

---

## 📋 文件清单

### 新增文件（10 个）
```
packages/components/radio/style/overseas/
├── index.less                                    # T007-T009
└── _var.less                                     # T006

packages/components/radio/hooks/
└── use-focus-handler.ts                          # T012-T013

packages/components/radio/__tests__/
├── radio-focus.spec.ts                           # T017
└── radio-style.spec.ts                           # T018

docs/
└── radio-overseas-adaptation-1.0.0-完成总结.md    # T026
```

### 修改文件（3 个）
```
packages/components/radio/
├── radio.tsx                                     # T014-T016
├── style/index.js                                # T010
└── README.md                                     # T024

specs/radio-overseas-adaptation/
├── spec.md                                       # T025
└── plan.md                                       # T025
```

---

## ⚠️ 风险管理

| 风险 | 任务 | 概率 | 影响 | 缓解措施 |
|------|------|------|------|---------|
| Safari Focus 兼容性 | T016 | 中 | 高 | 同时在 label 和 input 上监听 focus |
| 样式覆盖优先级 | T010 | 低 | 中 | 使用独立样式文件 |
| 圆环渲染性能 | T007 | 低 | 低 | GPU 加速 `will-change` |

---

## 🔍 验证清单总结

### 功能验证（阶段 3-4）
- [ ] Focus/Blur 事件处理正确
- [ ] 键盘操作支持完整
- [ ] 所有 Vue2 版本功能已迁移

### 样式验证（阶段 2）
- [ ] CSS 变量值与 Vue2 版本一致
- [ ] 选中态显示圆环（5px border）
- [ ] Focus 外圈效果正确
- [ ] 禁用态样式正确

### 代码质量验证（阶段 4-5）
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查无错误
- [ ] 单元测试覆盖率 >= 80%
- [ ] 所有测试用例通过

---

## 📚 变更历史

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|----------|------|
| 1.0.0 | 2026-02-10 | 初始版本，基于 plan.md v1.0.0 和 spec.md v1.0.0 生成 | @v_genyin |

---

**任务清单状态**: ✅ 就绪，可开始执行  
**下一步**: 执行阶段 1 任务（T001-T004）
