# Radio 海外适配 - 快速开始

---

## 环境要求

- Node.js >= 18
- pnpm 9.15.9
- Vue >= 3.1.0

---

## 1. 克隆项目

```bash
git clone https://github.com/Tencent/tdesign-vue-next.git
cd tdesign-vue-next
```

---

## 2. 安装依赖

```bash
# 使用指定 Node 版本
nvm use  # 自动读取 .nvmrc

# 安装依赖
pnpm install

# 初始化 Git 子模块
pnpm init
```

---

## 3. 开发模式

```bash
# 启动主组件库开发服务器
pnpm run dev:vue
```

访问: http://localhost:3000/#/components/radio

---

## 4. 查看 Radio 组件

### 目录结构

```
packages/components/radio/
├── radio.tsx                     # 组件主文件
├── type.ts                       # 类型定义
├── style/
│   ├── overseas/                 # 海外版本样式
│   │   ├── index.less           # 主样式文件
│   │   └── _var.less            # CSS 变量
│   └── index.js                  # 样式入口
├── hooks/
│   └── use-focus-handler.ts      # Focus 处理 Hook
└── __tests__/
    ├── radio-focus.spec.ts       # Focus 测试
    └── radio-style.spec.ts       # 样式测试
```

---

## 5. 运行测试

### 单元测试

```bash
# 运行 Radio 组件测试
pnpm run test:vue -- radio

# 更新测试快照
pnpm run test:vue:update -- radio

# 查看覆盖率
pnpm run test:vue -- radio --coverage
```

### TypeScript 类型检查

```bash
pnpm run lint:tsc
```

### ESLint 检查

```bash
# 检查
pnpm run lint

# 修复
pnpm run lint:fix
```

---

## 6. 构建

```bash
# 构建主组件库
pnpm run build:vue

# 构建自动导入解析器
pnpm run build:auto-import-resolver
```

---

## 7. 查看海外版本效果

### 启动开发服务器

```bash
pnpm run dev:vue
```

### 访问示例页面

http://localhost:3000/#/components/radio

### 测试交互

1. **Tab 键切换**: 观察蓝色 Focus 外圈
2. **鼠标点击**: 选中后显示圆环 (5px border)
3. **禁用态**: 背景色 `#F0F1F2`，圆环颜色 `#a1aab3`

---

## 8. 对比 Vue2 版本

### Vue2 版本路径

```
c:/Users/v_genyin/Desktop/完结项目/s2-overseas-ui/s2-overseas-ui/packages/overseas/src/radio/
```

### 关键文件

- `radio.tsx` - 组件逻辑
- `style/radio.less` - 主样式
- `style/_var.less` - CSS 变量

### 运行 Vue2 Demo

```bash
cd s2-overseas-ui
npm install
npm run dev
```

---

## 9. 调试技巧

### Chrome DevTools

1. 打开 Elements 面板
2. 选中 `.t-radio__input` 元素
3. 查看 `::after` 伪元素的 border 样式
4. 确认 `.focusBox` 的 display 属性

### 样式调试

```less
// 临时添加调试样式
.focusBox {
  border: 2px solid red !important;  // 确认外圈位置
  display: inline-block !important;  // 强制显示
}
```

---

## 10. 常见问题

### Q1: Focus 外圈不显示
**解决**: 检查 `.focusInput` 类名是否正确添加

```typescript
// 断点调试
const handleFocus = () => {
  console.log('Focus triggered');
  inputElement?.classList.add('focusInput');
};
```

### Q2: 圆环颜色不对
**解决**: 检查 CSS 变量是否正确导入

```less
// _var.less
@import '../../../common/style/web/theme/_light.less';
@radio-dot-color: #1b72e3;  // 确认颜色值
```

### Q3: 样式未生效
**解决**: 清理缓存重新构建

```bash
rm -rf node_modules/.vite
pnpm run dev:vue
```

---

## 11. 提交代码

### Git 提交规范

```bash
git add .
git commit -m "feat(radio): add overseas adaptation styles and focus handling"
git push origin feature/radio-overseas-adaptation
```

### 创建 PR

**标题**: `feat(radio): 海外适配版本 - 圆环样式 + Focus 外圈`

**描述模板**:
```markdown
## 变更内容
- 迁移 Vue2 海外样式到 Vue3
- 实现 Focus 外圈机制
- 圆环样式替代实心圆

## 测试结果
- 单元测试覆盖率: 85%
- 视觉效果与 Vue2 一致
- 浏览器兼容性测试通过

## 截图
[附上对比截图]
```

---

## 12. 相关资源

- TDesign 官方文档: https://tdesign.tencent.com/vue-next/components/radio
- Vue3 Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
- Vitest 文档: https://vitest.dev/
- Less 文档: https://lesscss.org/

---

**准备就绪，开始开发！** 🚀
