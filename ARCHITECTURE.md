# ARCHITECTURE.md — Safe Build Engineering

> Last updated: 2026-09-09 | Status: Phases 4–5 complete + bug fixes; Phase 6–7 (Blog) next

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 4.x (SSR enabled — `output: 'server'`) |
| Styling | Tailwind CSS v3 (config extracted from prototype) |
| Animations | GSAP 3, AOS (Animate on Scroll), Lenis (smooth scroll) |
| Page Transitions | Astro View Transitions (`<ViewTransitions />`) |
| Backend / DB | Firebase Firestore (runtime SSR fetching) |
| Auth | Firebase Auth (CMS admin panel only) |
| CMS | Separate React app (Vite) with Firebase Auth |
| Deployment | Cloudflare Pages + Workers (SSR adapter) |
| Icons | Google Material Symbols (Outlined, variable font) |
| Fonts | Google Fonts — Rajdhani, Inter, Barlow Condensed |

---

## 2. Astro Project Folder Structure

```
safebuild-web/                          # Root of Astro project
├── astro.config.mjs                    # output: 'server', Cloudflare adapter, Tailwind
├── tailwind.config.mjs                 # Full design token config (see DESIGN_SYSTEM.md)
├── package.json
├── tsconfig.json
│
├── public/
│   ├── favicon.ico
│   ├── favicon.png                     # ✅ Active favicon (745 KB PNG)
│   ├── favicon.svg                     # SVG variant
│   ├── robots.txt
│   └── images/
│       └── categories/                 # 11 category images (PNG, served statically)
│           ├── chain-hoist.png
│           ├── chain-pulley-block.png
│           ├── double-girder-cranes.png
│           ├── goliath-crane.png
│           ├── heavy-duty-crane.png
│           ├── heavy-duty-gantry-crane.png
│           ├── hot-crane.png
│           ├── industrial-eot-crane.png
│           ├── overhead-trolley.png
│           ├── rail-mounted-gantry-crane.png
│           └── underslung-crane.png
│
├── scripts/
│   └── update-images-and-publish.mjs  # One-shot batch script: sets image path + isPublished
│                                      # 20 products published, 22 hidden (run once, 2026-09-09)
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro            # <html>, ViewTransitions, GSAP/Lenis/AOS init
│   │
│   ├── components/
│   │   ├── Navbar.astro                # Global sticky navbar
│   │   ├── Footer.astro                # Global footer
│   │   ├── SectionLabel.astro          # "— LABEL TEXT" eyebrow component
│   │   ├── CTABanner.astro             # Orange CTA section (reusable)
│   │   ├── ProductCard.astro           # Card for product listing
│   │   └── BlogCard.astro              # Card for blog listing (NOT YET BUILT)
│   │
│   ├── pages/
│   │   ├── index.astro                 # Homepage (built — QA pending)
│   │   ├── about.astro                 # About page (complete)
│   │   ├── contact.astro               # Contact page (built — QA pending)
│   │   ├── 404.astro                   # ✅ Custom 404 page (static)
│   │   ├── products/
│   │   │   ├── index.astro             # Products listing page (SSR, category cards grid)
│   │   │   └── [slug].astro            # Dynamic product detail page (SSR)
│   │   └── blog/
│   │       ├── index.astro             # Blog listing page (NOT STARTED — dir exists, file empty)
│   │       └── [slug].astro            # Dynamic blog detail page (NOT STARTED)
│   │
│   ├── lib/
│   │   ├── firebase.ts                 # Firebase app + Firestore + Auth init
│   │   ├── firestore.ts                # Typed Firestore helper functions
│   │   └── types.ts                    # TypeScript interfaces for all collections
│   │
│   └── styles/
│       └── global.css                  # Base resets, sharp-edges, utility classes
│
├── Prototype/
│   └── about-raw.html                  # Exported prototype (source of truth for design)
│
├── ARCHITECTURE.md                     # This file
├── DESIGN_SYSTEM.md
├── COMPONENTS.md
├── CONTENT.md
└── TODO.md
```

> **CMS App** lives in a separate directory: `safebuild-cms/` (separate Vite + React project — not yet started)

---

## 3. Routing Table

| Route | File | Data Source | Notes |
|---|---|---|---|
| `/` | `index.astro` | Firestore (featured products) | ✅ Built (21 KB) — QA pending |
| `/about` | `about.astro` | Static | ✅ Complete |
| `/products` | `products/index.astro` | Firestore `products` (isPublished == true) | ✅ SSR — category cards grid, ?category= pre-selection |
| `/products/[slug]` | `products/[slug].astro` | Firestore `products` doc by slug | ✅ SSR — 5-section layout, sections[] renderer, quote form |
| `/blog` | `blog/index.astro` | Firestore `blogs` collection | ⬜ Not started — `blog/` dir exists, file not created |
| `/blog/[slug]` | `blog/[slug].astro` | Firestore `blogs` doc by slug | ⬜ Not started |
| `/contact` | `contact.astro` | Static form → writes to Firestore | ✅ Built (23 KB) — QA pending |
| `/quote` | Redirect → `/contact?type=quote` | Writes to `quotes` collection | |
| `/404` | `404.astro` | Static | ✅ Custom 404 page built |

---

## 4. Firebase Firestore Collections

### `products`

```
products/
  {docId}/
    slug: string              // URL slug, e.g. "goliath-crane"
    name: string              // "Goliath Crane"
    category: string          // Category slug, e.g. "double-girder-cranes"
                              // Typed as string (ProductCategory union removed — 18+ categories exist)
    categoryName?: string     // Human-readable label, e.g. "Double Girder Cranes"
    shortDescription: string  // ~80 chars, for listing cards
    tagline?: string          // Short marketing tagline (falls back to shortDescription)
    description: string       // Full body text for detail page (split on \n\n for paragraphs)
    specs: Record<string, string>
                              // Human-readable key/value map, e.g. { "Safe Working Load": "10,000 kg" }
                              // Rendered via Object.entries(specs) — no key mapping applied
    features?: string[]       // Bullet-point feature list (rendered in Section 3 of detail page)
    sections?: Array<{        // Structured detail-page content sections — renderer is LIVE
      title: string
      type: 'bullets' | 'table' | 'text'
      content: string[] | Record<string, string> | string
    }>
    image: string             // Primary product image path, e.g. "/images/categories/chain-hoist.png"
                              // NOTE: field is "image", NOT "imageUrl" — renamed 2026-09-09
                              // Empty string ("") if no individual image assigned yet
    galleryUrls?: string[]    // Additional images (optional)
    isFeatured: boolean       // Show on homepage featured section
    isPublished: boolean      // ✅ Added 2026-09-09 — controls visibility on all public pages
                              // false = hidden from listing, detail page returns null (→ redirect)
    order: number             // Manual sort order
    seoTitle?: string         // SEO page title override (empty for now)
    seoDescription?: string   // SEO meta description override (empty for now)
    seoKeywords?: string      // SEO keywords (empty for now)
    createdAt: Timestamp
    updatedAt: Timestamp
```

#### Note on `image` field (renamed from `imageUrl`)

The `imageUrl` field was renamed to `image` on 2026-09-09 across `types.ts`, `firestore.ts`, and all page files. The image path convention is `/images/categories/{category-slug}.png` — a static file served from `public/images/categories/`. Individual per-product images are pending client delivery (Sky Hawk).

#### Note on `isPublished`

`getProducts()` and `getFeaturedProducts()` filter by `isPublished == true` — unpublished products are never returned. `getProductBySlug()` returns `null` if the document has `isPublished === false`, causing the detail page to redirect to `/products`. As of 2026-09-09: **20 products published, 22 hidden**.

#### Note on `specs`

The `specs` field is `Record<string, string>` with human-readable key names.
- Rendered via `Object.entries(product.specs)` — no key mapping
- The specs `<section>` is guarded: only renders when `specRows.length > 0` (Bug 1 fix)

#### Note on `sections[]`

The `sections[]` renderer is **live** on `[slug].astro`. It renders between the Specs section and the Description/Overview section. Supports three content types:
- `bullets` — rendered as a `check_circle` icon list
- `table` — rendered as a parameter/value table matching the specs table style
- `text` — rendered as a body paragraph

The `sections[].map()` call is wrapped in a `<>...</>` Fragment to prevent a JSX fragment bug that was silently breaking all downstream siblings including the quote form section (Bug 2 fix).

#### Note on `ProductCategory` type

`ProductCategory` union type has been removed. `types.ts` now defines `ProductCategory = string` (kept as alias for backward compat only — do not use for narrowing). 18+ categories are live in Firestore.

---

### `blogs`

```
blogs/
  {docId}/
    slug: string              // URL slug, e.g. "eot-crane-maintenance-guide"
    title: string
    excerpt: string           // ~150 chars for listing cards
    body: string              // Full HTML content (rendered with set:html)
    coverImageUrl: string
    author: string
    tags: string[]            // e.g. ["EOT Cranes", "Safety", "Maintenance"]
    publishedAt: Timestamp
    isPublished: boolean
    createdAt: Timestamp
    updatedAt: Timestamp
```

### `enquiries`

```
enquiries/
  {docId}/
    name: string
    email: string
    phone: string
    company: string           // Optional
    message: string
    source: string            // "contact-form" | "product-page"
    productSlug: string       // Optional, if enquiry came from a product page
    createdAt: Timestamp
    isRead: boolean
```

### `quotes`

```
quotes/
  {docId}/
    name: string
    email: string
    phone: string
    company: string
    productInterest: string   // Product name or "General"
    capacity: string          // Requested load capacity, e.g. "10 Ton"
    span: string              // Required span, e.g. "20m"
    liftHeight: string        // e.g. "8m"
    additionalNotes: string
    createdAt: Timestamp
    status: string            // "new" | "in-review" | "quoted" | "closed"
```

---

## 5. SSR Data Fetching Pattern

All pages that require Firestore data use **server-side rendering** at request time.

```astro
---
// src/pages/products/[slug].astro
import { getProductBySlug } from '../../lib/firestore';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { slug } = Astro.params as { slug: string };

let product = null;
try {
  product = await getProductBySlug(slug);
  // Returns null if not found OR if isPublished === false
} catch (e) {
  // fetchError = true
}

if (!product) {
  return Astro.redirect('/products', 302);
}

// POST handler: server-side quote form submission
if (Astro.request.method === 'POST' && product) {
  // ... parse formData, call submitQuote(), redirect with ?submitted=1
}
---
```

### Category Cards Grid on Products Listing

`products/index.astro` replaced the old tab bar with a **category cards grid**. Cards are derived dynamically from the published product set — no separate categories collection fetch. Each card shows:
- Category image (`/images/categories/{slug}.png`) from the product's `image` field
- Category label (from `product.categoryName ?? slugToLabel(product.category)`)
- Product count

```ts
// Build one card per unique category from all published products
const categoryMap = new Map<string, CategoryCard>();
for (const p of allProducts) {
  if (!categoryMap.has(p.category)) {
    categoryMap.set(p.category, {
      slug: p.category,
      label: p.categoryName ?? slugToLabel(p.category),
      count: 0,
      image: p.image ?? '',
    });
  }
  categoryMap.get(p.category)!.count++;
}
```

The `?category=slug` query parameter pre-selects the matching card on page load (client-side JS reads the param and activates the filter). New Firestore categories automatically appear in the grid without any code change, provided they have at least one published product.

### `getProducts` — Filtering Strategy

`products/index.astro` fetches **all published products** in one Firestore call (no `where()` filter on category), then filters in JavaScript. This avoids requiring a composite Firestore index for `where('category') + orderBy('order')`.

`getProducts()` and `getFeaturedProducts()` filter by `isPublished == true` before returning. Unpublished products are never returned to any public page.

### SSG Decision

Product detail pages (`[slug].astro`) remain **SSR** (rendered on every request). SSG (`prerender = true` + `getStaticPaths()`) is **deferred** until:
1. All individual product images are delivered by client (Sky Hawk)
2. The catalog is stable (no frequent add/remove)

This is a deliberate decision — revisit after image delivery is complete.

---

## 6. Astro Config (`astro.config.mjs`)

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind()],
});
```

---

## 7. Cloudflare Deployment

- **Platform:** Cloudflare Pages (SSR via Workers)
- **Adapter:** `@astrojs/cloudflare`
- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Environment Variables** (Cloudflare Pages > Settings > Environment Variables):
  - `FIREBASE_API_KEY`
  - `FIREBASE_AUTH_DOMAIN`
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_STORAGE_BUCKET`
  - `FIREBASE_MESSAGING_SENDER_ID`
  - `FIREBASE_APP_ID`

---

## 8. CMS — Separate React App

- **Location:** `safebuild-cms/` (separate Vite + React project — **not yet started**)
- **Stack:** Vite + React + Firebase Auth + Firestore SDK
- **Auth:** Email/password Firebase Auth (single admin user)
- **Planned Features:**
  - Product CRUD (add/edit/delete, image upload to Firebase Storage)
  - Blog CRUD (rich text editor, publish/unpublish toggle)
  - Enquiries viewer (read-only, mark as read)
  - Quotes dashboard (status update, read-only form data)
- **Deploy:** Separate Cloudflare Pages app (e.g., `cms.safebuild.in`)

---

## 9. Animation & Scroll Strategy

| Library | Purpose | Init Location |
|---|---|---|
| Lenis | Smooth scroll (replaces native scroll) | `BaseLayout.astro` `<script>` block |
| GSAP | Hero text animation, stagger reveals | Per-page `<script is:inline>` |
| AOS | Scroll-triggered card/section fade-ins | `BaseLayout.astro` — `AOS.init()` on load |
| Astro View Transitions | Cross-page animated transitions | `<ViewTransitions />` in `BaseLayout.astro` |

---

## 10. Design Rules (Hard Constraints)

1. **Zero border radius everywhere** — override Tailwind's default with `borderRadius: { DEFAULT: '0', none: '0' }` and global `.sharp-edges { border-radius: 0 !important; }`
2. **Navbar and Footer are global Astro components** — never inlined in page files
3. **No static product/blog data** — all content fetched from Firestore at request time (SSR)
4. **Orange accent `#F97316` is the only action/brand color** — used for CTAs, active nav states, left border accents, and icon tints
5. **All forms save directly to Firestore** — no email-only or serverless middleman
6. **Dark backgrounds use `#171C1F` (`on-background`)** — footer, CTA banner dark variant
7. **`FeatureCard`, `VisionMissionCard`, `CoreValueBar`, `BlogCard` are NOT standalone files** — they are currently inlined in their respective pages (`about.astro`, `index.astro`). Only `Navbar`, `Footer`, `SectionLabel`, `CTABanner`, and `ProductCard` exist as separate component files.
8. **`image` not `imageUrl`** — the product image field is named `image` in Firestore, `types.ts`, `firestore.ts`, and all page files. Do not use `imageUrl`.
9. **`isPublished` gates all public product visibility** — `getProducts()`, `getFeaturedProducts()`, and `getProductBySlug()` all enforce this. Never render a product without checking `isPublished`.
10. **Products nav link is a plain `<a>`** — the Navbar `PRODUCTS` link goes directly to `/products`. No dropdown or hover sub-menu.
11. **Category images live in `public/images/categories/`** — filename matches the Firestore `category` slug exactly, e.g. `chain-hoist.png`. Image path convention: `/images/categories/{slug}.png`.
12. **Firestore security rules are locked** — `products` collection is read-only (public read, no client write). `quotes` and `enquiries` are create-only. All other access denied. See `firestore.rules`.

---

## 11. Firestore Security Rules

Current rules (`firestore.rules`) — locked as of 2026-09-09:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products — public read, no client writes
    match /products/{docId} {
      allow read: if true;
      allow write: if false;
    }
    // Quotes — create only (quote form submission)
    match /quotes/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    // Enquiries — create only (contact form submission)
    match /enquiries/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    // Default: deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> **Note:** The CMS admin panel will use Firebase Auth to bypass these rules via the Admin SDK (server-side). Client-side writes are intentionally locked.
