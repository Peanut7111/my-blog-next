import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Timeline } from "@/components/ui/timeline-component";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}

export default function ArchivePage() {
  const posts = getAllPosts();

  // Group posts by year
  const timeline: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    if (!timeline[year]) timeline[year] = [];
    timeline[year].push(post);
  });

  // Convert to timeline events
  const events = Object.keys(timeline)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .flatMap((year) => {
      const yearPosts = timeline[year].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return yearPosts.map((post) => ({
        year,
        title: post.title,
        date: formatDate(post.date),
        content: (
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {post.description}
            </p>
            <Link
              href={`/posts/${post.slug}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              阅读更多 →
            </Link>
          </div>
        ),
      }));
    });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <h1 className="scrapbook-title mb-12">📅 Archive</h1>

      <Timeline events={events} showYear />
    </div>
  );
}
