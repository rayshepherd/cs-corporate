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
  // Each line of the heading starts on its own line on screen
  heading: ["Beirut-based.", "Handpicking the world’s most reputable music brands since 2015."],
  body:
    "Concepts & Standards S.A.R.L. connects Lebanese artists with the brands they trust. What began with " +
    "leading DJ and studio equipment now spans musical instruments too, supplied to retailers, " +
    "professionals and hobbyists alike.",
  primaryCta: "Become a reseller",
  secondaryCta: "See our brands",
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

/**
 * The signal chain in the hero: what a distributor does, in order.
 * icon: globe | box | shop | speaker. The step with `us: true` shows the company logo instead of its title.
 */
export const chainTitle = "How gear reaches the stage";
export const chain: { title: string; text: string; icon: "globe" | "box" | "shop" | "speaker"; us?: boolean }[] = [
  { title: "Manufacturers", text: "International brands appoint us to represent them.", icon: "globe" },
  { title: "Concepts & Standards", text: "We import, stock, price and provide warranty.", icon: "box", us: true },
  { title: "Resellers", text: "Stores, installers and studios buy from us.", icon: "shop" },
  { title: "Stage and studio", text: "DJs, producers and musicians use the gear.", icon: "speaker" },
];

export const about = {
  heading: "Who we are",
  paragraphs: [
    "Concepts & Standards S.A.R.L. holds exclusive distribution rights for 37 of the world’s most respected music " +
      "brands, spanning DJ and studio equipment, synthesizers and keys, guitars and amplification, and drums and percussion.",
    "We act as each brand’s partner on the ground in order to help them reach new markets where we thrive. " +
      "We import and hold stock, set local pricing, support a network of resellers across the country, and look " +
      "after every product long after it is sold.",
  ],
  facts: [
    { label: "Founded", value: "2015" },
    { label: "Exclusive brands", value: "37" },
    { label: "Offices", value: "Kaslik, Lebanon and Dubai, UAE" },
    { label: "After-sales", value: "Local repair and original parts" },
  ],
};

/**
 * Our journey: milestones in date order.
 * photo: put the image in /public/media/journey/ and set the path, e.g. "/media/journey/old-kaslik.jpg".
 * Photos are shown wide (16:9), in black and white with full colour on hover, with the text laid over
 * them in alternating corners. A milestone without a photo shows as text only.
 */
export const journey = {
  heading: "Our journey",
  milestones: [
    {
      year: "2015",
      title: "Where it started",
      text: "A DJ gear store in Kaslik, built around advice, stock and after-sales service for DJs and producers.",
      photo: "/media/journey/dj-store-2015.jpg",
      photoAlt: "The original Concepts & Standards DJ store in Kaslik, 2015",
    },
    {
      year: "2018",
      title: "A showroom in Beirut",
      text: "Our Beirut showroom brought the brands closer to the city’s artists, studios and venues.",
      photo: "/media/journey/beirut-showroom-2018.jpg",
      photoAlt: "The Concepts & Standards showroom in Beirut, 2018",
    },
    {
      year: "2020",
      title: "Triangle Square, Dubai",
      text: "Our sister company opened in Dubai as a regional distributor, with its own operations in mainland UAE.",
      photo: "/media/journey/triangle-square-2020.jpg",
      photoAlt: "The Triangle Square Trading premises in Dubai",
    },
    {
      year: "2024",
      title: "Musical instruments",
      text: "Guitars, keys, drums and percussion joined our DJ and studio lines, from Gibson and Nord to DW and LP.",
      photo: "/media/journey/musical-instruments-2024.jpg",
      photoAlt: "The musical instruments space, with guitars on display",
    },
    {
      year: "2025",
      title: "Our new home in Kaslik",
      text: "New premises at Harbor 682 Center, ATCL Street, bringing offices, stock and service under one roof.",
      photo: "/media/journey/kaslik-new.jpg",
      photoAlt: "Keyboards, a drum kit and studio gear at the new Kaslik premises",
    },
  ],
};

/** After-sales service, shown in About. */
export const service = {
  heading: "Service and support",
  intro: "Every product we distribute is supported in Lebanon, from the first sale to the last repair.",
  points: [
    { title: "Local repairs", text: "Our technicians repair products here, without sending them abroad." },
    { title: "Original spare parts", text: "We source genuine parts directly from the manufacturer when they are needed." },
    { title: "Manufacturer warranty", text: "Warranty follows each manufacturer’s own policy, handled locally by us." },
  ],
};

/** Our own brands and group companies. `url` links the logo to the brand's website (opens in a new tab). */
export const ownBrands = {
  heading: "Our group",
  // The non-breaking spaces ( ) keep "in the UAE." together on one line, even on phones
  intro: "Concepts & Standards trades as DJ Lab in Lebanon and works alongside its sister company in the UAE.",
  items: [
    {
      name: "DJ Lab",
      logo: "/logos/own/djlab.svg",
      // TODO: confirm how you want DJ Lab described
      text:
        "The name DJs and producers in Lebanon have known us by since 2015. DJ Lab is the trading name of " +
        "Concepts & Standards for retail and professional customers.",
      url: "https://djlab-lb.com",
    },
    {
      name: "Triangle Square Trading LLC",
      logo: "/logos/own/triangle-square.svg",
      text:
        "Our sister company in Dubai, founded in 2020. A regional distributor with its own operations in mainland UAE.",
      url: "https://trianglesquare.ae",
    },
    {
      name: "MPFreaks",
      logo: "/logos/own/mpfreaks.png",
      text: "Triangle Square’s online retail brand, bringing music gear to customers across the UAE.",
      url: "https://mpfreaks.com",
    },
  ],
};

/**
 * Brands we distribute, grouped by category.
 * Logos: put the file (black SVG, or black PNG with transparency) in /public/logos/brands/ and list it
 * in `brandLogos` below.
 * Rule: only the colour changes (to black). Never change a logo's composition — no removing badges,
 * outlines, symbols or marks. Use another official version of the logo only if the brand publishes one. A brand without a logo shows its name as text.
 * `brandScale` (optional) makes one logo a little bigger or smaller than the rest, e.g. 1.1 or 0.9.
 * `brandUrls` (optional) links a logo to the brand's website.
 */
const brandLogos: Record<string, string> = {
  Reloop: "/logos/brands/reloop.svg",
  Hercules: "/logos/brands/hercules.svg",
  Phase: "/logos/brands/phase.svg",
  AIAIAI: "/logos/brands/aiaiai.svg",
  Glorious: "/logos/brands/glorious.svg",
  "ADAM Audio": "/logos/brands/adam-audio.svg",
  "KRK Systems": "/logos/brands/krk.svg",
  Kanto: "/logos/brands/kanto.svg",
  Focusrite: "/logos/brands/focusrite.svg",
  Sontronics: "/logos/brands/sontronics.svg",
  Sonarworks: "/logos/brands/sonarworks.svg",
  "Monkey Banana": "/logos/brands/monkey-banana.svg",
  Novation: "/logos/brands/novation.svg",
  Arturia: "/logos/brands/arturia.svg",
  Sequential: "/logos/brands/sequential.svg",
  "Teenage Engineering": "/logos/brands/teenage-engineering.svg",
  Nord: "/logos/brands/nord.svg",
  "GEWA Keys": "/logos/brands/gewa-keys.svg",
  Gibson: "/logos/brands/gibson.svg",
  Epiphone: "/logos/brands/epiphone.svg",
  "Solar Guitars": "/logos/brands/solar-guitars.svg",
  "S by Solar": "/logos/brands/s-by-solar.svg",
  Orange: "/logos/brands/orange.svg",
  EBS: "/logos/brands/ebs.svg",
  Strymon: "/logos/brands/strymon.svg",
  Palmer: "/logos/brands/palmer.svg",
  "GHS Strings": "/logos/brands/ghs-strings.svg",
};
const brandScale: Record<string, number> = { "Monkey Banana": 1.15, Sontronics: 1.1 };
/** Logos that are a solid square or rectangle (a badge). They all share one fixed height. */
const brandBoxed = new Set(["KRK Systems", "Nord", "EBS"]);
const brandUrls: Record<string, string> = {
  Reloop: "https://www.reloop.com",
  Hercules: "https://www.hercules.com",
  Phase: "https://www.phasedj.com",
  AIAIAI: "https://aiaiai.audio",
  Glorious: "https://www.glorious.de",
  "ADAM Audio": "https://www.adam-audio.com",
  "KRK Systems": "https://www.krkmusic.com",
  Kanto: "https://www.kantoaudio.com",
  Focusrite: "https://focusrite.com",
  Sontronics: "https://www.sontronics.com",
  Sonarworks: "https://www.sonarworks.com",
  Novation: "https://novationmusic.com",
  Arturia: "https://www.arturia.com",
  Sequential: "https://sequential.com",
  "Teenage Engineering": "https://teenage.engineering",
  Nord: "https://www.nordkeyboards.com",
  Gibson: "https://www.gibson.com",
  Epiphone: "https://www.epiphone.com",
  "Solar Guitars": "https://www.solar-guitars.com",
  Orange: "https://orangeamps.com",
  EBS: "https://www.ebssweden.com",
  Strymon: "https://www.strymon.net",
  "GHS Strings": "https://www.ghsstrings.com",
};
const b = (name: string) => ({
  name,
  logo: brandLogos[name] ?? "",
  url: brandUrls[name] ?? "",
  scale: brandScale[name] ?? 1,
  boxed: brandBoxed.has(name),
});
export const distributedBrands = {
  heading: "Brands we distribute",
  intro: "We hold exclusive distribution rights for every brand below. Resellers order all of them from our local stock.",
  categories: [
    { name: "DJ", brands: ["Reloop", "Hercules", "Phase", "AIAIAI", "Glorious"].map(b) },
    {
      name: "Studio and recording",
      brands: ["ADAM Audio", "KRK Systems", "Kanto", "Focusrite", "Sontronics", "Sonarworks", "Monkey Banana"].map(b),
    },
    {
      name: "Synthesizers and keys",
      brands: ["Novation", "Arturia", "Sequential", "Teenage Engineering", "Nord", "GEWA Keys"].map(b),
    },
    {
      name: "Guitars, bass and amplification",
      brands: ["Gibson", "Epiphone", "Solar Guitars", "S by Solar", "Orange", "EBS", "Strymon", "Palmer", "GHS Strings"].map(b),
    },
    {
      name: "Drums and percussion",
      brands: ["DW", "PDP", "Premier Percussion", "LP", "Vater Percussion", "Bosphorus Cymbals", "Schlagwerk"].map(b),
    },
    { name: "Stands, cables and accessories", brands: ["Gravity", "Adam Hall Cables", "Earproof"].map(b) },
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
