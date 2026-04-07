import BlogCard from "@/components/ui/blog-cards";
import Link from "next/link"

const blogData = [
    { title: "The New Design", date: "May 20 2013", description: "What those new to the field should know, and how we can help." },
    { title: "Letter Club", date: "Aug 14 2025", description: "An ode to the slow web." },
    { title: "Have the Coffee", date: "Sep 19 2025", description: "Carve space out for oppurtunity." },
]

export default function DemoOne() {
  return (
        <div className='min-h-screen w-screen flex justify-center items-center dark:bg-neutral-900'>
            <Link href='https://nazhamid.com/journal/' className={`font-mono dark:text-neutral-600 text-neutral-400 uppercase fixed mx-auto bottom-[10vh] md:text-base text-sm`}>inspired from hamid's journal</Link>
            <div className='flex flex-col space-y-8 justify-start md:w-2xl w-lg'>
                {blogData.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        date={blog.date}
                        description={blog.description}
                    />
                ))}
            </div>
        </div>
    )
}
