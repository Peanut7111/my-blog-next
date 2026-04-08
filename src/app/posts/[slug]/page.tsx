import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import BentoItem from "@/components/ui/scrapbook-bento-grid";

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
      <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        <BentoItem className="item-2" rotation="2deg">
          <h2 className="text-2xl font-bold mb-4">文章不存在</h2>
          <p className="opacity-70">抱歉，找不到这篇文章。</p>
          <Link href="/posts" className="text-blue-600 hover:underline mt-4 block">
            ← 返回文章列表
          </Link>
        </BentoItem>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="w-full max-w-4xl">
        {/* Back Link */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <span>←</span>
          <span>返回文章列表</span>
        </Link>

        {/* Article Card */}
        <BentoItem className="item-1" rotation="-1deg">
          <article className="p-8">
            {/* Header */}
            <header className="mb-8 pb-6 border-b border-gray-200/50 dark:border-white/10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{post.readingTime}</span>
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm text-xs hover:bg-white/70 dark:hover:bg-black/70 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              />
            </div>
          </article>
        </BentoItem>
      </div>
    </div>
  );
}

function formatContent(content: string): string {
  // 处理表格（必须在换行处理之前）
  content = content.replace(
    /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g,
    (match, header, body) => {
      const headerCells = header.split('|').map((cell: string) => cell.trim()).filter(Boolean);
      const rows = body.trim().split('\n').map((row: string) =>
        row.split('|').map((cell: string) => cell.trim()).filter(Boolean)
      );

      const thead = `<thead class="bg-neutral-100 dark:bg-neutral-800"><tr>${headerCells.map((cell: string) => `<th class="px-4 py-2 text-left font-semibold border border-neutral-300 dark:border-neutral-600">${cell}</th>`).join('')}</tr></thead>`;

      const tbody = `<tbody>${rows.map((row: string[]) => `<tr class="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">${row.map((cell: string) => `<td class="px-4 py-2 border border-neutral-200 dark:border-neutral-700">${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;

      return `<table class="w-full border-collapse border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden my-6 text-sm">${thead}${tbody}</table>`;
    }
  );

  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/```(\w*)\n([\s\S]+?)```/g, '<pre class="bg-neutral-900 text-neutral-100 p-6 rounded-xl overflow-x-auto my-6 text-sm"><code>$2</code></pre>')
    .replace(/`(.+?)`/g, '<code class="bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal text-gray-700 dark:text-gray-300 mb-2">$1</li>')
    .replace(/\n\n/g, '</p><p class="my-4 text-gray-700 dark:text-gray-300">')
    .replace(/\n/g, '<br/>');
}
