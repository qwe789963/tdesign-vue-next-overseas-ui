# 快速开始：Menu 组件 Vue3 迁移

**功能编号**: 006  
**创建日期**: 2026-02-25  
**目标读者**: 开发人员

---

## 1. 前提条件

### 1.1 环境要求

- ✅ **Node.js**: 18.x
- ✅ **Vue**: 3.2+
- ✅ **pnpm**: 8.x

### 1.2 依赖包

确保已安装以下依赖:

```bash
# 检查依赖
pnpm list @tdesign/vue-next
pnpm list @tencent/s2-icons-vue
pnpm list @tdesign/shared-hooks
```

---

## 2. 项目结构概览

```
packages/components/menu/
├── menu.tsx                  # Menu 主组件
├── head-menu.tsx             # HeadMenu 顶部导航
├── submenu.tsx               # Submenu 子菜单
├── menu-item.tsx             # MenuItem 菜单项
├── menu-group.tsx            # MenuGroup 菜单分组
├── props.ts                  # Props 定义
├── type.ts                   # 类型定义
├── style/                    # 样式文件
│   ├── css.js
│   ├── index.js
│   └── overseas/             # 海外版样式（需创建）
│       ├── index.less
│       ├── _menu.less
│       ├── _var.less
│       ├── _mixin.less
│       └── _transition.less
└── _example/                 # 示例文件
    ├── s2-menu.vue           # S2 规范示例（文档展示）
    └── multi-side.vue        # 侧边导航示例（文档展示）
```

---

## 3. 快速迁移步骤

### 阶段 0: 准备工作 (15 分钟)

#### 步骤 1: 创建样式目录

```bash
cd packages/components/menu/style
mkdir overseas
cd overseas
```

#### 步骤 2: 复制 Vue2 样式文件

```bash
# 从 Vue2 项目复制样式文件
$VUE2_PATH = "c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\menu\style"
$VUE3_PATH = "c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui\packages\components\menu\style\overseas"

# 复制变量文件
Copy-Item "$VUE2_PATH\_var.less" "$VUE3_PATH\_var.less"

# 复制 Mixin 文件
Copy-Item "$VUE2_PATH\_mixin.less" "$VUE3_PATH\_mixin.less"

# 复制过渡动画文件
Copy-Item "$VUE2_PATH\_transition.less" "$VUE3_PATH\_transition.less"

# 复制主样式文件（重命名）
Copy-Item "$VUE2_PATH\_index.less" "$VUE3_PATH\_menu.less"
```

#### 步骤 3: 创建样式入口文件

```less
// overseas/index.less
@import './_var.less';
@import './_mixin.less';
@import './_transition.less';
@import './_menu.less';
```

---

### 阶段 1: 核心组件迁移 (4 小时)

#### 步骤 4: 更新 Props 定义

**文件**: `packages/components/menu/props.ts`

```typescript
// 添加新的 Props
export const menuProps = {
  // 新增: S2 规范开关
  s2: {
    type: Boolean,
    default: true,
  },
  
  // 新增: 鼠标悬停触发
  mouseOverTrigger: {
    type: Boolean,
    default: false,
  },
  
  // 新增: 三级菜单展开方式
  thirdExpandType: {
    type: String as PropType<'normal' | 'popup'>,
    default: 'popup',
    validator: (value: string) => ['normal', 'popup'].includes(value),
  },
  
  // ... 其他已存在的 Props
};
```

#### 步骤 5: 迁移 Menu 组件

**文件**: `packages/components/menu/menu.tsx`

**关键变更**:
1. 添加 `thirdMode` 状态
2. 在 provide 中传递 `thirdMode` 和 `mouseOverTrigger`

```typescript
import { ref, computed, provide } from 'vue';

export default defineComponent({
  props: menuProps,
  
  setup(props) {
    const thirdMode = ref(props.thirdExpandType || 'popup');
    const mouseOverTrigger = ref(props.mouseOverTrigger || false);
    
    // Provide 给子组件
    provide<TdMenuInterface>('TdMenu', {
      mode,
      thirdMode,
      mouseOverTrigger,
      // ... 其他 provide 数据
    });
    
    return {
      // ...
    };
  },
});
```

#### 步骤 6: 迁移 HeadMenu 组件

**文件**: `packages/components/menu/head-menu.tsx`

**关键变更**:
1. 集成 Drawer 组件
2. 添加 S2 Menu 状态管理
3. 实现 #s2Menu 和 #trigger 插槽

```typescript
import { Drawer } from '@tdesign/vue-next';
import { ViewListIcon, CloseCircleIcon } from '@tencent/s2-icons-vue';

export default defineComponent({
  props: menuProps,
  
  setup(props, { slots }) {
    // S2 Drawer 状态
    const s2MenuVisible = ref(false);
    
    const openDrawer = () => {
      s2MenuVisible.value = true;
    };
    
    const closeDrawer = () => {
      s2MenuVisible.value = false;
    };
    
    // 渲染 S2 Drawer
    const renderS2Menu = () => {
      if (!props.s2) return null;
      
      return (
        <>
          <t-drawer
            v-model:visible={s2MenuVisible.value}
            placement="right"
            size="100%"
            close-btn={false}
            close-on-overlay-click={true}
          >
            <div class={s2InnerClasses.value}>
              <div class="close-icon" onClick={closeDrawer}>
                <CloseCircleIcon />
              </div>
              {slots.s2Menu?.()}
            </div>
          </t-drawer>
          
          <div class={`${classPrefix.value}-menu__trigger`} onClick={openDrawer}>
            {slots.trigger?.() || <ViewListIcon />}
          </div>
        </>
      );
    };
    
    return {
      s2MenuVisible,
      openDrawer,
      closeDrawer,
      renderS2Menu,
    };
  },
});
```

#### 步骤 7: 迁移 Submenu 组件

**文件**: `packages/components/menu/submenu.tsx`

**关键变更**:
1. 支持 `thirdExpandType`
2. 支持 `mouseOverTrigger`

```typescript
export default defineComponent({
  setup(props) {
    const { mode, thirdMode, mouseOverTrigger } = inject<TdMenuInterface>('TdMenu');
    
    // 根据层级决定展开方式
    const isPopup = computed(() => {
      if (level === 1) return mode.value === 'popup';
      if (level === 2) return thirdMode.value === 'popup';
      return true; // 三级以上始终 popup
    });
    
    // 动态设置 Popup trigger
    const popupProps = computed(() => ({
      trigger: mouseOverTrigger.value ? 'hover' : 'click',
      placement: 'right-top',
      hideEmptyPopup: true,
    }));
    
    return {
      isPopup,
      popupProps,
    };
  },
});
```

---

### 阶段 2: 示例文件迁移（仅 2 个，0.5 小时）

#### 步骤 8: 迁移 S2 规范示例

**文件**: `packages/components/menu/_example/s2-menu.vue`

```vue
<template>
  <t-head-menu :s2="true" :theme="theme">
    <template #logo>
      <img src="logo.png" alt="Logo" />
    </template>
    
    <template #s2Menu>
      <t-menu expand-mutex>
        <t-submenu title="Home" value="home" :icon="() => h(HomeIcon)">
          <t-menu-item value="dashboard">Dashboard</t-menu-item>
          <t-menu-item value="profile">Profile</t-menu-item>
        </t-submenu>
        
        <t-submenu title="Settings" value="settings" :icon="() => h(SettingsIcon)">
          <t-menu-item value="account">Account</t-menu-item>
          <t-menu-item value="security">Security</t-menu-item>
        </t-submenu>
      </t-menu>
    </template>
    
    <template #operations>
      <span>User: Admin</span>
    </template>
  </t-head-menu>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { HomeIcon, SettingsIcon } from '@tencent/s2-icons-vue';

const theme = ref<'light' | 'dark'>('light');
</script>
```

#### 步骤 9: 迁移文档展示的 2 个示例

**注意**: 虽然 Vue2 代码仓库有 16 个示例文件，但**文档站点只展示 2 个示例**：
1. **S2 导航栏** (`s2-menu.vue`)
2. **侧边导航 - 平铺式** (`multi-side.vue`)

为了与 Vue2 文档保持一致，Vue3 版本也只迁移这 2 个示例。

```bash
# 复制文档展示的 2 个示例文件
$VUE2_EXAMPLES = "c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\menu\_example"
$VUE3_EXAMPLES = "c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui\packages\components\menu\_example"

# 复制 s2-menu.vue
Copy-Item "$VUE2_EXAMPLES\s2-menu.vue" "$VUE3_EXAMPLES\s2-menu.vue"

# 复制 multi-side.vue
Copy-Item "$VUE2_EXAMPLES\multi-side.vue" "$VUE3_EXAMPLES\multi-side.vue"
```

**手动更新每个示例**:
1. 将 Options API 改为 Composition API (`<script setup>`)
2. 更新图标导入路径: `@tencent/s2-icons-vue`
3. 更新组件导入路径 (如需)

---

### 阶段 3: 更新文档 (0.5 小时)

#### 步骤 10: 创建 menu.md 文档

创建文档文件，仅展示 2 个示例：

```markdown
---
title: Menu 导航菜单
description: 用于承载网站的架构，并提供跳转的菜单列表。
isComponent: true
spline: navigation
---

### S2 导航栏
{{ s2-menu }}

### 侧边导航

#### 平铺式侧边导航

将 `s2` 设置为 `false`， 可以显示侧边导航。侧边导航可承载1-3级页面导航，并平铺展示。适用于层级较深的网站。可通过 `thirdExpandType` 设置三级导航展开方式，默认为 `popup`。

{{ multi-side }}

## API
[...]
```

**验收标准**:
- ✅ 文档只展示 2 个示例（与 Vue2 一致）
- ✅ 文档站点构建成功
- ✅ 示例在文档站点中正常显示

---

### 阶段 4: 验证与测试 (1 小时)

#### 步骤 11: 编译验证

```bash
# 回到项目根目录
cd c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui

# TypeScript 类型检查
npx vue-tsc --noEmit

# ESLint 检查
pnpm run lint

# 构建验证
pnpm run build
```

#### 步骤 12: 启动开发服务器

```bash
pnpm run dev
```

访问: `http://localhost:3000`

**验证清单**:
- [ ] HeadMenu 显示正常
- [ ] 点击 S2 触发按钮打开 Drawer
- [ ] Drawer 内菜单渲染正常
- [ ] 点击菜单项关闭 Drawer
- [ ] 侧边菜单展开/收起动画流畅
- [ ] 鼠标悬停触发正常 (mouseOverTrigger=true)
- [ ] 三级菜单展开方式符合配置

#### 步骤 13: 运行单元测试

```bash
pnpm run test
```

---

## 4. 常见问题排查

### 问题 1: Drawer 组件导入失败

**错误信息**:
```
Module not found: Error: Can't resolve '@tdesign/vue-next/drawer'
```

**解决方案**:
```typescript
// ✗ 错误
import { Drawer } from '@tdesign/vue-next/drawer';

// ✓ 正确
import { Drawer } from '@tdesign/vue-next';
```

---

### 问题 2: 样式变量未定义

**错误信息**:
```
Variable @menu-theme-primary is undefined
```

**解决方案**:
1. 确认已复制 `_var.less` 文件
2. 检查 `overseas/index.less` 中是否导入了变量文件:
   ```less
   @import './_var.less';
   ```

---

### 问题 3: TypeScript 类型错误

**错误信息**:
```
Property 's2' does not exist on type 'TdMenuProps'
```

**解决方案**:
1. 确认 `props.ts` 中已添加 `s2` 属性定义
2. 确认 `type.ts` 中已导出 `TdMenuProps` 类型
3. 运行 `npx vue-tsc --noEmit` 查看详细错误

---

### 问题 4: S2 Drawer 无法关闭

**症状**: 点击菜单项后 Drawer 不关闭

**解决方案**:
在 MenuItem 组件的 `handleClick` 中添加关闭逻辑:
```typescript
const handleClick = () => {
  const { select, s2MenuVisible } = inject<TdMenuInterface>('TdMenu');
  select(props.value);
  
  // 关闭 S2 Drawer
  if (s2MenuVisible) {
    s2MenuVisible.value = false;
  }
};
```

---

## 5. 性能优化建议

### 5.1 避免不必要的重渲染

```typescript
// 使用 computed 缓存计算结果
const isActive = computed(() => {
  return activeValue.value === props.value;
});

// 使用 shallowRef 避免深层响应式
const menuItems = shallowRef<MenuItem[]>([]);
```

---

### 5.2 大数据量菜单优化

```typescript
// 使用虚拟滚动
import { VirtualList } from '@tdesign/vue-next';

<VirtualList
  data={menuItems.value}
  height={500}
  itemHeight={40}
>
  {(item) => <t-menu-item value={item.value}>{item.title}</t-menu-item>}
</VirtualList>
```

---

## 6. 时间估算

**总时间**: 约 **6.5 小时**（不含缓冲时间）

| 阶段 | 内容 | 预计时间 |
|------|------|---------|
| 阶段 0 | 准备工作 | 15 分钟 |
| 阶段 1 | 核心组件迁移 | 4 小时 |
| 阶段 2 | 示例文件迁移（仅 2 个） | 0.5 小时 |
| 阶段 3 | 更新文档 | 0.5 小时 |
| 阶段 4 | 验证与测试 | 1 小时 |

---

## 7. 下一步行动

### 6.1 完成迁移后

- [ ] 更新文档（API 说明、示例代码）
- [ ] 编写单元测试（覆盖率 > 80%）
- [ ] 编写集成测试（Playwright）
- [ ] 视觉回归测试（截图对比）
- [ ] 性能测试（Lighthouse）

---

### 6.2 发布前检查

- [ ] 所有示例文件正常运行
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查通过
- [ ] 单元测试通过
- [ ] 构建成功
- [ ] 文档完整
- [ ] 变更日志更新

---

## 7. 参考资源

### 7.1 文档链接

- [功能规格](../spec.md)
- [数据模型](./data-model.md)
- [API 契约](../contracts/api-contract.md)
- [研究文档](./research.md)

---

### 7.2 源代码参考

- **Vue2 源代码**: `c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\menu\`
- **Vue3 目标目录**: `c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui\packages\components\menu\`

---

### 7.3 相关工具

- [Vue 3 Migration Build](https://v3-migration.vuejs.org/migration-build.html)
- [TDesign Vue 3 文档](https://tdesign.tencent.com/vue-next/overview)
- [Vitest 测试框架](https://vitest.dev/)

---

**快速开始指南状态**: ✅ 完成  
**最后更新**: 2026-02-25
