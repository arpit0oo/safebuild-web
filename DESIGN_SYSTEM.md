# DESIGN_SYSTEM.md — Safe Build Engineering

> Extracted directly from `Prototype/about-raw.html` — single source of truth for all visual tokens.

---

## 1. Color Palette

All colors are extracted from the Tailwind config in `about-raw.html`. Use these token names throughout the Astro/Tailwind project.

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

### Secondary Colors

| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#5B5E66` | Secondary text |
| `secondary-container` | `#DFE2EB` | Secondary container |
| `on-secondary-container` | `#61646C` | Text on secondary container |

### Tertiary Colors

| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#555F6D` | Tertiary elements |
| `tertiary-container` | `#919BAB` | Tertiary container |
| `on-tertiary-container` | `#293340` | Text on tertiary container |

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
| `error-container` | `#FFDAD6` | Error bg |
| `on-error` | `#FFFFFF` | Text on error |
| `on-error-container` | `#93000A` | Text in error container |

### Fixed / Dim Variants

| Token | Hex |
|---|---|
| `primary-fixed` | `#FFDBCA` |
| `primary-fixed-dim` | `#FFB690` |
| `inverse-primary` | `#FFB690` |
| `secondary-fixed` | `#DFE2EB` |
| `secondary-fixed-dim` | `#C3C6CF` |
| `tertiary-fixed` | `#D9E3F4` |
| `tertiary-fixed-dim` | `#BDC7D8` |

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

> **Implementation:** Each token maps to **both** `fontFamily` and `fontSize` Tailwind extensions. Apply both classes: `font-headline-lg text-headline-lg`.

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

**All border radius is 0.** This is an absolute rule.

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
  full: '9999px',  // Only for pill shapes if ever needed
}
```

Global override in `global.css`:
```css
.sharp-edges, * {
  border-radius: 0 !important;
}
/* Exception: pill badges if explicitly needed */
```

---

## 5. Elevation / Shadow

| Use Case | Value |
|---|---|
| Card rest state | None |
| Card hover state | `box-shadow: 0 2px 16px rgba(0,0,0,0.07)` |
| CTA buttons | None (flat design) |

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
- Default: `text-on-surface-variant`
- Hover: `text-primary` (transition 200ms)
- Active: `text-primary border-b-2 border-primary pb-1`

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

### Ghost Button (White outlined, on orange bg)
```css
background: transparent;
color: #FFFFFF;
border: 2px solid #FFFFFF;
/* Hover */
background: #FFFFFF;
color: #F97316;
```

---

## 7. Section Background Alternation Pattern

| Section | Background Token |
|---|---|
| Hero | `surface-white` |
| Our Story | `image-placeholder` (#F1F5F9) |
| Vision & Mission | `surface-white` |
| Why We're Different | `image-placeholder` (#F1F5F9) |
| Core Values | `surface-white` |
| CTA Banner | `primary-container` (#F97316) — full orange |
| Footer | `on-background` (#171C1F) — dark charcoal |

Pattern: **White → Grey → White → Grey → White → Orange → Dark**

---

## 8. Left Border Accent Pattern

A recurring design motif: a 3px left orange border on cards and section dividers.

```html
<!-- Card with left border accent -->
<div class="border-l-[3px] border-l-primary-container">

<!-- "Our Story" section block -->
<div class="border-l-[3px] border-primary-container py-4 pl-8">
```

---

## 9. Icon System

- **Library:** Google Material Symbols (Outlined style)
- **Variable font** — weight from 100–700, fill from 0–1
- **Size scale:** 16px (inline), 24px (feature), 28px (hero), 32px (card), 300px (bg silhouette)
- **Color:** Always `text-primary-container` (#F97316) unless on dark bg (then `text-surface-white`)
- **Usage pattern:** `<span class="material-symbols-outlined text-primary-container text-[24px]">icon_name</span>`

### Icons Used in About Page

| Icon Name | Used For |
|---|---|
| `type_specimen` | Brand logo proxy, footer logo, CTA bg silhouette |
| `visibility` | Vision card |
| `flag` | Mission card |
| `verified_user` | Safety First feature |
| `architecture` | Precision Engineering feature |
| `handyman` | Custom Solutions feature |
| `support_agent` | End-to-End Support feature |
| `gavel` | Integrity core value |
| `lightbulb` | Innovation core value |
| `health_and_safety` | Safety core value |
| `high_quality` | Quality core value |
| `sync` | Reliability core value |
| `menu` | Mobile hamburger |
| `arrow_forward` | CTA inline arrow |

---

## 10. Technical Overlay Pattern

Used on hero image to create an industrial dot-grid texture:

```html
<div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')]"></div>
```
SVG: 20×20px circle at cx=2 cy=2 r=1, fill `rgba(255,255,255,0.15)`. Applied as semi-transparent overlay on images.

---

## 11. Tailwind Config Summary (Full Token Map)

```js
// tailwind.config.mjs — complete theme extension
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'image-placeholder': '#F1F5F9',
        'primary-container': '#F97316',
        'primary': '#9D4300',
        'on-background': '#171C1F',
        'on-surface': '#171C1F',
        'on-surface-variant': '#584237',
        'surface-white': '#FFFFFF',
        'surface': '#F6FAFE',
        'surface-bright': '#F6FAFE',
        'background': '#F6FAFE',
        'border-subtle': '#E5E7EB',
        'surface-variant': '#DFE3E7',
        'inverse-surface': '#2C3134',
        'inverse-on-surface': '#EDF1F5',
        'inverse-primary': '#FFB690',
        'primary-fixed': '#FFDBCA',
        'primary-fixed-dim': '#FFB690',
        'surface-tint': '#9D4300',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#582200',
        'on-primary-fixed': '#341100',
        'on-primary-fixed-variant': '#783200',
        'secondary': '#5B5E66',
        'secondary-container': '#DFE2EB',
        'secondary-fixed': '#DFE2EB',
        'secondary-fixed-dim': '#C3C6CF',
        'on-secondary': '#FFFFFF',
        'on-secondary-container': '#61646C',
        'on-secondary-fixed': '#181C22',
        'on-secondary-fixed-variant': '#43474E',
        'tertiary': '#555F6D',
        'tertiary-container': '#919BAB',
        'tertiary-fixed': '#D9E3F4',
        'tertiary-fixed-dim': '#BDC7D8',
        'on-tertiary': '#FFFFFF',
        'on-tertiary-container': '#293340',
        'on-tertiary-fixed': '#121C28',
        'on-tertiary-fixed-variant': '#3E4755',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F0F4F8',
        'surface-container': '#EAEEF2',
        'surface-container-high': '#E4E9ED',
        'surface-container-highest': '#DFE3E7',
        'surface-dim': '#D6DADE',
        'outline': '#8C7164',
        'outline-variant': '#E0C0B1',
        'error': '#BA1A1A',
        'error-container': '#FFDAD6',
        'on-error': '#FFFFFF',
        'on-error-container': '#93000A',
      },
      borderRadius: {
        DEFAULT: '0',
        none: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        full: '9999px',
      },
      spacing: {
        'stack-sm': '0.5rem',
        'stack-md': '1rem',
        'stack-lg': '2rem',
        'gutter': '1.5rem',
        'card-padding': '2rem',
        'section-padding': '5rem',
        'container-max': '1200px',
      },
      fontFamily: {
        'display-xl': ['Rajdhani', 'sans-serif'],
        'headline-lg': ['Rajdhani', 'sans-serif'],
        'headline-lg-mobile': ['Rajdhani', 'sans-serif'],
        'headline-md': ['Rajdhani', 'sans-serif'],
        'headline-sm': ['Rajdhani', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'technical-data': ['Inter', 'sans-serif'],
        'label-caps': ['Barlow Condensed', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': ['14px', { lineHeight: '1.0', letterSpacing: '0.15em', fontWeight: '600' }],
        'technical-data': ['13px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '500' }],
      },
    },
  },
};
```
