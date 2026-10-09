import Link from "next/link";
import { getAllPosts } from "@/lib/news";
import { NewsList } from "./NewsList";

/** The three most recent posts, shown on the home page. Hidden when there are none. */
export async function LatestNews() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (!posts.length) return null;
  return (
    <section id="news" className="border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="display text-[1.9rem] md:text-[2.5rem]">News</h2>
          <Link href="/news" className="font-medium underline-offset-4 hover:underline">
            All news
          </Link>
        </div>
        <NewsList posts={posts} />
      </div>
    </section>
  );
}
