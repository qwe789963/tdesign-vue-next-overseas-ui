---
name: clean-deps
description: 清理当前项目依赖文件（package-lock.json 和 node_modules）并重新安装，支持 Monorepo
---

# Clean Dependencies Skill

清理当前项目依赖文件（package-lock.json / pnpm-lock.yaml 和 node_modules），支持 Monorepo 多包工程

## 触发条件

当用户请求以下操作时激活此 skill：
- skill-清理依赖
- skill-删除 node_modules
- skill-删除 package-lock.json
- skill-重新安装依赖
- skill-清理缓存
- skill-clean-deps / skill-clean-dependencies

## 执行步骤

### 1. 读取 README.md 获取 Node 版本要求

**重要**：在执行任何操作前，必须先读取当前项目的 `README.md` 文件，查找 Node 版本要求。

查找模式：
```
NODE版本要求:
v<版本号>
```
或
```
NODE版本要求:
V<版本号>
```

### 2. 切换 Node 版本

使用 nvm 切换到 README.md 要求的 Node 版本：

```bash
# 使用 nvm 切换 Node 版本
source ~/.nvm/nvm.sh && nvm use <版本号>

# 如果未安装该版本，先安装
nvm install <版本号>
```

### 3. 检测项目类型

检测是否为 Monorepo 工程：

```bash
# 检查是否存在 pnpm-workspace.yaml（pnpm monorepo）
if [ -f "pnpm-workspace.yaml" ]; then
  echo "检测到 pnpm workspace monorepo"
  IS_PNPM_MONOREPO=true
fi

# 检查是否存在 lerna.json（lerna monorepo）
if [ -f "lerna.json" ]; then
  echo "检测到 lerna monorepo"
  IS_LERNA_MONOREPO=true
fi

# 检查 package.json 中是否有 workspaces 字段（npm/yarn monorepo）
if grep -q '"workspaces"' package.json 2>/dev/null; then
  echo "检测到 npm/yarn workspaces monorepo"
  IS_NPM_MONOREPO=true
fi
```

### 4. 删除文件

#### 4.1 普通项目（非 Monorepo）

```bash
# 删除 node_modules 目录
rm -rf node_modules

# 删除锁文件
rm -f package-lock.json pnpm-lock.yaml yarn.lock
```

#### 4.2 Monorepo 项目

```bash
# 删除根目录的 node_modules 和锁文件
rm -rf node_modules
rm -f package-lock.json pnpm-lock.yaml yarn.lock

# 递归删除所有子目录的 node_modules
# 方式一：使用 find 命令（推荐）
find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null

# 方式二：手动删除已知子目录（更可控）
# 删除 packages/* 下的 node_modules
for dir in packages/*/; do
  if [ -d "${dir}node_modules" ]; then
    rm -rf "${dir}node_modules"
    echo "已删除: ${dir}node_modules"
  fi
done

# 删除 apps/* 下的 node_modules
for dir in apps/*/; do
  if [ -d "${dir}node_modules" ]; then
    rm -rf "${dir}node_modules"
    echo "已删除: ${dir}node_modules"
  fi
done
```

### 5. 确认结果

删除完成后，向用户报告：
- 已删除的文件/目录列表
- 当前使用的 Node 版本
- 项目类型（普通项目 / Monorepo）

## 可选操作 - 重新安装依赖

用户可以选择在清理后立即重新安装依赖：

### 普通项目

```bash
# npm（优先不带参数，遇到 peer deps 冲突再加 --legacy-peer-deps）
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### Monorepo 项目

```bash
# pnpm workspace（推荐，自动安装所有子包）
pnpm install

# npm workspaces
npm install

# yarn workspaces
yarn install

# lerna
lerna bootstrap
```

**注意**：pnpm workspace 会自动根据 `pnpm-workspace.yaml` 安装所有子包依赖，无需额外配置。

## 一键清理脚本

可直接复制使用的完整脚本：

```bash
#!/bin/bash
# Monorepo 依赖清理脚本

echo "🧹 开始清理依赖..."

# 删除根目录
rm -rf node_modules
rm -f package-lock.json pnpm-lock.yaml yarn.lock
echo "✅ 已清理根目录"

# 删除所有子目录的 node_modules
find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null
echo "✅ 已清理所有子目录 node_modules"

# 清理 pnpm 缓存（可选）
# pnpm store prune

echo "🎉 清理完成！"
echo ""
echo "重新安装依赖请执行："
echo "  pnpm install    # pnpm workspace"
echo "  npm install     # npm workspaces"
echo "  yarn install    # yarn workspaces"
```

## 使用示例

用户可以通过以下方式触发此 skill：

1. **仅清理**
   > "skill-清理依赖"
   > "skill-删除 node_modules"

2. **清理并重装**
   > "skill-清理并重装"
   > "skill-重置 npm 依赖"

3. **清理 Monorepo**
   > "skill-清理 monorepo 依赖"
   > "skill-清理所有子包依赖"

## 注意事项

- 删除 node_modules 后需要重新运行包管理器安装命令才能启动项目
- 删除锁文件可能导致依赖版本变化，请谨慎操作
- 建议在清理前确保没有未提交的代码更改
- 每个项目的 Node 版本要求可能不同，务必从 README.md 读取
- **Monorepo 项目**：使用 `find` 命令可递归清理所有子目录的 node_modules
- **pnpm workspace**：只需在根目录执行 `pnpm install`，会自动安装所有子包依赖
