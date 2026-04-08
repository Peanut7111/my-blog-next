---
title: "AI术语与Claude Code配置指南"
date: 2026-04-08
tags: ["AI术语", "Claude Code", "工具指南"]
description: "记录AI领域常见术语，并详细介绍Claude Code配置体系"
draft: false
---

# AI术语与Claude Code配置指南

> 本文分为两部分：AI领域常见术语详解 + Claude Code配置系统全览

---

## 第一部分：AI术语笔记

记录 AI 领域常见的英文术语和缩写，用简洁的语言解释概念。

---

### 核心概念

#### LLM (Large Language Model)

**大型语言模型**。一种基于深度学习的神经网络，通过海量文本训练来预测下一个 token（词元）。

常见 LLM：GPT、Claude、Llama、DeepSeek 等。

#### Token

**词元**。LLM 处理文本的最小单位。英文中 1 token ≈ 1 个单词；中文中 1 token ≈ 1-2 个汉字。

#### Context Window

**上下文窗口**。LLM 一次能处理的 token 总数上限，包括输入和输出。

#### Temperature

**温度参数**。控制输出随机性的参数：
- `temperature = 0`：输出几乎确定
- `temperature = 0.7~1.0`：输出更多样

#### Hallucination

**幻觉**。LLM 生成看似合理但实际错误或不存在的信息。

---

### RAG 相关

#### RAG (Retrieval Augmented Generation)

**检索增强生成**。一种让 LLM 回答基于私有知识的技术。

#### Vector Database

**向量数据库**。存储文本嵌入向量的数据库，通过语义相似度搜索内容。

#### Embedding

**嵌入/向量化**。把文本转换成数字向量的过程，相似文本有相似的向量。

---

### Agent 相关

#### AI Agent

**AI 代理/智能体**。能够自主规划、使用工具，完成复杂任务的 AI 系统。

#### MCP (Model Context Protocol)

**模型上下文协议**。Anthropic 提出的标准协议，让 AI 能安全地连接外部数据源和工具。

#### Tool Use

**工具调用**。LLM 通过生成特殊指令来调用外部工具，扩展其能力边界。

---

### Claude Code 相关（基础）

| 概念 | 说明 |
|------|------|
| **Skill** | 经过经验优化好的提示词文档，用于特定任务的执行代理 |
| **Hooks** | 自动化机制，在特定生命周期事件触发时自动执行 |
| **Rules** | 提示词规则文件，定义工作流程和最佳实践 |
| **CLAUDE.md** | 项目级说明文件，供 AI 在该项目中快速了解上下文 |

### 其他常见术语

| 术语 | 全称 | 解释 |
|------|------|------|
| **API** | Application Programming Interface | 程序接口 |
| **Streaming** | — | 流式输出，边生成边显示 |
| **Benchmark** | — | 基准测试，评估模型性能的标准 |

---

## 第二部分：Claude Code 配置系统详解

下面详细介绍 Claude Code 的配置体系，包括 rules、hooks、agents 等核心概念。

---

### 1. rules/ — 工作规则目录

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

### 2. hooks.md — 自动化钩子

位置：`C:\Users\li\.claude\rules\hooks.md`

Hooks 会在特定时机**自动执行**，无需调用。

#### 三种类型

| Hook | 触发时机 | 用途 |
|------|----------|------|
| `PreToolUse` | 工具执行前 | 验证参数、修改参数、自动批准 |
| `PostToolUse` | 工具执行后 | 自动格式化、检查结果 |
| `Stop` | Session 结束时 | 最终验证、清理 |

#### 示例

```markdown
PreToolUse: Edit
  when: file not read before edit
  action: fail with "File must be read before editing"
```

#### 使用场景

- **PreToolUse**: 防止误操作（比如未读取文件就编辑）
- **PostToolUse**: 提交前自动格式化代码
- **Stop**: Session 结束时检查是否有未提交的敏感信息

---

### 3. agents/ — Agent 定义目录

位置：`C:\Users\li\.claude\agents\`

每个 `.md` 文件定义了一个专业的 Agent，包含：
- 这个 Agent 的职责
- 它有哪些工具可用
- 什么时候适合用它

#### 内置 Agent 类型

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

#### 两种触发方式

1. **Immediate Agent Usage** — 自动触发，不需要提醒
2. **主动调用** — 需要你或 Claude Code 明确调用

#### 使用示例

```
用户："帮我实现用户认证系统"
→ Claude Code 自动调用 planner agent 做规划
→ 规划完成后调用 code-reviewer 审查代码
```

---

### 4. settings.json — 主配置

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

### 5. plans/ — 计划文件目录

位置：`C:\Users\li\.claude\plans\`

当 Claude Code 进入 **Plan Mode** 时，工作计划会保存到这里。

#### 使用方式

```bash
/plan  # 进入计划模式
```

进入后，Claude Code 会：

1. 分析任务需求
2. 制定分步计划
3. 将计划写入 plans/ 目录
4. 等待你确认后再执行

---

### 6. memory/ — 记忆系统

位置：`C:\Users\li\.claude\projects\<项目名>\memory\`

跨对话的持久化记忆系统。

#### 记忆类型

| 类型 | 用途 |
|------|------|
| `user` | 用户信息、偏好、工作方式 |
| `feedback` | 用户给出的反馈、指导 |
| `project` | 项目上下文、目标、截止时间 |
| `reference` | 外部资源位置（Linear、Grafana 等） |

#### 工作方式

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
