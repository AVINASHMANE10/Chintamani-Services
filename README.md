# Shree Chintamani Services — Website

ISO 9001:2015 certified STP and tank cleaning services, Pimpri-Chinchwad, Pune. Built on Next.js 15, deployed on Netlify.

## What's in here

```
src/
├── app/[locale]/      → Pages (home, about, services, blog, contact) in en/hi/mr
├── components/        → React components (Hero, ServiceCarousel, Footer, …)
├── data/services.ts   → The 4 services definition (edit to add/reorder/rename)
├── i18n/dictionaries/ → en.json, hi.json, mr.json — all copy lives here
├── lib/posts.ts       → Blog posts (file-based, no CMS — edit to add posts)
└── lib/utils.ts       → SITE config (address, phones, hours, GST, etc.)
public/
└── images/services/   → Real photos used across the site
```

## Local development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Netlify (one-time setup)

**Option A — Drag & drop (fastest)**

1. `npm install && npm run build`
2. Drag the entire project folder into [app.netlify.com/drop](https://app.netlify.com/drop)
3. Once deployed, go to **Site settings → Domain management** and add your domain.

**Option B — Git-connected (recommended, auto-deploys on every push)**

1. Push this repo to GitHub.
2. On Netlify: **Add new site → Import from GitHub** → pick this repo.
3. Build command auto-detects from `netlify.toml`. Click deploy.
4. Add your custom domain under **Site settings → Domain management**.
5. Add an env variable: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

## How to add a new blog post

Edit `src/lib/posts.ts` and append a new object to the `POSTS` array:

```typescript
{
  slug: 'your-post-slug',                    // URL: /blog/your-post-slug
  title: 'Your post title',
  excerpt: 'One-paragraph summary that shows on the listing page.',
  body: `First paragraph here.

Second paragraph. Use a blank line between paragraphs.

Use bullet-style lines like this:
• First point
• Second point`,
  publishedAt: '2026-05-15',                  // YYYY-MM-DD
  readingMinutes: 5,
  category: 'STP Maintenance',
  coverImage: '/images/services/stp-truck.jpg',
},
```

Commit and push — Netlify rebuilds automatically.

## How to update the address / phone / hours

Edit `src/lib/utils.ts` — the `SITE` object holds everything (address, phones, hours, GST, lat/lng, service areas). Updating this single file changes every page.

## How to change site copy (English / Hindi / Marathi)

All text lives in `src/i18n/dictionaries/{en,hi,mr}.json`. Same keys in each file. Edit the value, commit, push.

## How to swap a photo

1. Replace any file in `public/images/services/`.
2. Keep the filename and `.jpg` extension the same.
3. Optimize to ≤500 KB and ≤1600 px wide for fast loading.

## SEO checklist (already done)

- ✅ LocalBusiness schema with address, hours, area served, aggregate rating, offer catalog
- ✅ Service schema per service detail page
- ✅ Article schema per blog post
- ✅ OpenGraph + Twitter cards
- ✅ Sitemap.xml (auto-generated, includes all locales & posts)
- ✅ Robots.txt
- ✅ Hreflang alternates for en/hi/mr
- ✅ Keywords tuned for local Pune/PCMC search

## After going live

1. Submit `https://yourdomain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console)
2. Verify the Google Business Profile (Place ID: `ChIJ3dZKnb25wjsRnkIBnkGKpg4`) links to the new site
3. Update the website URL on Google Maps, Justdial, Indiamart, etc.
