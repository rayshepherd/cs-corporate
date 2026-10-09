import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/**
 * News posts are Markdown files in /content/news. The file name is the web address:
 * content/news/new-showroom.md  →  /news/new-showroom
 *
 * Each file starts with a short header:
 * ---
 * title: Our new showroom is open
 * date: 2026-11-02
 * summary: One or two sentences shown in the news list.
 * draft: false
 * ---
 * Set draft: true to keep a post off the site while you work on it.
 */

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  html: string;
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

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
    if (data.draft === "true") continue;
    if (!data.title || !/^\d{4}-\d{2}-\d{2}$/.test(data.date || "")) {
      throw new Error(`News post ${file} needs a title and a date written as YYYY-MM-DD`);
    }
    posts.push({
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      summary: data.summary || "",
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
