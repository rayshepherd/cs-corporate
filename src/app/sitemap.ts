import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/news";
import { SITE_URL } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latest = posts[0]?.date;
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/news`, lastModified: latest, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/news/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
