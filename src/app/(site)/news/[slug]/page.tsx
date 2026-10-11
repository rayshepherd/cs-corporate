import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost } from "@/lib/news";

// Every post is built ahead of time; any other address under /news is a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.coverAlt ?? post.title }] } : {}),
    },
  };
}

export default async function NewsPost({ params }: PageProps<"/news/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
      <Link href="/news" className="text-steel underline-offset-4 hover:text-ink hover:underline">
        All news
      </Link>
      <header className="mt-8 max-w-3xl">
        <time dateTime={post.date} className="text-steel">
          {formatDate(post.date)}
        </time>
        <h1 className="display mt-3 text-[2.2rem] md:text-[3.2rem]">{post.title}</h1>
      </header>
      {post.cover && (
        <figure className="relative mt-10 aspect-[16/9] overflow-hidden bg-ink">
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            priority
            sizes="(min-width: 1180px) 1116px, 100vw"
            className="object-cover"
          />
        </figure>
      )}
      <div className="prose-cs measure mt-10 text-[1.125rem]" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
