import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/news";

export function NewsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-t border-ink">
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-rule">
          <Link
            href={`/news/${p.slug}`}
            className={`group grid gap-4 py-7 md:gap-10 ${
              p.cover ? "md:grid-cols-[180px_1fr_260px]" : "md:grid-cols-[180px_1fr]"
            }`}
          >
            <time dateTime={p.date} className="text-steel">
              {formatDate(p.date)}
            </time>
            <span>
              <span className="display block text-xl group-hover:underline group-hover:underline-offset-4 md:text-2xl">
                {p.title}
              </span>
              {p.summary && <span className="measure mt-2 block text-steel">{p.summary}</span>}
            </span>
            {p.cover && (
              <span className="relative block aspect-[3/2] overflow-hidden bg-ink">
                <Image
                  src={p.cover}
                  alt={p.coverAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 260px, 100vw"
                  className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
