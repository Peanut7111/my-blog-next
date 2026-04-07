import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activeNav="/posts" />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <p>抱歉，找不到这篇文章。</p>
          <Link href="/posts" className="text-yellow-600 hover:underline mt-4 block">
            返回文章列表
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeNav="/posts" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <article className="bg-card rounded-xl border-2 border-yellow-600/50 p-8">
          <header className="mb-8 pb-6 border-b border-yellow-600/30">
            <h1 className="text-3xl font-bold text-card-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span>📅</span>
                <span>{post.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{post.readingTime}</span>
              </span>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-secondary rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-sm max-w-none text-card-foreground">
            <div
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>
        </article>

        <div className="mt-8">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-500 transition-colors"
          >
            <span>←</span>
            <span>返回文章列表</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4 border-b border-yellow-600/30 pb-2">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/```(\w*)\n([\s\S]+?)```/g, '<pre class="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    .replace(/`(.+?)`/g, '<code class="bg-neutral-200 dark:bg-neutral-700 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/\n/g, '<br/>');
}
