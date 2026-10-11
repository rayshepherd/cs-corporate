import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { distributedBrands } from "@/content/site";

/**
 * Collections edited in the content editor: one JSON file per entry under /content.
 * Read at build time on the server.
 */
async function readEntries<T>(dir: string): Promise<(T & { slug: string })[]> {
  const full = path.join(process.cwd(), "content", dir);
  let files: string[] = [];
  try {
    files = (await readdir(full)).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return Promise.all(
    files.map(async (f) => ({
      ...(JSON.parse(await readFile(path.join(full, f), "utf8")) as T),
      slug: f.replace(/\.json$/, ""),
    })),
  );
}

export type Milestone = { title: string; year: string; text: string; photo: string | null; photoAlt: string };
export type GroupCompany = {
  name: string;
  order: number | null;
  logo: string | null;
  text: string;
  url: string;
  social: { label: string; url: string }[];
};
export type Brand = { name: string; logo: string | null; url: string; scale: number | null; boxed: boolean };

/** Journey milestones, oldest first. */
export async function getMilestones(): Promise<Milestone[]> {
  const items = await readEntries<Milestone>("journey");
  return items.sort((a, b) => a.year.localeCompare(b.year) || a.slug.localeCompare(b.slug));
}

/** Group companies in their set position. */
export async function getGroupCompanies(): Promise<GroupCompany[]> {
  const items = await readEntries<GroupCompany>("group");
  return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.name.localeCompare(b.name));
}

/** Brand categories with their brands, in the order set on the brands page. */
export async function getBrandCategories(): Promise<{ name: string; brands: (Brand & { slug: string })[] }[]> {
  const all = new Map((await readEntries<Brand>("brands")).map((b) => [b.slug, b]));
  return distributedBrands.categories.map((c) => ({
    name: c.name,
    brands: c.brands.flatMap((slug) => {
      const b = slug ? all.get(slug) : undefined;
      return b ? [b] : [];
    }),
  }));
}
