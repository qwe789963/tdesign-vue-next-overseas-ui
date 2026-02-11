# 统一规范执行指南

**最后更新**: 2025-12-19
**优先级**: 【必须】在每次对话时执行

---

## 📋 规范文件优先级

### 主规范（最高优先级）
1. **`team-rule.md`** - 项目总体规范，所有其他规范的基础
   - 代码规范（通用规范、命名规范）
   - 非说明文件命名规范
   - 目录结构规范
   - 语言包规范
   - 数据库操作规范
   - 前端安全规范 ★
   - 后端安全规范 ★
   - 前端数值计算规范 ★
   - 前端性能规范
   - 文档规范
   - Git 提交规范 ★

### 补充规范（参考优先级）
2. **`TypeScript官方规范.md`** - TypeScript 编码规范
   - 必须遵循 team-rule.md 中的命名规范
   - 补充 TypeScript 特定的编码规范

3. **`TypeScript编程开发指南.md`** - TypeScript 编程指南
   - 详细说明 TypeScript 的具体编码规范
   - 与 team-rule.md 冲突时以 team-rule.md 为准

4. **`CSS官方规范.md`** - CSS/Less 编码规范
   - 必须遵循 team-rule.md 中的命名规范
   - 补充 CSS/Less 特定的编码规范

## ✅ 核心规范检查清单

### 【必须】命名规范
- [ ] 文件名全小写，使用连字符分隔（如 `component-header.vue`）
- [ ] 类名使用 PascalCase（如 `UserService`）
- [ ] 方法/函数名使用 camelCase（如 `getUserInfo()`）
- [ ] 常量使用 UPPER_SNAKE_CASE（如 `MAX_RETRY_COUNT`）
- [ ] 接口名以 `I` 开头（如 `IUserService`）

### 【必须】代码规范
- [ ] 每个方法、类、属性、函数都有标准 JSDoc 注释
- [ ] 访问修饰符必须显式声明（`public`、`private`、`protected`）
- [ ] 所有变量、参数、返回值都有明确的类型声明
- [ ] 禁止使用 `any` 类型
- [ ] 禁止使用 `alert()`、`console.log()`（生产代码）
- [ ] 每一行结尾必须以 `;` 结束
- [ ] 文件末尾必须有换行符

### 【必须】目录结构
- [ ] 公共组件放在 `src/components/`
- [ ] 页面级组件放在对应页面目录的 `components/` 子目录
- [ ] API 服务放在 `services/` 目录
- [ ] 工具函数放在 `utils/` 目录
- [ ] 类型定义放在 `types/` 目录
- [ ] 样式文件放在 `styles/` 目录
- [ ] index.ts 仅包含 export 语句，禁止业务逻辑

### 【必须】安全规范 ★
- [ ] 用户输入使用 `sanitizeHtml/sanitizeText` 净化（从 `@tencent/s2-core-lib` 导入）
- [ ] URL 使用 `sanitizeUrl` 验证
- [ ] 敏感接口启用限流（`RateLimitGuard`，从 `@tencent/s2-core-node/nest` 导入）
- [ ] 状态变更接口启用 CSRF 保护
- [ ] 无硬编码 API 密钥或令牌
- [ ] 禁止从项目本地导入安全工具（必须从统一包导入）

### 【必须】数值计算规范 ★
- [ ] 金额计算使用 `decAdd/decSub/decMul/decDiv`（从 `@tencent/s2-core-lib` 导入）
- [ ] 数值格式化使用 `toFixed/formatAmount`
- [ ] 百分比计算使用 `calcPercentage`
- [ ] 禁止直接使用原生浮点数运算（涉及金额时）
- [ ] 禁止使用原生 `toFixed()`

### 【必须】Git 提交规范 ★
- [ ] 提交消息格式：`<type>(<scope>): <description>`
- [ ] 提交消息使用英文
- [ ] 描述以小写字母开头，使用祈使语气
- [ ] 描述不超过 72 个字符
- [ ] 提交类型正确（feat/fix/docs/style/refactor/perf/test/build/ci/chore/revert/types）

### 【必须】文档规范
- [ ] 说明文档放在 `docs/` 目录
- [ ] 文件名全大写英文，用 `_` 分隔（如 `FEATURE_GUIDE.md`）
- [ ] 文件名不超过 30 个字符
- [ ] 每次生成新报告前读取原有文件进行比较

### 【必须】国际化规范
- [ ] 用户可见文本使用 `$t()` 或 `i18n.t()`
- [ ] 新增翻译同时更新所有语言文件（en、zh-CN）

---

## 🔄 冲突解决规则

### 当规范之间有冲突时

**优先级顺序**（从高到低）：
1. **team-rule.md** - 项目主规范
2. **TypeScript编程开发指南.md** - TypeScript 补充规范
3. **TypeScript官方规范.md** - TypeScript 参考规范
4. **CSS官方规范.md** - CSS 参考规范

### 已知冲突及解决方案

#### 冲突 1：类型声明
- **TypeScript官方规范.md** 说："禁止给基本类型变量显式声明类型"
- **team-rule.md** 说："所有变量都必须有明确的类型声明"
- **解决**：✅ 遵循 team-rule.md，所有变量必须显式声明类型

#### 冲突 2：编程范式
- **TypeScript编程开发指南.md** 说："遵循函数式编程模式；避免使用类"
- **team-rule.md** 说："需要添加 OOP 思想，体现继承、多态、封装"
- **解决**：✅ 遵循 team-rule.md，使用 OOP 范式

#### 冲突 3：项目类型
- **TypeScript编程开发指南.md** 是关于 Chrome 扩展开发
- **项目实际**：Vite + Vue 3 + NestJS 项目
- **解决**：✅ 已重写为 Vite + Vue 3 + NestJS 相关内容

---

## 📝 AI 执行规范

### 每次对话时必须执行

1. **检查规范一致性**
   - 确认代码遵循 team-rule.md 的所有【必须】规范
   - 检查是否有冲突，按优先级解决

2. **应用命名规范**
   - 文件名：全小写，连字符分隔
   - 类名：PascalCase
   - 方法/函数：camelCase
   - 常量：UPPER_SNAKE_CASE

3. **应用代码规范**
   - 添加 JSDoc 注释
   - 显式声明访问修饰符
   - 显式声明类型
   - 禁止 `any` 类型

4. **应用目录结构**
   - 组件放在正确的目录
   - 服务放在 `services/` 目录
   - 工具放在 `utils/` 目录

5. **生成文档**
   - 放在 `docs/` 目录
   - 文件名全大写英文
   - 读取原有文件进行比较

---

## 🎯 快速参考

### 文件命名示例

| 类型 | 格式 | 示例 |
|------|------|------|
| Vue 组件 | `component-*.vue` | `component-stock-card.vue` |
| Composables | `composables-*.ts` | `composables-api.ts` |
| Stores | `store-*.ts` | `store-stocks.ts` |
| 前端服务 | `*-*.service.ts` | `stock-data.service.ts` |
| 前端工具 | `utils-*.ts` | `utils-security.service.ts` |
| 后端服务 | `*.service.ts` | `stock.service.ts` |
| 后端控制器 | `*.controller.ts` | `stock.controller.ts` |
| 后端 DTO | `*.dto.ts` | `create-stock.dto.ts` |
| 后端实体 | `*.entity.ts` | `stock.entity.ts` |

### 代码示例

#### Vue 3 组件
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  stocks: Stock[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [stock: Stock];
}>();

const selectedId = ref<string | null>(null);

const selectedStock = computed(() =>
  props.stocks.find(s => s.id === selectedId.value)
);
</script>
```

#### NestJS 服务
```typescript
/**
 * 股票服务
 * 负责股票数据的业务逻辑处理
 */
@Injectable()
export class StockService {
  public constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  /**
   * 获取所有股票
   * @returns 股票列表
   */
  public async findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }
}
```

---

## 📞 问题反馈

如发现规范冲突或不适配之处，请：
1. 记录具体的冲突情况
2. 参考优先级规则进行解决
3. 更新本文档

---

**规范执行状态**: ✅ 已统一
**最后检查**: 2025-12-16
