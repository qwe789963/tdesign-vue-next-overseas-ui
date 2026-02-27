# 功能规格：Menu 导航菜单组件 Vue2 到 Vue3 迁移改造

**功能编号**: 006  
**创建日期**: 2026-02-25  
**状态**: 规格编写中  
**优先级**: 高

---

## 1. 功能概述

### 1.1 目标

将 TDesign 海外版 UI 组件库的 Menu（导航菜单）组件从 Vue 2.6 版本迁移到 Vue 3，确保迁移后的组件在样式、功能和交互效果上与 Vue2 版本**完全一致（100%）**。

### 1.2 背景

- 现有的海外版 UI 组件库基于 Vue 2.6 构建，无法兼容 Vue 3 项目
- Menu 组件是核心导航组件，包含复杂的多级菜单、展开/收起、主题切换等功能
- Vue2 版本实现了特殊的 **S2 规范**，包括 HeadMenu 顶部导航、侧边菜单、Drawer 抽屉菜单等海外特色功能
- 必须保持与 Vue2 版本的视觉和交互完全一致

### 1.3 范围

**包含**:
- Menu 核心组件迁移（menu.tsx）
- HeadMenu 顶部导航组件迁移（head-menu.tsx）
- Submenu 子菜单组件迁移（submenu.tsx）
- MenuItem 菜单项组件迁移（menu-item.tsx）
- MenuGroup 菜单分组组件迁移（menu-group.tsx）
- S2 规范特殊功能（s2Menu 插槽、mouseOverTrigger、Drawer 抽屉菜单）
- 完整样式文件迁移（style/overseas/）
- 16 个示例文件迁移和验证
- 类型定义更新

**不包含**:
- 单元测试编写（已有测试文件可复用）
- 文档内容修改（保持 TDesign 官方文档结构）
- 新功能添加（严格对齐 Vue2 版本）

---

## 2. 用户场景

### 2.1 主要用户场景

#### 场景 1: 使用顶部导航（HeadMenu + S2 规范）
**角色**: 前端开发者  
**目标**: 在 Vue 3 项目中实现海外系统的顶部导航栏  
**前提条件**: 已安装海外版 Vue 3 组件库  

**流程**:
1. 开发者在 Vue 3 项目中导入 HeadMenu 组件
2. 使用 `#logo` 插槽设置站点 LOGO
3. 使用 `#s2Menu` 插槽嵌入 Menu 组件（海外特色功能）
4. 使用 `#operations` 插槽添加用户信息、语言切换等操作区域
5. Menu 组件支持多级子菜单（最多 3 级）
6. 用户点击菜单项触发路由跳转或回调

**预期结果**:
- 顶部导航栏高度 60px，背景色为主题色
- Logo 区域、菜单区域、操作区域布局正确
- 菜单展开/收起动画流畅
- 鼠标悬停/点击交互与 Vue2 版本一致
- 支持 light/dark 两种主题

#### 场景 2: 使用侧边菜单（Side Menu）
**角色**: 前端开发者  
**目标**: 实现可展开/收起的侧边导航菜单  
**前提条件**: 已安装海外版 Vue 3 组件库  

**流程**:
1. 开发者设置 Menu 组件的 `collapsed` 属性控制展开/收起
2. 设置 `width` 属性（数组格式）定义展开和收起宽度：`['400px', '64px']`
3. 设置 `expandType` 为 `'normal'`（平铺展开）或 `'popup'`（浮层展开）
4. 设置 `thirdExpandType` 控制三级菜单展开方式
5. 用户点击一级菜单展开二级菜单
6. 用户点击二级菜单展开三级菜单（根据配置方式）
7. 支持 `expandMutex` 同级互斥展开

**预期结果**:
- 菜单展开时宽度为 400px，收起时为 64px
- 收起时仅显示图标，展开时显示图标+文字
- 二级菜单展开方式符合配置（平铺或浮层）
- 三级菜单始终浮层展开（当 expandType 为 popup 时）
- 展开/收起动画过渡流畅

#### 场景 3: 鼠标悬停触发展开（mouseOverTrigger）
**角色**: 终端用户  
**目标**: 鼠标移入菜单项自动展开子菜单（无需点击）  
**前提条件**: Menu 组件设置 `mouseOverTrigger={true}`  

**流程**:
1. 用户鼠标移入一级菜单项
2. 自动展开对应的二级子菜单（无需点击）
3. 用户鼠标移入二级菜单项
4. 自动展开对应的三级子菜单
5. 用户鼠标移出菜单区域
6. 子菜单自动收起（延迟 200ms）

**预期结果**:
- 鼠标移入即展开，无需点击
- 展开动画流畅，无闪烁
- 移出自动收起，延迟合理
- 与 Vue2 版本行为完全一致

#### 场景 4: 使用 Drawer 抽屉菜单（S2 特色）
**角色**: 移动端用户或小屏幕用户  
**目标**: 点击按钮从右侧弹出抽屉式菜单  
**前提条件**: HeadMenu 设置 `s2={true}`（默认）  

**流程**:
1. 用户看到顶部导航栏右侧的菜单触发按钮（ViewListIcon）
2. 用户点击按钮
3. 从右侧弹出全屏抽屉（Drawer）
4. 抽屉内渲染完整的多级菜单
5. 用户点击菜单项后，抽屉自动关闭
6. 或用户点击关闭按钮（CloseCircleIcon）关闭抽屉
7. 或用户点击抽屉外部遮罩区域关闭抽屉

**预期结果**:
- 抽屉从右侧滑入，宽度 100%
- 抽屉内菜单样式与侧边菜单一致
- 点击菜单项自动关闭抽屉
- 点击外部遮罩自动关闭抽屉（标准抽屉行为）
- 支持自定义触发按钮（#trigger 插槽）
- 关闭动画流畅

#### 场景 5: 键盘导航与无障碍访问
**角色**: 使用键盘或屏幕阅读器的用户  
**目标**: 通过键盘完成菜单导航  
**前提条件**: Menu 组件未禁用  

**流程**:
1. 用户按 Tab 键聚焦到菜单项
2. 按 Enter 或 Space 键激活菜单项
3. 按方向键在菜单项之间导航
4. 按 Esc 键关闭子菜单或抽屉
5. 屏幕阅读器正确读取菜单结构

**预期结果**:
- 所有菜单项可通过键盘访问
- 焦点样式清晰可见
- ARIA 标签完整
- 符合 WCAG 2.1 AA 级标准

---

## 3. 功能需求

### 3.1 组件 API 对齐

#### Menu 组件 Props

| 属性 | Vue2 版本 | Vue3 版本（目标） | 迁移要求 |
|------|----------|------------------|---------|
| `s2` | ✅ Boolean (default: true) | ❌ 不存在 | **必须添加** |
| `mouseOverTrigger` | ✅ Boolean (default: false) | ❌ 不存在 | **必须添加** |
| `collapsed` | ✅ Boolean | ✅ 已存在 | 保持不变 |
| `expanded` | ✅ Array<MenuValue> | ✅ 已存在 | 保持不变 |
| `expandMutex` | ✅ Boolean | ✅ 已存在 | 保持不变 |
| `expandType` | ✅ 'normal' \| 'popup' | ✅ 已存在 | 保持不变 |
| `thirdExpandType` | ✅ 'normal' \| 'popup' | ❌ 不存在 | **必须添加** |
| `logo` | ✅ TNode | ✅ 已存在 | 保持不变 |
| `operations` | ✅ TNode | ✅ 已存在 | 保持不变 |
| `theme` | ✅ 'light' \| 'dark' | ✅ 已存在 | 保持不变 |
| `value` | ✅ MenuValue | ✅ 已存在 | 保持不变 |
| `width` | ✅ string \| number \| Array | ✅ 已存在 | **检查类型** |
| `onChange` | ✅ function | ✅ 已存在 | 保持不变 |
| `onExpand` | ✅ function | ✅ 已存在 | 保持不变 |

**关键差异**：
1. ✅ **`s2` 属性**：启用 S2 规范，控制 Drawer 抽屉菜单功能
2. ✅ **`mouseOverTrigger` 属性**：鼠标悬停触发展开（无需点击）
3. ✅ **`thirdExpandType` 属性**：控制三级菜单展开方式

#### HeadMenu 组件特殊插槽

| 插槽名 | Vue2 版本 | Vue3 版本（目标） | 迁移要求 |
|--------|----------|------------------|---------|
| `#logo` | ✅ 站点 LOGO 区域 | ✅ 已存在 | 保持不变 |
| `#s2Menu` | ✅ S2 规范菜单（Drawer） | ❌ 不存在 | **必须添加** |
| `#trigger` | ✅ 自定义触发按钮 | ❌ 不存在 | **必须添加** |
| `#operations` | ✅ 操作区域 | ✅ 已存在 | 保持不变 |
| `default` | ✅ 默认菜单内容 | ✅ 已存在 | 保持不变 |

**`#s2Menu` 插槽说明**：
```vue
<t-head-menu>
  <template #s2Menu>
    <t-menu expand-mutex>
      <t-submenu title="Home" value="Home">
        <t-menu-item value="Profile">Profile</t-menu-item>
      </t-submenu>
    </t-menu>
  </template>
</t-head-menu>
```

### 3.2 S2 规范特殊功能（核心差异）

#### 功能 1: Drawer 抽屉菜单

**Vue2 版本实现**:
```tsx
// head-menu.tsx
const s2MenuVisible = ref(false);
const s2MenuClass = computed(() => [`${classPrefix.value}-s2-menu`]);

// 渲染 Drawer
if (props.s2) {
  return (
    <div class={s2MenuClass.value}>
      <Drawer
        visible={s2MenuVisible.value}
        placement="right"
        size="100%"
        closeBtn={false}
      >
        <div class={s2InnerClasses.value}>
          <div class="close-icon">
            <CloseCircleIcon onClick={() => s2MenuVisible.value = false} />
          </div>
          {renderTNodeJSX(this, 's2Menu')}
        </div>
      </Drawer>
      <div class={`${classPrefix.value}-menu__trigger`}>
        {triggerContent || <ViewListIcon onClick={() => s2MenuVisible.value = true} />}
      </div>
    </div>
  );
}
```

**Vue3 版本当前实现**（缺失此功能）：
- ❌ 没有 `s2` 属性
- ❌ 没有 Drawer 抽屉菜单
- ❌ 没有 `#s2Menu` 插槽
- ❌ 没有 `#trigger` 插槽

**迁移要求**：
1. ✅ **添加 `s2` 属性**（默认值 true）
2. ✅ **集成 Drawer 组件**（从 `@tdesign/vue-next` 导入）
3. ✅ **实现 `s2MenuVisible` 响应式状态**
4. ✅ **添加 `#s2Menu` 和 `#trigger` 插槽**
5. ✅ **实现关闭按钮（CloseCircleIcon）**
6. ✅ **实现触发按钮（ViewListIcon）**
7. ✅ **点击菜单项自动关闭抽屉**
8. ✅ **点击外部遮罩自动关闭抽屉**（设置 Drawer 的 `closeOnOverlayClick` 为 true）

#### 功能 2: 鼠标悬停触发（mouseOverTrigger）

**Vue2 版本实现**:
```tsx
// submenu.tsx
const popupProps = computed(() => ({
  trigger: props.mouseOverTrigger ? 'hover' : 'click',
  placement: 'right-top',
  // ...
}));
```

**Vue3 版本当前实现**（缺失此功能）：
- ❌ 没有 `mouseOverTrigger` 属性
- ❌ 触发方式固定为 click

**迁移要求**：
1. ✅ **添加 `mouseOverTrigger` 属性**（默认值 false）
2. ✅ **动态设置 Popup trigger 为 hover 或 click**
3. ✅ **确保鼠标移出自动收起（延迟 200ms）**
4. ✅ **移动端行为**：不做设备检测，直接使用 hover 触发（依赖浏览器的触摸事件转换行为，与 Vue2 版本一致）

#### 功能 3: 三级菜单展开方式（thirdExpandType）

**Vue2 版本实现**:
```tsx
// menu.tsx
const thirdMode = ref(props.thirdExpandType);

provide<TdMenuInterface>('TdMenu', {
  mode,
  thirdMode,
  // ...
});

// submenu.tsx 中使用
const { mode, thirdMode } = inject<TdMenuInterface>('TdMenu');
const isPopup = computed(() => {
  if (level === 1) return mode.value === 'popup';
  if (level === 2) return thirdMode.value === 'popup';
  return true; // 三级以上始终 popup
});
```

**Vue3 版本当前实现**（缺失此功能）：
- ❌ 没有 `thirdExpandType` 属性
- ❌ 三级菜单展开方式无法配置

**迁移要求**：
1. ✅ **添加 `thirdExpandType` 属性**（默认值 'popup'）
2. ✅ **在 provide 中传递 `thirdMode`**
3. ✅ **submenu 组件根据层级和 thirdMode 决定展开方式**
4. ✅ **当 expandType 为 popup 时，thirdExpandType 无效（始终 popup）**

### 3.3 样式文件完整性

**Vue2 版本样式文件**:
```
style/
├── _docs.less        # 文档样式
├── _index.less       # 主样式文件
├── _mixin.less       # Mixin 工具
├── _transition.less  # 过渡动画
├── _var.less         # 样式变量
├── css.js            # CSS 入口
└── index.js          # 样式入口
```

**Vue3 版本当前样式**（严重缺失）:
```
style/
├── css.js            # ✅ 已存在
└── index.js          # ✅ 已存在
```

**迁移要求**：
1. ✅ **创建 `overseas/` 目录**（海外版样式）
2. ✅ **迁移 `_var.less`**（样式变量）
3. ✅ **迁移 `_mixin.less`**（Mixin 工具）
4. ✅ **迁移 `_transition.less`**（过渡动画）
5. ✅ **迁移 `_index.less`** 并重命名为 `_menu.less`
6. ✅ **创建 `overseas/index.less`** 作为入口
7. ✅ **确保 S2 规范样式完整迁移**（s2-menu、Drawer、trigger 按钮）

### 3.4 关键样式特性

#### S2 规范样式

**HeadMenu 高度和布局**:
```less
@head-menu-height: 60px;
@menu-logo-height: 28px;

.@{prefix}-head-menu {
  width: 100%;
  background-color: @menu-theme-primary;

  &__inner {
    display: flex;
    height: @head-menu-height;
    color: @menu-item-active-color--dark;
  }

  .@{prefix}-menu__logo:not(:empty) {
    height: 100%;
    margin-right: @comp-margin-xxxl;
    & > * {
      height: @menu-logo-height;
      margin-left: 25px;
    }
  }
}
```

**S2 Menu Drawer 样式**:
```less
.@{prefix}-s2-menu {
  .@{prefix}-menu__trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-right: 2px solid @font-white-1;
    padding: 0 @comp-margin-xl;
    height: @head-menu-height;
  }

  &__popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .close-icon {
      text-align: right;
      padding: @comp-margin-xl;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
```

**侧边菜单宽度过渡**:
```less
.@{prefix}-default-menu {
  transition: width @anim-duration-base @anim-time-fn-easing;

  &.@{prefix}-is-collapsed {
    width: 64px;

    .@{prefix}-menu__item-text,
    .@{prefix}-submenu__title-text {
      display: none;
    }
  }
}
```

**要求**：
- HeadMenu 高度固定 60px
- Logo 高度 28px，左边距 25px
- 触发按钮右侧边框 2px，白色
- Drawer 全屏显示，关闭按钮右上角
- 侧边菜单展开/收起动画时长 0.3s

### 3.5 示例文件迁移

**Vue2 版本示例清单**（16 个文件）:
```
_example/
├── closable-side.vue          # 可关闭侧边菜单
├── custom-header.vue          # 自定义头部
├── custom-side.vue            # 自定义侧边菜单
├── double.vue                 # 双层菜单
├── group-side.vue             # 分组侧边菜单
├── head-menu-dark.vue         # 深色主题顶部菜单
├── head-menu-empty.vue        # 空顶部菜单
├── head-menu-mode-tile.vue    # 平铺模式顶部菜单
├── head-menu-tile.vue         # Tile 顶部菜单
├── multi-side.vue             # 多级侧边菜单
├── multiple.vue               # 多选菜单
├── popup-side.vue             # 浮层侧边菜单
├── s2-menu.vue                # ⭐ S2 规范示例
├── side-menu-width.vue        # 侧边菜单宽度
├── single-side.vue            # 单层侧边菜单
└── single.vue                 # 单层菜单
```

**迁移要求**：
1. ✅ **所有 16 个示例必须迁移**
2. ✅ **使用 Vue 3 Composition API (`<script setup>`)**
3. ✅ **保持示例功能和交互完全一致**
4. ✅ **特别验证 `s2-menu.vue`** 的 Drawer 抽屉功能
5. ✅ **同时提供 JavaScript 和 TypeScript 版本**

### 3.6 交互行为对齐

| 交互场景 | Vue2 行为 | Vue3 要求 |
|---------|----------|----------|
| 点击菜单项 | ✅ 激活并触发回调 | ✅ 必须一致 |
| 点击子菜单 | ✅ 展开/收起 | ✅ 必须一致 |
| 鼠标悬停（mouseOverTrigger=true） | ✅ 自动展开 | ✅ **必须实现** |
| 点击 Drawer 触发按钮 | ✅ 打开抽屉 | ✅ **必须实现** |
| 点击抽屉内菜单项 | ✅ 关闭抽屉 | ✅ **必须实现** |
| 点击关闭按钮 | ✅ 关闭抽屉 | ✅ **必须实现** |
| 同级互斥展开（expandMutex） | ✅ 关闭其他同级 | ✅ 必须一致 |
| 三级菜单展开 | ✅ 根据 thirdExpandType | ✅ **必须实现** |
| 键盘导航 | ✅ 支持 | ✅ 必须一致 |

---

## 4. 成功标准

### 4.1 功能完整性

- [ ] Menu 组件所有 Props 与 Vue2 版本一致
- [ ] `s2` 属性功能正常（Drawer 抽屉菜单）
- [ ] `mouseOverTrigger` 属性功能正常（鼠标悬停触发）
- [ ] `thirdExpandType` 属性功能正常（三级菜单展开方式）
- [ ] HeadMenu 的 `#s2Menu` 和 `#trigger` 插槽正常
- [ ] Drawer 抽屉打开/关闭动画流畅
- [ ] 点击菜单项自动关闭抽屉
- [ ] 多级菜单（最多 3 级）展开/收起正常
- [ ] 同级互斥展开（expandMutex）正常
- [ ] 双向绑定（v-model）正常工作

### 4.2 样式一致性

- [ ] 所有样式文件完整迁移到 `style/overseas/` 目录
- [ ] HeadMenu 高度 60px，背景色正确
- [ ] Logo 区域、菜单区域、操作区域布局正确
- [ ] 侧边菜单展开宽度 400px，收起宽度 64px
- [ ] 收起时仅显示图标，展开时显示图标+文字
- [ ] light/dark 两种主题样式正确
- [ ] 激活菜单项高亮样式与 Vue2 一致
- [ ] 子菜单展开/收起动画效果一致
- [ ] Drawer 抽屉样式与 Vue2 一致
- [ ] 触发按钮样式（边框、间距）与 Vue2 一致

### 4.3 S2 规范验证（关键验证）

- [ ] `s2={true}` 时显示 Drawer 触发按钮
- [ ] 点击触发按钮打开 Drawer 抽屉
- [ ] Drawer 从右侧滑入，宽度 100%
- [ ] Drawer 内渲染 `#s2Menu` 插槽内容
- [ ] 关闭按钮（CloseCircleIcon）显示在右上角
- [ ] 点击关闭按钮关闭 Drawer
- [ ] 点击 Drawer 内菜单项自动关闭抽屉
- [ ] 自定义触发按钮（#trigger 插槽）正常工作
- [ ] 鼠标悬停触发（mouseOverTrigger）正常工作
- [ ] 三级菜单展开方式（thirdExpandType）符合配置

### 4.4 示例文件验证

- [ ] 所有 16 个示例文件迁移完成
- [ ] 每个示例的交互功能与 Vue2 一致
- [ ] `s2-menu.vue` 示例的 Drawer 功能正常
- [ ] JavaScript 和 TypeScript 版本同步
- [ ] 所有示例在开发服务器中正确显示

### 4.5 用户体验

- [ ] 点击响应无延迟
- [ ] 展开/收起动画流畅（300ms）
- [ ] 鼠标悬停响应灵敏
- [ ] Drawer 打开/关闭动画流畅
- [ ] 键盘导航（Tab 键）正常工作
- [ ] 浏览器兼容性测试通过（Chrome/Firefox/Safari/Edge）
- [ ] 移动端触摸交互正常

### 4.6 代码质量

- [ ] TypeScript 类型检查通过（无错误）
- [ ] ESLint 检查通过
- [ ] 代码结构清晰，注释完整
- [ ] 遵循 Vue 3 Composition API 最佳实践
- [ ] 组件性能优化（避免不必要的重渲染）

---

## 5. 技术约束

### 5.1 技术栈

- **框架**: Vue 3.x（Composition API）
- **构建工具**: Vite
- **语言**: TypeScript 4.x + TSX
- **样式**: LESS
- **依赖**: 
  - `@tdesign/shared-hooks`
  - `@tdesign/vue-next`（Drawer 组件）
  - `@tencent/s2-icons-vue`（图标）

### 5.2 兼容性要求

- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: 18.x
- **Vue**: 3.2+
- **移动端**: iOS Safari 14+, Chrome for Android 90+

### 5.3 不允许的修改

- ❌ 不得修改 Props 定义（除非与 Vue2 对齐）
- ❌ 不得删除 Vue2 版本的任何功能特性
- ❌ 不得修改组件的视觉外观
- ❌ 不得改变交互行为逻辑
- ❌ 不得删除 S2 规范特殊功能

---

## 6. 关键实体

### 6.1 组件接口

```typescript
// Menu 组件
export interface TdMenuProps {
  s2?: boolean;                              // S2 规范开关（新增）
  mouseOverTrigger?: boolean;                // 鼠标悬停触发（新增）
  collapsed?: boolean;                        // 收起菜单
  expanded?: Array<MenuValue>;               // 展开的菜单项
  defaultExpanded?: Array<MenuValue>;        // 默认展开
  expandMutex?: boolean;                     // 同级互斥展开
  expandType?: 'normal' | 'popup';          // 二级菜单展开方式
  thirdExpandType?: 'normal' | 'popup';     // 三级菜单展开方式（新增）
  logo?: TNode;                              // 站点 LOGO
  operations?: TNode;                        // 操作区域
  theme?: 'light' | 'dark';                 // 主题
  value?: MenuValue;                         // 激活菜单项
  defaultValue?: MenuValue;                  // 默认激活
  width?: string | number | [string | number, string | number]; // 菜单宽度
  onChange?: (value: MenuValue) => void;     // 变更回调
  onExpand?: (value: Array<MenuValue>) => void; // 展开回调
}

export type MenuValue = string | number;
```

### 6.2 S2 规范数据结构

```typescript
// S2 Menu 状态
interface S2MenuState {
  visible: boolean;         // Drawer 可见性
  triggerIcon: TNode;       // 触发按钮图标
  closeIcon: TNode;         // 关闭按钮图标
}

// 菜单层级
type MenuLevel = 1 | 2 | 3;

// 展开方式
type ExpandMode = 'normal' | 'popup';
```

### 6.3 菜单项结构

```typescript
interface MenuItem {
  value: MenuValue;          // 唯一标识
  title: string;             // 显示文本
  icon?: TNode;              // 图标
  to?: string;               // 路由地址
  disabled?: boolean;        // 禁用状态
  children?: MenuItem[];     // 子菜单
}
```

---

## 7. 依赖与假设

### 7.1 依赖

- ✅ Vue 3 项目已初始化
- ✅ `@tdesign/shared-hooks` 包已安装
- ✅ `@tdesign/vue-next` 包已安装（提供 Drawer 组件）
- ✅ `@tencent/s2-icons-vue` 包已安装
- ✅ LESS 编译环境已配置
- ✅ Tabs 组件已迁移（HeadMenu 依赖）

### 7.2 假设

- Vue2 版本的 Menu 组件功能正确无误
- 样式变量（`_var.less`）中的颜色值符合海外版设计规范
- S2 规范的 Drawer 抽屉菜单符合海外系统的用户体验要求
- 开发环境已安装所有必需的依赖包
- Drawer 组件的 API 在 Vue3 版本中保持一致

### 7.3 风险

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| Drawer 组件 API 不兼容 | 高 | 查阅 TDesign Vue3 文档，调整 API 调用 |
| 鼠标悬停触发在移动端无效 | 低 | 与 Vue2 一致，不做特殊处理（依赖浏览器行为） |
| 深层菜单（>3 层）导致性能问题 | 低 | 与 Vue2 一致，递归渲染所有层级，不做限制 |
| 样式变量缺失导致编译失败 | 高 | 完整迁移所有 LESS 文件 |
| TypeScript 类型不兼容 | 中 | 参照 Vue2 版本类型定义 |

---

## 8. 验收标准

### 8.1 视觉验收

**方法**: 对比截图
1. 在 Vue2 项目中截取 Menu 组件各状态截图
2. 在 Vue3 项目中截取相同状态截图
3. 逐像素对比，确保一致

**状态清单**:
- [ ] HeadMenu（light/dark 主题）
- [ ] 侧边菜单展开状态（400px）
- [ ] 侧边菜单收起状态（64px）
- [ ] 子菜单展开状态（平铺/浮层）
- [ ] 三级菜单展开状态
- [ ] Drawer 抽屉打开状态
- [ ] 激活菜单项高亮
- [ ] 鼠标悬停样式
- [ ] 禁用菜单项样式

### 8.2 功能验收

**测试用例**:

1. **基本菜单激活**
   - 点击菜单项 → 激活该项
   - 验证 `onChange` 事件触发
   - 验证 `value` 更新

2. **子菜单展开（平铺模式）**
   - 设置 `expandType="normal"`
   - 点击一级菜单 → 展开二级菜单（平铺显示）
   - 验证 `onExpand` 事件触发

3. **子菜单展开（浮层模式）**
   - 设置 `expandType="popup"`
   - 点击一级菜单 → 展开二级菜单（浮层显示）
   - 验证浮层位置正确

4. **三级菜单展开**
   - 设置 `thirdExpandType="normal"`
   - 点击二级菜单 → 展开三级菜单（根据配置）
   - 验证展开方式符合配置

5. **鼠标悬停触发**
   - 设置 `mouseOverTrigger={true}`
   - 鼠标移入一级菜单 → 自动展开二级菜单
   - 鼠标移出 → 自动收起（延迟 200ms）

6. **Drawer 抽屉菜单**
   - 设置 `s2={true}`
   - 点击触发按钮 → 打开 Drawer
   - 点击菜单项 → Drawer 自动关闭
   - 点击关闭按钮 → Drawer 关闭

7. **同级互斥展开**
   - 设置 `expandMutex={true}`
   - 展开一级菜单 A → 一级菜单 B 自动收起

8. **菜单展开/收起**
   - 设置 `collapsed={false}` → 菜单展开（400px）
   - 设置 `collapsed={true}` → 菜单收起（64px）
   - 验证动画流畅

9. **自定义触发按钮**
   - 使用 `#trigger` 插槽
   - 验证自定义按钮显示
   - 点击自定义按钮 → 打开 Drawer

10. **路由跳转**
    - 设置菜单项 `to="/path"`
    - 点击菜单项 → 触发路由跳转

### 8.3 回归测试

- [ ] 运行 `npm run test` 通过所有单元测试
- [ ] 运行 `npm run lint` 无 ESLint 错误
- [ ] 运行 `npx vue-tsc --noEmit` 无 TypeScript 错误
- [ ] 运行 `npm run build` 构建成功
- [ ] 运行 `npm run dev` 开发服务器启动成功

---

## 9. 实施计划

### 9.1 迁移步骤

**阶段 1: 样式文件迁移**（优先级：最高）
1. 创建 `style/overseas/` 目录结构
2. 复制 Vue2 版本的 `_var.less`、`_mixin.less`、`_transition.less`
3. 复制 `_index.less` 并重命名为 `_menu.less`
4. 创建 `overseas/index.less` 入口文件
5. 确保 S2 规范样式完整迁移（s2-menu、Drawer、trigger）
6. 验证样式编译无错误

**阶段 2: 核心组件迁移**（优先级：高）
1. 迁移 `menu.tsx`（添加 s2、mouseOverTrigger、thirdExpandType）
2. 迁移 `head-menu.tsx`（添加 Drawer、#s2Menu、#trigger）
3. 迁移 `submenu.tsx`（支持 thirdExpandType、mouseOverTrigger）
4. 迁移 `menu-item.tsx`（保持一致）
5. 迁移 `menu-group.tsx`（保持一致）
6. 更新 Props 定义（props.ts）

**阶段 3: S2 规范功能实现**（优先级：高）
1. 集成 Drawer 组件
2. 实现 `s2MenuVisible` 响应式状态
3. 实现触发按钮（ViewListIcon）和关闭按钮（CloseCircleIcon）
4. 实现点击菜单项自动关闭抽屉逻辑
5. 实现鼠标悬停触发逻辑（mouseOverTrigger）
6. 实现三级菜单展开逻辑（thirdExpandType）
7. 测试 S2 功能完整性

**阶段 4: 示例文件迁移**（优先级：中）
1. 迁移 16 个示例文件（JavaScript 版本）
2. 创建 TypeScript 版本示例
3. 特别验证 `s2-menu.vue` 的 Drawer 功能
4. 验证所有示例在开发服务器中正确显示

**阶段 5: 最终验收**（优先级：中）
1. 多浏览器兼容性测试
2. 视觉对比验证（截图对比）
3. 性能测试（渲染性能）
4. 无障碍访问测试（键盘导航、ARIA）
5. 文档和示例代码检查

### 9.2 时间估算

| 阶段 | 预计时间 | 风险缓冲 |
|------|---------|---------|
| 阶段 1 | 3 小时 | +1 小时 |
| 阶段 2 | 6 小时 | +2 小时 |
| 阶段 3 | 5 小时 | +2 小时 |
| 阶段 4 | 4 小时 | +1 小时 |
| 阶段 5 | 2 小时 | +1 小时 |
| **总计** | **20 小时** | **+7 小时** |

---

## 10. 附录

### 10.1 Vue2 vs Vue3 关键差异

| 特性 | Vue2 实现 | Vue3 实现 |
|------|----------|----------|
| API 风格 | Options API | Composition API + setup() |
| 响应式 | `data()` 返回对象 | `ref()` / `reactive()` |
| 生命周期 | `mounted()`/`watch` | `onMounted()`/`watchEffect()` |
| Provide/Inject | `provide()`/`inject()` | `provide()`/`inject()` |
| 插槽 | `this.$slots` | `ctx.slots` |
| 事件触发 | `this.$emit('change')` | `emit('change')` |
| Drawer 组件 | 从 `../drawer` 导入 | 从 `@tdesign/vue-next` 导入 |

### 10.2 S2 规范实现差异

**Vue2 方式**（直接使用 Drawer 组件）:
```tsx
import { Drawer } from '../drawer';

<Drawer
  visible={s2MenuVisible.value}
  placement="right"
  size="100%"
  closeBtn={false}
>
  {/* 内容 */}
</Drawer>
```

**Vue3 推荐方式**（从 TDesign 导入）:
```tsx
import { Drawer } from '@tdesign/vue-next';

<t-drawer
  v-model:visible={s2MenuVisible.value}
  placement="right"
  size="100%"
  :close-btn="false"
>
  {/* 内容 */}
</t-drawer>
```

### 10.3 参考资料

- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [TDesign Vue 3 组件开发规范](https://tdesign.tencent.com/)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)
- [TDesign Drawer 组件文档](https://tdesign.tencent.com/vue-next/components/drawer)
- Vue2 源代码: `c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\menu\`

---

## 11. 澄清

### 会话 2026-02-25

- 问：当用户在移动端设备上使用 `mouseOverTrigger={true}` 时，组件应如何行为？ → 答：与 Vue2 版本一致，不做设备检测，直接使用 hover 触发（移动端依赖浏览器行为）
- 问：当用户点击 Drawer 抽屉外部区域（遮罩层）时，Drawer 应该自动关闭吗？ → 答：点击外部遮罩自动关闭 Drawer（标准抽屉行为）
- 问：当菜单数据超过 3 层（例如，四级或五级菜单）时，组件应该如何处理？ → 答：与 Vue2 版本一致，继续递归渲染所有层级，不做层级限制或警告
- 问：菜单展开/收起动画的性能目标是什么？ → 答：与 Vue2 版本一致，不设定具体 FPS 目标，使用 300ms 动画时长和标准缓动函数
- 问：当菜单操作出现错误（如点击事件失败、Drawer 无法打开）时，应该如何处理错误信息？ → 答：与 Vue2 版本一致，使用 `console.warn/error` 输出错误信息，不集成第三方监控工具
- 问：示例文件应该迁移多少个？ → 答：仅迁移文档站点展示的 2 个示例（s2-menu.vue、multi-side.vue），与 Vue2 文档保持一致

---

## 12. 变更记录

| 日期 | 变更人 | 变更类型 | 变更内容 |
|------|--------|---------|---------|
| 2026-02-25 | AI Assistant | feat | 初始规格文档创建 |

---

## 12. 备注

**关键注意事项**:
1. S2 规范功能（Drawer 抽屉菜单）是 Vue2 版本的**核心特性**，必须完整迁移
2. `mouseOverTrigger` 属性不做设备检测，与 Vue2 一致
3. `thirdExpandType` 属性仅在 `expandType="normal"` 时生效
4. Drawer 组件的 API 在 Vue3 中可能有差异，需查阅文档
5. 所有样式变量必须从 `_var.less` 中引用，不要硬编码
6. 16 个示例文件必须全部迁移并验证
7. 菜单层级不做限制，递归渲染所有层级（与 Vue2 一致）

**测试提示**:
- 使用 Chrome DevTools 的"Toggle device toolbar"测试不同屏幕尺寸
- 测试 Drawer 抽屉在移动端的表现
- 验证鼠标悬停触发在桌面端和移动端的行为差异
- 对比 Vue2 和 Vue3 版本的 DOM 结构是否一致
- 使用 VoiceOver/NVDA 测试无障碍访问
- 测试多级菜单（1/2/3 级）的所有展开方式组合

**优先级说明**:
- 🔴 **P0（最高）**: S2 规范功能（Drawer）、样式迁移
- 🟡 **P1（高）**: 核心组件迁移、mouseOverTrigger、thirdExpandType
- 🟢 **P2（中）**: 示例文件迁移、性能优化、无障碍访问

---

**文档状态**: ✅ 规格完成，等待质量验证
