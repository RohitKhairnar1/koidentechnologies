# Koiden Technologies — B2B Industrial Supply Website

A premium, restrained B2B website for **Koiden Technologies**, an industrial
supply company in India selling battery-pack components: battery cells, BMS
boards, nickel strips, and assembly materials.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, structured for
clean GitHub version control and one-click Vercel deployment.

---

## What's inside

- **Image-led homepage** with alternating editorial rows (not a repeating grid).
- **Client-side catalog filter engine** — search, category, spec facets, and
  sort, all computed in the browser with no server round-trips.
- **Product detail pages** that replace a retail cart with a prominent, direct
  **Bulk Enquiry Form**.
- **Enquiry API handler** (`/api/enquiry`) that validates submissions and
  optionally forwards them to a webhook.
- Premium enterprise visual system: deep-navy surfaces, white/light sections,
  a single strong-blue CTA accent, oversized typography, and rounded cards.
- **Technical SEO**: `robots.txt`, `sitemap.xml`, an SVG favicon, complete
  Open Graph / Twitter metadata, and JSON-LD structured data (Organization,
  WebSite search action, Product, BreadcrumbList, FAQPage).
- **Trust content**: a `/how-to-order` page with an ordering walkthrough and an
  accessible (no-JS) FAQ accordion.
- **Accessibility**: skip-to-content link, keyboard/touch-operable mega-menu,
  and `prefers-reduced-motion` support.
- **Enquiry hardening**: honeypot spam trap and server-side length limits.

## Tech stack

| Concern      | Choice                        |
| ------------ | ----------------------------- |
| Framework    | Next.js 14 (App Router)       |
| Language     | TypeScript                    |
| Styling      | Tailwind CSS                  |
| Deployment   | Vercel (zero-config)          |

## Project layout

```
src/
├── app/
│   ├── layout.tsx            # Root layout, header + footer, fonts, metadata
│   ├── page.tsx              # Homepage (image-led, alternating sections)
│   ├── globals.css           # Design tokens + component classes
│   ├── catalog/page.tsx      # Catalog shell (renders the filter engine)
│   ├── products/[slug]/      # Product detail + bulk enquiry form
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── not-found.tsx
│   └── api/enquiry/route.ts  # Form handler
├── components/               # Header, Footer, CatalogFilter, forms, cards
├── data/products.ts          # Catalog data (SAMPLE — replace before launch)
└── lib/
    ├── site.ts               # Company details (fill in the TODOs)
    └── filter.ts             # Pure client-side filter/sort logic
```

## Getting started (local)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo. Framework is detected
   automatically; no build settings to change.
3. (Optional) Add environment variables from `.env.example` under
   **Settings → Environment Variables**.
4. Deploy. Every push to the default branch redeploys.

## Before launch — replace the placeholders

This site ships with **no invented claims**. The following are deliberately
left as clearly-marked placeholders for you to fill with verified information:

- **`src/lib/site.ts`** — email, phone, address, GSTIN/CIN, hours (`TODO`s),
  and the production `url` (or set `NEXT_PUBLIC_SITE_URL` on Vercel).
- **Open Graph image** — add a branded `1200×630` PNG at `/public/og.png` and
  uncomment the `images` line in `src/app/layout.tsx`.
- **FAQ policies** — `src/data/faq.ts` defers MOQ/lead-time/payment specifics
  to "confirmed at quote"; tighten with Koiden's real policies.
- **`src/data/products.ts`** — sample products built from standard industry
  form factors. Replace with Koiden's real catalog, and only add
  certifications, test data, or performance claims you can substantiate.
- **Imagery** — visuals use a branded vector illustration set
  (`src/components/illustrations.tsx`, rendered via `<Illustration>`), so the
  site looks finished without stock photos. To use real photography, drop a
  file in `public/images/` and pass its path as `src` to `<Illustration>`
  (e.g. `<Illustration art="battery-cells" src="/images/cells.jpg" alt="…" />`);
  it renders an optimised `next/image` and the illustration becomes the
  fallback — no other page changes needed.
- **Enquiry delivery** — set `ENQUIRY_WEBHOOK_URL` (and/or wire an email
  provider) in `src/app/api/enquiry/route.ts` so enquiries reach your inbox.

## The enquiry flow

Product pages have no "add to cart" / price-per-unit. Instead each carries a
Bulk Enquiry Form that POSTs to `/api/enquiry`. The handler validates the
payload, logs it to the Vercel function logs, and — if `ENQUIRY_WEBHOOK_URL`
is set — forwards it as JSON to your CRM/Slack/Zapier endpoint.
