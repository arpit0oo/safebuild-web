# TODO.md — Safe Build Engineering Build Order

> Status key: ✅ Done | 🚀 Next Up | 🔄 In Progress | ⏸️ Deprioritized | ⬜ Not Started | 🚫 Blocked
> Last updated: 2026-10-11

---

## Current Sprint Focus
1. 🚀 **Services Page (`src/pages/services.astro`)**: Immediate next task to build.
2. ⏸️ **Blog (Phases 6–7)**: Deprioritized — postponed from immediate roadmap.
3. ✅ **Firebase Removed**: Purged in favor of Sanity CMS (`src/lib/sanity.ts`) and Google Sheets (`src/lib/sheets.ts`).
4. ✅ **Domain & Email**: `safebuilds.in` domain live; Zoho Mail active with 4 accounts; contact email `info@safebuilds.in`.
5. ✅ **Brand Assets**: Navbar uses `logo-icon.png`, Footer uses `logo-full.png`.

---

## Phase 0 — Project Memory & Documentation

| Task | Status | Notes |
|---|---|---|
| Read `about-raw.html` and extract design system | ✅ Done | Visual baseline |
| Generate initial documentation (`ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, etc.) | ✅ Done | |
| Update documentation for Sanity CMS & Google Sheets migration | ✅ Done | Firebase fully removed, Zoho Mail & safebuilds.in recorded |
| Update all docs with bug fixes and current state | ✅ Done | Null guards, `data-astro-reload`, `initNavbar`, real logos |

---

## Phase 1 — Project Scaffolding & Core Libraries

| Task | Status | Notes |
|---|---|---|
| Astro 4.x setup with SSR (`output: 'server'`) | ✅ Done | Using `@astrojs/cloudflare` adapter |
| Tailwind CSS v3 integration | ✅ Done | Strict zero-radius industrial design tokens |
| Purge Firebase SDK & remove legacy dependencies | ✅ Done | `firebase` uninstalled; `firebase.ts` & `firestore.ts` removed |
| Integrate Sanity CMS client (`@sanity/client`) | ✅ Done | `src/lib/sanity.ts` with GROQ queries for products & categories |
| Integrate Google Sheets Webhook client | ✅ Done | `src/lib/sheets.ts` with fire-and-forget submission helpers |
| Set up `.env.local` for Sanity & Sheets | ✅ Done | Project ID, Dataset, Token, Webhook URL |
| Setup Google Fonts & Material Symbols | ✅ Done | Rajdhani, Inter, Barlow Condensed, Material Symbols |
| Animation stack (GSAP, AOS, Lenis) | ✅ Done | Lenis smooth scroll, GSAP text reveal, AOS scroll triggers |

---

## Phase 2 — Global Navigation & Brand Components

| Task | Status | Notes |
|---|---|---|
| Create `src/components/Navbar.astro` | ✅ Done | Sticky, active page highlighting, plain links |
| Navbar real brand logo | ✅ Done | Uses `/logo-icon.png` (`h-7 w-auto`) |
| View Transitions re-binding for mobile drawer | ✅ Done | `initNavbar()` executed on `astro:after-swap` so drawer works after navigation |
| Create `src/components/Footer.astro` | ✅ Done | Dark `#171C1F` layout, equipment & company links |
| Footer real brand logo | ✅ Done | Uses `/logo-full.png` (`h-12 w-auto object-contain`) |
| Corporate email in Footer | ✅ Done | Updated to `info@safebuilds.in` (Zoho Mail) |
| Legal company name in Footer | ✅ Done | "Safebuild Engineering Private Limited" |
| Add high-res Favicons | ✅ Done | `/favicon.png` and `/favicon.svg` |

---

## Phase 3 — About Page

| Task | Status | Notes |
|---|---|---|
| Convert prototype to `src/pages/about.astro` | ✅ Done | Full 6-section structure |
| Implement GSAP headline reveal | ✅ Done | |
| Reusable `SectionLabel.astro` & `CTABanner.astro` | ✅ Done | Extracted and active |
| Visual QA against prototype | ✅ Done | Complete |

---

## Phase 4 — Products Listing Page

| Task | Status | Notes |
|---|---|---|
| Migrate products & categories to Sanity CMS | ✅ Done | `migrate-to-sanity.mjs` executed; 18 categories, 42 products |
| Create `src/pages/products/index.astro` | ✅ Done | SSR query via `getProducts()` from `sanity.ts` |
| Dynamic Category Cards Grid | ✅ Done | Cards derived dynamically from Sanity published products |
| Instant client-side filtering | ✅ Done | Vanilla JS show/hide via `data-category` attributes (no page reload) |
| URL query parameter support | ✅ Done | `?category=slug` pre-selects matching category card |
| Create `src/components/ProductCard.astro` | ✅ Done | Aspect ratio `4/3`, category pill, Sanity image URL, hover accents |
| Dynamic product counter | ✅ Done | Updates cleanly with zero hardcoded numbers |

---

## Phase 5 — Product Detail Page

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/products/[slug].astro` | ✅ Done | SSR query via `getProductBySlug(slug)` |
| Technical specifications table | ✅ Done | Ordered rows with hover orange left-border |
| Dynamic `sections[]` renderer | ✅ Done | Renders `bullets`, `table`, and `text` sections |
| Null guard bug fix on section titles | ✅ Done | `(section.title ?? '').toUpperCase()` prevents render crash |
| Inlined quote form to Google Sheets | ✅ Done | Fire-and-forget submission via `submitQuote()` |
| `data-astro-reload` form fix | ✅ Done | Form submits cleanly bypassing View Transitions |
| Related products section | ✅ Done | Displays related systems via `ProductCard` |

---

## Phase 6 — Services Page (🚀 Next Task)

| Task | Priority | Status | Notes |
|---|---|---|---|
| Design Services Page structure (`src/pages/services.astro`) | 🔴 High | 🚀 Next Up | Immediate priority page |
| Define Engineering Services copy | 🔴 High | ⬜ | Design & consulting, fabrication, erection, maintenance, load testing |
| Create service highlight cards & process steps | 🔴 High | ⬜ | Follow sharp-edge design system & section alternation |
| Connect Services page CTAs to quote form | 🔴 High | ⬜ | Link to `/contact?type=quote` |
| Add Services link to Navigation if required | 🟡 Medium | ⬜ | Assess desktop & mobile nav layout |

---

## Phase 7 — Blog (⏸️ Deprioritized)

| Task | Status | Notes |
|---|---|---|
| Seed blog articles in Sanity | ⏸️ Deprioritized | Postponed from current release plan |
| Create `src/pages/blog/index.astro` | ⏸️ Deprioritized | |
| Create `src/components/BlogCard.astro` | ⏸️ Deprioritized | |
| Create `src/pages/blog/[slug].astro` | ⏸️ Deprioritized | |

---

## Phase 8 — Contact Page

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/contact.astro` | ✅ Done | Full 5-section layout with map and info cards |
| Dynamic category dropdown | ✅ Done | Fetches categories via `getCategories()` from Sanity |
| General Enquiry Form | ✅ Done | Fire-and-forget POST to Google Sheets webhook |
| Engineering Quote Form | ✅ Done | Fire-and-forget POST to Google Sheets webhook |
| `data-astro-reload` attribute on forms | ✅ Done | Bypasses View Transitions for reliable POST submissions |
| Corporate email update | ✅ Done | Uses `info@safebuilds.in` |
| Google Maps embed | ✅ Done | Real embed for Lucknow works location |

---

## Phase 9 — Homepage

| Task | Status | Notes |
|---|---|---|
| Create `src/pages/index.astro` | ✅ Done | High-impact industrial dark hero |
| GSAP hero word animation | ✅ Done | Staggered reveal on H1 words |
| Featured products section | ✅ Done | SSR fetch via `getFeaturedProducts(6)` from Sanity |
| Advantage & Industries sections | ✅ Done | Clean grid with image tiles |
| Reusable CTA Banner | ✅ Done | |

---

## Phase 10 — Content Management System (Sanity Studio)

| Task | Status | Notes |
|---|---|---|
| Sanity Studio configuration | ✅ Done | Project `5vqxh570`, dataset `production` |
| Product & Category schemas | ✅ Done | Supports specs, flexible sections, SEO fields |
| Image uploading in Studio | 🔄 In Progress | Studio handles product and category imagery directly |
| Legacy React/Firebase CMS plan | 🚫 Replaced | Completely superseded by Sanity CMS |

---

## Phase 11 — Production Deployment & Domain

| Task | Status | Notes |
|---|---|---|
| Cloudflare Pages SSR deployment | ✅ Done | `@astrojs/cloudflare` adapter |
| Purge Firebase environment variables | ✅ Done | Removed from Cloudflare Pages dashboard |
| Configure Sanity & Sheets env vars | ✅ Done | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SHEETS_WEBHOOK_URL` |
| Domain setup | ✅ Done | `safebuilds.in` canonical domain configured |
| Zoho Mail MX & DNS setup | ✅ Done | 4 accounts active on `safebuilds.in` |
| Production Lighthouse & responsiveness audit | ⬜ | Post-Services page audit |

---

## Key Architectural Decisions & Confirmed Facts

| Item | Current Decision / State |
|---|---|
| **CMS Platform** | Sanity CMS (`project: 5vqxh570`, `dataset: production`). Replaced Firebase. |
| **Form Handling** | Google Sheets via Apps Script Webhook. Replaced Firebase collections. |
| **Form Submission Strategy** | Fire-and-forget `fetch` + `data-astro-reload` on forms to eliminate latency and View Transition conflicts. |
| **Official Domain** | `safebuilds.in` (NOT `safebuild.in`). |
| **Corporate Email** | `info@safebuilds.in` via Zoho Mail (4 accounts). Replaced legacy Gmail. |
| **Brand Logos** | Navbar uses `logo-icon.png`; Footer uses `logo-full.png`. |
| **Legal Company Name** | Safebuild Engineering Private Limited. |
| **Next Feature Priority** | **Services Page (`src/pages/services.astro`)**. |
| **Blog Priority** | **Deprioritized** — postponed from immediate roadmap. |
| **View Transitions Fix** | `Navbar.astro` binds `initNavbar()` to `astro:after-swap` so mobile menu is always responsive. |
| **Section Title Null Guard** | In `[slug].astro`, section titles are guarded with `section.title ?? ''` to prevent rendering crashes. |
