# Checkbox 海外适配 - 快速开始指南

> **目标**：5 分钟内快速理解 Checkbox 海外适配的核心变更和实施步骤

---

## 🎯 核心目标

将 Vue2 版本的 Checkbox 组件迁移到 Vue3，实现与 Vue2 完全一致的功能和样式效果。

---

## 📋 关键变更概览

### 1️⃣ **Focus 视觉反馈**
- **Vue2**: 使用 `isFocus` 状态 + `focusBox` 元素显示蓝色外框
- **Vue3**: 创建 `useFocusHandler()` Hook 管理焦点状态

```typescript
// Vue2: data() { isFocus: false }
// Vue3: const { isFocus, handleFocus, handleBlur } = useFocusHandler();
```

### 2️⃣ **勾选标记样式**
- **形状**: 斜向勾选标记（√ 形状）
- **尺寸**: 5px × 9px，使用 `::after` + `transform: rotate(45deg)`
- **颜色**: 白色（`@text-color-anti`）

### 3️⃣ **半选态样式**
- **形状**: 白色横线
- **尺寸**: 16px × 4px
- **位置**: 居中显示

### 4️⃣ **自定义 CSS 变量**
```less
@checkbox-size: 18px;
@checkbox-border-radius: 2px;  // 小圆角
@checkbox-check-width: 5px;
@checkbox-check-height: 9px;
@checkbox-indeterminate-width: 16px;
@checkbox-indeterminate-height: 4px;
```

---

## 🚀 快速实施路径

### Step 1: 创建样式文件 (30分钟)

```bash
cd packages/components/checkbox/style
mkdir overseas
cd overseas

# 创建 3 个文件
touch index.less _var.less _mixin.less
```

**_var.less** - 复制 Vue2 的 CSS 变量：
```less
@checkbox-size: 18px;
@checkbox-border-radius: 2px;
@checkbox-check-width: 5px;
@checkbox-check-height: 9px;
// ... 完整变量见规格文档
```

**index.less** - 复制 Vue2 的样式实现：
```less
// 勾选标记（√ 形状）
&.@{prefix}-is-checked {
  .t-checkbox__input::after {
    opacity: 1;
    top: ((@checkbox-size) / 2 - 2px);
    left: ((@checkbox-size) / 2 - 5px);
    width: @checkbox-check-width;
    height: @checkbox-check-height;
    border: 2px solid @checkbox-check-color;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
  }
}
```

### Step 2: 创建 Focus Hook (20分钟)

```bash
cd packages/components/checkbox/hooks
touch use-focus-handler.ts
```

```typescript
// use-focus-handler.ts
import { ref, Ref } from 'vue';

export function useFocusHandler() {
  const isFocus = ref(false);
  const inputRef: Ref<HTMLElement | null> = ref(null);

  const handleFocus = () => {
    isFocus.value = true;
    const inputElement = inputRef.value?.querySelector('.t-checkbox__input');
    inputElement?.classList.add('focusClass');
    inputElement?.classList.remove('normalClass');
  };

  const handleBlur = () => {
    isFocus.value = false;
    const inputElement = inputRef.value?.querySelector('.t-checkbox__input');
    inputElement?.classList.add('normalClass');
    inputElement?.classList.remove('focusClass');
  };

  return { isFocus, inputRef, handleFocus, handleBlur };
}
```

### Step 3: 修改组件文件 (30分钟)

**checkbox.tsx** - 集成 Focus 处理：

```tsx
import { useFocusHandler } from './hooks/use-focus-handler';

export default defineComponent({
  setup(props) {
    // 1. 引入 useFocusHandler
    const { isFocus, inputRef, handleFocus, handleBlur } = useFocusHandler();
    
    // 2. 修改 inputClass（添加 focusClass/normalClass）
    const inputClass = computed(() => [
      `${prefixCls.value}__input`,
      {
        focusClass: isFocus.value,
        normalClass: !isFocus.value,
      },
    ]);
    
    // 3. 渲染时添加 focusBox 和事件
    return () => (
      <label ref={inputRef}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...inputProps.value}
        />
        <span class={inputClass.value}>
          <span class="focusBox"></span>  {/* 新增 */}
        </span>
        <span class={`${prefixCls.value}__label`}>
          {renderTNodeJSX('default', 'label')}
        </span>
      </label>
    );
  },
});
```

### Step 4: 修改样式导入 (5分钟)

**style/index.js**:

```javascript
// 修改前
import '@tdesign/common-style/web/components/checkbox/_index.less';

// 修改后
import './overseas/index.less';
```

---

## ✅ 验证清单

完成后运行以下检查：

### 1. TypeScript 编译
```bash
npx vue-tsc --noEmit
```

### 2. 单元测试
```bash
npm run test checkbox
```

### 3. 手动测试
打开浏览器开发者工具：

```bash
npm run dev
# 访问 http://localhost:3000/checkbox
```

**测试场景**：
- [ ] 默认态：外框边框颜色正确
- [ ] 选中态：显示白色勾选标记（√ 形状）
- [ ] 半选态：显示白色横线
- [ ] Focus 态：Tab 键聚焦时显示蓝色外框
- [ ] Hover 态：鼠标悬停时边框变色
- [ ] 禁用态：背景色变灰，无法点击

### 4. 视觉对比
对比 Vue2 版本截图，确保样式完全一致：

```bash
# 启动 Vue2 项目
cd c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui
npm run dev

# 启动 Vue3 项目
cd c:/Users/v_genyin/Desktop/overseas-ui-vue3/tdesign-vue-next-overseas-ui
npm run dev

# 使用浏览器截图工具对比
```

---

## 🔗 参考资源

| 资源 | 路径 |
|------|------|
| **完整规格** | `specs/002-checkbox-overseas-adaptation/spec.md` |
| **Vue2 源码** | `c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui/packages/overseas/src/checkbox/` |
| **Vue3 目标** | `packages/components/checkbox/` |
| **Radio 参考** | `specs/001-radio-overseas-adaptation/` |

---

## ⚡ 常见问题

### Q1: Focus 外框不显示？
**A**: 检查是否添加了 `focusBox` 元素，确认 `focusClass` 样式生效。

### Q2: 勾选标记位置偏移？
**A**: 检查 `top` 和 `left` 计算是否正确：
```less
top: ((@checkbox-size) / 2 - 2px);
left: ((@checkbox-size) / 2 - 5px);
```

### Q3: 样式没有生效？
**A**: 确认 `style/index.js` 已修改为导入 `./overseas/index.less`。

---

## 🎯 总结

**预计时间**: 1.5 小时完成核心迁移

**关键步骤**:
1. ✅ 创建 `style/overseas/` 样式文件（30min）
2. ✅ 创建 `use-focus-handler.ts` Hook（20min）
3. ✅ 修改 `checkbox.tsx` 组件（30min）
4. ✅ 修改 `style/index.js` 导入（5min）
5. ✅ 验证测试（15min）

**成功标志**: 所有测试用例通过，视觉效果与 Vue2 版本完全一致。
