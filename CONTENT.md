# CONTENT.md — Safe Build Engineering

> All copy, product slugs, descriptions, and placeholder content for the site.
> Updated to reflect 18 product categories and 41 products (seeding target).
> Slugs that are already seeded in Firestore are marked ✅.

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

> Target: 18 categories, 41 products total.
> `imageUrl` is currently `""` (empty string) for all products — placeholder shown in UI.
> Specs are stored as `Record<string, string>` with human-readable key names.

---

### Category 1: EOT Cranes (Electric Overhead Travelling)
**Firestore `category` value:** `eot-cranes`

| Slug | Name | Notes |
|---|---|---|
| `eot-crane-5-ton` | 5-Ton EOT Crane | |
| `eot-crane-10-ton` | 10-Ton EOT Crane | |
| `eot-crane-20-ton` | 20-Ton EOT Crane | |
| `eot-crane-50-ton` | 50-Ton EOT Crane | |
| `eot-crane-100-ton` | 100-Ton EOT Crane | |

---

### Category 2: Gantry Cranes
**Firestore `category` value:** `gantry-cranes`

| Slug | Name | Notes |
|---|---|---|
| `gantry-crane-10-ton` | 10-Ton Gantry Crane | |
| `gantry-crane-25-ton` | 25-Ton Gantry Crane | |
| `semi-gantry-crane-10-ton` | 10-Ton Semi-Gantry Crane | |

---

### Category 3: Goliath Cranes
**Firestore `category` value:** `gantry-cranes` (or dedicated slug pending)

| Slug | Name | Notes |
|---|---|---|
| `goliath-crane` | Goliath Crane | ✅ Seeded — verified in dev |

---

### Category 4: Jib Cranes
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `jib-crane-wall-mounted` | Wall-Mounted Jib Crane |
| `jib-crane-pillar-mounted` | Pillar-Mounted Jib Crane |
| `jib-crane-articulated` | Articulated Jib Crane |

---

### Category 5: Monorail Systems
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `monorail-hoist-system` | Monorail Hoist System |
| `curved-monorail-system` | Curved Monorail System |

---

### Category 6: Underslung Cranes
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `underslung-crane-5-ton` | 5-Ton Underslung Crane |
| `underslung-crane-10-ton` | 10-Ton Underslung Crane |

---

### Category 7: Wire Rope Hoists
**Firestore `category` value:** `hoists`

| Slug | Name |
|---|---|
| `wire-rope-hoist-1-ton` | 1-Ton Wire Rope Hoist |
| `wire-rope-hoist-5-ton` | 5-Ton Wire Rope Hoist |
| `wire-rope-hoist-10-ton` | 10-Ton Wire Rope Hoist |

---

### Category 8: Chain Hoists
**Firestore `category` value:** `hoists`

| Slug | Name |
|---|---|
| `chain-hoist-500kg` | 500 KG Chain Hoist |
| `chain-hoist-2-ton` | 2-Ton Chain Hoist |
| `chain-hoist-5-ton` | 5-Ton Chain Hoist |

---

### Category 9: Overhead Crane Kits
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `overhead-crane-kit-5-ton` | 5-Ton Overhead Crane Kit |

---

### Category 10: Material Handling Systems
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `automated-material-handling` | Automated Material Handling System |
| `manual-material-handling` | Manual Material Handling System |

---

### Category 11: Davit Cranes
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `davit-crane-500kg` | 500 KG Davit Crane |
| `davit-crane-2-ton` | 2-Ton Davit Crane |

---

### Category 12: Stackers & Transfer Cars
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `transfer-car-10-ton` | 10-Ton Transfer Car |
| `coil-transfer-car` | Coil Transfer Car |

---

### Category 13: Grab Buckets & Special Attachments
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `grab-bucket-clamshell` | Clamshell Grab Bucket |
| `electromagnet-lifting` | Electromagnet Lifting Attachment |

---

### Category 14: Crane Components & Spares
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `end-carriage-assembly` | End Carriage Assembly |
| `drum-and-gearbox-unit` | Drum and Gearbox Unit |

---

### Category 15: Hoisting Winches
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `electric-winch-2-ton` | 2-Ton Electric Winch |
| `electric-winch-10-ton` | 10-Ton Electric Winch |

---

### Category 16: Port & Shipyard Cranes
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `port-mobile-crane` | Port Mobile Crane |
| `shipyard-gantry-crane` | Shipyard Gantry Crane |

---

### Category 17: Foundry & Steel Plant Cranes
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `foundry-ladle-crane` | Foundry Ladle Crane |
| `coil-handling-crane` | Coil Handling Crane |

---

### Category 18: Custom Engineering Solutions
**Firestore `category` value:** TBD

| Slug | Name |
|---|---|
| `custom-crane-solution` | Custom Crane Solution |

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

## 7. Homepage Copy (Placeholder — Built Last)

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
