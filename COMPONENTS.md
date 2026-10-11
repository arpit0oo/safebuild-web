# COMPONENTS.md — Safe Build Engineering

> Specs for all global and reusable Astro components.
> Last updated: 2026-10-11 | Updated with real brand logos, Google Sheets form integration, View Transition rebindings, and dynamic Sanity data

---

## 1. Component Inventory Reality Check

### Standalone Component Files (`src/components/` & `src/layouts/`)
- `BaseLayout.astro` (`src/layouts/BaseLayout.astro`)
- `Navbar.astro` (`src/components/Navbar.astro`)
- `Footer.astro` (`src/components/Footer.astro`)
- `SectionLabel.astro` (`src/components/SectionLabel.astro`)
- `CTABanner.astro` (`src/components/CTABanner.astro`)
- `ProductCard.astro` (`src/components/ProductCard.astro`)

### Inlined Page Components (Not Standalone Files)
- `CategoryCards` (inlined in `src/pages/products/index.astro`)
- `QuoteForm` (inlined in `src/pages/products/[slug].astro` and `src/pages/contact.astro`)
- `EnquiryForm` (inlined in `src/pages/contact.astro`)
- `FeatureCard`, `VisionMissionCard`, `CoreValueBar` (inlined in `about.astro` / `index.astro`)
- `BlogCard` (planned for blog, currently **deprioritized**)

---

## 2. `Navbar.astro` — Global Sticky Navigation

**Location:** `src/components/Navbar.astro`  
**Used in:** `BaseLayout.astro` (rendered across all pages)

### Features & Implementation
- **Logo Asset:** Uses `/logo-icon.png` (`h-7 w-auto`) paired with text `Safe Build Engineering`.
- **Navigation Links:** Plain links to `/products`, `/about`, and `/contact` (no dropdowns or hover sub-menus).
- **Active Page Highlighting:** Driven by `activePage` prop. Applies `border-b-2 border-primary-container text-primary-container`.
- **Desktop CTA:** "REQUEST QUOTE" button linking to `/contact?type=quote`.
- **Mobile Drawer:** Full-screen backdrop overlay and slide-in drawer with matching active states.
- **View Transitions Compatibility Fix:** Re-initializes drawer listeners on `astro:after-swap` event so navigation does not break event listeners. Escape key is bound once to `document`.

```html
<!-- Navbar Header Structure -->
<header id="site-navbar" class="bg-surface-white border-b border-border-subtle sticky top-0 z-50 w-full">
  <div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
    <a href="/" class="flex items-center gap-2 no-underline">
      <img src="/logo-icon.png" alt="" class="h-7 w-auto" />
      <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Safe Build Engineering</span>
    </a>
    <nav class="hidden md:flex items-center gap-7">
      <a href="/products">Products</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
    <a href="/contact?type=quote" class="btn-primary text-[12px] py-2.5 px-5">REQUEST QUOTE →</a>
    <button id="nav-hamburger" class="md:hidden">...</button>
  </div>
</header>
```

---

## 3. `Footer.astro` — Global Footer

**Location:** `src/components/Footer.astro`  
**Used in:** `BaseLayout.astro` (rendered across all pages)

### Features & Implementation
- **Logo Asset:** Uses `/logo-full.png` (`h-12 w-auto object-contain`) on dark `#171C1F` background.
- **Brand Blurb:** "Precision Engineering Excellence. Heavy-duty overhead cranes, gantry systems, and industrial lifting machinery built to lift and built to last."
- **Company Legal Name:** © {currentYear} Safebuild Engineering Private Limited. All Rights Reserved.
- **Equipment & Solutions Navigation:**
  - EOT Cranes (`/products?category=eot-cranes`)
  - Gantry Cranes (`/products?category=gantry-cranes`)
  - Jib Cranes (`/products?category=jib-cranes`)
  - Wire Rope Hoists (`/products?category=wire-rope-hoists`)
  - View All Equipment (`/products`)
- **Contact & Corporate Info:**
  - Address: 891, Murlipur Goyala, Near RSB Transmission Ltd., Behind Tata Telco, Deva Road, Lucknow — 226028
  - Phone: +91 99351 05322 (`tel:+919935105322`)
  - Official Corporate Email: `info@safebuilds.in` (`mailto:info@safebuilds.in`)
  - WhatsApp Direct: `https://wa.me/919935105322`

---

## 4. `BaseLayout.astro` — Global HTML Shell

**Location:** `src/layouts/BaseLayout.astro`

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | Required | Document `<title>` tag |
| `description` | `string` | Standard tagline | Meta description |
| `ogImage` | `string` | `'/og-image.jpg'` | Open Graph social image |
| `activePage` | `string` | `''` | Current page identifier passed to `Navbar` |

### Key Capabilities
- **Canonical URL:** Generated with fallback domain `https://safebuilds.in`.
- **View Transitions:** Enabled via `<ViewTransitions />`.
- **Smooth Scroll:** Powered by Lenis, skipping navbar elements.
- **Scroll Animations:** AOS (Animate On Scroll) initialized on DOM load and re-triggered on `astro:page-load`.
- **Favicon:** High-resolution `/favicon.png`.

---

## 5. `SectionLabel.astro` — Eyebrow Label

**Location:** `src/components/SectionLabel.astro`

### Props
| Prop | Type | Description |
|---|---|---|
| `text` | `string` | Eyebrow title text (e.g. `— ABOUT US`) |
| `id` | `string` (optional) | Optional DOM ID for dynamic updates |
| `class` | `string` (optional) | Extra utility classes |

```html
<span class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest mb-stack-sm block">
  — {text}
</span>
```

---

## 6. `CTABanner.astro` — Reusable CTA Banner

**Location:** `src/components/CTABanner.astro`

Used on About page, Products listing, Product detail, and Homepage.

### Props
| Prop | Type | Default |
|---|---|---|
| `heading` | `string` | Required headline |
| `subtext` | `string` | Required description |
| `primaryLabel` | `string` | `'Get a Quote'` |
| `primaryHref` | `string` | `'/quote'` |
| `secondaryLabel` | `string` | `'View Our Products'` |
| `secondaryHref` | `string` | `'/products'` |

---

## 7. `ProductCard.astro` — Product Listing Card

**Location:** `src/components/ProductCard.astro`

### Props
| Prop | Type | Description |
|---|---|---|
| `name` | `string` | Product title |
| `category` | `string` | Category slug identifier |
| `categoryName` | `string?` | Human-readable category label (preferred over slug) |
| `shortDescription` | `string` | Card summary description |
| `image` | `string` | Sanity asset image URL projection or fallback path |
| `slug` | `string` | Product slug for link `/products/{slug}` |

### Design & Behavior
- Aspect ratio: `aspect-[4/3]` with smooth zoom on card hover (`group-hover:scale-105 duration-500`).
- Category pill badge over image.
- Left orange border accent on hover (`.card-hover`).
- Accessible card wrapped entirely in `<a href="/products/{slug}">`.

---

## 8. Inlined Form Components & Webhook Handling

Forms are implemented directly inside their parent pages:
- **Enquiry Form**: Inlined in `src/pages/contact.astro` (Section 2)
- **Quote Form**: Inlined in `src/pages/contact.astro` (Section 3) and `src/pages/products/[slug].astro` (Section 5)

### Technical Specifications
1. **`data-astro-reload`**: Both `<form>` elements include `data-astro-reload` to bypass View Transitions during submission, ensuring standard HTTP POST behavior.
2. **Google Sheets Webhook Dispatch**: The server-side POST handler invokes `submitEnquiry` or `submitQuote` from `src/lib/sheets.ts`.
3. **Fire-and-Forget Pattern**: Submissions use unawaited `fetch()` to `SHEETS_WEBHOOK_URL` to avoid waiting on Apps Script 302 redirects or cold starts.
4. **Instant Post-Redirect-Get**: Returns an immediate HTTP 302 redirect with query parameter flags (`?eq=1`, `?qr=1`, or `?submitted=1`).
5. **Dynamic Categories Dropdown**: Contact page quote form fetches categories dynamically via `getCategories()` from `src/lib/sanity.ts`.

---

## 9. Dynamic Section Renderer in `[slug].astro`

Product detail pages render flexible structured content stored in Sanity:
- Supports `bullets` (check_circle icon list), `table` (parameter/value table), and `text` (paragraphs).
- **Null Guard**: Section titles are guarded with `(section.title ?? '').toUpperCase()` to eliminate runtime errors if titles are omitted in the CMS.

---

## 10. Component Usage Matrix

| Component | About | Products | Product Detail | Services (Next) | Contact | Homepage |
|---|---|---|---|---|---|---|
| `Navbar` | ✅ | ✅ | ✅ | 🚀 Planned | ✅ | ✅ |
| `Footer` | ✅ | ✅ | ✅ | 🚀 Planned | ✅ | ✅ |
| `SectionLabel` | ✅ | ✅ | ✅ | 🚀 Planned | ✅ | ✅ |
| `CTABanner` | ✅ | ✅ | ✅ | 🚀 Planned | — | ✅ |
| `ProductCard` | — | ✅ | ✅ (related) | — | — | ✅ |
| `CategoryCards` *(inlined)* | — | ✅ | — | — | — | — |
| `QuoteForm` *(inlined)* | — | — | ✅ | — | ✅ | — |
| `EnquiryForm` *(inlined)* | — | — | — | — | ✅ | — |
| `BlogCard` *(deprioritized)*| — | — | — | — | — | — |
