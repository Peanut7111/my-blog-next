---
title: "AI术语笔记"
date: 2026-04-05
tags: ["AI术语"]
description: "记录AI领域常见的英文术语和缩写，便于理解和使用"
draft: false
---

## AI 术语笔记

本文记录 AI 领域常见的英文术语和缩写，用简洁的语言解释概念。

---

## 核心概念

### LLM (Large Language Model)

**大型语言模型**。一种基于深度学习的神经网络，通过海量文本训练来预测下一个 token（词元）。

常见 LLM：GPT、Claude、Llama、DeepSeek 等。

### Token

**词元**。LLM 处理文本的最小单位。英文中 1 token ≈ 1 个单词；中文中 1 token ≈ 1-2 个汉字。

### Context Window

**上下文窗口**。LLM 一次能处理的 token 总数上限，包括输入和输出。

### Temperature

**温度参数**。控制输出随机性的参数：
- `temperature = 0`：输出几乎确定
- `temperature = 0.7~1.0`：输出更多样

### Hallucination

**幻觉**。LLM 生成看似合理但实际错误或不存在的信息。

---

## RAG 相关

### RAG (Retrieval Augmented Generation)

**检索增强生成**。一种让 LLM 回答基于私有知识的技术。

### Vector Database

**向量数据库**。存储文本嵌入向量的数据库，通过语义相似度搜索内容。

### Embedding

**嵌入/向量化**。把文本转换成数字向量的过程，相似文本有相似的向量。

---

## Agent 相关

### AI Agent

**AI 代理/智能体**。能够自主规划、使用工具，完成复杂任务的 AI 系统。

### MCP (Model Context Protocol)

**模型上下文协议**。Anthropic 提出的标准协议，让 AI 能安全地连接外部数据源和工具。

### Tool Use

**工具调用**。LLM 通过生成特殊指令来调用外部工具，扩展其能力边界。

---

## Claude Code 相关

### Skill

在 Claude Code 中，**Skill** 是经过经验优化好的提示词文档，用于特定任务的执行代理。

### Hooks (钩子)

**Hooks** 是 Claude Code 中的自动化机制，在特定生命周期事件触发时自动执行脚本或命令。

### Rules (规则)

**Rules** 是 Claude Code 中的提示词规则文件，定义工作流程和最佳实践。

### CLAUDE.md

**CLAUDE.md** 是项目级的说明文件，供 AI 在该项目中快速了解上下文。

---

## 其他常见术语

| 术语 | 全称 | 解释 |
|------|------|------|
| **API** | Application Programming Interface | 程序接口 |
| **Streaming** | — | 流式输出，边生成边显示 |
| **Benchmark** | — | 基准测试，评估模型性能的标准 |
