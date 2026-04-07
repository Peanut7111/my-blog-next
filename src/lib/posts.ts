import fs from "fs";
import path from "path";
import { Post, PostFrontmatter } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function parseFrontmatter(content: string): { data: PostFrontmatter; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: { title: "", date: "" } as PostFrontmatter, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const data: Record<string, unknown> = {};

  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        data[key.trim()] = value.slice(1, -1);
      } else if (value.startsWith("[") && value.endsWith("]")) {
        data[key.trim()] = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      } else if (value === "true") {
        data[key.trim()] = true;
      } else if (value === "false") {
        data[key.trim()] = false;
      } else if (!isNaN(Number(value)) && value !== "") {
        data[key.trim()] = Number(value);
      } else {
        data[key.trim()] = value;
      }
    }
  });

  return { data: data as unknown as PostFrontmatter, content: body };
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.length / 2;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} 分钟`;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts: Post[] = [];

  files.forEach((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(postsDirectory, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    const { data, content: body } = parseFrontmatter(content);

    if (data.draft) return;

    posts.push({
      slug,
      ...data,
      content: body,
      readingTime: calculateReadingTime(body),
    } as Post);
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}
