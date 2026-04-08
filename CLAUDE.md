# CLAUDE.md

Peanut 的冒险博客 - Next.js + shadcn/ui 个人博客项目

## 项目用途

个人技术博客，使用 Next.js App Router 构建，用于记录学习和使用 Claude Code 进行编程的冒险旅程。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **主题**: next-themes (Dark/Light Mode)
- **部署**: GitHub Pages (静态导出)

## 目录结构

```
my-blog-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── posts/             # 文章列表 & 文章详情
│   │   ├── tags/              # 标签页
│   │   ├── archive/           # 归档页
│   │   └── about/             # 关于页
│   ├── components/
│   │   ├── ui/                # shadcn/ui 组件 & 业务组件
│   │   │   ├── blog-cards.tsx       # 博客卡片
│   │   │   ├── scrapbook-bento-grid.tsx  # Bento 网格
│   │   │   ├── background-paths.tsx  # 背景动画
│   │   │   ├── profile-card.tsx    # 名片组件
│   │   │   ├── sidebar.tsx          # 侧边导航栏
│   │   │   └── theme-provider.tsx   # 主题 Provider
│   │   └── theme/             # 主题相关
│   ├── content/
│   │   └── posts/             # Markdown 文章源文件
│   └── lib/
│       ├── posts.ts            # 文章加载工具
│       └── utils.ts            # 工具函数 (cn)
└── public/                     # 静态资源
```

## 文章管理

**文章目录**: `src/content/posts/`

添加新文章：创建 `.md` 文件

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

**注意**: `draft: false` 确保文章发布（设为 `true` 则为草稿不显示）

## 组件使用规范

| 组件 | 用途 | 位置 |
|------|------|------|
| `BlogCard` | 文章列表卡片 | posts 页、首页最新文章 |
| `BentoItem` | 展示卡片容器 | 文章详情页 |
| `BackgroundPaths` | Hero 区域背景动画 | 首页、文章列表页 |
| `ProfileCard` | 个人名片弹窗 | 关于页 About Me 按钮 |
| `Sidebar` | 侧边导航栏 | 全局布局 |

## 页面路由

- `/` - 首页 (Hero + 最新3篇文章)
- `/posts` - 所有文章列表
- `/posts/[slug]` - 文章详情页
- `/tags` - 标签云
- `/archive` - 归档页 (按时间分组)
- `/about` - 关于页

## 部署配置

- **输出**: 静态导出 (`output: "export"`)
- **BasePath**: `/my-blog-next`
- **分支**: `master`
- **CI/CD**: GitHub Actions 自动部署

## 注意事项

1. **文章解析**: 使用正则解析 Markdown，`draft` 字段必须为布尔值 `false` 才能显示
2. **静态图片**: Next.js 图片使用 `unoptimized: true`
3. **Trailing Slash**: URL 末尾带斜杠 (`/posts/`)
4. **GitHub Pages**: basePath 为仓库名，访问路径包含 `/my-blog-next`

## 当前状态

- [x] 首页、文章列表、文章详情
- [x] 标签页、归档页、关于页
- [x] 暗色/亮色主题切换
- [x] GitHub Pages 部署
- [ ] 评论区功能
- [ ] 搜索功能

## 相关文档

- [工程规范](/posts/claude-code-workflow/) - Claude Code 开发流程
- [AI术语笔记](/posts/ai-glossary/) - 相关术语解释
