# ARCHITECTURE.md — Safe Build Engineering

> Last updated: 2026-10-11 | Status: Firebase removed, Sanity CMS & Google Sheets active; Services page is next to build; Blog deprioritized

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 4.x (SSR enabled — `output: 'server'`) |
| Styling | Tailwind CSS v3 (custom config extracted from prototype) |
| Animations | GSAP 3, AOS (Animate on Scroll), Lenis (smooth scroll) |
| Page Transitions | Astro View Transitions (`<ViewTransitions />`) with `astro:after-swap` rebindings |
| Content Management (CMS) | Sanity CMS (`@sanity/client` runtime GROQ queries) |
| Form Submissions | Google Sheets via Apps Script Webhook (fire-and-forget `fetch`) |
| Domain | `safebuilds.in` (canonical URL: `https://safebuilds.in`) |
| Corporate Email | Zoho Mail (4 accounts configured for `safebuilds.in`, primary: `info@safebuilds.in`) |
| Deployment | Cloudflare Pages + Workers (`@astrojs/cloudflare` SSR adapter) |
| Icons | Google Material Symbols (Outlined, variable font) |
| Brand Assets | Real logo images (`logo-icon.png` in Navbar, `logo-full.png` in Footer) |
| Fonts | Google Fonts — Rajdhani, Inter, Barlow Condensed |

> **Note on Architecture Evolution:**
> Firebase (Firestore, Auth, Firebase SDK) has been **completely removed**.
> Content is hosted and managed in **Sanity CMS**.
> Contact and quote form submissions are ingested directly into **Google Sheets** via an Apps Script webhook.

---

## 2. Astro Project Folder Structure

```
safebuild-web/                          # Root of Astro project
├── astro.config.mjs                    # output: 'server', Cloudflare adapter, Tailwind
├── tailwind.config.mjs                 # Full design token config (see DESIGN_SYSTEM.md)
├── package.json
├── tsconfig.json
├── .env.local                          # Local environment variables (Sanity + Sheets)
│
├── public/
│   ├── favicon.ico
│   ├── favicon.png                     # Active favicon
│   ├── favicon.svg                     # SVG variant
│   ├── logo-icon.png                   # Navbar brand icon
│   ├── logo-full.png                   # Footer full brand logo
│   ├── robots.txt
│   └── images/
│       └── categories/                 # Category images (PNG fallback)
│
├── scripts/
│   └── migrate-to-sanity.mjs          # Migration script from local JSON to Sanity
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro            # <html>, canonical, ViewTransitions, Lenis + AOS init
│   │
│   ├── components/
│   │   ├── Navbar.astro                # Global sticky navbar (logo-icon.png, initNavbar on swap)
│   │   ├── Footer.astro                # Global footer (logo-full.png, info@safebuilds.in, legal name)
│   │   ├── SectionLabel.astro          # "— LABEL TEXT" eyebrow component
│   │   ├── CTABanner.astro             # Orange CTA section (reusable)
│   │   └── ProductCard.astro           # Card for product listing
│   │
│   ├── pages/
│   │   ├── index.astro                 # Homepage (SSR Sanity featured products, GSAP hero)
│   │   ├── about.astro                 # About page (static company story & values)
│   │   ├── services.astro              # Services page (NEXT TASK TO BUILD)
│   │   ├── contact.astro               # Contact page (Sanity categories dropdown, Sheets forms)
│   │   ├── 404.astro                   # Custom 404 page (static)
│   │   ├── products/
│   │   │   ├── index.astro             # Products listing page (SSR Sanity fetch, client-side category filter)
│   │   │   └── [slug].astro            # Dynamic product detail page (SSR Sanity fetch, quote form to Sheets)
│   │   └── blog/                       # DEPRIORITIZED (not in immediate plan)
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── lib/
│   │   ├── sanity.ts                   # Sanity client & typed GROQ query functions
│   │   ├── sheets.ts                   # Google Sheets webhook fire-and-forget submission helpers
│   │   └── types.ts                    # TypeScript interfaces for Sanity documents & forms
│   │
│   └── styles/
│       └── global.css                  # Base resets, sharp-edges, button and input styles
│
├── ARCHITECTURE.md                     # This file
├── DESIGN_SYSTEM.md
├── COMPONENTS.md
├── CONTENT.md
└── TODO.md
```

---

## 3. Routing Table

| Route | File | Data Source | Notes |
|---|---|---|---|
| `/` | `index.astro` | Sanity (`getFeaturedProducts`, fallback `getProducts`) | ✅ Active (SSR) — GSAP hero animation, featured product cards |
| `/about` | `about.astro` | Static | ✅ Complete |
| `/services` | `services.astro` | Static / CMS | 🚀 **Next task to build** — Planned engineering services showcase |
| `/products` | `products/index.astro` | Sanity `getProducts()` | ✅ SSR — Dynamic category cards grid, instant client-side filter |
| `/products/[slug]` | `products/[slug].astro` | Sanity `getProductBySlug(slug)` | ✅ SSR — Specs table, dynamic `sections[]`, Sheets quote form |
| `/contact` | `contact.astro` | Sanity `getCategories()` → Google Sheets webhook | ✅ SSR — Dynamic dropdown, fire-and-forget Sheets enquiry & quote |
| `/quote` | Redirect → `/contact?type=quote` | Writes to Google Sheets | Direct quote shortcut |
| `/404` | `404.astro` | Static | ✅ Custom 404 page |
| `/blog` | `blog/index.astro` | Deprioritized | ⏸️ Deprioritized — not in immediate roadmap |
| `/blog/[slug]` | `blog/[slug].astro` | Deprioritized | ⏸️ Deprioritized |

---

## 4. Content & Data Architecture

### 4.1 Sanity CMS (`src/lib/sanity.ts`)

Sanity CMS serves as the primary content repository for products and categories. The client is configured with `@sanity/client`:

```ts
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN,
});
```

#### Document Type: `product`
- `name`: Product name string
- `slug`: Sanity slug (`slug.current`)
- `category`: Category slug string
- `categoryName`: Human-readable category title
- `image`: Sanity image asset URL projection (`image.asset->url`)
- `tagline`: Marketing tagline (falls back to `shortDescription`)
- `description`: Full body text for detail page (split by `\n\n`)
- `shortDescription`: ~80–100 character summary for cards
- `order`: Manual numeric sorting order
- `isFeatured`: Boolean for homepage featured section
- `isPublished`: Boolean gating public visibility (`*[_type == "product" && isPublished == true]`)
- `skyhawkUrl`: External technical asset reference
- `features`: Array of string feature bullets
- `specs`: Array of `{ key: string, value: string }`
- `sections`: Array of flexible structured sections:
  - `title`: Section title string (guarded against `null` / `undefined`)
  - `type`: `'bullets' | 'table' | 'text'`
  - `bullets`: `string[]` (when type is bullets)
  - `text`: `string` (when type is text)
  - `tableRows`: Array of `{ key: string, value: string }` (when type is table)
- `seoTitle`, `seoDescription`, `seoKeywords`: SEO metadata overrides

#### Document Type: `category`
- `name`: Category title string
- `slug`: Sanity slug (`slug.current`)
- `image`: Category cover image projection (`image.asset->url`)
- `description`: Category overview text
- `features`: Array of string bullets
- `isPublished`: Boolean flag
- `seoTitle`, `seoDescription`, `seoKeywords`: SEO metadata overrides

---

### 4.2 Google Sheets Webhook Integration (`src/lib/sheets.ts`)

All form submissions (enquiries and quote requests) are sent to a dedicated Google Apps Script Webhook (`SHEETS_WEBHOOK_URL`).

```ts
const WEBHOOK_URL = import.meta.env.SHEETS_WEBHOOK_URL;

export async function submitEnquiry(data: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
}) {
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'enquiry', ...data }),
    redirect: 'follow',
  });
  // Apps Script always returns 302 → fire-and-forget; don't await response to avoid cold-start wait
}

export async function submitQuote(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  capacity: string;
  span: string;
  liftHeight: string;
  additionalNotes: string;
}) {
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'quote', ...data }),
    redirect: 'follow',
  });
  // Apps Script always returns 302 → fire-and-forget; don't await response to avoid cold-start wait
}
```

#### Key Architecture Principles for Form Submissions:
1. **Fire-and-Forget `fetch`**: Google Apps Script webhooks can experience cold starts (2–4 seconds) and typically return HTTP 302 redirects. By dispatching `fetch()` without awaiting resolution, user requests redirect immediately without perceived lag.
2. **`data-astro-reload`**: Form tags specify `data-astro-reload` to bypass client-side Astro View Transitions on submit, preventing client routing interference and guaranteeing reliable server POST execution.
3. **Redirect with Query Flags**: Upon submission, the server returns a 302 redirect to `/contact?eq=1#enquiry`, `/contact?qr=1#quote`, or `/products/[slug]?submitted=1#quote`, preventing form resubmission on browser refresh.

---

## 5. SSR Data Fetching & Rendering Patterns

- **Runtime SSR**: Server-side queries run in Astro frontmatter at request time using `sanityClient.fetch()`.
- **Dynamic Category Count**: Category cards and counts are derived directly from published products returned by Sanity, preventing discrepancies between database content and UI.
- **Client-Side Product Filtering**: `products/index.astro` renders all published products into the DOM tagged with `data-category="{slug}"`. Filtering runs via lightweight vanilla JavaScript for instant UI updates with zero additional network requests.
- **Deep Null Guards on Dynamic Content**: In `products/[slug].astro`, flexible CMS sections are safely guarded:
  ```astro
  <SectionLabel text={`— ${(section.title ?? '').toUpperCase()}`} />
  <h2>{section.title}</h2>
  ```
  Empty or missing titles are gracefully handled without breaking rendering.

---

## 6. Astro Configuration (`astro.config.mjs`)

```js
// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
      applyBaseStyles: false,
    }),
  ],
});
```

---

## 7. Cloudflare Deployment & Environment Variables

- **Platform:** Cloudflare Pages (SSR via Cloudflare Workers runtime)
- **Adapter:** `@astrojs/cloudflare`
- **Domain:** `https://safebuilds.in`
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`

### Production Environment Variables (Cloudflare Pages Dashboard):

All legacy `FIREBASE_*` environment variables have been **completely removed**. The application requires only the following:

| Variable Name | Exposure | Purpose |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Public / Client & Server | Sanity Project ID (`5vqxh570`) |
| `PUBLIC_SANITY_DATASET` | Public / Client & Server | Sanity Dataset (`production`) |
| `SANITY_API_TOKEN` | Server / Secret | Sanity API token for authenticated queries |
| `SHEETS_WEBHOOK_URL` | Server / Secret | Google Apps Script Webhook URL for form submissions |

---

## 8. Corporate Email & Domain Configuration

- **Domain:** `safebuilds.in`
- **Email Service Provider:** Zoho Mail
- **Configured Accounts:** 4 professional mailboxes set up under `safebuilds.in`
- **Primary Public Contact Email:** `info@safebuilds.in`
- **Legacy Gmail Discontinued:** The old Gmail (`safebuildengineering26@gmail.com`) is completely replaced across all code and documentation.

---

## 9. Animation, View Transitions & Script Rebinding

| Library | Purpose | Implementation Location |
|---|---|---|
| Lenis | Smooth scrolling | `BaseLayout.astro` |
| GSAP | Staggered hero text reveals | `src/pages/index.astro` |
| AOS | Scroll-triggered element reveals | `BaseLayout.astro` (initialized on load and `astro:page-load`) |
| Astro View Transitions | Single-page transition effects | `<ViewTransitions />` in `BaseLayout.astro` |

### Critical View Transition Rebinding Pattern:
Because Astro View Transitions swap the `<body>` element on navigation, event listeners attached to DOM elements are lost unless re-bound. 
- In `Navbar.astro`, mobile hamburger and drawer listeners are wrapped in `initNavbar()`:
  ```js
  initNavbar();
  document.addEventListener('astro:after-swap', initNavbar);
  ```
- Escape key listener is bound once to `document` to avoid duplicate listener accumulation.

---

## 10. Design & Architecture Hard Constraints

1. **Zero Border Radius**: Industrial aesthetic enforced with `0` border-radius globally across all buttons, cards, containers, and inputs.
2. **Brand Logos**:
   - Navbar brand uses `/logo-icon.png` (`h-7 w-auto`).
   - Footer brand uses `/logo-full.png` (`h-12 w-auto`).
   - Former temporary Material Symbol `type_specimen` proxy has been retired.
3. **No Firebase Dependencies**: Firebase SDK, Firestore rules, and Auth libraries are completely purged from the codebase.
4. **Form Delivery Guarantee**: Forms submit to Astro server routes, which fire-and-forget to Google Sheets, using `data-astro-reload` to bypass View Transitions.
5. **Services Page Priority**: The Services page (`/services`) is the immediate next build item.
6. **Blog Deprioritized**: Blog routes (`/blog`, `/blog/[slug]`) are postponed and not part of the active development phase.
7. **Legal Entity Name**: Displayed as "Safebuild Engineering Private Limited" in footer bottom bar.
