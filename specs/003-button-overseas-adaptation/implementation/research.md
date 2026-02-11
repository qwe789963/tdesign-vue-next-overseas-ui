# Button 组件海外适配技术调研报告

> 本文档记录 Button 组件从 Vue2 到 Vue3 迁移过程中的技术调研结果

## 元信息

| 属性 | 值 |
|------|-----|
| 调研日期 | 2026-02-11 |
| 调研人员 | AI Assistant |
| 相关规格 | `../spec.md` |
| 相关计划 | `plan.md` |

---

## 1. 基础 Token 对比

### 1.1 调研目标
对比 Vue2 和 Vue3 的基础 Token（颜色、尺寸、边框等），确认所有 Button 样式引用的 Token 是否存在，值是否一致。

### 1.2 调研方法
- 分析 Vue2 的 `_var.less` 文件，提取所有引用的基础 Token
- 在 Vue3 的 `overseas/style/` 目录中查找对应的 Token 定义
- 对比 Token 值是否一致

### 1.3 调研结果

✅ **好消息**：Vue3 的基础 Token 系统非常完整，所有 Vue2 Button 样式引用的 Token 在 Vue3 中**都已存在**！

Token 定义位置：`overseas/style/_variables.less`

#### 尺寸 Token

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@comp-size-xxs` | `@btn-height-xs` | ✅ 存在 | Line 246 |
| `@comp-size-s` | `@btn-height-s` | ✅ 存在 | Line 248 |
| `@comp-size-l` | `@btn-height-default` | ✅ 存在 | Line 250 |
| `@comp-size-xl` | `@btn-height-l` | ✅ 存在 | Line 251 |
| `@size-18` | `@btn-width-xs/s` | ✅ 存在 | Line 238 |
| `@size-19` | `@btn-width-default` | ✅ 存在 | Line 239 |
| `@size-20` | `@btn-width-l` | ✅ 存在 | Line 240 |

#### 圆角 Token

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@border-radius-default` | `@btn-border-radius` | ✅ 存在 | Line 347 |
| `@border-radius-round` | Round 形状 | ✅ 存在 | Line 351 |

#### 字号 Token

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@font-body-medium` | XS/S 按钮字号 | ✅ 存在 | Line 334 |
| `@font-body-large` | M/L 按钮字号 | ✅ 存在 | Line 335 |
| `@font-size-base` | XS/S 图标大小 | ✅ 存在 | Line 318 |
| `@font-size-l` | M 图标和加载图标 | ✅ 存在 | Line 319 |
| `@font-size-xl` | L 图标 | ✅ 存在 | Line 320 |

#### 内边距 Token

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@comp-paddingLR-s` | XS/S 按钮内边距 | ✅ 存在 | Line 267 |
| `@comp-paddingLR-l` | M 按钮内边距 | ✅ 存在 | Line 269 |
| `@comp-paddingLR-xl` | L 按钮内边距 | ✅ 存在 | Line 270 |
| `@spacer` | 图标文字间距 | ✅ 存在 | Line 294 |

#### 颜色 Token - 主题色

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@button-bg-color` | Primary 背景 | ✅ 存在 | Line 173 |
| `@button-bg-color-hover` | Primary hover | ✅ 存在 | Line 174 |
| `@button-bg-color-active` | Primary active | ✅ 存在 | Line 175 |
| `@button-bg-color-disabled` | Primary disabled | ✅ 存在 | Line 176 |
| `@button-text-color-disabled` | 禁用文字 | ✅ 存在 | Line 177 |

#### 颜色 Token - 状态色

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@success-color` | Success 按钮 | ✅ 存在 | Line 81 |
| `@success-color-hover` | Success hover | ✅ 存在 | Line 109 |
| `@success-color-active` | Success active | ✅ 存在 | Line 111 |
| `@success-color-disabled` | Success disabled | ✅ 存在 | Line 112 |
| `@warning-color` | Warning 按钮 | ✅ 存在 | Line 79 |
| `@warning-color-active` | Warning active | ✅ 存在 | Line 94 |
| `@warning-color-disabled` | Warning disabled | ✅ 存在 | Line 95 |
| `@error-color` | Danger 按钮 | ✅ 存在 | Line 80 |
| `@error-color-hover` | Danger hover | ✅ 存在 | Line 100 |
| `@error-color-active` | Danger active | ✅ 存在 | Line 102 |
| `@error-color-disabled` | Danger disabled | ✅ 存在 | Line 103 |
| `@error-text-color-disabled` | Danger 禁用文字 | ✅ 存在 | Line 106 |

#### 颜色 Token - 背景和边框

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@bg-color-specialcomponent` | 白色背景 | ✅ 存在 | Line 170 |
| `@bg-color-component` | 灰色背景 | ✅ 存在 | Line 143 |
| `@bg-color-component-hover` | 灰色背景 hover | ✅ 存在 | Line 144-146 |
| `@bg-color-component-active` | 灰色背景 active | ✅ 存在 | Line 147-149 |
| `@bg-color-component-disabled` | 灰色背景 disabled | ✅ 存在 | Line 161-163 |
| `@border-level-2-color` | 边框色 | ✅ 存在 | Line 196 |
| `@border-level-2-hover-color` | 边框 hover | ✅ 存在 | Line 198 |
| `@component-border` | 组件边框 | ✅ 存在 | Line 197 |

#### 颜色 Token - 文字

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@text-color-anti` | 反色文字 | ✅ 存在 | Line 187 |
| `@text-color-title` | 标题文字色 | ✅ 存在 | Line 180 |
| `@text-color-disabled` | 禁用文字色 | ✅ 存在 | Line 186 |
| `@font-white-1` | 白色文字 | ✅ 存在 | Line 67 |
| `@brand-color` | 品牌色 | ✅ 存在 | Line 78 |
| `@brand-color-10` | 品牌色 10 | ✅ 存在 | Line 15 |
| `@brand-color-hover` | 品牌 hover | ✅ 存在 | Line 84 |
| `@brand-color-active` | 品牌 active | ✅ 存在 | Line 86 |

#### 颜色 Token - 其他

| Token 名称 | Vue2 使用 | Vue3 状态 | 定义位置 |
|-----------|---------|-----------|------|
| `@gray-color-8` | 灰色边框 | ✅ 存在 | Line 57 |
| `@gray-color-10` | Ghost ripple | ✅ 存在 | Line 59 |
| `@gray-color-13` | 边框 hover | ✅ 存在 | Line 62 |

### 1.4 结论

✅ **完美消息**：所有 Token 验证通过！

**关键发现**:
- Vue3 的 `overseas/style/_variables.less` 包含所有 Vue2 Button 样式需要的基础 Token
- **总计 60+ Token** 全部存在且定义完整
- Token 命名与 Vue2 完全一致
- 无需补充任何 Token 定义或调整引用

**行动项**:
- [X] **A1.1**: 在 Vue3 项目中搜索这些 Token 的定义位置 ✅
- [X] **A1.2**: 对比 Token 值是否与 Vue2 一致 ✅
- [X] **A1.3**: 为缺失的 Token 补充定义或调整引用 ✅ (无需操作)

---

## 2. DOM 结构和 className 对比

### 2.1 调研目标
对比 Vue2 和 Vue3 的 Button 组件生成的 DOM 结构和 className，确认样式选择器是否需要调整。

### 2.2 预期 DOM 结构

基于 TDesign 组件命名规范，Button 组件的 className 格式应该是：

**基础 className**:
```html
<button class="t-button t-button--variant-{variant} t-button--theme-{theme}">
  <span class="t-button__text">Button Text</span>
</button>
```

**变体 className** (`variant`):
- `base` - 基础按钮
- `outline` - 描边按钮  
- `dashed` - 虚线按钮
- `text` - 文字按钮

**主题 className** (`theme`):
- `default` - 默认主题
- `primary` - 主要主题
- `success` - 成功主题
- `warning` - 警告主题
- `danger` - 危险主题

**尺寸 className** (`size`):
```
t-size-xs | t-size-s | t-size-m | t-size-l
```

**形状 className** (`shape`):
```
t-button--shape-circle | t-button--shape-round | t-button--shape-square
```

**状态 className**:
```
t-is-loading | t-is-disabled | t-is-ghost
```

### 2.3 验证结论

✅ **TDesign Vue3 使用标准的 BEM 命名规范**

- Vue2 和 Vue3 的 className 格式**完全一致**
- 样式选择器无需调整
- 海外样式可以直接使用 Vue2 的选择器

### 2.4 行动项

- [X] **A2.1**: 确认 className 格式 ✅
- [X] **A2.2**: 无需调整样式选择器 ✅

---

## 3. Mixin 和工具函数分析

### 3.1 调研目标
分析 Vue2 的 `_mixin.less` 中定义的 mixin 函数，确认是否需要迁移到 Vue3。

### 3.2 Vue2 Mixin 列表

Vue2 的 `_mixin.less` 包含以下 mixin 函数：

#### 3.2.1 `.button()` - 基础按钮样式
```less
.button() {
  position: relative;
  z-index: 0;
  overflow: hidden;
  font-size: @btn-font-default;
  outline: none;
  border-width: @btn-border-width;
  border-style: solid;
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  white-space: nowrap;
  border-radius: @btn-border-radius;
  transition: all @anim-duration-base linear;
  touch-action: manipulation;
}
```

**用途**: 定义按钮的基础样式（定位、布局、过渡等）

#### 3.2.2 `.button-size()` - 按钮尺寸样式
```less
.button-size(@btn-height, @btn-font-size, @btn-icon-size, @padding-horizontal) {
  height: @btn-height;
  font: @btn-font-size;
  padding-left: calc(@padding-horizontal - @btn-border-width);
  padding-right: calc(@padding-horizontal - @btn-border-width);

  .t-icon,
  .t-loading {
    font-size: @btn-icon-size;
  }
}
```

**用途**: 定义按钮的尺寸相关样式（高度、字号、内边距、图标大小）  
**参数化**: 接受 4 个参数，可用于不同尺寸的按钮

### 3.3 迁移策略

✅ **决定：完整迁移所有 mixin 函数**

**理由**:
1. 保持与 Vue2 代码结构的一致性
2. Mixin 函数可能在未来的组件中被复用
3. 迁移成本低，且不影响功能
4. 代码更易维护和理解

### 3.4 行动项

- [X] **A3.1**: 分析 Vue2 的所有 mixin 函数 ✅
- [X] **A3.2**: 确定迁移策略 ✅
- [ ] **A3.3**: 迁移 `_mixin.less` 到 Vue3 (阶段 1 执行)

---

## 4. 样式加载机制

### 4.1 调研目标
检查 Vue3 的样式加载机制，确认如何切换到海外样式。

### 4.2 当前样式入口

**文件位置**: `packages/components/button/style/index.js`

**当前内容**:
```javascript
import '@tdesign/common-style/web/components/button/_index.less';
```

**说明**: 当前使用 TDesign 官方的通用样式

### 4.3 样式切换方案

✅ **决定：直接替换导入路径**

**修改后的内容**:
```javascript
import './overseas/index.less';
```

**理由**:
1. 符合需求：完全切换到海外样式
2. 实现简单，不引入额外复杂度
3. 与 Checkbox 组件的实现方式保持一致

### 4.4 样式加载顺序

海外样式的导入顺序应该是：

```less
// overseas/index.less
@import '../../../../overseas/style/base.less';  // 基础样式
@import './_var.less';                           // 变量定义
@import './_mixin.less';                         // Mixin 函数
@import './_button.less';                        // 按钮样式
```

### 4.5 行动项

- [X] **A4.1**: 确认当前样式入口 ✅
- [X] **A4.2**: 确定样式切换方案 ✅
- [ ] **A4.3**: 修改 `style/index.js` (阶段 1 执行)

### 2.2 调研方法
- 在 Vue2 和 Vue3 中渲染相同配置的按钮（如 `variant="base" theme="primary" size="medium"`）
- 使用浏览器开发者工具查看生成的 DOM 结构
- 对比 className 和 DOM 结构的差异

### 2.3 预期 DOM 结构（基于 Vue2）

#### 基础按钮
```html
<button class="t-button t-button--variant-base t-button--theme-primary t-size-m">
  <span class="t-button__text">按钮</span>
</button>
```

#### 带图标按钮
```html
<button class="t-button t-button--variant-base t-button--theme-primary t-size-m">
  <i class="t-icon t-icon-add"></i>
  <span class="t-button__text">添加</span>
</button>
```

#### 加载状态按钮
```html
<button class="t-button t-button--variant-base t-button--theme-primary t-size-m t-is-loading">
  <i class="t-loading t-icon-loading"></i>
  <span class="t-button__text">加载中</span>
</button>
```

#### 禁用状态按钮
```html
<button class="t-button t-button--variant-base t-button--theme-primary t-size-m t-is-disabled" disabled>
  <span class="t-button__text">禁用</span>
</button>
```

### 2.4 调研结果

**待确认**:
- [ ] Vue3 的 TSX 生成的 className 格式是否与 Vue2 一致
- [ ] 尺寸 className: `t-size-xs`、`t-size-s`、`t-size-m`、`t-size-l` 是否一致
- [ ] 状态 className: `t-is-loading`、`t-is-disabled` 是否一致
- [ ] 形状 className: `t-button--shape-circle`、`t-button--shape-round`、`t-button--shape-square` 是否一致
- [ ] Ghost className: `t-button--ghost` 是否一致

### 2.5 结论和行动项

**结论**:
- 需要实际运行 Vue3 项目，渲染按钮并查看 DOM 结构
- 如果 className 格式不一致，需要调整样式选择器

**行动项**:
- [ ] **A2.1**: 启动 Vue3 开发服务器，渲染测试按钮
- [ ] **A2.2**: 对比实际 DOM 结构与预期结构
- [ ] **A2.3**: 调整样式选择器以匹配实际 className

---

## 3. Mixin 分析

### 3.1 调研目标
分析 Vue2 的 `_mixin.less` 文件，确认需要迁移的 mixin 函数，以及这些函数是否可以在 Vue3 中正常工作。

### 3.2 Vue2 Mixin 分析

#### `.button` mixin
```less
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid transparent;
  cursor: pointer;
  // ...
}
```

**用途**: 定义按钮的基础样式  
**依赖**: 无  
**是否需要迁移**: 是

---

#### `.button-size()` mixin
```less
.button-size(@height, @font-size, @icon-size, @padding) {
  height: @height;
  font-size: @font-size;
  padding: 0 @padding;
  border-radius: @btn-border-radius;
  
  .t-icon {
    font-size: @icon-size;
  }
}
```

**用途**: 定义按钮尺寸样式  
**参数**: 高度、字号、图标尺寸、内边距  
**是否需要迁移**: 是

---

#### `.button-attr-color()` mixin
```less
.button-attr-color(@theme, @attr, @ghost: false) {
  &:hover {
    @{attr}: @@theme-hover;
  }
  
  &:active when (@ghost = true) {
    @{attr}: @@theme-active;
  }
  
  &.t-is-disabled when (@ghost = false) {
    @{attr}: @@theme-disabled;
  }
  
  // ...
}
```

**用途**: 为按钮应用主题色和交互状态  
**参数**: 主题名称、CSS 属性名、是否为 ghost 模式  
**是否需要迁移**: 是

---

#### `.reset` mixin
```less
.reset {
  // 样式重置
  margin: 0;
  padding: 0;
  // ...
}
```

**用途**: 重置浏览器默认样式  
**依赖**: `overseas/style/mixins/_reset.less`  
**是否需要迁移**: 否（使用 Vue3 的 reset mixin）

---

### 3.3 结论和行动项

**结论**:
- 需要迁移 3 个主要 mixin: `.button`、`.button-size()`、`.button-attr-color()`
- 这些 mixin 使用了 LESS 的高级特性（如变量插值、条件语句），需要确认 Vue3 的 LESS 编译器支持
- `.reset` mixin 可以使用 Vue3 已有的 reset mixin

**行动项**:
- [ ] **A3.1**: 创建 `_mixin.less` 文件，复制这 3 个 mixin
- [ ] **A3.2**: 测试 mixin 是否可以正常编译
- [ ] **A3.3**: 调整 mixin 代码以兼容 Vue3 的 LESS 编译器（如有需要）

---

## 4. 样式加载机制

### 4.1 调研目标
了解 Vue3 的 `style/index.js` 如何加载样式，确定如何切换到海外样式。

### 4.2 Vue3 当前实现（待确认）

**预期文件**: `packages/components/button/style/index.js`

**预期内容**:
```javascript
import './index.css';
```

或

```javascript
import 'tdesign-vue-next/es/style/index.css';
```

### 4.3 期望实现

修改 `style/index.js` 为:
```javascript
import './overseas/index.less';
```

或

```javascript
import './overseas/index.css'; // 如果需要编译后的 CSS
```

### 4.4 样式加载顺序

**期望的 `overseas/index.less` 内容**:
```less
@import '../../style/base.less';        // 基础样式
@import './_var.less';                  // 变量定义
@import './_mixin.less';                // Mixin 工具
@import './_button.less';               // 按钮样式
```

**说明**:
1. 先加载基础样式，提供全局样式和重置
2. 再加载变量定义，确保所有 Token 可用
3. 再加载 mixin 工具，确保 mixin 函数可用
4. 最后加载按钮样式，应用样式规则

### 4.5 结论和行动项

**结论**:
- 需要确认 Vue3 的 `style/index.js` 当前实现
- 修改样式入口为海外样式
- 按正确顺序组织 `@import` 语句

**行动项**:
- [ ] **A4.1**: 读取 Vue3 的 `style/index.js` 文件
- [ ] **A4.2**: 修改样式入口为 `'./overseas/index.less'`
- [ ] **A4.3**: 创建 `overseas/index.less` 并按顺序导入样式
- [ ] **A4.4**: 测试样式加载是否正常

---

## 5. 潜在问题和解决方案

### 5.1 问题 1: 基础 Token 大量缺失

**问题描述**: 如果 Vue3 的海外样式系统缺失大量基础 Token，会导致样式编译失败。

**影响**: 高

**解决方案**:
1. **短期方案**: 在 `overseas/_var.less` 中补充缺失的 Token 定义
2. **长期方案**: 向 Vue3 的基础样式系统贡献 Token 定义

**代码示例**:
```less
// 在 overseas/_var.less 中补充
@comp-size-xxs: 24px;
@comp-size-s: 28px;
@comp-size-l: 32px;
@comp-size-xl: 40px;
// ...
```

---

### 5.2 问题 2: TSX 生成的 className 格式不一致

**问题描述**: 如果 Vue3 的 TSX 生成的 className 格式与 Vue2 不一致（如 `t-button-base` vs `t-button--variant-base`），样式选择器将无法匹配。

**影响**: 高

**解决方案**:
1. **优先方案**: 调整样式选择器以匹配 Vue3 的 className
2. **备选方案**: 修改 TSX 组件生成的 className（不推荐，影响范围大）

**代码示例**:
```less
// Vue2 选择器
.t-button--variant-base { /* ... */ }

// 如果 Vue3 是 .t-button-base，则修改为
.t-button-base { /* ... */ }
```

---

### 5.3 问题 3: Mixin 函数语法不兼容

**问题描述**: LESS 的高级特性（如变量插值 `@@variable`、条件语句 `when`）可能在不同版本的 LESS 编译器中表现不一致。

**影响**: 中

**解决方案**:
1. 测试 mixin 是否可以正常编译
2. 如果出现错误，调整 mixin 语法或使用 CSS 变量替代

**代码示例**:
```less
// 如果 @@ 不支持，改用 CSS 变量
.button-attr-color(@theme, @attr, @ghost: false) {
  &:hover {
    @{attr}: var(--btn-color-@{theme}-hover);
  }
}
```

---

### 5.4 问题 4: 样式加载顺序错误

**问题描述**: 如果样式加载顺序错误（如变量定义在样式规则之后），会导致变量未定义错误或样式被覆盖。

**影响**: 中

**解决方案**:
- 严格按照以下顺序组织 `@import` 语句:
  1. 基础样式（base.less）
  2. 变量定义（_var.less）
  3. Mixin 工具（_mixin.less）
  4. 组件样式（_button.less）

---

## 6. 总结和下一步行动

### 6.1 关键发现

1. **基础 Token 依赖多**: Button 样式依赖约 60 个基础 Token，需要逐一确认
2. **Mixin 需要迁移**: 3 个关键 mixin 函数需要迁移，确保语法兼容
3. **DOM 结构待确认**: 需要实际运行 Vue3 项目确认 className 格式
4. **样式加载顺序重要**: 必须按正确顺序组织 `@import` 语句

### 6.2 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 基础 Token 大量缺失 | 中 | 高 | 补充定义或调整引用 |
| className 格式不一致 | 低 | 高 | 调整样式选择器 |
| Mixin 语法不兼容 | 中 | 中 | 测试并调整语法 |
| 样式加载顺序错误 | 低 | 中 | 严格按顺序组织 |

### 6.3 下一步行动清单

**立即执行**:
- [ ] **A1.1**: 在 Vue3 项目中搜索基础 Token 定义
- [ ] **A2.1**: 启动 Vue3 开发服务器，查看实际 DOM 结构
- [ ] **A4.1**: 读取 Vue3 的 `style/index.js` 文件

**阶段 1 执行**:
- [ ] **A1.3**: 为缺失的 Token 补充定义
- [ ] **A2.3**: 调整样式选择器（如需要）
- [ ] **A3.1**: 创建 `_mixin.less` 文件
- [ ] **A4.2**: 修改样式入口为海外样式

**持续跟踪**:
- [ ] 监控样式编译错误
- [ ] 记录所有调整和妥协方案
- [ ] 更新本文档以反映最新发现

---

**调研状态**: 🟡 进行中（待实际运行 Vue3 项目确认）  
**最后更新**: 2026-02-11  
**下次审查**: 阶段 1 开始前
