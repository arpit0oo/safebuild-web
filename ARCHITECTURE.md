# ARCHITECTURE.md — Safe Build Engineering

> Last updated: 2026-08-30 | Status: Planning / In Progress

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
│   │   ├── about.astro                 # About page (in progress — first conversion)
│   │   ├── contact.astro               # Contact page
│   │   ├── products/
│   │   │   ├── index.astro             # Products listing page
│   │   │   └── [slug].astro            # Dynamic product detail page
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
| `/about` | `about.astro` | Static | First conversion |
| `/products` | `products/index.astro` | Firestore `products` collection | SSR |
| `/products/[slug]` | `products/[slug].astro` | Firestore `products` doc by slug | SSR dynamic |
| `/blog` | `blog/index.astro` | Firestore `blogs` collection | SSR |
| `/blog/[slug]` | `blog/[slug].astro` | Firestore `blogs` doc by slug | SSR dynamic |
| `/contact` | `contact.astro` | Static form → writes to Firestore | SSR |
| `/quote` | Redirect → `/contact` with `?type=quote` | Writes to `quotes` collection | |

---

## 4. Firebase Firestore Collections

### `products`
```
products/
  {docId}/
    slug: string              // URL slug, e.g. "eot-crane-5-ton"
    name: string              // "5-Ton EOT Crane"
    category: string          // "EOT Cranes" | "Gantry Cranes" | "Hoists"
    shortDescription: string  // ~80 chars, for listing cards
    description: string       // Full markdown or HTML body for detail page
    specs: {                  // Key technical specs
      capacity: string        // "5 Ton"
      span: string            // "Up to 30m"
      liftHeight: string      // "Up to 12m"
      driveType: string       // "FRD / CRD"
      dutyCycle: string       // "M3 / M4 / M5"
    }
    imageUrl: string          // Primary product image (Firebase Storage or CDN URL)
    galleryUrls: string[]     // Additional images
    isFeatured: boolean       // Show on homepage
    order: number             // Manual sort order for listing
    createdAt: Timestamp
    updatedAt: Timestamp
```

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

All pages that require Firestore data use **server-side rendering** at request time. No static generation for data-driven pages.

```astro
---
// src/pages/products/[slug].astro
import { getProductBySlug } from '../../lib/firestore';
import BaseLayout from '../../layouts/BaseLayout.astro';

const { slug } = Astro.params;
const product = await getProductBySlug(slug);

if (!product) {
  return Astro.redirect('/products', 302);
}
---

<BaseLayout title={`${product.name} — Safe Build Engineering`}>
  <!-- page content -->
</BaseLayout>
```

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
