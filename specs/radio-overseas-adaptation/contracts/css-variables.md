# CSS 变量契约

---

## 必需变量 (从 TDesign 继承)

这些变量必须从 TDesign 基础样式中导入：

```less
@import '../../../common/style/web/theme/_light.less';
```

### 颜色变量

| 变量名 | CSS 变量 | 实际值 (Vue2 版本) | 用途 |
|--------|---------|-------------------|------|
| `@border-level-2-color` | `--td-border-level-2-color` → `--td-gray-color-6` | `#7b858f` | Radio 外圈边框颜色 |
| `@bg-color-container` | `--td-bg-color-container` | `#fff` | Radio 外圈背景色（未选中） |
| `@brand-color-active` | `--td-brand-color-active` → `--td-brand-color-8` | `#1b72e3` | 选中态主色（海外版本） |
| `@bg-color-component-disabled` | `--td-bg-color-component-disabled` → `--td-gray-color-3` | `#f0f1f2` | 禁用态组件背景 |
| `@text-color-primary` | `--td-text-color-primary` → `--td-font-gray-2` | `#494949` | 标签文本颜色 |
| `@text-color-disabled` | `--td-text-color-disabled` → `--td-font-gray-4` | `#a1aab3` | 禁用态文本颜色 |

### 动画变量

| 变量名 | TDesign 值 | 用途 |
|--------|-----------|------|
| `@anim-duration-base` | `0.2s` | 过渡动画时长 |
| `@anim-time-fn-ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 缓动函数 |

### 边框变量

| 变量名 | CSS 变量 | 实际值 | 用途 |
|--------|---------|--------|------|
| `@border-radius-circle` | `--td-radius-circle` | `50%` | 圆形边框半径 |

---

## 海外版本自定义变量

这些变量在 `_var.less` 中自定义，覆盖或扩展 TDesign 基础变量：

### 尺寸变量

```less
// Radio 组件尺寸
@radio-size: 18px;

// 圆环中心位置计算 (自动计算)
@radio-dot-size: (@radio-size / 2);  // 9px

// Radio 与 Label 间距
@radio-input-label-spacer: 12px;
```

### 颜色覆盖

```less
// 选中态主色 (海外版本固定值，Vue2 版本定义)
@radio-dot-color: @brand-color-active;  // #1b72e3

// 禁用态背景色 (海外版本独有固定值)
@radio-input-color-disabled: #F0F1F2;

// 禁用选中态圆环边框色 (海外版本独有固定值)
@radio-dot-color-disabled-checked: #CED3D9;

// Hover 态边框色 (选中态主色)
@radio-dot-color-hover: @radio-dot-color;  // #1b72e3
```

### 其他变量

```less
// 外圈边框颜色 (继承 TDesign 变量)
@radio-border-color: @border-level-2-color;

// 背景色 (继承 TDesign 变量)
@radio-input-color: @bg-color-container;

// 标签颜色 (继承 TDesign 变量)
@radio-label-color: @text-color-primary;

// 边框定义
@radio-input-border: 1px solid @radio-border-color;

// 过渡动画
@radio-input-transition: border @anim-duration-base @anim-time-fn-ease-out;

// 透明度
@radio-opacity-transparent: 0;
```

---

## 完整 _var.less 文件结构

```less
/**
 * Radio 海外版本 CSS 变量定义
 * 
 * 继承自: packages/common/style/web/theme/_light.less
 * 覆盖: 选中态主色、禁用态背景、禁用选中态边框
 * 新增: 海外版本尺寸和间距
 */

// 1. 导入 TDesign 基础变量
@import '../../../common/style/web/theme/_light.less';

// 2. 组件类名前缀
@radio-cls: ~"@{prefix}-radio";

// 3. 尺寸变量
@radio-size: 18px;
@radio-dot-size: (@radio-size / 2);
@radio-input-label-spacer: 12px;

// 4. 颜色变量 (覆盖)
@radio-dot-color: #1b72e3;
@radio-input-color-disabled: #F0F1F2;
@radio-dot-color-disabled-checked: #CED3D9;

// 5. 颜色变量 (继承)
@radio-border-color: @border-level-2-color;
@radio-input-color: @bg-color-container;
@radio-label-color: @text-color-primary;

// 6. 边框和动画
@radio-input-border: 1px solid @radio-border-color;
@radio-input-transition: border @anim-duration-base @anim-time-fn-ease-out;
@radio-opacity-transparent: 0;
```

---

## 变量使用示例

### 圆环样式

```less
.@{radio-cls}__input::after {
  content: '';
  box-sizing: border-box;
  width: @radio-size;                    // 使用尺寸变量
  height: @radio-size;
  margin-top: -@radio-dot-size;          // 使用计算变量
  margin-left: -@radio-dot-size;
  border: 5px solid @radio-dot-color;    // 使用颜色变量
  opacity: @radio-opacity-transparent;
  border-radius: @border-radius-circle;   // 使用 TDesign 变量
  transition: all @anim-duration-base @anim-time-fn-ease-out;
}
```

### 禁用态样式

```less
.@{radio-cls}.@{prefix}-is-disabled {
  .@{radio-cls}__input {
    background-color: @radio-input-color-disabled;  // 海外版本自定义
  }
  
  &.@{prefix}-is-checked .@{radio-cls}__input::after {
    background-color: #ffffff;
    border: 5px solid @radio-dot-color-disabled-checked;  // 海外版本独有
  }
}
```

### Focus 外圈

```less
.focusBox {
  width: @radio-size + 10px;             // 基于尺寸变量计算
  height: @radio-size + 10px;
  border: 2px solid #1b72e3;             // 固定颜色 (与选中态一致)
  border-radius: @border-radius-circle;   // 使用 TDesign 变量
}
```

---

## 变量验证清单

在实施时必须验证以下内容：

- [ ] 所有 TDesign 基础变量已正确导入
- [ ] 外圈边框颜色为 `#7b858f` (对应 `--td-gray-color-6`)
- [ ] 圆环颜色为 `#1b72e3` (海外版本主色)
- [ ] 禁用态背景为 `#F0F1F2` (海外版本固定值)
- [ ] 禁用选中态圆环边框为 `#CED3D9` (海外版本固定值)
- [ ] Hover 态边框颜色为 `#1b72e3` (与选中态一致)
- [ ] Focus 外圈颜色为 `#1b72e3` (与选中态一致)
- [ ] 计算变量 (`@radio-dot-size`) 值正确 (9px)
- [ ] 标签文字颜色为 `#494949` (对应 `--td-font-gray-2`)
- [ ] 禁用态文字颜色为 `#a1aab3` (对应 `--td-font-gray-4`)

---

## 兼容性说明

### TDesign 版本依赖

本契约基于 TDesign Vue Next 当前版本，假设以下变量可用：
- `@border-level-2-color`
- `@bg-color-container`
- `@text-color-primary`
- `@anim-duration-base`
- `@anim-time-fn-ease-out`
- `@border-radius-circle`

如果 TDesign 未来版本移除或重命名这些变量，需要更新 `_var.less`。

### 暗黑模式

当前契约仅覆盖亮色模式 (`_light.less`)。  
暗黑模式支持需要额外定义 `_dark.less` 中的变量覆盖。

---

**最后更新**: 2026-02-10  
**维护人**: @v_genyin

---

## 附录：Vue2 版本颜色完整对照表

以下是 Vue2 版本中实际使用的所有颜色值，作为 Vue3 实施的参考：

### 基础颜色映射

| 用途 | Vue2 Less 变量 | CSS 变量链 | 最终值 |
|------|---------------|-----------|--------|
| 外圈边框 | `@radio-border-color` | `@border-level-2-color` → `--td-gray-color-6` | **#7b858f** |
| 外圈背景（未选中） | `@radio-input-color` | `@bg-color-container` | **#fff** |
| 内圈环（选中） | `@radio-dot-color` | `@brand-color-active` → `--td-brand-color-8` | **#1b72e3** |
| 外圈背景（禁用） | `@radio-input-color-disabled` | (固定值) | **#F0F1F2** |
| 内圈环（禁用选中） | 无 Less 变量（hard-coded） | 无 | **#a1aab3** (代码中 `border: 5px solid #a1aab3`) |
| 标签文字 | `@radio-label-color` | `@text-color-primary` → `--td-font-gray-2` | **#494949** |
| 标签文字（禁用） | `@radio-button-color-disabled` | `@text-color-disabled` → `--td-font-gray-4` | **#a1aab3** |
| Focus 外圈 | 无 Less 变量（hard-coded） | 无 | **#1b72e3** (代码中 `border: 2px solid #1b72e3`) |
| Hover 态边框 | 无 Less 变量（继承） | `@radio-dot-color` | **#1b72e3** |

### 关键发现

1. **外圈边框颜色**: Vue2 版本使用 `#7b858f`（灰色），而非之前文档中的 `#dcdcdc` ✅
2. **禁用选中态圆环边框**: Vue2 代码中硬编码为 `#a1aab3`，未使用 Less 变量
3. **Focus 外圈颜色**: Vue2 代码中硬编码为 `#1b72e3`，与选中态主色一致
4. **禁用态外圈背景**: Vue2 版本固定为 `#F0F1F2`，与 TDesign 的 `@bg-color-component-disabled` 一致

### Vue2 代码摘录

```less
// radio.less L298
.@{radio-cls}__input {
  border: @radio-input-border;  // 使用 @radio-border-color (#7b858f)
}

// radio.less L310
.focusBox {
  border: 2px solid #1b72e3;  // 硬编码
}

// radio.less L339
&::after {
  border: 5px solid #1b72e3;  // 内圈环颜色
}

// radio.less L389
.@{radio-cls}__input {
  background-color: @radio-input-color-disabled;  // #F0F1F2
}

// radio.less L404
&::after {
  background-color: #ffffff;
  border: 5px solid #a1aab3;  // 禁用选中态圆环边框 (硬编码)
}
```
