# Concepts & Standards — corporate website

One-page corporate site for Concepts & Standards SARL (trading as DJ Lab).
Built with Next.js 16 (Node.js) and Tailwind CSS 4, hosted on Vercel.

## Where things are

| What | File |
| --- | --- |
| All text, contact details, brands | `src/content/site.ts` |
| Colours | top of `src/app/globals.css` (`:root` block) |
| Logos | `public/logos/` (paths set in `site.ts`) |
| Contact / reseller form (browser) | `src/components/ContactForm.tsx` |
| Form backend | `src/app/api/contact/route.ts` |
| Email sending | `src/lib/mail.ts` |
| ERPNext Lead creation | `src/lib/erpnext.ts` |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values, or leave empty to just log submissions
npm run dev                  # http://localhost:3000
```

With no email or ERPNext settings, form submissions are printed in the terminal (development only).

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
