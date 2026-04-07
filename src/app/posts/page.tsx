import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/ui/blog-cards";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>

      <div className="w-full max-w-3xl space-y-4">
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
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
