---
title: "Claude Code 配置系统全览"
date: 2026-04-08
tags: ["Claude Code", "工具指南"]
description: "详细介绍 rules、hooks、agents 等核心概念及其作用"
draft: false
---

# Claude Code 配置系统全览

> 想要高效使用 Claude Code？先了解它的配置体系。这篇文章详细介绍 rules、hooks、agents 等核心概念及其作用。

---

## 1. rules/ — 工作规则目录

位置：`C:\Users\li\.claude\rules\`

rules 目录是 Claude Code 的**规则中心**，定义了如何工作的规范。每个文件各有分工：

| 文件 | 作用 |
|------|------|
| `agents.md` | 定义可用 Agent、什么时候调用 |
| `hooks.md` | 工具执行前后的自动钩子 |
| `coding-style.md` | 编码风格规范 |
| `development-workflow.md` | 开发流程规范 |
| `git-workflow.md` | Git 提交规范 |
| `security.md` | 安全检查规范 |
| `testing.md` | 测试要求 |

**生效方式**：文件内容会注入到每轮对话的上下文中，Claude Code 看到就会遵循。

---

## 2. hooks.md — 自动化钩子

位置：`C:\Users\li\.claude\rules\hooks.md`

Hooks 会在特定时机**自动执行**，无需调用。

### 三种类型

| Hook | 触发时机 | 用途 |
|------|----------|------|
| `PreToolUse` | 工具执行前 | 验证参数、修改参数、自动批准 |
| `PostToolUse` | 工具执行后 | 自动格式化、检查结果 |
| `Stop` | Session 结束时 | 最终验证、清理 |

### 示例

```markdown
PreToolUse: Edit
  when: file not read before edit
  action: fail with "File must be read before editing"
```

### 使用场景

- **PreToolUse**: 防止误操作（比如未读取文件就编辑）
- **PostToolUse**: 提交前自动格式化代码
- **Stop**: Session 结束时检查是否有未提交的敏感信息

---

## 3. agents/ — Agent 定义目录

位置：`C:\Users\li\.claude\agents\`

每个 `.md` 文件定义了一个专业的 Agent，包含：
- 这个 Agent 的职责
- 它有哪些工具可用
- 什么时候适合用它

### 内置 Agent 类型

| Agent | 用途 |
|-------|------|
| `planner` | 复杂功能的实现规划 |
| `architect` | 系统架构设计 |
| `tdd-guide` | 测试驱动开发 |
| `code-reviewer` | 代码审查 |
| `security-reviewer` | 安全分析 |
| `build-error-resolver` | 修复构建错误 |
| `e2e-runner` | 端到端测试 |
| `refactor-cleaner` | 死代码清理 |
| `doc-updater` | 文档更新 |

### 两种触发方式

1. **Immediate Agent Usage** — 自动触发，不需要提醒
2. **主动调用** — 需要你或 Claude Code 明确调用

### 使用示例

```
用户："帮我实现用户认证系统"
→ Claude Code 自动调用 planner agent 做规划
→ 规划完成后调用 code-reviewer 审查代码
```

---

## 4. settings.json — 主配置

位置：`C:\Users\li\.claude\settings.json`

控制 Claude Code 的**全局行为**：

| 配置项 | 作用 |
|--------|------|
| `alwaysThinkingEnabled` | 启用深度思考模式 |
| `allowedTools` | 允许使用的工具列表 |
| `ui.showAgentMessages` | 是否显示 Agent 消息 |
| 主题/快捷键 | 界面个性化配置 |

**特点**：修改后立即生效，影响整个 CLI。

---

## 5. plans/ — 计划文件目录

位置：`C:\Users\li\.claude\plans\`

当 Claude Code 进入 **Plan Mode** 时，工作计划会保存到这里。

### 使用方式

```bash
/plan  # 进入计划模式
```

进入后，Claude Code 会：

1. 分析任务需求
2. 制定分步计划
3. 将计划写入 plans/ 目录
4. 等待你确认后再执行

---

## 6. memory/ — 记忆系统

位置：`C:\Users\li\.claude\projects\<项目名>\memory\`

跨对话的持久化记忆系统。

### 记忆类型

| 类型 | 用途 |
|------|------|
| `user` | 用户信息、偏好、工作方式 |
| `feedback` | 用户给出的反馈、指导 |
| `project` | 项目上下文、目标、截止时间 |
| `reference` | 外部资源位置（Linear、Grafana 等） |

### 工作方式

```
Step 1: 将记忆写入 memory/ 目录下的 .md 文件
Step 2: 更新 MEMORY.md 索引
Step 3: 下次对话时自动加载 MEMORY.md
```

---

## 总结对比

| 组件 | 位置 | 自动触发 | 强制程度 |
|------|------|:--------:|----------|
| rules/ | `~/.claude/rules/` | ❌ | 参考遵循 |
| hooks.md | `~/.claude/rules/` | ✅ | 系统强制 |
| agents/ | `~/.claude/agents/` | 部分 | 必须遵循 |
| settings.json | `~/.claude/` | ✅ | 全局生效 |
| plans/ | `~/.claude/plans/` | ✅ Plan Mode | 等待确认 |
| memory/ | 项目内 | ✅ | 参考记忆 |

---

## 实用建议

### 推荐的配置优先级

| 优先级 | 配置 | 原因 |
|:------:|------|------|
| ⭐⭐⭐ | `rules/hooks.md` | 防止误操作，第一道防线 |
| ⭐⭐⭐ | `rules/agents.md` 中的 Immediate Agent Usage | 自动化流程，提升效率 |
| ⭐⭐ | `rules/coding-style.md` | 统一代码风格 |
| ⭐ | `memory/` | 记住用户偏好和项目上下文 |

### 常见组合

| 场景 | 推荐配置 |
|------|----------|
| 追求代码质量 | hooks + code-reviewer agent + tdd-guide |
| 快速开发 | 精简 rules，依赖 agents 自动化 |
| 团队协作 | 完善 hooks + git-workflow + security rules |

---

了解这些配置系统的目的不是把所有功能都打开，而是根据实际工作需求，选择最合适的组合。
