import Link from "next/link";

interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  href?: string;
  tags?: string[];
  readingTime?: string;
}

const BlogCard = ({ title, date, description, href, tags, readingTime }: BlogCardProps) => {
  const content = (
    <div className='w-full min-h-20 p-4 space-y-1 blog-card group'>
      <div className='flex justify-center gap-1 items-end relative'>
        <div className="md:text-2xl text-xl font-serif whitespace-nowrap dark:text-neutral-100 text-neutral-700 group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] transition-all duration-500 ease-out">
          {title}
        </div>
        <span className='w-full border-b-[0.5px] border-dashed dark:border-neutral-600 border-neutral-400 group-hover:border-[#ce624c] dark:group-hover:border-[#ce624c] mb-[6px]'></span>
        <div className='dark:text-neutral-400 text-neutral-500 whitespace-nowrap uppercase group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] font-mono md:text-base text-xs'>
          {date}
        </div>
      </div>
      <div className="dark:text-neutral-400 text-neutral-500 md:text-lg group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c] md:max-w-full max-w-sm">
        {description}
      </div>
      {(tags || readingTime) && (
        <div className="flex items-center gap-4 mt-2">
          {readingTime && (
            <span className="text-xs font-mono dark:text-neutral-500 text-neutral-400 group-hover:text-[#ce624c] dark:group-hover:text-[#ce624c]">
              {readingTime}
            </span>
          )}
          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 group-hover:bg-[#ce624c]/20 group-hover:text-[#ce624c]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:no-underline">
        {content}
      </Link>
    );
  }

  return content;
};

export default BlogCard;
