import Link from "next/link";
import { formatDate, type Post } from "@/lib/news";

export function NewsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-t border-ink">
      {posts.map((p) => (
        <li key={p.slug} className="border-b border-rule">
          <Link
            href={`/news/${p.slug}`}
            className="group grid gap-2 py-7 md:grid-cols-[180px_1fr] md:gap-10"
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
