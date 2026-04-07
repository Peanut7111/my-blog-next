import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import BentoItem from "@/components/ui/scrapbook-bento-grid";

const TAG_COLORS = [
  "item-1", // amber
  "item-2", // blue
  "item-3", // green
  "item-4", // purple
  "item-5", // orange
  "item-6", // pink
];

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <h1 className="scrapbook-title mb-12">🏷️ Tags</h1>

      <div className="bento-grid">
        {tags.map((tag, index) => (
          <Link key={tag.name} href={`/tags/${encodeURIComponent(tag.name)}`}>
            <BentoItem
              className={TAG_COLORS[index % TAG_COLORS.length]}
              rotation={`${(index % 5) - 2}deg`}
            >
              <h2 className="text-2xl font-bold">{tag.name}</h2>
              <p className="text-base opacity-70">
                {tag.count} 篇 文章
              </p>
            </BentoItem>
          </Link>
        ))}
      </div>
    </div>
  );
}
