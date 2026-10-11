# Concepts & Standards — corporate website

One-page corporate site for Concepts & Standards SARL (trading as DJ Lab).
Built with Next.js 16 (Node.js) and Tailwind CSS 4, hosted on Vercel.

## Where things are

| What | File |
| --- | --- |
| Content editor (log in and edit) | `/keystatic` on the live site; set up in `keystatic.config.ts` |
| Page texts, contact details, brand categories | `content/site/*.json` (edited in the content editor) |
| Brands (logo, link, size) | `content/brands/*.json`, logos in `public/logos/brands/<brand>/` |
| Journey milestones | `content/journey/*.json`, photos in `public/media/journey/<milestone>/` |
| Group companies | `content/group/*.json`, logos in `public/logos/own/<company>/` |
| News posts | `content/news/*.md`, photos in `public/media/news/` |
| How the content is loaded | `src/content/site.ts` (page texts) and `src/lib/content.ts`, `src/lib/news.ts` |
| Colours (white #FFFFFF, black #000000, grey rules) | top of `src/app/globals.css` (`:root` block) |
| Typeface | DM Sans, self-hosted — the typeface of the C&S logo |
| Company logo, favicon | `public/logos/cs-logo*.svg`, `src/app/icon.svg` |
| Contact / reseller form (browser) | `src/components/ContactForm.tsx` |
| Form backend | `src/app/api/contact/route.ts` |
| Email sending | `src/lib/mail.ts` |
| ERPNext Lead creation | `src/lib/erpnext.ts` |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values, or leave empty to just log submissions
npm run dev                  # http://localhost:3000, editor at http://localhost:3000/keystatic
```

With no email or ERPNext settings, form submissions are printed in the terminal (development only).
Locally, the content editor writes straight to the files in this folder.

## Editing content and publishing news

Go to **www.conceptsandstandards.com/keystatic** and sign in (Keystatic Cloud account, invited by an
admin). Every Save is committed to GitHub and Vercel republishes the site in about 1–2 minutes.

- **News posts → Add**: title, date, summary, optional cover photo, then write the article.
  Untick **Draft** to publish; ticked posts stay off the site.
- **Brands**: one entry per brand (logo, website, size). The order and grouping on the page are set in
  **Brands we distribute: categories**. Logos: black on transparent, SVG preferred, and never change a
  logo's composition — only its colour.
- **Our journey: milestones** and **Our group: companies**: one entry each, with their photo or logo.
- Everything else (headings, texts, contact details, opening hours) is under **Home page**,
  **Resellers & contact**.

## Hero background video

The hero plays a pale black-and-white montage of stage footage with live film grain on top.

1. Put the source clips in one folder, named as in the edit list (`01.mp4`, `02.mp4`, …).
2. Edit `scripts/hero-video.json`: the cuts in playing order (clip, start and end in seconds) and
   the look (contrast, brightness, size, compression).
3. Run `node scripts/hero-video.mjs /path/to/clips` (needs ffmpeg). It writes
   `public/media/hero.mp4`, `hero.webm` and `hero-poster.jpg`.

Strength of the footage and of the grain: `hero.video.opacity` and `hero.video.grain` in
`src/content/site.ts`. Visitors who ask for reduced motion see the still poster and static grain.
Source clips are not stored in the repo.

## What the form does

1. Rejects spam silently (hidden trap field, and forms filled in under 3 seconds).
2. Validates fields and shows a message under each one that needs fixing.
3. ERPNext: looks for a Lead with the same email. If found, adds the submission as a comment on it;
   otherwise creates a Lead (type **Client** for messages, **Channel Partner** for reseller applications)
   and adds the full submission as a comment.
4. Email: sends a summary to `MAIL_TO` (or `MAIL_TO_RESELLER` for applications), with Reply-To set to the
   sender and a link to the Lead in ERPNext.
5. If one of the two fails, the visitor still sees success and the error is in the Vercel logs.
   If both fail, the visitor is asked to email directly.

## ERPNext setup (one time)

1. Create a user, e.g. `website@…`, with only the roles needed to create **Lead** and **Comment**
   (Sales User is enough).
2. On that user: **Settings → API Access → Generate Keys**. Copy the key and secret.
3. Optional: create a **Lead Source** called `Website` and set `ERPNEXT_LEAD_SOURCE=Website`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository. Framework is detected as Next.js; no build
   settings need changing.
3. **Settings → Environment Variables**: add everything from `.env.example`.
4. Deploy. Every push to `main` redeploys automatically.
5. **Settings → Domains**: add the domain and set the DNS records Vercel shows at your registrar.

## Checks before each release

```bash
npm run lint
npm run build
```
