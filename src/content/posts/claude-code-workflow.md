---
title: "如何规范地使用 Claude Code 开发工程"
date: 2026-04-05
tags: ["Claude Code", "工作流程"]
description: "总结一套模板化的工程开发流程，让 Claude Code 的使用更加规范高效"
draft: false
---

## 背景

本文总结我自己的 Claude Code 工程开发规范，核心观点：**模版化的文件架构 + 标准化的开发流程 = 高质量的工程**。

---

## 一、核心原则

### 1. Rules 是基础，Hooks 是保障

| 组件 | 作用 | 性质 |
|------|------|------|
| **Rules** | 定义工作标准和规范 | 指导性 |
| **Hooks** | 自动化执行和检查 | 强制性 |

两者配合：Rules 告诉 Claude "应该怎么做"，Hooks 确保"真的做到了"。

### 2. 每个工程都应该有 CLAUDE.md

`CLAUDE.md` 是项目的"说明书"，包含：
- 项目用途和结构
- 技术栈说明
- 目录组织方式
- 注意事项和坑点
- 当前状态 / 未完成的事
- 相关文档链接

### 3. 标准化的工作流程

```
需求 → 规划 → 执行 → 审查 → 提交
```

---

## 二、工程目录结构规范

### 通用项目模板

```
项目名称/
├── .claude/
│   ├── rules/          # 规则文件
│   └── agents/         # Agent 配置
├── docs/               # 文档目录
├── src/                # 源代码
├── tests/              # 测试文件
├── CLAUDE.md           # 项目说明
└── README.md           # 入口文档
```

---

## 三、开发流程规范

### 阶段 1：项目初始化

```
1. 创建项目目录结构
2. 初始化 .claude/ 和 CLAUDE.md
3. 从 ~/.claude/rules/ 中获取 common rules 作为基础
4. 根据工程需要添加其他专用 rules
5. 创建 README.md
6. 初始化 Git 仓库
```

### 阶段 2：功能开发

```
1. 明确需求（写清 user story）
2. 规划实现步骤（使用 planner agent）
3. 遵循 Rules 执行
4. Hooks 自动检查
5. 代码审查
```

### 阶段 3：提交与部署

```
1. 确保所有 Hooks 检查通过
2. 遵循 git-workflow.md 规范提交
3. 推送后检查 CI/CD
```

---

## 四、Rules 与 Hooks 的配合模式

| 步骤 | Rules | Hooks |
|------|-------|-------|
| 开始前 | 读取 coding-style.md | — |
| 编写中 | 遵循不可变性、错误处理规范 | — |
| 完成后 | — | PostToolUse: 格式化 |
| 提交前 | 读取 git-workflow.md | — |
| 提交时 | — | Stop: 检查测试覆盖率 |

---

## 五、持续改进

### 记录踩坑

每次遇到新问题并解决后，立即更新到项目的 CLAUDE.md。

### 优化 Rules

当发现现有规范不足时，更新 `~/.claude/rules/` 中的通用规则。

---

## 相关阅读

- [AI术语笔记](/posts/ai-glossary/) — 相关术语解释
