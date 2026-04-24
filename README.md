# Shree Chintamani Services — Website

A production-grade, trilingual (English / हिन्दी / मराठी) Next.js 15 website for **Shree Chintamani Services** — ISO 9001:2015 certified tank, facade, and deep-cleaning services, Pune.

Built for SEO, premium aesthetics, and easy content management.

---

## Table of contents

1. [What you get](#1-what-you-get)
2. [Prerequisites](#2-prerequisites)
3. [First run (local development)](#3-first-run-local-development)
4. [Environment variables](#4-environment-variables)
5. [Project structure](#5-project-structure)
6. [Deploying to Vercel (free)](#6-deploying-to-vercel-free)
7. [Setting up the contact form](#7-setting-up-the-contact-form)
8. [Setting up the blog (Sanity CMS)](#8-setting-up-the-blog-sanity-cms)
9. [Replacing the placeholder logo](#9-replacing-the-placeholder-logo)
10. [Adding or editing content](#10-adding-or-editing-content)
11. [How the three languages work](#11-how-the-three-languages-work)
12. [SEO checklist before going live](#12-seo-checklist-before-going-live)
13. [Tech stack summary](#13-tech-stack-summary)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. What you get

- **Homepage** with animated hero, services grid, "why us" section, 4-step process, and CTA band
- **About page** with mission / vision / values / credentials
- **Services index + 6 individual service pages** — Domestic Water Tank, STP & Fire Tank, Industrial & Cooling Tower, Facade Cleaning, Deep Cleaning, Solar Water Heater
- **Blog index + article pages** (3 seed articles shipped; easily swap to Sanity later)
- **Contact page** with working form, address block, and Google Maps embed
- **Three languages** — English, Hindi, Marathi — with auto-detection from browser and a language switcher
- **SEO**: automatic sitemap, robots.txt, per-page Open Graph, LocalBusiness JSON-LD schema, canonical + hreflang tags
- **Responsive** from 320 px phones to ultrawide desktops
- **Premium UI** — custom type system (Instrument Serif + Manrope + Tiro Devanagari Marathi), custom ink/aqua palette, motion-driven animations, asymmetric grid layouts

---

## 2. Prerequisites

You need **Node.js 20 or newer** installed. Check yours:

```bash
node --version   # must be v20.x or higher
npm --version
```

If you don't have it: download from https://nodejs.org (pick the LTS build).

A code editor helps — [VS Code](https://code.visualstudio.com/) is free and has excellent TypeScript support.

---

## 3. First run (local development)

```bash
# 1. Install dependencies (takes 1–2 minutes first time)
npm install

# 2. Copy the environment template
cp .env.local.example .env.local
# (on Windows: copy .env.local.example .env.local)

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000 — it will redirect to `/en`. Try `/hi` or `/mr` directly to see the other languages, or use the language switcher in the top-right corner.

Changes to any file hot-reload in the browser instantly.

**If the first build fails with a Google Fonts error:** you need internet access. Next.js downloads and caches the fonts on first build. Once cached, no further internet is required.

---

## 4. Environment variables

Everything goes in `.env.local` (gitignored, never commit). The template `.env.local.example` lists every variable.

| Variable | When to set | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Before deploying | The final URL, e.g. `https://shreechintamaniservices.com`. Used for sitemap, canonical tags, OG images. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Before launch | Free signup at [web3forms.com](https://web3forms.com). See § 7. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | When ready for CMS | Free signup at [sanity.io](https://www.sanity.io). See § 8. |
| `NEXT_PUBLIC_SANITY_DATASET` | Same | Usually `production`. |
| `SANITY_API_READ_TOKEN` | Same | Generate from Sanity dashboard. |

The site runs locally without any of these — the form will show "something went wrong" and the blog will serve 3 fallback articles — but you need them filled before production.

---

## 5. Project structure

```
shree-chintamani-services/
├── public/                      # Static assets served at /
│   ├── logo.svg                 # Header logo (placeholder — replace)
│   ├── logo-white.svg           # Footer logo (for dark backgrounds)
│   └── favicon.svg              # Browser tab icon
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout — metadata
│   │   ├── globals.css          # Tailwind + design system
│   │   ├── sitemap.ts           # Auto-generated sitemap.xml
│   │   ├── robots.ts            # Auto-generated robots.txt
│   │   └── [locale]/            # Every page lives under a locale segment
│   │       ├── layout.tsx       # Loads fonts, nav, footer
│   │       ├── page.tsx         # Homepage
│   │       ├── about/page.tsx
│   │       ├── services/
│   │       │   ├── page.tsx     # Services index
│   │       │   └── [slug]/      # Service detail (dynamic)
│   │       ├── blog/
│   │       │   ├── page.tsx
│   │       │   └── [slug]/
│   │       └── contact/page.tsx
│   ├── components/              # Reusable UI
│   │   ├── Navbar.tsx           # Sticky top nav, mobile drawer
│   │   ├── Footer.tsx           # Dark footer
│   │   ├── LanguageSwitcher.tsx # EN / हिंदी / मराठी toggle
│   │   ├── Hero.tsx             # Homepage hero with animated SVG
│   │   ├── ServicesGrid.tsx     # Asymmetric 6-card layout
│   │   ├── WhyChooseUs.tsx      # Dark "why us" section
│   │   ├── ProcessSection.tsx   # 4-step process
│   │   ├── CTASection.tsx       # Call-to-action band
│   │   └── ContactForm.tsx      # Web3Forms-powered form
│   ├── i18n/
│   │   ├── locales.ts           # Shared locale types (client-safe)
│   │   ├── config.ts            # Server-only dictionary loader
│   │   └── dictionaries/
│   │       ├── en.json          # ← EDIT English text here
│   │       ├── hi.json          # ← EDIT Hindi text here
│   │       └── mr.json          # ← EDIT Marathi text here
│   ├── data/
│   │   └── services.ts          # The 6 services (icon, accent, slug)
│   ├── lib/
│   │   ├── utils.ts             # Site constants (phone, email, address)
│   │   └── sanity.ts            # Blog CMS stub + 3 seed articles
│   └── middleware.ts            # Detects browser language, redirects to /en|hi|mr
├── .env.local.example
├── next.config.mjs
├── tailwind.config.ts           # Colors, fonts, animations
├── tsconfig.json
└── package.json
```

---

## 6. Deploying to Vercel (free)

This is the fastest, cheapest, best-performance deploy. Takes ~5 minutes.

**Step 1. Push this project to GitHub.**

```bash
git init
git add .
git commit -m "Initial commit"
# create a new empty repo on github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/shree-chintamani-services.git
git branch -M main
git push -u origin main
```

**Step 2. Sign up at [vercel.com](https://vercel.com)** — use "Continue with GitHub" for zero friction.

**Step 3. Click "Add New → Project".** Pick your GitHub repo. Vercel auto-detects Next.js — accept all defaults.

**Step 4. Add environment variables** (before the first deploy):
- Click "Environment Variables"
- Add `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app` (update after custom domain)
- Add `NEXT_PUBLIC_WEB3FORMS_KEY` once you have one
- Leave Sanity keys blank for now

**Step 5. Click "Deploy".** ~2 minutes later, it's live.

**Step 6. Add a custom domain** (when ready):
- Buy one from [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (cheapest, no markup, ~₹800–1,200/year)
- In Vercel: Project → Settings → Domains → Add `shreechintamaniservices.com`
- Vercel shows you the DNS records to add at Cloudflare. Copy them over.
- Done — HTTPS and global CDN included free.

Every future `git push` to `main` auto-deploys. Branches get preview URLs.

**Alternatives:** Cloudflare Pages, Netlify — both free, slightly fewer Next.js-specific optimizations.

---

## 7. Setting up the contact form

The form uses **Web3Forms** — free, no backend needed, no credit card.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter the email where you want enquiries delivered (`chintamani1937@gmail.com`)
3. Copy the access key they show you
4. Paste it in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY=...`
5. In Vercel: Project → Settings → Environment Variables → add the same key

That's it — submissions will land in the configured inbox within seconds.

**Daily limits on free tier:** 250 submissions/month. Fine for a local services business; upgrade if you outgrow it.

---

## 8. Setting up the blog (Sanity CMS)

Until you do this step, the blog shows 3 hand-written seed articles from `src/lib/sanity.ts`. That's fine for launch — you can wire up Sanity whenever the client is ready.

**When ready:**

```bash
# 1. Create a Sanity project (in a separate folder outside this one)
npm create sanity@latest -- --template clean --create-project "Shree Chintamani Blog" --dataset production

# 2. Follow the prompts. Sanity will give you a project ID.

# 3. In this project, install the Sanity client
npm install @sanity/client @portabletext/react

# 4. Add env vars to .env.local:
#    NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
#    NEXT_PUBLIC_SANITY_DATASET=production
#    SANITY_API_READ_TOKEN=(generate from sanity.io/manage)

# 5. In src/lib/sanity.ts, uncomment the live-query block and delete FALLBACK_POSTS
```

The client will then log into `https://your-project.sanity.studio`, write posts in a visual editor, hit publish, and they appear on the site instantly (Next will revalidate the static pages).

Full Sanity + Next.js guide: https://www.sanity.io/guides/nextjs-app-router-live-preview

---

## 9. Replacing the placeholder logo

The current logo (water droplet + "Shree Chintamani" wordmark) lives in three files:

```
public/logo.svg          ← navbar, light backgrounds
public/logo-white.svg    ← footer, dark backgrounds
public/favicon.svg       ← browser tab
```

**When the real logo is ready:**

- If SVG: just overwrite the files (keep filenames the same).
- If PNG: save as `logo.png` / `logo-white.png` / `favicon.png` and update the `src="/logo.svg"` references in `src/components/Navbar.tsx` (2 places) and `src/components/Footer.tsx` (1 place) to the new filenames. Target height for the logo is ~40 px; export at 2× (80 px tall) for retina.
- If you want an `.ico` favicon: also drop a 32×32 `favicon.ico` into `public/` and Next will pick it up automatically.

---

## 10. Adding or editing content

### Editing existing text (most common)

All user-facing text lives in three JSON files:

```
src/i18n/dictionaries/en.json
src/i18n/dictionaries/hi.json
src/i18n/dictionaries/mr.json
```

Find the string you want to change, edit it in all three files, save. The dev server hot-reloads. If you don't translate all three, the page will show the untranslated string in the wrong language — not broken, just awkward. Keep them in sync.

### Adding a new service

1. Open `src/data/services.ts`. Add a new entry to the `services` array with a unique slug, a lucide-react icon, an accent gradient class, and a number.
2. Open each of the three dictionary files. In the `services` block, add a new key matching the slug — copy the shape of an existing one and fill in `name`, `short`, `tagline`, `overview`, and `features` (5 bullets recommended).
3. Save. The new service appears on `/services`, in the footer, and at `/services/your-new-slug` automatically.

### Adding a blog article (without Sanity)

Open `src/lib/sanity.ts`. Add a new object to `FALLBACK_POSTS` — slug, title, excerpt, body, publishedAt (YYYY-MM-DD), readingMinutes, category.

Separate paragraphs with blank lines in the `body` field. Save. The post appears at `/blog` and `/blog/your-slug`.

### Changing contact details, address, GSTIN

All business constants are in one place: `src/lib/utils.ts`. Change once, it updates everywhere (navbar, footer, contact page, schema.org data, sitemap).

---

## 11. How the three languages work

**Auto-detection.** When someone lands on `/`, the middleware (`src/middleware.ts`) reads their browser's `Accept-Language` header and redirects:
- Hindi-preferring browsers → `/hi`
- Marathi-preferring browsers → `/mr`
- Everyone else → `/en` (default)

**Manual switching.** The globe icon in the top-right shows all three options. Clicking one swaps the URL's locale prefix and reloads.

**SEO.** Every page sends proper `hreflang` tags so Google indexes all three versions and serves each to the right audience. The sitemap includes all pages × all locales.

**Where translations live.** One JSON file per language, under `src/i18n/dictionaries/`. They share the exact same key structure — if you add a key in one, add it in all three.

**Fonts.** Devanagari script (Hindi/Marathi) uses **Tiro Devanagari Marathi**; Latin script uses **Instrument Serif** (display) and **Manrope** (body). Browsers use the right one automatically based on the character range.

---

## 12. SEO checklist before going live

- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain in Vercel
- [ ] Submit `https://yourdomain.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Create a [Google Business Profile](https://www.google.com/business/) for the physical office — single biggest local-SEO win for services businesses
- [ ] Add real social profile URLs in `src/lib/utils.ts` → `SITE.social` (currently placeholders)
- [ ] Add 2–3 real blog posts targeting local keywords like *"water tank cleaning Pune"*, *"how often clean overhead tank"*, *"facade cleaning Pimpri Chinchwad"*
- [ ] Once you have 5–10 happy customers, ask for Google reviews — shows up in local search
- [ ] Add Google Analytics if desired: set `NEXT_PUBLIC_GA_ID` and follow [Next.js GA guide](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)

---

## 13. Tech stack summary

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server-rendered HTML for SEO; static where possible; dynamic where needed |
| UI Language | React 19 + TypeScript | Type safety stops whole classes of bugs before they ship |
| Styling | Tailwind CSS v3 | Fast, custom, no generic Bootstrap look |
| Animations | [motion](https://motion.dev/) | The modern, smaller successor to framer-motion |
| Icons | lucide-react | Consistent, tree-shakeable, no image files |
| Forms | Web3Forms | Free backend-less form submissions |
| Blog CMS | Sanity (optional) | Visual editor for non-technical client |
| Hosting | Vercel | Free tier, built by the Next.js team, global CDN |
| Domain | Cloudflare Registrar | Cheapest, no markup |

---

## 14. Troubleshooting

**`npm install` fails with peer dependency errors.**
Run `npm install --legacy-peer-deps` once. Happens when package versions disagree on React — the flag tells npm to use the versions specified.

**Build fails with "Failed to fetch font from Google Fonts".**
Your machine had no internet when building. Fix: connect and re-run `npm run build`. Next caches the fonts after the first successful build.

**Port 3000 already in use.**
Run `npm run dev -- -p 3001` to use a different port.

**Contact form says "something went wrong".**
Check that `NEXT_PUBLIC_WEB3FORMS_KEY` is set in `.env.local` (for dev) AND in Vercel's env vars (for production). Restart `npm run dev` after changing `.env.local`.

**Language switcher doesn't appear / 404 on /hi or /mr.**
The middleware file must be at `src/middleware.ts` (not inside `src/app/`). If you accidentally moved it, move it back.

**Site looks unstyled.**
`src/app/globals.css` must be imported from `src/app/layout.tsx`. Don't delete that import.

**Changed text in en.json but nothing updates.**
Dev server hot-reloads JSON but occasionally misses dictionary changes. Stop (`Ctrl+C`) and restart `npm run dev`.

**Deploy succeeds but pages show 404.**
Usually a missing env var on Vercel. Check that `NEXT_PUBLIC_SITE_URL` is set and includes `https://`.

---

## Questions

- Address, GSTIN, phone numbers, ISO details: `src/lib/utils.ts`
- All text content: `src/i18n/dictionaries/*.json`
- Colors, fonts, spacing: `tailwind.config.ts` + `src/app/globals.css`
- Page layout: `src/app/[locale]/*/page.tsx`

Good luck — ship it fast and iterate. The whole point of this stack is that changes are cheap.
