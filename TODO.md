# TODO.md — Safe Build Engineering Build Order

> Status key: ✅ Done | 🔄 In Progress | ⬜ Not Started | 🚫 Blocked
> Last updated: 2026-09-09

---

## Phase 0 — Project Memory & Documentation
> Establish ground truth before touching any code.

| Task | Status | Notes |
|---|---|---|
| Read `about-raw.html` and extract design system | ✅ Done | |
| Generate `ARCHITECTURE.md` | ✅ Done | |
| Generate `DESIGN_SYSTEM.md` | ✅ Done | All tokens extracted from HTML |
| Generate `COMPONENTS.md` | ✅ Done | All component specs written |
| Generate `CONTENT.md` | ✅ Done | Slugs, copy, placeholder specs |
| Generate `TODO.md` | ✅ Done | This file |
| Rewrite docs to match actual codebase state | ✅ Done | Session 2026-09-05 — types.ts, firestore.ts, slug.astro, ProductCard.astro read and all 4 docs updated |
| Update docs to reflect 2026-09-09 session | ✅ Done | All 5 docs updated this session |

---

## Phase 1 — Project Scaffolding
> Initialize Astro project, configure Tailwind, set up Firebase.

| Task | Status | Notes |
|---|---|---|
| `npm create astro@4.13.2` with `output: 'server'` | ✅ Done | Astro v4.16.19 (Node 20 compatible) |
| Add `@astrojs/cloudflare` adapter | ✅ Done | v11.2.0 (requires Astro v4) |
| Add `@astrojs/tailwind` integration | ✅ Done | v5.1.5 + Tailwind CSS v3.4.19 |
| Copy full Tailwind config from `DESIGN_SYSTEM.md` | ✅ Done | `tailwind.config.mjs` — all 40+ tokens |
| Add Google Fonts to `BaseLayout.astro` head | ✅ Done | Rajdhani, Inter, Barlow Condensed, Material Symbols |
| Create `src/styles/global.css` | ✅ Done | v3 directives, CSS vars, card-hover, buttons, inputs |
| Install Firebase JS SDK | ✅ Done | `firebase@12.18.0` |
| Create `src/lib/firebase.ts` | ✅ Done | App init with PUBLIC_ env vars, HMR guard |
| Create `src/lib/firestore.ts` | ✅ Done | Typed helpers: getProducts, getProductBySlug, getFeaturedProducts, getBlogPosts, getBlogPostBySlug, submitEnquiry, submitQuote |
| Create `src/lib/types.ts` | ✅ Done | Product (with specs: Record\<string,string\>, tagline, categoryName, features, sections, isPublished, seoTitle, seoDescription, seoKeywords), BlogPost, Enquiry, Quote interfaces |
| Set up `.env` with Firebase credentials | ✅ Done | Credentials confirmed — dev server reads Firestore successfully |
| Install GSAP, AOS, Lenis | ✅ Done | gsap@3.15.0, aos@2.3.4, lenis@1.3.26 |
| Create `src/layouts/BaseLayout.astro` | ✅ Done | HTML shell, fonts, Lenis + AOS init, ViewTransitions, SEO meta |
| Dev server running clean | ✅ Done | http://localhost:4321/ — SSR + Tailwind confirmed |

---

## Phase 2 — Global Components
> Build Navbar and Footer first — they block every page.

| Task | Status | Notes |
|---|---|---|
| Create `src/components/Navbar.astro` | ✅ Done | Sticky, active-link prop, desktop nav, "Request Quote" CTA |
| Create `src/components/Footer.astro` | ✅ Done | Dark 4-col grid, orange headers, left-indent hover, dynamic year |
| Wire `Navbar` and `Footer` into `BaseLayout.astro` | ✅ Done | Imports active, both rendering in SSR output |
| Implement mobile drawer for Navbar | ✅ Done | Slide-in from right, backdrop, escape/click-outside close, ARIA |
| Test Navbar active state via `activePage` prop | ✅ Done | Verified in SSR output — `isActive()` fn drives class logic |
| Convert Navbar PRODUCTS to plain link (remove dropdown) | ✅ Done | `PRODUCTS` is now a plain `<a href="/products">` — no hover sub-menu |
| Add favicon | ✅ Done | `public/favicon.png` (745 KB) + `public/favicon.svg` added |

---

## Phase 3 — About Page (First Conversion)
> Convert `about-raw.html` to `about.astro`. **Complete.**

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/about.astro` | ✅ Done | |
| Port Section 1 — Hero (grid, image, headline, CTAs) | ✅ Done | `fetchpriority="high"` on hero img, AOS on copy |
| Port Section 2 — Our Story (image + text, left border) | ✅ Done | Inner border frame detail preserved |
| Port Section 3 — Vision & Mission (2-col cards) | ✅ Done | Inline (will extract to component in polish pass) |
| Port Section 4 — Why We're Different (feature grid) | ✅ Done | Data array in frontmatter, staggered AOS |
| Port Section 5 — Core Values strip | ✅ Done | Dynamic map, border-r on all but last |
| Port Section 6 — CTA Banner | ✅ Done | Uses `CTABanner.astro` component |
| Create `SectionLabel.astro` during about conversion | ✅ Done | |
| Create `CTABanner.astro` during about conversion | ✅ Done | Props: heading, subtext, 2 button label+href pairs |
| Add GSAP entrance animation to H1 on about hero | ✅ Done | `gsap.fromTo` fade+slide, `astro:page-load` event |
| Add AOS fade-in to all cards and sections | ✅ Done | Staggered delays on feature grid |
| Verify Lenis smooth scroll works | ✅ Done | Init in BaseLayout, confirmed running |
| Visual QA against `about-raw.html` in browser | ✅ Done | HTTP 200, all 6 sections confirmed in SSR output |

---

## Phase 4 — Products Listing Page
> Dynamic page fetching all products from Firestore. **Complete.**

| Task | Status | Notes |
|---|---|---|
| Seed Firestore `products` with initial products | ✅ Done | All 42 products seeded across 18 categories |
| Seed all 18 Firestore categories | ✅ Done | All categories live in Firestore |
| Create `src/pages/products/index.astro` | ✅ Done | SSR fetch from Firestore — full implementation |
| Implement dynamic category filter | ✅ Done | v1: tab bar. v2 (current): category cards grid |
| Implement `?category=` URL param pre-selection | ✅ Done | Client-side JS reads param, activates matching category card |
| Create `ProductCard.astro` | ✅ Done | Image, category badge, `categoryName` field used — no hardcoded map |
| Render product grid (3-col desktop, 2-col tablet, 1-col mobile) | ✅ Done | |
| Add AOS stagger animation to cards | ✅ Done | `data-aos-delay` based on column index |
| Add empty state (no products in category) | ✅ Done | Icon + message + CTA |
| Add error state (Firestore failure) | ✅ Done | `cloud_off` icon + retry link |
| Fix category label — `categoryName` field | ✅ Done | `ProductCard` now prefers `categoryName` from Firestore; falls back to slug conversion |
| Rename `imageUrl` → `image` in types.ts, firestore.ts, all pages | ✅ Done | Firestore field is `image`. Updated 2026-09-09 |
| Add `isPublished: boolean` to Product interface | ✅ Done | `getProducts()` + `getFeaturedProducts()` filter by `isPublished == true` |
| `getProductBySlug()` respects `isPublished` | ✅ Done | Returns null if `isPublished === false` → redirect to /products |
| Add `seoTitle`, `seoDescription`, `seoKeywords` to Product interface | ✅ Done | Optional fields — empty for all products currently |
| Add 11 real category images | ✅ Done | `public/images/categories/*.png` — 11 slugs with real images |
| Create `scripts/update-images-and-publish.mjs` | ✅ Done | Batch script: sets image path + isPublished. 20 published, 22 hidden. Run 2026-09-09 |

---

## Phase 5 — Product Detail Page
> Dynamic SSR page per product slug. **Complete.**

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/products/[slug].astro` | ✅ Done | Full 5-section implementation |
| Handle 404 redirect if slug not found | ✅ Done | `Astro.redirect('/products', 302)` |
| Implement product hero (image + name + specs table) | ✅ Done | Section 1 |
| Fix specs table rendering | ✅ Done | `Object.entries(product.specs)` — all human-readable keys render |
| Specs section empty-header bug | ✅ Done | Wrapped in `specRows.length > 0` guard — section hidden when no specs |
| Hero tagline fallback | ✅ Done | `product.tagline ?? product.shortDescription` |
| Replace hardcoded features list with `product.features` | ✅ Done | Section 3 — dynamic, hidden if empty |
| Implement image gallery | ✅ Done | Primary image in hero; `galleryUrls[1] ?? image` in Section 3 |
| Implement `sections[]` renderer | ✅ Done | Supports `bullets`, `table`, `text` types; renders between specs and description |
| Fix `sections.map()` JSX fragment bug | ✅ Done | Wrapped in `<>...</>` — was silently breaking all downstream siblings incl. quote section |
| Embed quote form at bottom of detail page | ✅ Done | Section 5 — server-side POST → Firestore `quotes` collection, redirect with `?submitted=1` |
| Add related products section (same category) | ✅ Done | Section 4 — pads with cross-category if fewer than 3 |
| Switch product pages to SSG (`prerender = true`) | 🚫 Blocked | Deferred — staying SSR until all individual product images are delivered (Sky Hawk) and catalog is stable. Revisit after image delivery. |

---

## Phase 6 — Blog Listing Page

| Task | Status | Notes |
|---|---|---|
| Seed Firestore `blogs` collection with 5 placeholder posts | ⬜ | Use slugs from `CONTENT.md` |
| Create `src/pages/blog/index.astro` | ⬜ | `src/pages/blog/` directory exists but is empty |
| Create `BlogCard.astro` | ⬜ | |
| Implement tag filter UI | ⬜ | |
| Render blog grid | ⬜ | |

---

## Phase 7 — Blog Detail Page

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/blog/[slug].astro` | ⬜ | SSR fetch by slug |
| Handle 404 redirect | ⬜ | |
| Render blog body (HTML/Markdown from Firestore) | ⬜ | `set:html` directive |
| Add published date, tags, author | ⬜ | |
| Add "Back to Blog" nav | ⬜ | |

---

## Phase 8 — Contact Page

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/contact.astro` | ✅ Done | 23 KB — full implementation confirmed |
| Build enquiry form (saves to `enquiries` collection) | ✅ Done | Inline — no separate component |
| Build quote form tab/section (saves to `quotes` collection) | ✅ Done | Inline in contact.astro |
| Add contact info block (address, phone, email) | ✅ Done | |
| Form validation (required fields, email format) | ✅ Done | |
| Success/error feedback states | ✅ Done | |
| Update category dropdown to match 11 published categories | ✅ Done | Contact page product interest dropdown updated 2026-09-09 |

---

## Phase 9 — Homepage

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/index.astro` | ✅ Done | 21 KB — full implementation confirmed |
| Hero section with GSAP text animation | 🔄 Unknown | File exists — QA pending |
| Featured products section (fetch `isFeatured: true`) | 🔄 Unknown | File exists — getFeaturedProducts() now filters by isPublished too |
| Stats/numbers strip | 🔄 Unknown | File exists — QA pending |
| Why Choose Us / FeatureCard section | 🔄 Unknown | File exists — QA pending |
| Core values strip | 🔄 Unknown | File exists — QA pending |
| CTA Banner | 🔄 Unknown | File exists — QA pending |

---

## Phase 9b — Custom 404 Page

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/404.astro` | ✅ Done | Static custom 404 page built |

---

## Phase 10 — CMS Admin Panel (Separate Project)

| Task | Status | Notes |
|---|---|---|
| Init `safebuild-cms/` as separate Vite + React project | ⬜ | |
| Set up Firebase Auth (email/password, single admin) | ⬜ | |
| Login page | ⬜ | |
| Products CRUD (list, add, edit, delete) | ⬜ | Firebase Storage for images |
| Blog CRUD (rich text editor) | ⬜ | Consider Tiptap or Quill |
| Enquiries viewer | ⬜ | Read-only, mark-as-read |
| Quotes dashboard | ⬜ | Status updates |
| Deploy to Cloudflare Pages (separate subdomain) | ⬜ | `cms.safebuild.in` |

---

## Phase 11 — Deployment & Production

| Task | Status | Notes |
|---|---|---|
| Connect Cloudflare Pages to Git repo | ⬜ | |
| Set all `FIREBASE_*` environment variables in CF dashboard | ⬜ | |
| Configure custom domain | ⬜ | `safebuild.in` or `www.safebuild.in` |
| Set up `robots.txt` and `sitemap.xml` | ✅ / ⬜ | `robots.txt` exists; `sitemap.xml` not yet |
| Sitemap page (`/sitemap`) | ⬜ | Static page |
| Privacy Policy page (`/privacy`) | ⬜ | Static page |
| Terms of Service page (`/terms`) | ⬜ | Static page |
| Full cross-browser QA (Chrome, Safari, Firefox) | ⬜ | |
| Mobile responsive QA (320px, 375px, 768px, 1280px) | ⬜ | |
| Lighthouse performance audit | ⬜ | Target: 90+ all categories |
| Add OG meta tags and verify social sharing | ⬜ | |
| SEO pass (seoTitle, seoDescription, seoKeywords per product) | ⬜ | Dedicated session before launch — fields exist in schema, all empty now |
| Lock Firestore security rules | ✅ Done | products: read-only; quotes/enquiries: create-only; all else: denied |
| Switch product pages to SSG (`prerender = true`) | 🚫 Blocked | Waiting on individual product images (Sky Hawk delivery) |

---

## Phase 12 — Additional Pages (Post-Launch or Pre-Launch)

| Task | Priority | Status | Notes |
|---|---|---|---|
| Services page | 🟡 Medium | ⬜ | Not started — no copy defined yet |
| Gallery page | 🟡 Medium | ⬜ | Not started — no copy or image list defined |
| Blog listing + detail (Phases 6–7) | 🔴 High | ⬜ | Seed blogs first, then build pages |

---

## Upcoming Batch Tasks (Session 2026-09-09)

| Task | Priority | Notes |
|---|---|---|
| QA homepage (`index.astro`) | 🔴 High | File built — visual QA and Firestore data verification needed |
| QA contact page (`contact.astro`) | 🔴 High | File built — form submission flow and Firestore write verification needed |
| Blog listing page (`blog/index.astro`) | 🔴 High | Directory exists, file not created — seed blogs + build page |
| Blog detail page (`blog/[slug].astro`) | 🔴 High | Not started |
| Seed Firestore `blogs` collection | 🟠 Medium-High | 5 placeholder posts from `CONTENT.md` |
| Individual product images | 🔴 High | Waiting on client (Sky Hawk) — all products currently share category images |
| Divakar decision: 1 product per category or all 20 with shared images | 🔴 High | Blocking individual product image strategy |
| Services page | 🟡 Medium | No content defined yet |
| Gallery page | 🟡 Medium | No image list or content defined yet |
| SEO pass (all products + pages) | 🟡 Medium | Dedicated session before launch — seoTitle/seoDescription/seoKeywords fields exist |
| Sitemap, Privacy, Terms pages | 🟡 Medium | Static pages — needed before launch |
| Switch to SSG after images complete | 🟡 Medium | Add `getStaticPaths()` to `[slug].astro` — blocked on image delivery |
| CMS admin panel | 🟡 Medium | Phase 10 — separate project, not started |

---

## Known Decisions & Open Questions

| Question | Decision / Status |
|---|---|
| Real logo asset? | Using `type_specimen` material icon as placeholder — replace when logo is ready |
| Real company address/phone? | ✅ Confirmed — Divakar Mishra, +91 99351 05322, Lucknow 226028 |
| Firebase project created? | ✅ Active — dev server confirmed Firestore reads working |
| Product images source? | Category-level images live in `public/images/categories/` (11 slugs). Individual per-product images waiting on client (Sky Hawk). |
| Shared vs individual images? | ⬜ Divakar to decide: 1 product per published category OR all 20 products use shared category image |
| Blog body format? | HTML string stored in Firestore — rendered with `set:html` |
| Domain? | TBD — `safebuild.in` assumed |
| CMS subdomain? | `cms.safebuild.in` assumed |
| Dark mode support? | Config has `darkMode: 'class'` but not actively implemented in V1 |
| `specs` key format? | Human-readable strings (e.g. `"Safe Working Load"`). `Object.entries()` used for rendering. |
| `ProductCategory` type? | Removed — `category` field is now typed as `string`. All 18+ slugs are free-form in Firestore. |
| `FeatureCard.astro`, `VisionMissionCard.astro`, `CoreValueBar.astro`, `BlogCard.astro` | These components are referenced in docs but **not present** in `src/components/` — they are inlined in their respective pages. Extract if reuse is needed. |
| SSG for product detail pages? | 🚫 Deferred — staying SSR until individual product images delivered and catalog stable. Revisit after Sky Hawk delivery. |
| Firestore security rules? | ✅ Locked — products: public read, no write; quotes/enquiries: create-only; all else denied. |
| SEO fields? | `seoTitle`, `seoDescription`, `seoKeywords` added to Product schema. All empty now — dedicated SEO pass session planned before launch. |
