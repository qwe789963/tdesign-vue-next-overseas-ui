
# TypeScript 编程开发指南

## 【必须】核心原则

1. **遵循 team-rule.md 中的所有规范** - 这是项目的主规范文件
2. **类型安全优先** - 所有变量、参数、返回值必须有明确的类型声明
3. **显式优于隐式** - 不依赖类型推断，明确声明所有类型
4. **OOP 优于函数式** - 使用类和接口组织代码，体现继承、多态、封装
5. **JSDoc 注释必须** - 所有 public 方法都必须有标准 JSDoc 注释

## 【必须】类型声明规范

### 变量声明
```typescript
// ✓ 正确 - 明确的类型声明
const userId: string = 'user-123';
const count: number = 0;
const isActive: boolean = true;
const items: string[] = [];

// ✗ 错误 - 缺少类型声明
const userId = 'user-123';
const items = [];
```

### 函数签名
```typescript
// ✓ 正确 - 完整的类型签名
function calculateTotal(items: Item[], taxRate: number): number {
  return items.reduce((sum, item) => sum + item.price, 0) * (1 + taxRate);
}

// ✓ 正确 - 异步函数
async function fetchStocks(limit: number): Promise<Stock[]> {
  const response = await fetch(`/api/stocks?limit=${limit}`);
  return response.json();
}

// ✗ 错误 - 缺少返回类型
function calculateTotal(items, taxRate) {
  return items.reduce((sum, item) => sum + item.price, 0) * (1 + taxRate);
}
```

## 【必须】类和访问修饰符

```typescript
// ✓ 正确 - 显式的访问修饰符
class UserService {
  private readonly logger: Logger;
  private userRepository: UserRepository;

  public constructor(
    logger: Logger,
    userRepository: UserRepository,
  ) {
    this.logger = logger;
    this.userRepository = userRepository;
  }

  /**
   * 获取用户信息
   * @param userId - 用户 ID
   * @returns 用户对象
   * @throws NotFoundException 用户不存在时抛出
   */
  public async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private validateUserId(userId: string): boolean {
    return userId.length > 0;
  }
}

// ✗ 错误 - 缺少访问修饰符
class UserService {
  logger: Logger;
  getUserById(userId) {
    // ...
  }
}
```

## 【必须】JSDoc 注释规范

```typescript
/**
 * 计算投资组合的总价值
 * @param portfolio - 投资组合对象
 * @param exchangeRate - 汇率（可选，默认为 1）
 * @returns 总价值（单位：人民币）
 * @throws Error 当投资组合为空时抛出
 */
public calculatePortfolioValue(
  portfolio: Portfolio,
  exchangeRate: number = 1,
): number {
  if (!portfolio.stocks || portfolio.stocks.length === 0) {
    throw new Error('Portfolio is empty');
  }
  return portfolio.stocks.reduce((sum, stock) => sum + stock.value, 0) * exchangeRate;
}
```

## 【必须】禁止事项

- ❌ 禁止使用 `any` 类型 - 使用 `unknown` 或具体类型
- ❌ 禁止使用 `var` - 使用 `const` 或 `let`
- ❌ 禁止在生产代码中使用 `console.log()` - 使用 Logger 服务
- ❌ 禁止使用 `alert()` - 使用通知系统
- ❌ 禁止硬编码魔法数字 - 使用常量
- ❌ 禁止未使用的导入或变量

## 【推荐】最佳实践

### 导入顺序
```typescript
// 1. 外部库
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// 2. 内部模块
import { UserService } from './user.service';
import { Logger } from '../common/logger';

// 3. 类型导入
import type { User } from './user.interface';
```

### 文件大小
- 单个文件不超过 500 行代码
- 超过 500 行应该拆分为多个文件

### 错误处理
```typescript
try {
  const stock = await this.stockService.getStock(symbol);
  if (!stock) {
    throw new NotFoundException(`Stock ${symbol} not found`);
  }
} catch (error) {
  if (error instanceof NotFoundException) {
    this.logger.warn(`Stock not found: ${symbol}`);
    throw error;
  }
  if (error instanceof Error) {
    this.logger.error(`Failed to fetch stock: ${error.message}`);
  }
  throw new InternalServerErrorException('Unknown error occurred');
}
```

## 【必须】与 team-rule.md 的关系

本文件是 `team-rule.md` 的补充，详细说明 TypeScript 的具体编码规范。
在任何冲突情况下，**以 team-rule.md 为准**。

关键规范引用：
- 命名规范：参考 team-rule.md 的【必须】命名规范部分
- 代码规范：参考 team-rule.md 的【必须】代码规范部分
- 目录结构：参考 team-rule.md 的【必须】目录结构规范部分
