import type { Metadata } from "next";
import { getAllPosts } from "@/lib/news";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements from Concepts & Standards: new brands, products and company news.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await getAllPosts();
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
      <h1 className="display text-[2.4rem] md:text-[3.4rem]">News</h1>
      <p className="measure mt-4 text-steel">New brands, products and announcements from Concepts &amp; Standards.</p>
      <div className="mt-12">
        {posts.length ? (
          <NewsList posts={posts} />
        ) : (
          <p className="border-t border-ink pt-7 text-steel">No announcements yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
