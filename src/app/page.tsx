import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { BackgroundPaths } from "@/components/ui/background-paths";
import BlogCard from "@/components/ui/blog-cards";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with BackgroundPaths */}
      <BackgroundPaths
        title="冒险日志"
        subtitle="Vibe Coding Journey - 记录学习 Claude Code 的过程"
        actionLabel="开始冒险"
        actionHref="/posts"
      />

      {/* Recent Posts */}
      <section className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📝</span>
          <span>最新文章</span>
        </h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              href={`/posts/${post.slug}`}
              title={post.title}
              date={post.date}
              description={post.description || ""}
              tags={post.tags}
              readingTime={post.readingTime}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/posts"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            查看全部文章 →
          </Link>
        </div>
      </section>
    </div>
  );
}
