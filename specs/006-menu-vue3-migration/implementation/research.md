# 研究与技术决策：Menu Vue3 迁移

**功能编号**: 006  
**创建日期**: 2026-02-25  
**状态**: 研究完成

---

## 1. 研究概述

本文档记录了 Menu 组件从 Vue2 迁移到 Vue3 过程中的关键技术决策、研究发现和替代方案评估。

---

## 2. 技术选型决策

### 2.1 Drawer 组件集成方案

**决策**: 使用 `@tdesign/vue-next` 包中的 Drawer 组件

**理由**:
1. **官方支持**: TDesign Vue3 官方提供完整的 Drawer 组件
2. **API 一致性**: Vue3 版本 API 与 Vue2 基本一致,迁移成本低
3. **维护性**: 由 TDesign 团队维护,长期稳定可靠
4. **样式统一**: 与其他 TDesign 组件风格一致

**考虑的替代方案**:
- ❌ **自行实现 Drawer**: 开发成本高,需要处理动画、无障碍访问、边界情况
- ❌ **第三方 Drawer 库**: 样式风格不一致,需要额外的样式覆盖

**API 对比**:
```typescript
// Vue2 版本 (内部 Drawer)
<Drawer
  visible={s2MenuVisible.value}
  placement="right"
  size="100%"
  closeBtn={false}
/>

// Vue3 版本 (TDesign Drawer)
<t-drawer
  v-model:visible={s2MenuVisible.value}
  placement="right"
  size="100%"
  :close-btn="false"
  :close-on-overlay-click="true"
/>
```

**关键差异**:
- Vue3 使用 `v-model:visible` 双向绑定
- 新增 `close-on-overlay-click` 属性（默认 true）
- 属性命名风格统一为 kebab-case

---

### 2.2 响应式状态管理方案

**决策**: 使用 Vue 3 Composition API (`ref` + `computed`)

**理由**:
1. **Vue 3 推荐**: Composition API 是 Vue 3 的核心特性
2. **类型安全**: 与 TypeScript 集成更好
3. **代码复用**: 更容易抽象逻辑到 composables
4. **性能优化**: 更细粒度的响应式追踪

**实现模式**:
```typescript
// Vue2 方式 (data + computed)
export default {
  data() {
    return {
      s2MenuVisible: false,
    };
  },
  computed: {
    s2MenuClass() {
      return [`${this.classPrefix}-s2-menu`];
    },
  },
};

// Vue3 方式 (ref + computed)
import { ref, computed } from 'vue';

export default {
  setup(props) {
    const s2MenuVisible = ref(false);
    const s2MenuClass = computed(() => [`${classPrefix.value}-s2-menu`]);
    
    return {
      s2MenuVisible,
      s2MenuClass,
    };
  },
};
```

**考虑的替代方案**:
- ❌ **Options API**: Vue 3 仍支持,但不是推荐方式
- ❌ **Pinia/Vuex**: 组件内部状态无需全局状态管理

---

### 2.3 TSX vs SFC (Single File Component) 选择

**决策**: 继续使用 TSX 格式 (.tsx),保持与 Vue2 版本一致

**理由**:
1. **迁移成本最低**: Vue2 版本使用 TSX,直接迁移语法
2. **类型安全**: TSX 中 TypeScript 类型检查更强
3. **逻辑复杂**: Menu 组件有复杂的条件渲染,TSX 更灵活
4. **团队习惯**: 现有代码库已使用 TSX

**考虑的替代方案**:
- ❌ **SFC + `<script setup>`**: 需要重写所有模板,成本高
- ❌ **JSX (.jsx)**: 失去 TypeScript 类型安全

---

### 2.4 样式文件组织方案

**决策**: 创建独立的 `overseas/` 目录,保持与 TDesign 官方样式隔离

**理由**:
1. **命名空间隔离**: 避免与 TDesign 官方样式冲突
2. **可维护性**: 海外版特有样式集中管理
3. **可选加载**: 用户可选择是否加载海外版样式
4. **升级安全**: TDesign 升级不影响海外版样式

**目录结构**:
```
packages/components/menu/style/
├── css.js              # CSS 入口
├── index.js            # 样式入口
└── overseas/           # 海外版样式（新增）
    ├── index.less      # 入口文件
    ├── _menu.less      # 主样式
    ├── _var.less       # 变量
    ├── _mixin.less     # Mixin
    └── _transition.less # 过渡动画
```

**考虑的替代方案**:
- ❌ **直接修改 TDesign 官方样式**: 升级时冲突,维护困难
- ❌ **使用 CSS-in-JS**: 增加运行时开销,不符合 TDesign 规范

---

### 2.5 鼠标悬停触发 (mouseOverTrigger) 实现方案

**决策**: 使用 Popup 组件的 `trigger` 属性动态切换

**理由**:
1. **简单可靠**: Popup 组件原生支持 'hover' 和 'click' 触发
2. **与 Vue2 一致**: Vue2 版本也是使用此方法
3. **性能优化**: 无需手动绑定/解绑鼠标事件
4. **移动端兼容**: 浏览器自动处理触摸事件转换

**实现代码**:
```typescript
const popupProps = computed(() => ({
  trigger: props.mouseOverTrigger ? 'hover' : 'click',
  placement: 'right-top',
  hideEmptyPopup: true,
  overlayClassName: popupClass.value,
}));
```

**考虑的替代方案**:
- ❌ **手动监听 mouseenter/mouseleave**: 需要处理延迟、边界情况,复杂度高
- ❌ **使用 @vueuse/core 的 useHover**: 增加依赖,功能过度

---

### 2.6 三级菜单展开方式 (thirdExpandType) 实现方案

**决策**: 通过 `provide/inject` 传递 `thirdMode`,在 Submenu 组件中根据层级判断

**理由**:
1. **符合 Vue 模式**: provide/inject 是 Vue 推荐的跨层级通信方式
2. **与 Vue2 一致**: Vue2 版本使用此模式
3. **解耦合**: 子组件无需知道父组件结构
4. **性能**: 避免 props 逐层传递

**实现代码**:
```typescript
// menu.tsx (provide)
const thirdMode = ref(props.thirdExpandType || 'popup');

provide<TdMenuInterface>('TdMenu', {
  mode,
  thirdMode,
  activeValue,
  // ...
});

// submenu.tsx (inject)
const { mode, thirdMode } = inject<TdMenuInterface>('TdMenu');

const isPopup = computed(() => {
  if (level === 1) return mode.value === 'popup';
  if (level === 2) return thirdMode.value === 'popup';
  return true; // 三级以上始终 popup
});
```

**考虑的替代方案**:
- ❌ **Props 逐层传递**: 代码冗余,维护困难
- ❌ **全局状态管理**: 过度设计,组件耦合到外部状态

---

## 3. 技术风险与缓解措施

### 3.1 Drawer 组件 API 不兼容

**风险等级**: 🟡 中  
**概率**: 低  
**影响**: 高

**缓解措施**:
1. ✅ **查阅官方文档**: 已确认 TDesign Vue3 Drawer API 基本一致
2. ✅ **API 差异列表**:
   - `visible` → `v-model:visible`
   - `closeBtn` → `close-btn`
   - 新增 `close-on-overlay-click` (默认 true)
3. ✅ **测试覆盖**: 创建 Drawer 功能专项测试用例

---

### 3.2 鼠标悬停在移动端的行为差异

**风险等级**: 🟢 低  
**概率**: 中  
**影响**: 低

**缓解措施**:
1. ✅ **与 Vue2 保持一致**: 不做设备检测,依赖浏览器行为
2. ✅ **文档说明**: 在文档中说明移动端建议关闭 mouseOverTrigger
3. ✅ **最佳实践**: 提供响应式示例（桌面端 hover,移动端 click）

---

### 3.3 样式变量缺失导致编译失败

**风险等级**: 🟡 中  
**概率**: 低  
**影响**: 高

**缓解措施**:
1. ✅ **完整迁移**: 复制 Vue2 版本的所有 LESS 文件
2. ✅ **变量对照表**: 创建 Vue2 vs Vue3 样式变量对照表
3. ✅ **编译验证**: 每个阶段后运行 `npm run build` 验证

---

### 3.4 TypeScript 类型不兼容

**风险等级**: 🟡 中  
**概率**: 中  
**影响**: 中

**缓解措施**:
1. ✅ **类型定义复用**: 从 Vue2 版本复制 Props 类型定义
2. ✅ **类型检查**: 使用 `npx vue-tsc --noEmit` 持续验证
3. ✅ **TNode 类型**: 确认 Vue3 版本的 TNode 定义一致

---

## 4. 性能优化策略

### 4.1 动画性能

**目标**: 300ms 动画流畅,无卡顿

**优化措施**:
1. ✅ **使用 CSS transform**: 避免触发重排(reflow)
   ```less
   transition: width @anim-duration-base @anim-time-fn-easing;
   ```
2. ✅ **GPU 加速**: 使用 `transform: translateZ(0)` 触发硬件加速
3. ✅ **减少重绘**: 动画期间不修改影响布局的属性

### 4.2 大数据量菜单优化

**场景**: 100+ 菜单项

**优化措施**:
1. ✅ **虚拟滚动**: 对于超长菜单列表,考虑虚拟滚动
2. ✅ **懒加载**: 子菜单内容按需渲染
3. ✅ **节流/防抖**: 鼠标移动事件使用节流

---

## 5. 无障碍访问 (A11y) 策略

### 5.1 ARIA 标签

**要求**: 符合 WCAG 2.1 AA 级标准

**实现**:
```tsx
<div
  role="menuitem"
  aria-haspopup={hasChildren}
  aria-expanded={isExpanded}
  tabindex={disabled ? -1 : 0}
>
  {content}
</div>
```

### 5.2 键盘导航

**要求**: 所有功能可通过键盘访问

**实现**:
- ✅ Tab 键: 聚焦到菜单项
- ✅ Enter/Space: 激活菜单项
- ✅ 方向键: 在菜单项之间导航
- ✅ Esc 键: 关闭子菜单或 Drawer

---

## 6. 测试策略

### 6.1 单元测试

**工具**: Vitest + Vue Test Utils

**覆盖率目标**: > 80%

**关键测试用例**:
1. ✅ Props 变更触发正确渲染
2. ✅ 点击事件触发回调
3. ✅ mouseOverTrigger 切换 Popup trigger
4. ✅ Drawer 显示/隐藏状态管理
5. ✅ 多级菜单展开/收起逻辑

### 6.2 集成测试

**工具**: Playwright

**场景**:
1. ✅ HeadMenu + Drawer 完整流程
2. ✅ 侧边菜单展开/收起动画
3. ✅ 多级菜单交互
4. ✅ 键盘导航

### 6.3 视觉回归测试

**工具**: Percy / BackstopJS

**对比**:
- ✅ Vue2 vs Vue3 截图像素级对比
- ✅ 覆盖所有主题和状态

---

## 7. 迁移清单

### 7.1 代码迁移

- [x] menu.tsx (添加 s2, mouseOverTrigger, thirdExpandType)
- [x] head-menu.tsx (添加 Drawer, #s2Menu, #trigger)
- [x] submenu.tsx (支持 thirdExpandType, mouseOverTrigger)
- [x] menu-item.tsx (保持一致)
- [x] menu-group.tsx (保持一致)
- [x] props.ts (更新 Props 定义)

### 7.2 样式迁移

- [x] 创建 overseas/ 目录
- [x] 迁移 _var.less
- [x] 迁移 _mixin.less
- [x] 迁移 _transition.less
- [x] 迁移 _index.less → _menu.less
- [x] 创建 overseas/index.less

### 7.3 示例迁移

- [x] 2 个示例文件 (.vue，仅迁移文档展示的 s2-menu 和 multi-side)
- [x] JavaScript 版本
- [x] TypeScript 版本

---

## 8. 依赖关系图

```mermaid
graph TD
    A[Menu.tsx] --> B[HeadMenu.tsx]
    A --> C[Submenu.tsx]
    A --> D[MenuItem.tsx]
    A --> E[MenuGroup.tsx]
    
    B --> F[@tdesign/vue-next Drawer]
    C --> G[@tdesign/vue-next Popup]
    
    A --> H[style/overseas/index.less]
    H --> I[_var.less]
    H --> J[_mixin.less]
    H --> K[_transition.less]
    H --> L[_menu.less]
    
    B --> M[@tencent/s2-icons-vue]
    C --> M
    D --> M
```

---

## 9. 参考资料

### 9.1 官方文档
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [TDesign Vue 3 Drawer](https://tdesign.tencent.com/vue-next/components/drawer)
- [TDesign Vue 3 Popup](https://tdesign.tencent.com/vue-next/components/popup)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)

### 9.2 源代码参考
- Vue2 Menu 源代码: `c:\Users\v_genyin\Desktop\完结项目\s2-overseas-ui\s2-overseas-ui\packages\overseas\src\menu\`
- Vue3 Menu 目标目录: `c:\Users\v_genyin\Desktop\overseas-ui-vue3\tdesign-vue-next-overseas-ui\packages\components\menu\`

### 9.3 最佳实践
- [Vue 3 Composition API Best Practices](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript with Vue 3](https://vuejs.org/guide/typescript/overview.html)
- [WCAG 2.1 Menu Widget Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

---

**研究状态**: ✅ 完成  
**审核人**: -  
**审核日期**: -
