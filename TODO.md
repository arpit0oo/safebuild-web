# TODO.md — Safe Build Engineering Build Order

> Status key: ✅ Done | 🔄 In Progress | ⬜ Not Started | 🚫 Blocked

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
| Create `src/lib/types.ts` | ✅ Done | Product (with specs: Record<string,string>, tagline, categoryName, features, sections), BlogPost, Enquiry, Quote interfaces |
| Set up `.env` with Firebase credentials | ⬜ | Template created — fill in Firebase project credentials |
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
| Seed Firestore `products` with initial products | 🔄 In Progress | Goliath Crane seeded and verified. 40 remaining from CONTENT.md inventory |
| Create `src/pages/products/index.astro` | ✅ Done | SSR fetch from Firestore — full implementation |
| Implement category filter UI (EOT / Gantry / Hoists) | ✅ Done | `?category=` query param, JS-side filter (no Firestore index needed) |
| Create `ProductCard.astro` | ✅ Done | Image, category badge, capacity chip, "View Specs →" footer |
| Render product grid (3-col desktop, 2-col tablet, 1-col mobile) | ✅ Done | |
| Add AOS stagger animation to cards | ✅ Done | `data-aos-delay` based on column index |
| Add empty state (no products in category) | ✅ Done | Icon + message + CTA |
| Add error state (Firestore failure) | ✅ Done | `cloud_off` icon + retry link |
| Fix category label — `categoryName` field pending | ⬜ | Card uses hardcoded CATEGORY_LABELS map. `categoryName` from Firestore not yet used. |

---

## Phase 5 — Product Detail Page
> Dynamic SSR page per product slug. **Complete — fixes in progress.**

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/products/[slug].astro` | ✅ Done | Full 5-section implementation |
| Handle 404 redirect if slug not found | ✅ Done | `Astro.redirect('/products', 302)` |
| Implement product hero (image + name + specs table) | ✅ Done | Section 1 |
| Fix specs table rendering | ✅ Done | Changed from SPEC_LABELS key-map to `Object.entries(product.specs)` — all rows now render |
| Hero tagline fallback | ✅ Done | `product.tagline ?? product.shortDescription` |
| Replace hardcoded features list with `product.features` | ✅ Done | Section 3 — dynamic, hidden if empty |
| Implement image gallery | ✅ Done | Primary image + gallery[0] in hero; gallery[1] in Section 3 |
| Embed `QuoteForm.astro` at bottom of detail page | ✅ Done | Section 5 — server-side POST to Firestore |
| Add related products section (same category) | ✅ Done | Section 4 — pads with cross-category if fewer than 3 |
| Switch product pages to SSG (`prerender = true`) | ⬜ | Requires all 41 products seeded first, then `getStaticPaths()` |
| Implement `sections[]` renderer (Batch 5) | ⬜ | `sections` field exists in type but detail page has no renderer yet |

---

## Phase 6 — Blog Listing Page

| Task | Status | Notes |
|---|---|---|
| Seed Firestore `blogs` collection with 5 placeholder posts | ⬜ | Use slugs from `CONTENT.md` |
| Create `src/pages/blog/index.astro` | ⬜ | SSR fetch published blogs |
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
| Create `src/pages/contact.astro` | ⬜ | |
| Build enquiry form (saves to `enquiries` collection) | ⬜ | Client-side Firestore addDoc |
| Build quote form tab/section (saves to `quotes` collection) | ⬜ | Use `QuoteForm.astro` |
| Add contact info block (address, phone, email) | ⬜ | |
| Form validation (required fields, email format) | ⬜ | |
| Success/error feedback states | ⬜ | |

---

## Phase 9 — Homepage (Built Last)

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/index.astro` | ⬜ | |
| Hero section with GSAP text animation | ⬜ | |
| Featured products section (fetch `isFeatured: true`) | ⬜ | |
| Stats/numbers strip | ⬜ | |
| Why Choose Us section (reuse `FeatureCard.astro`) | ⬜ | |
| Core values strip (reuse `CoreValueBar.astro`) | ⬜ | |
| CTA Banner (reuse `CTABanner.astro`) | ⬜ | |

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
| Set up `robots.txt` and `sitemap.xml` | ⬜ | |
| Full cross-browser QA (Chrome, Safari, Firefox) | ⬜ | |
| Mobile responsive QA (320px, 375px, 768px, 1280px) | ⬜ | |
| Lighthouse performance audit | ⬜ | Target: 90+ all categories |
| Add OG meta tags and verify social sharing | ⬜ | |
| Rewrite Firestore security rules after seeding complete | ⬜ | Currently open rules — tighten before production |

---

## Upcoming Batch Tasks (Session 2026-09-05)

| Task | Priority | Notes |
|---|---|---|
| Seed all 41 products in Firestore | 🔴 High | Required before SSG switch and full QA |
| Fix `capacity` chip — normalise spec key across all products | 🟡 Medium | ProductCard reads `specs.capacity`; Goliath Crane uses `"Safe Working Load"` |
| Fix `categoryName` display on ProductCard (Batch 4) | 🟡 Medium | Card uses hardcoded map — should prefer `product.categoryName` from Firestore |
| Implement `sections[]` renderer on product detail page (Batch 5) | 🟡 Medium | Type exists in `types.ts` but no renderer built yet |
| Switch product pages to SSG (`prerender = true`) | 🟠 Medium-High | Add `getStaticPaths()` to `[slug].astro` after seeding |
| Rewrite Firestore security rules | 🔴 High | Do after seeding — current rules are open |

---

## Known Decisions & Open Questions

| Question | Decision / Status |
|---|---|
| Real logo asset? | Using `type_specimen` material icon as placeholder — replace when logo is ready |
| Real company address/phone? | ✅ Confirmed — Divakar Mishra, +91 99351 05322, Lucknow 226028 |
| Firebase project created? | ✅ Active — dev server confirmed Firestore reads working |
| Product images source? | Firebase Storage — upload via CMS. Currently all `imageUrl: ""` |
| Blog body format? | HTML string stored in Firestore — rendered with `set:html` |
| Domain? | TBD — `safebuild.in` assumed |
| CMS subdomain? | `cms.safebuild.in` assumed |
| Dark mode support? | Config has `darkMode: 'class'` but not actively implemented in V1 |
| `specs` key format? | Human-readable strings (e.g. `"Safe Working Load"`). `Object.entries()` used for rendering. |
