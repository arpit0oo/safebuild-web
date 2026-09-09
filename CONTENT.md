# CONTENT.md — Safe Build Engineering

> All copy, product slugs, descriptions, and placeholder content for the site.
> Updated to reflect 18 product categories and 42 products (all seeded ✅).
> Last updated: 2026-09-09
> All slugs are seeded in Firestore unless marked otherwise.

---

## 1. Brand Copy

| Element | Copy |
|---|---|
| **Tagline** | Precision Engineering Excellence. |
| **Sub-tagline** | Built to Lift. Built to Last. |
| **Footer blurb** | Precision Engineering Excellence. Built to Lift. Built to Last. |
| **Copyright** | © 2024 Safe Build Engineering India. All Rights Reserved. |
| **Nav CTA** | Request Quote |

---

## 2. About Page Copy

### Hero Section
- **Eyebrow:** — ABOUT US
- **H1:** Built on Precision. Driven by Safety.
- **Lead paragraph:** We are a newly established engineering firm specializing in high-performance cranes and lifting solutions. Our mandate is simple: deliver structurally sound, meticulously designed machinery for the modern industrial landscape.
- **Primary CTA:** Get a Quote
- **Secondary CTA:** View Products

### Our Story Section
- **H2:** Our Story
- **Body:** Safe Build Engineering was founded with a singular focus: to engineer cranes that Indian industries can trust unconditionally. We recognized a need in the market for heavy lifting equipment that prioritizes structural integrity and operational safety without compromise.

  Operating from a state-of-the-art facility, our engineering team utilizes rigorous testing and precision manufacturing techniques. Every EOT crane, gantry, and hoist we produce is a testament to our commitment to building reliable, heavy-duty machinery for critical infrastructure projects.

### Vision & Mission Section
- **Vision title:** Our Vision
- **Vision body:** To set a new benchmark for structural safety and engineering precision in the Indian heavy lifting sector, becoming the preferred partner for critical infrastructure development.
- **Mission title:** Our Mission
- **Mission body:** To design and manufacture industrial cranes with zero-margin error. We execute rigorous quality control and utilize advanced materials to ensure maximum operational uptime and safety for our clients.

### Why We're Different Section
- **Eyebrow:** — THE SAFE BUILD ADVANTAGE
- **H2:** Why We're Different

| Feature | Icon | Description |
|---|---|---|
| Safety First | `verified_user` | Every component undergoes exhaustive load testing and stress analysis before deployment. We build machinery meant to protect operators. |
| Precision Engineering | `architecture` | Utilizing modern CAD modeling and CNC machining to achieve exact tolerances, ensuring smooth operation and minimal wear over time. |
| Custom Solutions | `handyman` | We design bespoke lifting systems tailored to the specific spatial and load requirements of your facility, ensuring optimal workflow. |
| End-to-End Support | `support_agent` | From initial structural consultation and manufacturing to installation and ongoing technical maintenance, we provide complete oversight. |

### Core Values Strip

| Value | Icon |
|---|---|
| Integrity | `gavel` |
| Innovation | `lightbulb` |
| Safety | `health_and_safety` |
| Quality | `high_quality` |
| Reliability | `sync` |

### CTA Banner Section
- **H2:** Ready to Lift Your Operations?
- **Body:** Contact our engineering team today to discuss load requirements and site-specific structural solutions.
- **Primary CTA:** Get a Quote
- **Secondary CTA:** View Our Products

---

## 3. Products — Categories and Slugs (Full Inventory)

> Target: 18 categories, 42 products total — all seeded ✅ as of 2026-09-07.
> `image` field (NOTE: field renamed from `imageUrl` on 2026-09-09 — use `image` everywhere).
> **Visibility:** 20 products published (`isPublished: true`), 22 hidden (`isPublished: false`).
> Published products are those whose category has a real image in `public/images/categories/`.
> Specs are stored as `Record<string, string>` with human-readable key names.

---

### Category 1: EOT Cranes (Electric Overhead Travelling)
**Firestore `category` value:** `eot-cranes`

| Slug | Name | Notes |
|---|---|---|
| `eot-crane-5-ton` | 5-Ton EOT Crane | ✅ Seeded |
| `eot-crane-10-ton` | 10-Ton EOT Crane | ✅ Seeded |
| `eot-crane-20-ton` | 20-Ton EOT Crane | ✅ Seeded |
| `eot-crane-50-ton` | 50-Ton EOT Crane | ✅ Seeded |
| `eot-crane-100-ton` | 100-Ton EOT Crane | ✅ Seeded |

---

### Category 2: Gantry Cranes
**Firestore `category` value:** `gantry-cranes`

| Slug | Name | Notes |
|---|---|---|
| `gantry-crane-10-ton` | 10-Ton Gantry Crane | ✅ Seeded |
| `gantry-crane-25-ton` | 25-Ton Gantry Crane | ✅ Seeded |
| `semi-gantry-crane-10-ton` | 10-Ton Semi-Gantry Crane | ✅ Seeded |

---

### Category 3: Goliath Cranes
**Firestore `category` value:** `gantry-cranes` (or dedicated slug pending)

| Slug | Name | Notes |
|---|---|---|
| `goliath-crane` | Goliath Crane | ✅ Seeded |

---

### Category 4: Jib Cranes
**Firestore `category` value:** `jib-cranes`

| Slug | Name | Notes |
|---|---|
| `jib-crane-wall-mounted` | Wall-Mounted Jib Crane | ✅ Seeded |
| `jib-crane-pillar-mounted` | Pillar-Mounted Jib Crane | ✅ Seeded |
| `jib-crane-articulated` | Articulated Jib Crane | ✅ Seeded |

---

### Category 5: Monorail Systems
**Firestore `category` value:** `monorail-systems`

| Slug | Name | Notes |
|---|---|
| `monorail-hoist-system` | Monorail Hoist System | ✅ Seeded |
| `curved-monorail-system` | Curved Monorail System | ✅ Seeded |

---

### Category 6: Underslung Cranes
**Firestore `category` value:** `underslung-cranes`

| Slug | Name | Notes |
|---|---|
| `underslung-crane-5-ton` | 5-Ton Underslung Crane | ✅ Seeded |
| `underslung-crane-10-ton` | 10-Ton Underslung Crane | ✅ Seeded |

---

### Category 7: Wire Rope Hoists
**Firestore `category` value:** `wire-rope-hoists`

| Slug | Name | Notes |
|---|---|
| `wire-rope-hoist-1-ton` | 1-Ton Wire Rope Hoist | ✅ Seeded |
| `wire-rope-hoist-5-ton` | 5-Ton Wire Rope Hoist | ✅ Seeded |
| `wire-rope-hoist-10-ton` | 10-Ton Wire Rope Hoist | ✅ Seeded |

---

### Category 8: Chain Hoists
**Firestore `category` value:** `chain-hoists`

| Slug | Name | Notes |
|---|---|
| `chain-hoist-500kg` | 500 KG Chain Hoist | ✅ Seeded |
| `chain-hoist-2-ton` | 2-Ton Chain Hoist | ✅ Seeded |
| `chain-hoist-5-ton` | 5-Ton Chain Hoist | ✅ Seeded |

---

### Category 9: Overhead Crane Kits
**Firestore `category` value:** `overhead-crane-kits`

| Slug | Name | Notes |
|---|---|
| `overhead-crane-kit-5-ton` | 5-Ton Overhead Crane Kit | ✅ Seeded |

---

### Category 10: Material Handling Systems
**Firestore `category` value:** `material-handling`

| Slug | Name | Notes |
|---|---|
| `automated-material-handling` | Automated Material Handling System | ✅ Seeded |
| `manual-material-handling` | Manual Material Handling System | ✅ Seeded |

---

### Category 11: Davit Cranes
**Firestore `category` value:** `davit-cranes`

| Slug | Name | Notes |
|---|---|
| `davit-crane-500kg` | 500 KG Davit Crane | ✅ Seeded |
| `davit-crane-2-ton` | 2-Ton Davit Crane | ✅ Seeded |

---

### Category 12: Stackers & Transfer Cars
**Firestore `category` value:** `transfer-cars`

| Slug | Name | Notes |
|---|---|
| `transfer-car-10-ton` | 10-Ton Transfer Car | ✅ Seeded |
| `coil-transfer-car` | Coil Transfer Car | ✅ Seeded |

---

### Category 13: Grab Buckets & Special Attachments
**Firestore `category` value:** `attachments`

| Slug | Name | Notes |
|---|---|
| `grab-bucket-clamshell` | Clamshell Grab Bucket | ✅ Seeded |
| `electromagnet-lifting` | Electromagnet Lifting Attachment | ✅ Seeded |

---

### Category 14: Crane Components & Spares
**Firestore `category` value:** `crane-components`

| Slug | Name | Notes |
|---|---|
| `end-carriage-assembly` | End Carriage Assembly | ✅ Seeded |
| `drum-and-gearbox-unit` | Drum and Gearbox Unit | ✅ Seeded |

---

### Category 15: Hoisting Winches
**Firestore `category` value:** `hoisting-winches`

| Slug | Name | Notes |
|---|---|
| `electric-winch-2-ton` | 2-Ton Electric Winch | ✅ Seeded |
| `electric-winch-10-ton` | 10-Ton Electric Winch | ✅ Seeded |

---

### Category 16: Port & Shipyard Cranes
**Firestore `category` value:** `port-cranes`

| Slug | Name | Notes |
|---|---|
| `port-mobile-crane` | Port Mobile Crane | ✅ Seeded |
| `shipyard-gantry-crane` | Shipyard Gantry Crane | ✅ Seeded |

---

### Category 17: Foundry & Steel Plant Cranes
**Firestore `category` value:** `foundry-cranes`

| Slug | Name | Notes |
|---|---|
| `foundry-ladle-crane` | Foundry Ladle Crane | ✅ Seeded |
| `coil-handling-crane` | Coil Handling Crane | ✅ Seeded |

---

### Category 18: Custom Engineering Solutions
**Firestore `category` value:** `custom-solutions`

| Slug | Name | Notes |
|---|---|
| `custom-crane-solution` | Custom Crane Solution | ✅ Seeded |

---

## 3b. Published Categories (11 with Real Images)

> As of 2026-09-09. These categories have real images in `public/images/categories/` and
> their products have `isPublished: true`. All others are hidden (`isPublished: false`).
>
> Image path convention: `/images/categories/{category-slug}.png`

| Firestore `category` slug | Image filename |
|---|---|
| `chain-hoist` | `chain-hoist.png` |
| `chain-pulley-block` | `chain-pulley-block.png` |
| `double-girder-cranes` | `double-girder-cranes.png` |
| `goliath-crane` | `goliath-crane.png` |
| `heavy-duty-crane` | `heavy-duty-crane.png` |
| `heavy-duty-gantry-crane` | `heavy-duty-gantry-crane.png` |
| `hot-crane` | `hot-crane.png` |
| `industrial-eot-crane` | `industrial-eot-crane.png` |
| `overhead-trolley` | `overhead-trolley.png` |
| `rail-mounted-gantry-crane` | `rail-mounted-gantry-crane.png` |
| `underslung-crane` | `underslung-crane.png` |

> **Note:** Individual per-product images are pending client delivery (Sky Hawk).
> Until then, all published products display their category image.
> Divakar to decide: 1 product per published category OR all 20 products share category image.

---

## 4. Spec Format Reference (Actual Firestore Key Names)

Specs are stored as `Record<string, string>` with **human-readable keys**.
The detail page renders them directly — no key mapping applied.

```
// Example: Goliath Crane (seeded, verified)
specs: {
  "Safe Working Load":  "1000 kg to 60,000 kg",
  "Span":               "5 m to 50 m",
  "Height of Lift":     "As per customer specifications",
  "Class of Duty":      "M5, M7, M8 as per IS 3177 / IS 807",
  "Crane Control":      "Pendant push buttons / Radio remote / Cabin with master control",
  "Drive System":       "Twin drive squirrel cage induction geared motors with fail safe brakes",
  "Motor Insulation Class": "B/F",
  "Power Supply":       "Trailing cables / drag chain / shrouded bus bars / cable reeling drum"
}
```

> **Note:** `ProductCard` reads `product.specs?.capacity` to show the capacity chip.
> Products using `"Safe Working Load"` as the key will show an empty chip.
> Batch 4 fix: normalise or use a dedicated top-level `capacity` field.

---

## 5. Blog — Placeholder Posts

| Slug | Title | Tags | Excerpt |
|---|---|---|---|
| `eot-crane-maintenance-guide` | EOT Crane Maintenance: A Complete Guide for Plant Managers | EOT Cranes, Maintenance, Safety | Scheduled maintenance is the single most effective strategy to maximize your EOT crane's operational uptime and extend its working life. |
| `is-807-crane-standards-explained` | IS:807 Crane Standards — What Every Procurement Engineer Should Know | Standards, Safety, Engineering | IS:807 is the foundational Indian Standard governing the design and construction of overhead cranes. Understanding it is essential before purchasing. |
| `gantry-vs-eot-crane` | Gantry vs EOT Crane: Which Is Right for Your Facility? | Gantry Cranes, EOT Cranes, Comparison | The choice between a gantry and an EOT crane is determined by your facility's structural capacity, operational footprint, and long-term lifting requirements. |
| `wire-rope-vs-chain-hoist` | Wire Rope Hoist vs Chain Hoist: Key Differences and Use Cases | Hoists, Comparison | Wire rope hoists deliver higher speeds and longer lifts; chain hoists offer compactness and lower cost. Here is how to choose the right one. |
| `crane-load-testing-process` | How We Test Every Crane Before Dispatch: The Safe Build Process | Quality, Safety, Manufacturing | Every crane that leaves our facility undergoes a mandatory 125% static overload test and full dynamic proving trial. Here is the complete process. |

---

## 6. Contact Page Copy

- **H1:** Contact Safe Build Engineering
- **Lead:** Reach our engineering team to discuss your lifting requirements, request a site assessment, or inquire about our product range.
- **Enquiry form heading:** Send an Enquiry
- **Owner / Primary Contact:** Divakar Mishra
- **Phone:** +91 99351 05322
- **Email:** safebuildengineering26@gmail.com
- **WhatsApp:** https://wa.me/919935105322
- **Address:**
  891, Murlipur Goyala, Near RSB Transmission Ltd.,
  Behind Tata Telco, Deva Road, Lucknow — 226028

---

## 7. Homepage Copy — Status: ⬜ QA Pending

> File built (`src/pages/index.astro`, 21 KB) — full visual QA not yet done.

- **H1:** Industrial Lifting Solutions Built for India
- **Lead:** Safe Build Engineering designs and manufactures EOT cranes, gantry cranes, and hoists engineered for critical infrastructure with zero-margin error.
- **Primary CTA:** Explore Products
- **Secondary CTA:** Request a Quote
- **Stats strip (placeholder):**
  - 100+ Cranes Installed
  - IS:807 Certified
  - 5-Year Structural Warranty
  - All-India Service Network

---

## 8. Navigation Link Map

| Label | Route | Notes |
|---|---|---|
| EOT Cranes | `/products?category=eot-cranes` | Filtered product listing |
| Gantry Cranes | `/products?category=gantry-cranes` | Filtered product listing |
| Hoists | `/products?category=hoists` | Filtered product listing |
| Engineering (About) | `/about` | Active on about page |
| Contact | `/contact` | |
| Request Quote | `/contact?type=quote` | Opens quote form tab |

---

## 9. Footer Link Map

| Column | Link Label | Route / Value |
|---|---|---|
| Company | About | `/about` |
| Company | Sitemap | `/sitemap.xml` |
| Legal | Privacy Policy | `/privacy` |
| Legal | Terms of Service | `/terms` |
| Contact | Address | 891, Murlipur Goyala, Near RSB Transmission Ltd., Behind Tata Telco, Deva Road, Lucknow — 226028 |
| Contact | Phone | `tel:+919935105322` → +91 99351 05322 |
| Contact | Email | `mailto:safebuildengineering26@gmail.com` |
| Contact | WhatsApp | `https://wa.me/919935105322` |

---

## 10. Company Details (Master Reference)

| Field | Value |
|---|---|
| **Company Name** | Safe Build Engineering |
| **Owner** | Divakar Mishra |
| **Phone** | +91 99351 05322 |
| **Email** | safebuildengineering26@gmail.com |
| **WhatsApp** | https://wa.me/919935105322 |
| **Address** | 891, Murlipur Goyala, Near RSB Transmission Ltd., Behind Tata Telco, Deva Road, Lucknow — 226028 |
| **PIN** | 226028 |
