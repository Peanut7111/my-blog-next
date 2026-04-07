import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/ui/blog-cards";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <h1 className="scrapbook-title mb-12">📜 All Posts</h1>

      <div className="w-full max-w-3xl space-y-6">
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
    </div>
  );
}
