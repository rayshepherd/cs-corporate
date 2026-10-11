/**
 * Website text and settings.
 *
 * The text lives in /content as JSON and Markdown files, edited through the content editor at /keystatic
 * (see keystatic.config.ts). This file only loads those files and adds the few settings that are not
 * meant to be edited there, such as logo files and the hero video.
 *
 * Collections with one file per entry (brands, journey milestones, group companies, news) are read on the
 * server, in src/lib/content.ts and src/lib/news.ts.
 */
import companyData from "../../content/site/company.json";
import heroData from "../../content/site/hero.json";
import chainData from "../../content/site/chain.json";
import aboutData from "../../content/site/about.json";
import journeyData from "../../content/site/journey.json";
import serviceData from "../../content/site/service.json";
import groupData from "../../content/site/group.json";
import brandsData from "../../content/site/brands.json";
import resellersData from "../../content/site/resellers.json";
import contactData from "../../content/site/contact.json";

export const company = {
  ...companyData,
  logo: "/logos/cs-logo.svg",
  logoOnDark: "/logos/cs-logo-white.svg",
  social: { linkedin: companyData.linkedin },
};

export const hero = {
  ...heroData,
  /**
   * Background loop behind the hero.
   * Made with: node scripts/hero-video.mjs <folder-with-clips>  (edit list in scripts/hero-video.json)
   * Leave mp4 empty to show no video.
   * opacity: strength of the footage, 0 (invisible) to 1 (full). grain: strength of the film grain, 0 to turn off.
   */
  video: {
    mp4: "/media/hero.mp4",
    webm: "/media/hero.webm",
    poster: "/media/hero-poster.jpg",
    opacity: 0.2,
    grain: 0.28,
  } as { mp4: string; webm: string; poster: string; opacity?: number; grain?: number },
};

export type ChainIcon = "globe" | "box" | "shop" | "speaker";
export const chainTitle = chainData.title;
export const chain = chainData.steps as { title: string; text: string; icon: ChainIcon; us: boolean }[];

export const about = aboutData;
export const journey = journeyData;
export const service = serviceData;
export const ownBrands = groupData;
/** Headings and categories of the brands section. Each category lists brand file names (slugs) in order. */
export const distributedBrands = brandsData;
export const resellers = resellersData;
export const contact = contactData;
