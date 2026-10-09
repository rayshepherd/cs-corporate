/**
 * All website text and data lives here.
 * Edit this file to change what the site says — no other code needs to change.
 *
 * Anything marked TODO is placeholder content waiting for the real information.
 */

export const company = {
  legalName: "Concepts & Standards SARL",
  shortName: "Concepts & Standards",
  tradingAs: "DJ Lab",
  // TODO: put the logo file in /public/logos/ and set the path, e.g. "/logos/cs-logo.svg"
  logo: "",
  logoOnDark: "", // version of the logo for the dark footer
  tagline: "Distribution of DJ, pro audio, AV and musical instrument brands in Lebanon.",
  // TODO: confirm founding year
  founded: "20XX",
  address: {
    // TODO: real street address
    line1: "Street, Building, Floor",
    city: "Kaslik",
    country: "Lebanon",
    mapUrl: "", // TODO: Google Maps share link
  },
  phone: "+961 X XXX XXX", // TODO
  whatsapp: "", // TODO: e.g. "9613XXXXXX" (digits only) to show a WhatsApp link
  email: "info@example.com", // TODO
  hours: "Monday to Friday, 9:00 to 18:00", // TODO
  // TODO: commercial register number, shown in the footer
  registration: "CR No. XXXXX",
  social: {
    instagram: "", // TODO
    facebook: "", // TODO
    linkedin: "", // TODO
  },
};

export const hero = {
  heading: "The brands behind Lebanon's stages, studios and booths.",
  body:
    "Concepts & Standards imports, stocks and supports DJ, pro audio, AV and musical instrument brands, " +
    "and supplies them to retailers, installers and professionals across the country.",
  primaryCta: "Become a reseller",
  secondaryCta: "See our brands",
};

/** The signal chain in the hero: what a distributor does, in order. */
export const chain = [
  { title: "Manufacturers", text: "International brands appoint us to represent them." },
  { title: "Concepts & Standards", text: "We import, stock, price and provide warranty." },
  { title: "Resellers", text: "Stores, installers and rental companies buy from us." },
  { title: "Stage and studio", text: "DJs, musicians and venues use the gear." },
];

export const about = {
  heading: "Who we are",
  // TODO: replace with your own story
  paragraphs: [
    "Concepts & Standards SARL is a Lebanese distribution company. Under the DJ Lab name we have supplied DJs, " +
      "producers and venues for years, and we now carry a growing range of musical instruments alongside our DJ " +
      "and audio lines.",
    "We hold local stock, handle warranty and after-sales service in Lebanon, and work with a network of " +
      "resellers who bring these products to their own customers.",
  ],
  // Short facts shown beside the text. TODO: confirm every value.
  facts: [
    { label: "Founded", value: "20XX" },
    { label: "Showroom", value: "Kaslik, Lebanon" },
    { label: "Product areas", value: "DJ, pro audio, AV, instruments" },
    { label: "Sister company", value: "Triangle Square Trading LLC, UAE" },
  ],
};

/** Brands owned or operated by the company. */
export const ownBrands = {
  heading: "Our brands",
  intro: "The names we built and run ourselves.",
  items: [
    {
      name: "DJ Lab",
      logo: "", // TODO: e.g. "/logos/own/djlab.svg"
      // TODO: describe DJ Lab in your words (store, showroom, café, academy...?)
      text:
        "Our retail and showroom brand in Kaslik, where customers try equipment before they buy and get " +
        "advice from people who use it.",
      url: "", // TODO: e.g. "https://djlab.xyz"
    },
    {
      name: "DJ Lab Café",
      logo: "", // TODO
      text: "A café inside our Kaslik space where the DJ and music community meets.", // TODO: confirm
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
  // TODO: replace placeholders with your real brands and categories
  categories: [
    {
      name: "DJ and production",
      brands: [
        { name: "Brand one", logo: "", url: "" },
        { name: "Brand two", logo: "", url: "" },
        { name: "Brand three", logo: "", url: "" },
      ],
    },
    {
      name: "Pro audio",
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
    {
      name: "AV and lighting",
      brands: [{ name: "Brand nine", logo: "", url: "" }],
    },
  ],
};

export const resellers = {
  heading: "Sell our brands",
  intro:
    "We work with music stores, online shops, installers and rental companies across Lebanon. " +
    "Approved resellers get:",
  // TODO: confirm what you actually offer resellers
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
    "Rental or production company",
    "Venue or club",
    "Other",
  ],
};
