# ARCHITECTURE.md — Safe Build Engineering

> Last updated: 2026-09-05 | Status: In Progress (Phases 4–5 active)

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
│   ├── robots.txt
│   └── og-image.jpg                    # Default OG image
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
│   │   ├── BlogCard.astro              # Card for blog listing
│   │   ├── FeatureCard.astro           # "Why We're Different" card pattern
│   │   ├── VisionMissionCard.astro     # Vision/Mission card with left orange border
│   │   ├── CoreValueBar.astro          # Horizontal core values strip
│   │   └── QuoteForm.astro             # Quote request form (saves to Firestore)
│   │
│   ├── pages/
│   │   ├── index.astro                 # Homepage (built last)
│   │   ├── about.astro                 # About page (complete)
│   │   ├── contact.astro               # Contact page
│   │   ├── products/
│   │   │   ├── index.astro             # Products listing page (SSR, category filter)
│   │   │   └── [slug].astro            # Dynamic product detail page (SSR)
│   │   └── blog/
│   │       ├── index.astro             # Blog listing page
│   │       └── [slug].astro            # Dynamic blog detail page
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

> **CMS App** lives in a separate directory: `safebuild-cms/` (separate Vite + React project)

---

## 3. Routing Table

| Route | File | Data Source | Notes |
|---|---|---|---|
| `/` | `index.astro` | Firestore (featured products) | Built last |
| `/about` | `about.astro` | Static | Complete |
| `/products` | `products/index.astro` | Firestore `products` collection | SSR — category filter via `?category=` |
| `/products/[slug]` | `products/[slug].astro` | Firestore `products` doc by slug | SSR dynamic — `prerender = true` pending |
| `/blog` | `blog/index.astro` | Firestore `blogs` collection | SSR |
| `/blog/[slug]` | `blog/[slug].astro` | Firestore `blogs` doc by slug | SSR dynamic |
| `/contact` | `contact.astro` | Static form → writes to Firestore | SSR |
| `/quote` | Redirect → `/contact?type=quote` | Writes to `quotes` collection | |

---

## 4. Firebase Firestore Collections

### `products`

```
products/
  {docId}/
    slug: string              // URL slug, e.g. "goliath-crane"
    name: string              // "Goliath Crane"
    category: string          // "eot-cranes" | "gantry-cranes" | "hoists"
                              // NOTE: 18 product categories planned in content inventory.
                              //       ProductCategory type in types.ts currently has 3 values.
                              //       Will be expanded as seeding progresses.
    categoryName?: string     // Human-readable label, e.g. "Gantry Cranes"
    shortDescription: string  // ~80 chars, for listing cards
    tagline?: string          // Short marketing tagline shown in hero (falls back to shortDescription)
    description: string       // Full body text for detail page (split on \n\n for paragraphs)
    specs: Record<string, string>
                              // Open-ended key/value map — keys are whatever the CMS stores.
                              // e.g. { "Safe Working Load": "1000 kg to 60,000 kg", "Span": "5 m to 50 m" }
                              // NOT fixed keys. specRows are rendered directly from Object.entries(specs).
    features?: string[]       // Bullet-point feature list (Section 3 of detail page)
    sections?: Array<{        // Structured detail-page content sections (Batch 5 — pending renderer)
      title: string
      type: 'bullets' | 'table' | 'text'
      content: string[] | Record<string, string> | string
    }>
    imageUrl: string          // Primary product image (Firebase Storage or CDN URL)
                              // NOTE: Currently empty string ("") for all seeded products — placeholder shown
    galleryUrls: string[]     // Additional images
    isFeatured: boolean       // Show on homepage featured section
    order: number             // Manual sort order for listing page
    createdAt: Timestamp
    updatedAt: Timestamp
```

#### Note on `specs`

The `specs` field changed from a fixed-key interface (`ProductSpecs`) to `Record<string, string>`.
- Firestore documents store human-readable key names (e.g. `"Safe Working Load"`, `"Height of Lift"`)
- The detail page renders them via `Object.entries(product.specs)` directly
- `SPEC_LABELS` map in `[slug].astro` is **no longer used for rendering** — it remains in the file but is bypassed

#### Note on `capacity` in `ProductCard`

`ProductCard` still reads `product.specs?.capacity ?? ''` to display the capacity badge chip.
If the Firestore doc stores capacity under a different key (e.g. `"Safe Working Load"`), the chip will be empty.
This is a known issue — **Batch 4 fix: use `categoryName` field + capacity key normalisation**.

---

### `blogs`

```
blogs/
  {docId}/
    slug: string              // URL slug, e.g. "eot-crane-maintenance-guide"
    title: string
    excerpt: string           // ~150 chars for listing cards
    body: string              // Full HTML/Markdown content
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
import { getProductBySlug, getProducts } from '../../lib/firestore';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { slug } = Astro.params as { slug: string };

let product = null;
try {
  product = await getProductBySlug(slug);
} catch (e) {
  // fetchError = true
}

if (!product) {
  return Astro.redirect('/products', 302);
}
---
```

### Pending: SSG for Product Detail Pages

Product detail pages (`[slug].astro`) are currently **SSR** (rendered on every request).
A future batch will add `export const prerender = true` + `getStaticPaths()` to convert them
to **static generation** at build time. This requires seeding all 41 products first.

### `getProducts` — Category Filtering Strategy

`products/index.astro` fetches **all products** in one Firestore call (no `where()` filter),
then filters in JavaScript. This avoids requiring a composite Firestore index for
`where('category') + orderBy('order')`.

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

- **Location:** `safebuild-cms/` (separate Vite + React project)
- **Stack:** Vite + React + Firebase Auth + Firestore SDK
- **Auth:** Email/password Firebase Auth (single admin user)
- **Features:**
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
