---
description: 将任务清单（tasks.md）中的任务项转换为 TAPD Issues，便于团队协作和进度跟踪。
---

# Spec-Kit: Tasks to Issues 命令

## 命令触发

当用户输入 `/speckit.taskstoissues` 或 `/taskstoissues` 时执行此命令。

## 命令目的

将任务清单（tasks.md）中的任务项转换为 TAPD Issues，便于团队协作和进度跟踪。

## 执行流程

### 1. 读取任务清单

```
读取 specs/[feature-name]/tasks.md 文件
解析所有任务项及其状态
```

### 2. 任务解析

对每个任务提取：
- 任务标题
- 任务描述
- 优先级
- 预估工时
- 依赖关系

### 3. 生成 TAPD Issue 格式

为每个任务生成符合 TAPD 格式的 Issue：

```yaml
title: "[Feature] 任务标题"
description: |
  ## 任务描述
  详细描述...
  
  ## 验收标准
  - [ ] 标准1
  - [ ] 标准2
  
  ## 相关文件
  - file1
  - file2
priority: high/medium/low
estimated_hours: X
labels:
  - feature-name
  - task-type
```

### 4. 输出选项

提供以下输出格式：
1. **Markdown 表格** - 便于复制粘贴
2. **JSON 格式** - 便于 API 导入
3. **CSV 格式** - 便于批量导入

## 使用示例

```
/speckit.taskstoissues feature-name
```

## 注意事项

- 确保任务清单格式正确
- 检查任务依赖关系是否合理
- 验证预估工时是否合理
