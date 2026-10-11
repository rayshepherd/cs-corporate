import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { JSON_SCHEMA, load as loadYaml } from "js-yaml";
import { marked } from "marked";

/**
 * News posts are Markdown files in /content/news, written in the content editor (/keystatic → News posts).
 * The file name is the web address: content/news/new-showroom.md  →  /news/new-showroom
 *
 * Each file starts with a short header:
 * ---
 * title: Our new showroom is open
 * date: 2026-11-02
 * summary: One or two sentences shown in the news list.
 * cover: /media/news/new-showroom/cover.jpg   (optional)
 * coverAlt: The new showroom                   (optional)
 * draft: false
 * ---
 * Posts with draft: true stay off the site.
 */

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  cover?: string;
  coverAlt?: string;
  html: string;
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  // JSON_SCHEMA keeps dates as plain text (2026-10-09) instead of turning them into Date objects
  const data = (loadYaml(m[1], { schema: JSON_SCHEMA }) ?? {}) as Record<string, unknown>;
  return { data, body: m[2] };
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v));

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = (await readdir(NEWS_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const posts: Post[] = [];
  for (const file of files) {
    const { data, body } = parseFrontmatter(await readFile(path.join(NEWS_DIR, file), "utf8"));
    if (data.draft === true || data.draft === "true") continue;
    const title = str(data.title);
    const date = str(data.date);
    if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`News post ${file} needs a title and a date written as YYYY-MM-DD`);
    }
    posts.push({
      slug: file.replace(/\.md$/, ""),
      title,
      date,
      summary: str(data.summary),
      cover: str(data.cover) || undefined,
      coverAlt: str(data.coverAlt) || undefined,
      html: await marked.parse(body),
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
