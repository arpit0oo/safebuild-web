# COMPONENTS.md — Safe Build Engineering

> Specs for all global and reusable Astro components. These are extracted from the `about-raw.html` prototype and generalized for reuse across all pages.

---

## 1. `Navbar.astro` — Global Sticky Navigation

**Location:** `src/components/Navbar.astro`  
**Used in:** `BaseLayout.astro` (appears on every page)

### Structure

```
<header>                          sticky, z-50, border-b, bg-surface-white
  <div>                           max-w-container-max, h-20, flex justify-between
    <!-- Logo -->
    <div>
      <span material-symbol>     type_specimen icon (temporary — replace with SVG logo)
      <span>Safe Build Engineering</span>   font-headline-sm, bold
    </div>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex">
      <a href="/products">EOT Cranes</a>      label-caps, hover text-primary
      <a href="/products">Gantry Cranes</a>
      <a href="/products">Hoists</a>
      <a href="/about">Engineering</a>        active = text-primary + border-b-2
      <a href="/contact">Contact</a>
    </nav>

    <!-- Desktop CTA -->
    <a href="/quote">Request Quote →</a>     label-caps, text-primary-container, bold

    <!-- Mobile Hamburger -->
    <button class="md:hidden">
      <span material-symbol>menu</span>
    </button>
  </div>
</header>
```

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `activePage` | `string` | `''` | Slug of current page — used for active link styling |

### Styling Rules

- Background: `bg-surface-white` (white, NOT grey)
- Border: `border-b border-border-subtle`
- Height: `h-20` (80px)
- Sticky: `sticky top-0 z-50`
- Border radius: `0` (sharp)
- Nav links: `font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200`
- Active link: adds `text-primary border-b-2 border-primary pb-1`
- "Request Quote" CTA: `text-primary-container font-bold uppercase tracking-wider` — **no button bg, just text + arrow**

### Mobile Behavior

- Nav links hidden on mobile (`hidden md:flex`)
- Hamburger shown on mobile (`md:hidden`)
- Mobile drawer: slides in from right, full-height overlay, same link styles
- Close on nav click

---

## 2. `Footer.astro` — Global Footer

**Location:** `src/components/Footer.astro`  
**Used in:** `BaseLayout.astro` (appears on every page)

### Structure

```
<footer>                             bg-on-background (#171C1F), dark charcoal
  <div>                              4-col grid (md), max-w-container-max, py-section-padding

    <!-- Column 1: Brand -->
    <div>
      <span material-symbol>type_specimen</span>   text-primary-container
      <span>Safe Build Engineering</span>           text-surface-white
      <p>Precision Engineering Excellence.</p>      text-surface-variant
    </div>

    <!-- Column 2: Company Links -->
    <div>
      <h4>COMPANY</h4>                              label-caps, text-primary-container
      <a href="/about">About</a>
      <a href="/sitemap">Sitemap</a>
    </div>

    <!-- Column 3: Legal Links -->
    <div>
      <h4>LEGAL</h4>                                label-caps, text-primary-container
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </div>

    <!-- Column 4: Contact -->
    <div>
      <h4>CONTACT</h4>                              label-caps, text-primary-container
      <a>India HQ Address</a>                       (will be replaced with real address)
    </div>

  </div>

  <!-- Bottom Bar -->
  <div>                              border-t border-on-surface-variant/30, text-center, py-6
    <p>© 2024 Safe Build Engineering India. All Rights Reserved.</p>    technical-data, surface-variant, opacity-70
  </div>
</footer>
```

### Props

None. Footer is fully static.

### Styling Rules

- Background: `bg-on-background` (#171C1F)
- Text: `text-surface-white` for brand name
- Muted text: `text-surface-variant`
- Column headers: `font-label-caps text-label-caps text-primary-container uppercase tracking-widest`
- Links: hover state = `hover:text-primary-fixed-dim hover:border-l-primary-container hover:pl-2` (left indent on hover)
- Link active border: `border-l-3 border-transparent` → `border-primary-container` on hover
- Bottom bar: `border-t border-on-surface-variant/30`

---

## 3. `BaseLayout.astro` — Page Shell

**Location:** `src/layouts/BaseLayout.astro`  
**Used in:** Every page

### Props

| Prop | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | Yes | `<title>` tag content |
| `description` | `string` | No | Meta description |
| `ogImage` | `string` | No | OG image URL, defaults to `/og-image.jpg` |
| `activePage` | `string` | No | Passed to `<Navbar>` |

### Structure

```astro
---
// Props interface
const { title, description = "Safe Build Engineering...", ogImage = "/og-image.jpg", activePage } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={ogImage} />
  <!-- Google Fonts: Rajdhani, Inter, Barlow Condensed, Material Symbols -->
  <ViewTransitions />
</head>
<body class="bg-surface font-body-md text-on-surface antialiased">
  <Navbar activePage={activePage} />
  <main>
    <slot />
  </main>
  <Footer />
  <!-- Lenis init -->
  <!-- AOS init -->
  <!-- GSAP loaded per-page -->
</body>
</html>
```

---

## 4. `SectionLabel.astro` — Eyebrow Label

**Location:** `src/components/SectionLabel.astro`

### Usage

The "— ABOUT US" or "— THE SAFE BUILD ADVANTAGE" text above section headings.

### Props

| Prop | Type | Notes |
|---|---|---|
| `text` | `string` | Label text (will be uppercased in component) |
| `class` | `string` | Optional extra classes |

### Rendered Output

```html
<span class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest mb-stack-sm block">
  — {text}
</span>
```

---

## 5. `CTABanner.astro` — Orange CTA Section

**Location:** `src/components/CTABanner.astro`

Reused on About, Products listing, and Homepage.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `heading` | `string` | Required | Main headline |
| `subtext` | `string` | Required | Supporting copy |
| `primaryLabel` | `string` | `'Get a Quote'` | Primary button text |
| `primaryHref` | `string` | `'/quote'` | Primary button link |
| `secondaryLabel` | `string` | `'View Our Products'` | Secondary button text |
| `secondaryHref` | `string` | `'/products'` | Secondary button link |

### Styling

- Background: `bg-primary-container` (#F97316, full orange)
- Heading: `text-surface-white font-headline-lg`
- Subtext: `text-surface-white/90 font-body-lg`
- Primary button: dark filled (`bg-on-background text-surface-white border-2 border-on-background`)
- Secondary button: ghost (`bg-transparent text-surface-white border-2 border-surface-white`)
- Background decoration: faint `type_specimen` icon silhouette (right side, 10% opacity)
- Layout: 12-col grid, content in `col-span-7`

---

## 6. `FeatureCard.astro` — Feature/Advantage Card

**Location:** `src/components/FeatureCard.astro`

Used in "Why We're Different" and similar feature grid sections.

### Props

| Prop | Type | Notes |
|---|---|---|
| `icon` | `string` | Material Symbols icon name |
| `title` | `string` | Card heading |
| `description` | `string` | Card body text |

### Structure

```html
<div class="bg-surface-white border border-border-subtle p-stack-lg sharp-edges card-hover flex flex-col md:flex-row gap-4 items-start">
  <div class="p-2 border border-border-subtle shrink-0">
    <span class="material-symbols-outlined text-primary-container text-[24px]">{icon}</span>
  </div>
  <div>
    <h4 class="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h4>
    <p class="font-body-md text-body-md text-on-surface-variant">{description}</p>
  </div>
</div>
```

### Card Hover Behavior

On hover: left border becomes 3px orange + drop shadow (`.card-hover` class).

---

## 7. `VisionMissionCard.astro` — Vision/Mission Card

**Location:** `src/components/VisionMissionCard.astro`

### Props

| Prop | Type | Notes |
|---|---|---|
| `icon` | `string` | Material Symbols icon name |
| `title` | `string` | e.g. "Our Vision" |
| `description` | `string` | Card content |

### Structure

```html
<div class="bg-surface-white border border-border-subtle p-card-padding sharp-edges card-hover relative group border-l-[3px] border-l-primary shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
  <!-- Orange left border highlight (group-hover) -->
  <div class="absolute top-0 left-0 w-[3px] h-full bg-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
  <div class="flex items-start gap-4">
    <span class="material-symbols-outlined text-[32px] text-primary-container">{icon}</span>
    <div>
      <h3 class="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h3>
      <p class="font-body-md text-body-md text-on-surface-variant">{description}</p>
    </div>
  </div>
</div>
```

---

## 8. `CoreValueBar.astro` — Values Strip

**Location:** `src/components/CoreValueBar.astro`

The horizontal strip of 5 core values (Integrity, Innovation, Safety, Quality, Reliability).

### Props

| Prop | Type | Notes |
|---|---|---|
| `values` | `Array<{ icon: string, label: string }>` | Array of value items |

### Default values (from about page):

```js
[
  { icon: 'gavel', label: 'Integrity' },
  { icon: 'lightbulb', label: 'Innovation' },
  { icon: 'health_and_safety', label: 'Safety' },
  { icon: 'high_quality', label: 'Quality' },
  { icon: 'sync', label: 'Reliability' },
]
```

### Styling

- Container: `flex flex-wrap md:flex-nowrap border-t border-b border-border-subtle py-8`
- Each item: `flex items-center gap-3 md:flex-1 md:justify-center md:border-r border-border-subtle last:border-0 md:px-8`
- Icon: `text-primary-container text-[28px]`
- Label: `font-technical-data text-on-surface block uppercase text-[16px]`

---

## 9. `ProductCard.astro` — Product Listing Card

**Location:** `src/components/ProductCard.astro`

### Props

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | Product name |
| `category` | `string` | e.g. "EOT Cranes" |
| `shortDescription` | `string` | ~80 char summary |
| `imageUrl` | `string` | Product image |
| `slug` | `string` | URL slug for detail link |
| `capacity` | `string` | e.g. "5 Ton" — displayed as spec badge |

### Design

- Full-bleed top image with `object-cover aspect-[4/3]`
- Left orange border accent on hover (`.card-hover`)
- Category shown as `label-caps` eyebrow
- Link wraps entire card to `/products/{slug}`

---

## 10. `BlogCard.astro` — Blog Listing Card

**Location:** `src/components/BlogCard.astro`

### Props

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Blog post title |
| `excerpt` | `string` | ~150 char summary |
| `coverImageUrl` | `string` | Cover image |
| `slug` | `string` | URL slug |
| `publishedAt` | `Date` | Formatted display date |
| `tags` | `string[]` | Tag pills |

---

## 11. `QuoteForm.astro` — Quote Request Form

**Location:** `src/components/QuoteForm.astro`

### Fields

1. Full Name (required)
2. Email (required)
3. Phone (required)
4. Company Name (optional)
5. Product Interest (dropdown: EOT Crane, Gantry Crane, Hoist, General)
6. Required Capacity (text, e.g. "10 Ton")
7. Required Span (text)
8. Lift Height (text)
9. Additional Notes (textarea)

### Behavior

- Client-side Firestore write (`addDoc` to `quotes` collection)
- Success: show inline confirmation message
- Error: show error state
- All inputs: `sharp-edges`, `border border-outline`, `focus:border-primary-container`

---

## 12. Component Usage Matrix

| Component | About | Products | Product Detail | Blog | Blog Detail | Contact | Homepage |
|---|---|---|---|---|---|---|---|
| `Navbar` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `Footer` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `SectionLabel` | ✓ | ✓ | — | ✓ | — | ✓ | ✓ |
| `CTABanner` | ✓ | ✓ | ✓ | — | — | — | ✓ |
| `FeatureCard` | ✓ | — | ✓ | — | — | — | ✓ |
| `VisionMissionCard` | ✓ | — | — | — | — | — | — |
| `CoreValueBar` | ✓ | — | — | — | — | — | ✓ |
| `ProductCard` | — | ✓ | — | — | — | — | ✓ |
| `BlogCard` | — | — | — | ✓ | — | — | — |
| `QuoteForm` | — | — | ✓ | — | — | ✓ | — |
