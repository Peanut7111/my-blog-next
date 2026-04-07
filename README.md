# Peanut's Adventure Blog

一个使用 Next.js + shadcn/ui + Tailwind CSS 构建的个性化博客。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run start
```

---

## 内容管理

### 📝 文章管理

**文章目录：** `src/content/posts/`

**添加新文章：**
在该目录下创建 `.md` 文件，使用以下格式：

```markdown
---
title: "文章标题"
date: 2026-04-10
tags: ["标签1", "标签2"]
description: "文章描述"
draft: false
---

正文内容...
```

**注意事项：**
- `draft: false` 确保文章发布（设为 `true` 则为草稿不显示）
- `tags` 支持多个标签，用逗号分隔
- 日期格式为 `YYYY-MM-DD`

**修改现有文章：** 直接编辑对应文件

---

### 👤 关于页个人信息

**文件位置：** `src/components/ui/profile-card.tsx`

修改 `PROFILE_DATA` 对象中的内容：

```typescript
const PROFILE_DATA = {
  name: "Peanut",                    // 姓名
  role: "Vibe Coder",               // 角色
  location: "冒险大陆",               // 位置
  email: "peanut@blog.dev",          // 邮箱
  github: "github.com/Peanut7111",  // GitHub
  mbti: "INFJ",                     // MBTI
  mbtiDescription: "倡导者人格 - 富有想象力且理想主义",
  purpose: "记录学习和使用 Claude Code 进行编程的博客...",
  motto: "山高万仞，直登一步",        // 信条
  mottoMeaning: "无论山多高，只要迈出第一步，就能到达顶峰。",
};
```

---

## 修改后命令

| 修改内容 | 命令 |
|---------|------|
| 修改文章 | `npm run build` |
| 修改个人信息 | `npm run build` |
| 修改样式/CSS | `npm run build` |
| 新增页面/组件 | `npm run build` |

**开发模式：** 修改后会自动热更新，无需手动执行命令。

---

## 项目结构

```
my-blog-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── posts/             # 文章列表
│   │   ├── tags/              # 标签页
│   │   ├── archive/           # 归档页
│   │   └── about/             # 关于页
│   ├── components/
│   │   ├── ui/                # shadcn/ui 组件
│   │   └── theme/             # 主题相关
│   ├── content/
│   │   └── posts/             # Markdown 文章
│   └── lib/
│       ├── posts.ts            # 文章加载逻辑
│       └── utils.ts            # 工具函数
└── public/                     # 静态资源
```

---

## 技术栈

- **框架：** Next.js 16 (App Router)
- **UI：** shadcn/ui + Tailwind CSS
- **动画：** Framer Motion
- **图标：** Lucide React
- **主题：** next-themes (Dark/Light Mode)

---

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 上创建新仓库，仓库名为 `my-blog-next`（公开仓库）。

### 2. 本地初始化并推送

```bash
cd my-blog-next
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Peanut7111/my-blog-next.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 进入 GitHub 仓库 → **Settings**
2. 左侧菜单选择 **Pages**
3. Source 选择 **GitHub Actions**
4. 保存

### 4. 自动部署

每次推送到 `main` 分支后，GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

### 5. 访问你的博客

地址：`https://Peanut7111.github.io/my-blog-next/`

---

## 部署后更新内容

修改文章或内容后，直接推送到 GitHub：

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions 会自动重新部署。
