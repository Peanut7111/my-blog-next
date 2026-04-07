import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag.name) }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeNav="/tags" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span>🏷️</span>
          <span>标签: {decodedTag}</span>
        </h2>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">没有找到相关文章。</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block p-6 rounded-xl border-2 border-yellow-600/50 bg-card hover:border-yellow-500 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-card-foreground hover:text-yellow-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mt-2">{post.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/tags"
            className="text-yellow-600 hover:text-yellow-500 transition-colors"
          >
            ← 返回所有标签
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
