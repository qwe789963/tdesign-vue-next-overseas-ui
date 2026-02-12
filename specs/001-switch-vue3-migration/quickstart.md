# Switch 组件快速开始指南

**功能编号**: 001  
**版本**: 1.0  
**适用于**: 开发者快速上手

---

## 🚀 5 分钟快速开始

### 第 1 步：安装组件库

```bash
npm install @tdesign/vue-next-overseas-ui --save
```

---

### 第 2 步：引入组件

**方式 1: 完整引入（不推荐）**
```typescript
// main.ts
import { createApp } from 'vue';
import TDesign from '@tdesign/vue-next-overseas-ui';
import '@tdesign/vue-next-overseas-ui/dist/style.css';

const app = createApp(App);
app.use(TDesign);
```

**方式 2: 按需引入（推荐）**
```vue
<script setup lang="ts">
import { Switch as TSwitch } from '@tdesign/vue-next-overseas-ui';
import '@tdesign/vue-next-overseas-ui/es/switch/style/overseas/index.css';
</script>
```

---

### 第 3 步：基础使用

```vue
<template>
  <div>
    <h3>基础开关</h3>
    <t-switch v-model="checked" />
    <p>当前状态: {{ checked ? '开启' : '关闭' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

**效果预览**:
```
[●-----]  当前状态: 关闭
[-----●]  当前状态: 开启
```

---

## 📚 常见使用场景

### 场景 1: 基础开关

**需求**: 简单的开关切换

```vue
<template>
  <t-switch v-model="darkMode" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const darkMode = ref(false);
</script>
```

---

### 场景 2: 自定义值

**需求**: 使用 `1/0` 或 `'on'/'off'` 代替布尔值

```vue
<template>
  <t-switch
    v-model="status"
    :custom-value="[1, 0]"
  />
  <p>当前状态值: {{ status }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref<number>(1);  // 1 表示开启
</script>
```

---

### 场景 3: 显示文本标签

**需求**: 在开关上显示"开/关"文字

```vue
<template>
  <t-switch
    v-model="checked"
    :label="['开', '关']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

**效果预览**:
```
[开 -----●]  未选中状态显示 "关"
[●----- 关]  选中状态显示 "开"
```

---

### 场景 4: 禁用状态

**需求**: 不可操作的开关

```vue
<template>
  <t-switch v-model="checked" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

---

### 场景 5: 加载状态

**需求**: 异步操作时显示加载动画

```vue
<template>
  <t-switch
    v-model="checked"
    :loading="isLoading"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
const isLoading = ref(false);

const handleChange = async (value: boolean) => {
  isLoading.value = true;
  try {
    await api.updateStatus(value);
  } finally {
    isLoading.value = false;
  }
};
</script>
```

---

### 场景 6: 异步验证（Vue3 特性）

**需求**: 切换前弹出确认框

```vue
<template>
  <t-switch
    v-model="checked"
    :before-change="handleBeforeChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);

const handleBeforeChange = () => {
  return window.confirm('确定要切换状态吗？');
};
</script>
```

**异步验证（API 调用）**:
```typescript
const handleBeforeChangeAsync = async () => {
  const result = await api.checkPermission();
  return result.allowed;  // 返回 true 允许切换，false 阻止
};
```

---

### 场景 7: 不同尺寸

**需求**: 根据 UI 设计调整大小

```vue
<template>
  <div>
    <t-switch v-model="checked" size="small" />
    <t-switch v-model="checked" size="medium" />
    <t-switch v-model="checked" size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

---

### 场景 8: 自定义标签（插槽）

**需求**: 显示图标或复杂内容

```vue
<template>
  <t-switch v-model="checked">
    <template #label="{ value }">
      <span style="display: flex; align-items: center; gap: 4px;">
        <Icon :name="value ? 'check-circle' : 'close-circle'" />
        {{ value ? '已启用' : '已禁用' }}
      </span>
    </template>
  </t-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
```

---

## 🎨 样式定制

### 主题颜色

**海外版默认颜色**:
- 选中状态：`#1b72e3`（蓝色）
- 未选中状态：`#7B858F`（灰色）
- 焦点边框：`#1b72e3`（蓝色，2px）

**自定义颜色（CSS 变量）**:
```css
.custom-switch {
  --td-switch-checked-bg: #4caf50;  /* 自定义选中颜色 */
  --td-switch-unchecked-bg: #9e9e9e;  /* 自定义未选中颜色 */
}
```

```vue
<t-switch v-model="checked" class="custom-switch" />
```

---

### 自定义尺寸

```less
.my-switch {
  &.t-switch {
    width: 80px;
    height: 40px;
    
    .t-switch__handle {
      width: 36px;
      height: 36px;
    }
  }
}
```

---

## ⚡ 性能优化建议

### 1. 避免频繁切换

**不推荐**:
```vue
<t-switch
  v-model="checked"
  @change="() => heavyComputation()"
/>
```

**推荐（使用防抖）**:
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const checked = ref(false);

const handleChange = useDebounceFn((value: boolean) => {
  heavyComputation();
}, 300);
</script>

<template>
  <t-switch v-model="checked" @change="handleChange" />
</template>
```

---

### 2. 使用 v-memo 优化列表渲染

```vue
<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.enabled]">
    <t-switch v-model="item.enabled" />
  </div>
</template>
```

---

## 🔍 常见问题

### Q1: 如何监听状态变化？

**A**: 使用 `@change` 事件或 `watch` 监听 v-model

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';

const checked = ref(false);

// 方式 1: 使用 @change
const handleChange = (value: boolean) => {
  console.log('新值:', value);
};

// 方式 2: 使用 watch
watch(checked, (newValue, oldValue) => {
  console.log('从', oldValue, '变为', newValue);
});
</script>

<template>
  <t-switch v-model="checked" @change="handleChange" />
</template>
```

---

### Q2: 如何阻止状态切换？

**A**: 使用 `beforeChange` 返回 `false`

```vue
<script setup lang="ts">
const handleBeforeChange = () => {
  if (!hasPermission) {
    alert('没有权限');
    return false;  // 阻止切换
  }
  return true;  // 允许切换
};
</script>

<template>
  <t-switch v-model="checked" :before-change="handleBeforeChange" />
</template>
```

---

### Q3: 焦点样式不显示？

**A**: 检查以下几点：
1. 确保引入了海外版样式：`import '@tdesign/vue-next-overseas-ui/es/switch/style/overseas/index.css'`
2. 确保 Switch 未禁用：`disabled=false`
3. 使用 Tab 键聚焦（不是点击聚焦）

---

### Q4: 如何与表单集成？

**A**: Switch 支持 v-model，可直接用于表单

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <label>
      <span>启用通知</span>
      <t-switch v-model="formData.notifyEnabled" />
    </label>
    
    <label>
      <span>自动保存</span>
      <t-switch v-model="formData.autoSave" />
    </label>
    
    <button type="submit">提交</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  notifyEnabled: false,
  autoSave: true,
});

const handleSubmit = () => {
  console.log('表单数据:', formData);
};
</script>
```

---

### Q5: 如何实现"开关组"？

**A**: 使用数组管理多个开关状态

```vue
<template>
  <div>
    <div v-for="(item, index) in permissions" :key="item.id">
      <span>{{ item.name }}</span>
      <t-switch v-model="item.enabled" @change="(value) => handleChange(index, value)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const permissions = ref([
  { id: 1, name: '读取权限', enabled: true },
  { id: 2, name: '写入权限', enabled: false },
  { id: 3, name: '删除权限', enabled: false },
]);

const handleChange = (index: number, value: boolean) => {
  console.log(`权限 ${permissions.value[index].name} 变为 ${value}`);
};
</script>
```

---

## 🛠️ 调试技巧

### 1. 查看组件状态

```vue
<template>
  <div>
    <t-switch v-model="checked" />
    
    <!-- 调试信息 -->
    <pre>{{ JSON.stringify({ checked }, null, 2) }}</pre>
  </div>
</template>
```

---

### 2. 使用 Vue DevTools

1. 安装 Vue DevTools 浏览器扩展
2. 打开开发者工具 → Vue 标签页
3. 选择 Switch 组件实例
4. 查看 Props、Data、Events

---

### 3. 日志调试

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';

const checked = ref(false);

watch(checked, (newValue, oldValue) => {
  console.log('Switch 状态变化:', {
    oldValue,
    newValue,
    timestamp: new Date().toISOString(),
  });
}, { immediate: true });
</script>
```

---

## 📦 完整示例

### 综合示例：设置页面

```vue
<template>
  <div class="settings-page">
    <h2>系统设置</h2>
    
    <!-- 基础开关 -->
    <div class="setting-item">
      <div class="setting-info">
        <h4>暗黑模式</h4>
        <p>启用暗黑主题</p>
      </div>
      <t-switch
        v-model="settings.darkMode"
        @change="handleDarkModeChange"
      />
    </div>
    
    <!-- 带标签的开关 -->
    <div class="setting-item">
      <div class="setting-info">
        <h4>通知</h4>
        <p>接收系统通知</p>
      </div>
      <t-switch
        v-model="settings.notifications"
        :label="['开', '关']"
        size="large"
      />
    </div>
    
    <!-- 异步验证开关 -->
    <div class="setting-item">
      <div class="setting-info">
        <h4>自动保存</h4>
        <p>编辑时自动保存内容</p>
      </div>
      <t-switch
        v-model="settings.autoSave"
        :loading="isLoading"
        :before-change="handleBeforeChangeAutoSave"
        @change="handleAutoSaveChange"
      />
    </div>
    
    <!-- 禁用的开关 -->
    <div class="setting-item">
      <div class="setting-info">
        <h4>实验性功能</h4>
        <p>需要管理员权限</p>
      </div>
      <t-switch
        v-model="settings.experimental"
        disabled
      />
    </div>
    
    <!-- 自定义值开关 -->
    <div class="setting-item">
      <div class="setting-info">
        <h4>数据同步</h4>
        <p>状态值: {{ settings.syncStatus }}</p>
      </div>
      <t-switch
        v-model="settings.syncStatus"
        :custom-value="['enabled', 'disabled']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const settings = reactive({
  darkMode: false,
  notifications: true,
  autoSave: false,
  experimental: false,
  syncStatus: 'disabled' as 'enabled' | 'disabled',
});

const isLoading = ref(false);

const handleDarkModeChange = (value: boolean) => {
  console.log('暗黑模式:', value);
  // 切换主题逻辑
  document.documentElement.classList.toggle('dark-theme', value);
};

const handleBeforeChangeAutoSave = async () => {
  // 模拟 API 调用
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(window.confirm('启用自动保存会增加存储使用，是否继续？'));
    }, 300);
  });
};

const handleAutoSaveChange = async (value: boolean) => {
  isLoading.value = true;
  try {
    await api.updateSettings({ autoSave: value });
    console.log('自动保存设置已更新');
  } catch (error) {
    console.error('更新失败:', error);
    settings.autoSave = !value;  // 回滚状态
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

.setting-info h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 500;
}

.setting-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.dark-theme {
  background-color: #1e1e1e;
  color: #fff;
}
</style>
```

---

## 🎓 进阶用法

### 1. 结合 Pinia 状态管理

```typescript
// stores/settings.ts
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false,
    notifications: true,
  }),
  
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark-theme', this.darkMode);
    },
  },
});
```

```vue
<template>
  <t-switch
    :model-value="settingsStore.darkMode"
    @update:model-value="settingsStore.darkMode = $event"
  />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();
</script>
```

---

### 2. 使用 Composables 封装逻辑

```typescript
// composables/useSwitch.ts
import { ref, Ref } from 'vue';

export function useSwitch(initialValue: boolean = false) {
  const checked = ref(initialValue);
  const isLoading = ref(false);
  
  const toggle = () => {
    checked.value = !checked.value;
  };
  
  const asyncToggle = async (asyncFn: () => Promise<boolean>) => {
    isLoading.value = true;
    try {
      const result = await asyncFn();
      if (result) {
        toggle();
      }
    } finally {
      isLoading.value = false;
    }
  };
  
  return {
    checked,
    isLoading,
    toggle,
    asyncToggle,
  };
}
```

```vue
<template>
  <t-switch
    v-model="checked"
    :loading="isLoading"
    @change="() => asyncToggle(validateChange)"
  />
</template>

<script setup lang="ts">
import { useSwitch } from '@/composables/useSwitch';

const { checked, isLoading, asyncToggle } = useSwitch(false);

const validateChange = async () => {
  return await api.checkPermission();
};
</script>
```

---

## 📖 相关文档

- [完整 API 文档](./contracts/switch-component-api.md)
- [数据模型文档](./data-model.md)
- [技术研究报告](./research.md)
- [功能规格文档](./spec.md)

---

## 💡 最佳实践总结

1. **使用 TypeScript**: 明确类型定义，避免运行时错误
2. **异步操作使用 loading**: 提供视觉反馈
3. **重要操作使用 beforeChange**: 防止误操作
4. **自定义值使用 customValue**: 提高代码可读性
5. **表单场景使用 v-model**: 简化状态管理
6. **性能优化使用防抖**: 避免频繁 API 调用

---

**快速开始指南状态**: ✅ 完成  
**下一步**: 实施验证和测试
