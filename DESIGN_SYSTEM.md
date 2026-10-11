# DESIGN_SYSTEM.md — Safe Build Engineering

> Extracted directly from `Prototype/about-raw.html` — single source of truth for all visual tokens.
> Last updated: 2026-10-11 | Updated with real logo assets, Sanity CMS image handling, and safebuilds.in brand tokens

---

## 1. Color Palette

All colors are extracted from the Tailwind config in `about-raw.html` and configured in `tailwind.config.mjs`.

### Brand / Action Colors

| Token | Hex | Usage |
|---|---|---|
| `primary-container` | `#F97316` | Primary CTA buttons, active nav link, icon tint, left border accents |
| `surface-tint` | `#9D4300` | Hover state for `primary-container` (darker orange) |
| `primary` | `#9D4300` | Active nav border, icon accent variant |

> **Rule:** `#F97316` is the ONLY orange. Never use a Tailwind default orange class directly — always use the token.

### Surface Colors

| Token | Hex | Usage |
|---|---|---|
| `surface-white` | `#FFFFFF` | Page backgrounds (light sections), cards, navbar |
| `surface` | `#F6FAFE` | Base background (slight blue-gray tint) |
| `surface-bright` | `#F6FAFE` | Synonym for `surface` |
| `background` | `#F6FAFE` | `<body>` background |
| `image-placeholder` | `#F1F5F9` | Used as `.bg-grey-f1f5f9` — alternate section background |
| `surface-container` | `#EAEEF2` | Elevated container surfaces |
| `surface-container-low` | `#F0F4F8` | Subtle container |
| `surface-container-high` | `#E4E9ED` | Higher elevation container |
| `surface-container-highest` | `#DFE3E7` | Highest elevation container |
| `surface-dim` | `#D6DADE` | Dimmed surface (disabled states) |
| `surface-variant` | `#DFE3E7` | Used for footer text (muted) |
| `inverse-surface` | `#2C3134` | Dark surface (dark mode base) |
| `surface-container-lowest` | `#FFFFFF` | Lowest container, pure white |

### On-Surface (Text) Colors

| Token | Hex | Usage |
|---|---|---|
| `on-surface` | `#171C1F` | Primary body text, headings |
| `on-background` | `#171C1F` | Dark background / footer BG |
| `on-surface-variant` | `#584237` | Secondary/muted text |
| `inverse-on-surface` | `#EDF1F5` | Text on dark surfaces |

### Outline / Border Colors

| Token | Hex | Usage |
|---|---|---|
| `border-subtle` | `#E5E7EB` | Default card and section borders |
| `outline` | `#8C7164` | Form field outlines |
| `outline-variant` | `#E0C0B1` | Dark mode border |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `error` | `#BA1A1A` | Error states |
| `error-container` | `#FFDAD6` | Error background |
| `on-error` | `#FFFFFF` | Text on error |
| `on-error-container` | `#93000A` | Text in error container |

---

## 2. Typography

### Font Families

| Token | Font | Google Fonts Weight |
|---|---|---|
| `headline-lg`, `headline-md`, `headline-sm`, `display-xl`, `headline-lg-mobile` | **Rajdhani** | 600, 700 |
| `body-md`, `body-lg`, `technical-data` | **Inter** | 400, 500 |
| `label-caps` | **Barlow Condensed** | 600 |

### Type Scale

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|---|---|---|---|---|---|
| `display-xl` | 72px | 1.1 | -0.02em | 700 | Hero super-headings |
| `headline-lg` | 48px | 1.2 | — | 700 | Section H1 (desktop) |
| `headline-lg-mobile` | 32px | 1.2 | — | 700 | Section H1 (mobile) |
| `headline-md` | 32px | 1.3 | — | 600 | Section H2 |
| `headline-sm` | 24px | 1.4 | — | 600 | Card headings (H3/H4) |
| `body-lg` | 18px | 1.6 | — | 400 | Lead paragraphs |
| `body-md` | 16px | 1.6 | — | 400 | Body copy |
| `label-caps` | 14px | 1.0 | 0.15em | 600 | Nav links, button labels, eyebrow labels |
| `technical-data` | 13px | 1.0 | 0.05em | 500 | Specs, captions, copyright |

---

## 3. Spacing System

| Token | Value | Usage |
|---|---|---|
| `stack-sm` | 0.5rem (8px) | Tight stacking — icon + text, label + heading |
| `stack-md` | 1rem (16px) | Standard element spacing |
| `stack-lg` | 2rem (32px) | Section element gaps |
| `gutter` | 1.5rem (24px) | Horizontal page padding (`px-gutter`) |
| `card-padding` | 2rem (32px) | Internal card padding (`p-card-padding`) |
| `section-padding` | 5rem (80px) | Vertical section padding (`py-section-padding`) |
| `container-max` | 1200px | Max page width (`max-w-container-max`) |

---

## 4. Border Radius

**All border radius is 0.** This is an absolute rule across the entire application.

```js
// tailwind.config.mjs
borderRadius: {
  DEFAULT: '0',
  none: '0',
  sm: '0',
  md: '0',
  lg: '0',
  xl: '0',
  '2xl': '0',
  full: '9999px',  // Pill badges if explicitly designated
}
```

Global override in `global.css`:
```css
.sharp-edges, * {
  border-radius: 0 !important;
}
```

---

## 5. Brand Identity & Logo Assets

The website uses official, high-resolution brand logo assets stored in `public/`:

| Placement | Asset | Specifications | Component |
|---|---|---|---|
| Sticky Navbar | `/logo-icon.png` | `h-7 w-auto` | `src/components/Navbar.astro` |
| Dark Footer | `/logo-full.png` | `h-12 w-auto object-contain` | `src/components/Footer.astro` |
| Browser Favicon | `/favicon.png` | 32×32 / High-DPI PNG | `src/layouts/BaseLayout.astro` |
| Vector Favicon | `/favicon.svg` | Scalable vector mark | `public/favicon.svg` |

> **Update:** The temporary Material Symbol (`type_specimen`) icon proxy has been replaced with the official brand logos in both Navbar and Footer.

---

## 6. Interaction States

### Card Hover (`.card-hover`)
```css
.card-hover {
  transition: all 0.2s ease-in-out;
}
.card-hover:hover {
  border-left: 3px solid #F97316;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}
```

### Nav Link
- Default: `text-on-surface hover:text-primary-container`
- Active: `text-primary-container border-b-2 border-primary-container pb-0.5`
- Label style: `font-label-caps text-label-caps uppercase tracking-wider`

### Primary Button (Orange Filled)
```css
background: #F97316;
color: #FFFFFF;
border: 1px solid #F97316;
/* Hover */
background: #EA6C0A;
```

### Secondary Button (Outlined Dark)
```css
background: transparent;
color: #171C1F;
border: 2px solid #171C1F;
/* Hover */
background: #171C1F;
color: #FFFFFF;
```

### Ghost Button (White outlined on dark/orange bg)
```css
background: transparent;
color: #FFFFFF;
border: 2px solid #FFFFFF;
/* Hover */
background: #FFFFFF;
color: #F97316;
```

---

## 7. Form Design Tokens

Forms adhere to the sharp industrial styling:
- Input Class: `input-field`
- Border: `border border-border-subtle`
- Focus: `focus:border-primary-container focus:outline-none`
- Text: `font-body-md text-on-surface`
- Labels: `font-technical-data text-technical-data uppercase tracking-wider text-on-surface`
- Behavior: Handled via server-side POST with `data-astro-reload` and fire-and-forget submission to Google Sheets.

---

## 8. Section Background Alternation Pattern

| Section | Background Token |
|---|---|
| Hero | `surface-white` or `#0D1117` (Homepage dark hero) |
| Story / Stats | `image-placeholder` (#F1F5F9) |
| Features / Solutions | `surface-white` |
| Specifications / Values | `image-placeholder` (#F1F5F9) |
| CTA Banner | `primary-container` (#F97316) — full orange |
| Footer | `on-background` (#171C1F) — dark charcoal |

---

## 9. Left Border Accent Pattern

A recurring design motif: a 3px left orange border on cards, active filters, and section dividers.

```html
<!-- Card with left border accent -->
<div class="border-l-[3px] border-l-primary-container">

<!-- Active navigation item or filter button -->
<div class="border-l-[3px] border-primary-container pl-3 text-primary-container">
```

---

## 10. Icon System

- **Library:** Google Material Symbols (Outlined style, variable font)
- **Size scale:** 16px (inline), 24px (feature), 28px (hero), 32px (card), 64px (empty states)
- **Primary Color:** `text-primary-container` (#F97316)
- **Dark Backgrounds:** `text-surface-white`
- **Usage:** `<span class="material-symbols-outlined text-primary-container text-[24px]">icon_name</span>`

---

## 11. Category Cards Grid Pattern

Used on `/products` page to present product categories as clickable visual cards before the product grid.

### Layout & Sizing
- 4-col desktop (`lg:grid-cols-4`), 3-col tablet (`md:grid-cols-3`), 2-col mobile (`grid-cols-2`)
- Top aspect ratio: `aspect-[4/3]` with Sanity image asset (`image.asset->url`) or fallback icon
- Bottom label: `font-label-caps text-label-caps text-on-surface uppercase` with product count badge

### Active & Filter State
- Selected category card gets `border-primary-container` and active orange bottom indicator (`cat-indicator`).
- Filter button updates dynamic section header count without page reload.
