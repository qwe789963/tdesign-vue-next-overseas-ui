# Select 组件海外版迁移 - 快速开始

> **更新日期**: 2026-02-27

## 功能概述

将 `tdesign-vue-overseas`（Vue 2）的 Select 组件海外版样式和交互特性迁移到 `tdesign-vue-next-overseas`（Vue 3）。

## 关键文件

### 源文件（Vue 2 海外版 - 参考）
- `tdesign-vue-overseas/packages/overseas/src/select/select.tsx` - 组件主文件
- `tdesign-vue-overseas/packages/overseas/src/select/props.ts` - Props 定义
- `tdesign-vue-overseas/packages/overseas/src/select/style/_select.less` - 主样式
- `tdesign-vue-overseas/packages/overseas/src/select/style/_var.less` - 样式变量

### 目标文件（Vue 3 - 已修改）

**Select 核心**:
- `packages/components/select/props.ts` - Props 定义（+4 海外版属性）
- `packages/components/select/type.ts` - 类型定义（+4 海外版类型）
- `packages/components/select/select.tsx` - 组件主文件（核心改动）
- `packages/components/select/option.tsx` - 选项组件（+mouseDown、optionWarp）
- `packages/components/select/components/select-panel.tsx` - 下拉面板（+optionWarp 透传）

**样式文件**（新增）:
- `packages/components/select/style/overseas/_var.less` - 样式变量
- `packages/components/select/style/overseas/_select.less` - 核心样式（466 行）
- `packages/components/select/style/overseas/index.less` - 样式入口

**辅助修改**:
- `packages/components/tag-input/tag-input.tsx` - expose focus/blur
- `packages/components/select-input/select-input.tsx` - 自动聚焦 watch
- `packages/components/select-input/hooks/useOverlayInnerStyle.ts` - 宽度精度修复
- `packages/shared/hooks/useCommonClassName/index.ts` - +mouseDown 类名

## 海外版特有属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `suffixIconOs` | String | `'bulletpoint'` | 自定义后缀图标（同时作为海外版模式标识） |
| `singleUseTag` | Boolean | `true` | 单选时使用 Tag 标签样式展示选中值 |
| `singleUseLabel` | Boolean | `false` | 单选时显示前置 Label |
| `optionWarp` | Boolean | `false` | Option 文本是否换行（false=省略, true=换行） |

## 海外版关键样式差异

| 特性 | 标准版 | 海外版 |
|------|--------|--------|
| 后缀图标 | FakeArrow（展开旋转 180°） | BulletpointIcon（无旋转） |
| Tag 关闭按钮 | 文本右侧 | 文本左侧（row-reverse） |
| 焦点边框 | 1px + box-shadow | 2px 品牌色，无 shadow |
| 下拉面板间距 | 有间隙 | 紧贴（margin-top: -3.5px） |
| 下拉面板边框 | box-shadow | 2px 品牌色 |
| 选项圆角 | 有圆角 | 无圆角（unset） |
| 鼠标按下 | 无特殊 | 品牌色背景+白色文字 |
| 可过滤模式 | 输入框与 Tag 同行 | 输入框独占一行 |
| autoWidth | 支持 | 强制关闭 |
| 下拉框宽度 | offsetWidth（取整） | getBoundingClientRect（精确小数） |

## 样式关键变量

```less
@select-tag-height: 24px;
@select-tag-height-s: 16px;
@select-height-s: 28px;
@select-height-default: 40px;
@select-height-l: 48px;
@select-dropdown-max-height: 300px;
```

## 迁移检查清单

- [x] 添加海外版 Props（suffixIconOs、singleUseTag、singleUseLabel、optionWarp）
- [x] 迁移样式文件（_var.less、_select.less、index.less）
- [x] 后缀图标替换为 BulletpointIcon
- [x] Tag 关闭按钮左置（flex-direction: row-reverse）
- [x] Tag 字体统一 14px
- [x] 单选 Tag 文本左对齐
- [x] 下拉面板紧贴（margin-top: -3.5px）
- [x] 鼠标按下状态（.t-is-mouseDown）
- [x] 可过滤模式布局（suffix 绝对定位 + padding-right）
- [x] TagInput expose focus/blur
- [x] 多选过滤自动聚焦
- [x] 下拉框宽度精度（getBoundingClientRect）
- [x] 海外版屏蔽 autoWidth
- [ ] 验证单选模式
- [ ] 验证多选模式
- [ ] 验证键盘导航
- [ ] 验证禁用状态
- [ ] 视觉对比测试
