/**
 * All website text and data lives here.
 * Edit this file to change what the site says — no other code needs to change.
 * News posts live separately, as Markdown files in /content/news.
 *
 * Anything marked TODO is placeholder content waiting for the real information.
 */

export const company = {
  legalName: "Concepts & Standards SARL",
  shortName: "Concepts & Standards",
  tradingAs: "DJ Lab",
  logo: "/logos/cs-logo.svg",
  logoOnDark: "/logos/cs-logo-white.svg",
  tagline: "Distributor of DJ, studio and musical instrument brands in Lebanon since 2015.",
  founded: "2015",
  address: {
    line1: "Harbor 682 Center, ATCL Street",
    city: "Kaslik",
    country: "Lebanon",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Harbor+682+Center+ATCL+Street+Kaslik+Lebanon",
  },
  phone: "+961 70 567 149",
  whatsapp: "", // TODO: set to "96170567149" if this number is on WhatsApp
  email: "info@conceptsandstandards.com",
  hours: "", // TODO: e.g. "Monday to Friday, 9:00 to 18:00" (hidden while empty)
  registration: "CR 2041133",
  social: {
    instagram: "", // TODO
    facebook: "", // TODO
    linkedin: "https://www.linkedin.com/company/concepts-&-standards-sarl",
  },
};

export const hero = {
  heading: "The brands behind Lebanon's stages, studios and booths.",
  body:
    "Since 2015, Concepts & Standards has imported, stocked and supported leading DJ and studio equipment " +
    "brands, and now musical instruments too, for retailers and professionals across Lebanon.",
  primaryCta: "Become a reseller",
  secondaryCta: "See our brands",
  /**
   * Background loop behind the hero. Made with scripts/make-hero-video.sh.
   * Leave mp4 empty to show no video. opacity: 0 (invisible) to 1 (full strength).
   */
  video: {
    mp4: "",
    webm: "",
    poster: "",
    opacity: 0.16,
  } as { mp4: string; webm: string; poster: string; opacity?: number },
};

/** The signal chain in the hero: what a distributor does, in order. */
export const chain = [
  { title: "Manufacturers", text: "International brands appoint us to represent them." },
  { title: "Concepts & Standards", text: "We import, stock, price and provide warranty." },
  { title: "Resellers", text: "Stores, installers and studios buy from us." },
  { title: "Stage and studio", text: "DJs, producers and musicians use the gear." },
];

export const about = {
  heading: "Who we are",
  paragraphs: [
    "Concepts & Standards opened in Kaslik in 2015 as a DJ gear store. As more DJs and producers came to us for " +
      "advice, stock and after-sales service, the shop grew into something larger: a distributor representing some " +
      "of the world's finest DJ and studio equipment brands in Lebanon, and supplying them to resellers across the country.",
    "In 2020 we founded our sister company, Triangle Square Trading LLC, in Dubai. In 2024 we took the same approach " +
      "into musical instruments, and today we represent major instrument brands alongside our DJ and studio lines.",
    "The way we work has not changed since the first day in Kaslik: keep stock in the country, stand behind every " +
      "product with local warranty and service, and give our resellers what they need to sell with confidence.",
  ],
  facts: [
    { label: "Founded", value: "2015, Kaslik" },
    { label: "Head office", value: "Harbor 682 Center, Kaslik" },
    { label: "Product areas", value: "DJ, studio, musical instruments" },
    { label: "Sister company", value: "Triangle Square Trading LLC, Dubai" },
  ],
};

/** Our own brand and group companies. */
export const ownBrands = {
  heading: "Our group",
  intro: "Concepts & Standards trades as DJ Lab in Lebanon and works alongside its sister company in the UAE.",
  items: [
    {
      name: "DJ Lab",
      logo: "/logos/own/djlab.svg",
      // TODO: confirm how you want DJ Lab described
      text:
        "The name DJs and producers in Lebanon have known us by since 2015. DJ Lab is the trading name of " +
        "Concepts & Standards for retail and professional customers.",
      url: "",
    },
    {
      name: "Triangle Square Trading LLC",
      logo: "",
      text:
        "Our sister company in Dubai, founded in 2020, serving customers and partners in the United Arab Emirates.",
      url: "",
    },
  ],
};

/**
 * Brands we distribute, grouped by category.
 * For each brand add the logo file to /public/logos/brands/ and set `logo`.
 * Leave `logo` empty to show the brand name as text.
 */
export const distributedBrands = {
  heading: "Brands we distribute",
  intro:
    "We are the Lebanese distributor for the brands below. Resellers can order every one of them from local stock.",
  // TODO: real brands and logos to come
  categories: [
    {
      name: "DJ equipment",
      brands: [
        { name: "Brand one", logo: "", url: "" },
        { name: "Brand two", logo: "", url: "" },
        { name: "Brand three", logo: "", url: "" },
      ],
    },
    {
      name: "Studio and production",
      brands: [
        { name: "Brand four", logo: "", url: "" },
        { name: "Brand five", logo: "", url: "" },
      ],
    },
    {
      name: "Musical instruments",
      brands: [
        { name: "Brand six", logo: "", url: "" },
        { name: "Brand seven", logo: "", url: "" },
        { name: "Brand eight", logo: "", url: "" },
      ],
    },
  ],
};

export const resellers = {
  heading: "Sell our brands",
  intro:
    "We work with music stores, online shops, installers and studios across Lebanon. Approved resellers get:",
  benefits: [
    { title: "Local stock", text: "Order from our warehouse in Lebanon instead of importing yourself." },
    { title: "Reseller pricing", text: "Trade prices with protected margins on every brand we carry." },
    { title: "Warranty handled here", text: "Faulty units are repaired or replaced through us, in Lebanon." },
    { title: "Training and demo support", text: "Product training for your staff and help with in-store demos." },
  ],
};

export const contact = {
  heading: "Get in touch",
  intro: "Send us a message, or apply to become a reseller. We reply within two working days.",
  businessTypes: [
    "Music or electronics store",
    "Online shop",
    "Installer or integrator",
    "Recording or production studio",
    "Rental or events company",
    "Venue or club",
    "Other",
  ],
};
