import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Keystatic: the website's content editor, at /keystatic.
 *
 * Everything an editor can change is described here. Saved changes are written into this repository
 * (as JSON and Markdown files under /content and images under /public) and the site republishes.
 *
 * On a developer's computer (`npm run dev`) the editor writes straight to the local files.
 * On the live site it signs in through Keystatic Cloud and commits to GitHub.
 */

const CLOUD_PROJECT = "concepts-and-standards/website"; // Keystatic Cloud team/project

const text = (label: string, description?: string) => fields.text({ label, description });
const longText = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const url = (label: string, description?: string) =>
  fields.text({
    label,
    description: description ?? "Full address starting with https://. Leave empty for no link.",
  });

export default config({
  storage:
    process.env.NODE_ENV === "development" || process.env.KEYSTATIC_LOCAL === "1"
      ? { kind: "local" }
      : { kind: "cloud" },
  cloud: { project: CLOUD_PROJECT },

  ui: {
    brand: { name: "Concepts & Standards" },
    navigation: {
      News: ["news"],
      "Home page": ["hero", "chain", "about", "journey", "journeyMilestones", "service"],
      Group: ["group", "groupCompanies"],
      Brands: ["brandsPage", "brands"],
      "Resellers & contact": ["resellers", "contact", "company"],
    },
  },

  collections: {
    news: collection({
      label: "News posts",
      path: "content/news/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["date", "draft"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "Web address",
            description: "The end of the post's address, e.g. new-showroom → /news/new-showroom",
          },
        }),
        date: fields.date({ label: "Date", validation: { isRequired: true } }),
        summary: longText("Summary", "One or two sentences shown in the news list and in link previews."),
        cover: fields.image({
          label: "Cover photo",
          description: "Optional. Shown at the top of the post and in the news list. Landscape works best.",
          directory: "public/media/news",
          publicPath: "/media/news/",
        }),
        coverAlt: text("Cover photo description", "A short description of the photo, for screen readers."),
        draft: fields.checkbox({
          label: "Draft (hidden from the website)",
          description: "Tick while you are still working on a post. Untick to publish it.",
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: "Article",
          extension: "md",
          options: {
            heading: [2, 3],
            image: { directory: "public/media/news", publicPath: "/media/news/" },
            table: false,
            codeBlock: false,
            code: false,
          },
        }),
      },
    }),

    journeyMilestones: collection({
      label: "Our journey: milestones",
      path: "content/journey/*",
      slugField: "title",
      format: { data: "json" },
      columns: ["year"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "File name", description: "Start it with the year so milestones sort in order." },
        }),
        year: text("Year"),
        text: longText("Text"),
        photo: fields.image({
          label: "Photo",
          description: "Landscape photo; it is shown wide (16:9) in black and white, in colour on hover.",
          directory: "public/media/journey",
          publicPath: "/media/journey/",
        }),
        photoAlt: text("Photo description", "A short description of the photo, for screen readers."),
      },
    }),

    groupCompanies: collection({
      label: "Our group: companies",
      path: "content/group/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["order"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        order: fields.integer({ label: "Position", description: "1 shows first.", defaultValue: 1 }),
        logo: fields.image({
          label: "Logo",
          description: "Black logo on a transparent background (SVG, or PNG).",
          directory: "public/logos/own",
          publicPath: "/logos/own/",
        }),
        text: longText("Text"),
        url: url("Website"),
        social: fields.array(
          fields.object({ label: text("Network", "e.g. Instagram"), url: url("Address") }),
          { label: "Social links", itemLabel: (p) => p.fields.label.value || "Link" },
        ),
      },
    }),

    brands: collection({
      label: "Brands",
      path: "content/brands/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["url"],
      schema: {
        name: fields.slug({ name: { label: "Brand name" } }),
        logo: fields.image({
          label: "Logo",
          description:
            "Black logo on a transparent background, SVG preferred. Only the colour may change: never alter a logo's composition. Without a logo the brand's name shows as text.",
          directory: "public/logos/brands",
          publicPath: "/logos/brands/",
        }),
        url: url("Website"),
        scale: fields.number({
          label: "Size adjustment",
          description: "1 is normal. Use e.g. 1.1 to make this logo a little bigger, 0.9 a little smaller.",
          defaultValue: 1,
          step: 0.05,
          validation: { min: 0.5, max: 1.5 },
        }),
        boxed: fields.checkbox({
          label: "Badge logo",
          description: "Tick if the logo is a solid square or rectangle. All badge logos share one height.",
        }),
      },
    }),
  },

  singletons: {
    hero: singleton({
      label: "Top of the page",
      path: "content/site/hero",
      format: { data: "json" },
      schema: {
        heading: fields.array(text("Line"), {
          label: "Heading",
          description: "Each line starts on its own line on screen.",
          itemLabel: (p) => p.value,
        }),
        body: longText("Text under the heading"),
        primaryCta: text("Main button"),
        secondaryCta: text("Second button"),
      },
    }),

    chain: singleton({
      label: "How gear reaches the stage",
      path: "content/site/chain",
      format: { data: "json" },
      schema: {
        title: text("Title"),
        steps: fields.array(
          fields.object({
            title: text("Title"),
            text: longText("Text"),
            icon: fields.select({
              label: "Icon",
              options: [
                { label: "Globe", value: "globe" },
                { label: "Box", value: "box" },
                { label: "Shop", value: "shop" },
                { label: "Speaker", value: "speaker" },
              ],
              defaultValue: "globe",
            }),
            us: fields.checkbox({ label: "This step is us (shows our logo instead of the title)" }),
          }),
          { label: "Steps", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    about: singleton({
      label: "Who we are",
      path: "content/site/about",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        paragraphs: fields.array(longText("Paragraph"), {
          label: "Paragraphs",
          itemLabel: (p) => p.value.slice(0, 60) + (p.value.length > 60 ? "…" : ""),
        }),
        facts: fields.array(fields.object({ label: text("Label"), value: text("Value") }), {
          label: "Key facts",
          itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}`,
        }),
      },
    }),

    journey: singleton({
      label: "Our journey: heading",
      path: "content/site/journey",
      format: { data: "json" },
      schema: { heading: text("Heading") },
    }),

    service: singleton({
      label: "Service and support",
      path: "content/site/service",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        intro: longText("Intro"),
        points: fields.array(fields.object({ title: text("Title"), text: longText("Text") }), {
          label: "Points",
          itemLabel: (p) => p.fields.title.value,
        }),
      },
    }),

    group: singleton({
      label: "Our group: heading",
      path: "content/site/group",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        intro: longText("Intro"),
      },
    }),

    brandsPage: singleton({
      label: "Brands we distribute: categories",
      path: "content/site/brands",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        intro: longText("Intro"),
        categories: fields.array(
          fields.object({
            name: text("Category"),
            brands: fields.array(fields.relationship({ label: "Brand", collection: "brands" }), {
              label: "Brands, in display order",
              itemLabel: (p) => p.value ?? "Choose a brand",
            }),
          }),
          { label: "Categories", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    resellers: singleton({
      label: "Sell our brands",
      path: "content/site/resellers",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        intro: longText("Intro"),
        benefits: fields.array(fields.object({ title: text("Title"), text: longText("Text") }), {
          label: "Benefits",
          itemLabel: (p) => p.fields.title.value,
        }),
      },
    }),

    contact: singleton({
      label: "Get in touch",
      path: "content/site/contact",
      format: { data: "json" },
      schema: {
        heading: text("Heading"),
        intro: longText("Intro"),
        businessTypes: fields.array(text("Type"), {
          label: "Business types in the reseller form",
          itemLabel: (p) => p.value,
        }),
      },
    }),

    company: singleton({
      label: "Company details",
      path: "content/site/company",
      format: { data: "json" },
      schema: {
        legalName: text("Legal name"),
        shortName: text("Short name"),
        tradingAs: text("Trading as"),
        tagline: longText("Tagline", "Used by search engines."),
        founded: text("Founded"),
        address: fields.object(
          {
            line1: text("Street"),
            city: text("City"),
            country: text("Country"),
            mapUrl: url("Map link"),
          },
          { label: "Address" },
        ),
        phone: text("Phone"),
        whatsapp: text("WhatsApp", "International format, digits only, e.g. 96170567149. Leave empty to hide."),
        email: text("Email"),
        hours: fields.array(text("Line"), { label: "Opening hours", itemLabel: (p) => p.value }),
        registration: text("Registration"),
        linkedin: url("LinkedIn"),
      },
    }),
  },
});
