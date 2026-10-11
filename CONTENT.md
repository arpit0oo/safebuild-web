# CONTENT.md — Safe Build Engineering

> All copy, product categories, descriptions, company details, and content sources for the site.
> Last updated: 2026-10-11 | Content managed via Sanity CMS; forms connected to Google Sheets

---

## 1. Master Company Details

| Field | Value |
|---|---|
| **Trade / Brand Name** | Safe Build Engineering |
| **Legal Entity Name** | Safebuild Engineering Private Limited |
| **Domain** | `safebuilds.in` |
| **Website URL** | `https://safebuilds.in` |
| **Primary Contact Email** | `info@safebuilds.in` |
| **Email Infrastructure** | Zoho Mail (4 accounts configured for `safebuilds.in`) |
| **Owner / Key Contact** | Divakar Mishra |
| **Phone** | +91 99351 05322 (`tel:+919935105322`) |
| **WhatsApp Direct** | https://wa.me/919935105322 |
| **Registered Works Address** | 891, Murlipur Goyala, Near RSB Transmission Ltd., Behind Tata Telco, Deva Road, Lucknow — 226028 |
| **PIN Code** | 226028 |
| **Working Hours** | Mon – Sat, 9:00 AM – 6:00 PM |

---

## 2. Brand Identity & Copy

| Element | Copy |
|---|---|
| **Tagline** | Precision Engineering Excellence. |
| **Sub-tagline** | Built to Lift. Built to Last. |
| **Footer Description** | Precision Engineering Excellence. Heavy-duty overhead cranes, gantry systems, and industrial lifting machinery built to lift and built to last. |
| **Copyright Notice** | © {currentYear} Safebuild Engineering Private Limited. All Rights Reserved. |
| **Certification Footnote** | Engineered for Indian Heavy Industry • IS:807 Compliant Design |
| **Header CTA** | REQUEST QUOTE → |

---

## 3. Page Copy

### 3.1 Homepage (`src/pages/index.astro`)
- **Hero Eyebrow:** — PRECISION CRANE MANUFACTURING
- **Hero H1:** India's Next-Generation Crane Manufacturer.
- **Hero Lead:** Engineering heavy-duty lifting solutions for the world's most demanding industrial environments. Precision-built, zero-margin error.
- **Hero Primary CTA:** Explore Products
- **Hero Secondary CTA:** Request a Quote
- **Stats Strip:**
  - 12+ Crane Models
  - 3 Manufacturing Units
  - IS:807 Compliant Design
  - 2024 Established
- **Solutions Heading:** Cranes Built for Every Industry
- **Advantage Heading:** Engineering Excellence at Every Scale (Safety First, Precision Engineering, Custom Solutions, End-to-End Support)
- **Snapshot Heading:** Founded with one mission — build cranes India can trust.
- **Industries:** Steel & Fabrication, Shipbuilding & Port, Automotive, Construction, Power & Energy, Warehousing
- **CTA Banner:** Ready to Lift Your Operations?

### 3.2 About Page (`src/pages/about.astro`)
- **Hero Eyebrow:** — ABOUT US
- **Hero H1:** Built on Precision. Driven by Safety.
- **Lead Copy:** We are an engineering firm specializing in high-performance cranes and lifting solutions. Our mandate is simple: deliver structurally sound, meticulously designed machinery for the modern industrial landscape.
- **Our Story:** Safe Build Engineering was founded with a singular focus: to engineer cranes that Indian industries can trust unconditionally...
- **Vision:** To set a new benchmark for structural safety and engineering precision in the Indian heavy lifting sector, becoming the preferred partner for critical infrastructure development.
- **Mission:** To design and manufacture industrial cranes with zero-margin error. We execute rigorous quality control and utilize advanced materials to ensure maximum operational uptime and safety for our clients.
- **Core Values:** Integrity, Innovation, Safety, Quality, Reliability.

### 3.3 Services Page (`src/pages/services.astro`) — 🚀 Next Task to Build
- **Status:** Next priority page to design and implement.
- **Planned Scope:**
  - Crane Design & Structural Engineering Consultation
  - Custom Fabrication & Manufacturing
  - On-site Erection, Installation & Commissioning
  - Preventative Maintenance & Overhaul Services
  - Load Testing & Annual Safety Certification (IS:807 / IS:3177)

### 3.4 Contact Page (`src/pages/contact.astro`)
- **Hero Eyebrow:** — CONTACT US
- **Hero H1:** Let's Talk Lifting.
- **Hero Lead:** Reach our engineering team to discuss your requirements, request a site visit, or get a quote for your next project.
- **Get In Touch Info:** Address, Phone, Email (`info@safebuilds.in`), Hours, WhatsApp Direct.
- **Enquiry Form:** Full Name, Company, Email, Phone, Message (Submits to Google Sheets).
- **Quote Form:** Full Name, Company, Email, Phone, Product Interest (Dynamic Sanity Categories dropdown), Required Capacity, Required Span, Additional Notes (Submits to Google Sheets).
- **Location Map:** Embedded Google Map for Lucknow works address.

---

## 4. Product Categories & Inventory (Sanity CMS)

All products and categories are hosted and queried in **Sanity CMS** (`project: 5vqxh570`, `dataset: production`).

### 18 Catalog Categories:
1. **EOT Cranes (Electric Overhead Travelling)** (`eot-cranes`)
2. **Gantry Cranes** (`gantry-cranes`)
3. **Goliath Cranes** (`goliath-crane`)
4. **Jib Cranes** (`jib-cranes`)
5. **Monorail Systems** (`monorail-systems`)
6. **Underslung Cranes** (`underslung-cranes`)
7. **Wire Rope Hoists** (`wire-rope-hoists`)
8. **Chain Hoists** (`chain-hoists`)
9. **Overhead Crane Kits** (`overhead-crane-kits`)
10. **Material Handling Systems** (`material-handling`)
11. **Davit Cranes** (`davit-cranes`)
12. **Stackers & Transfer Cars** (`transfer-cars`)
13. **Grab Buckets & Attachments** (`attachments`)
14. **Crane Components & Spares** (`crane-components`)
15. **Hoisting Winches** (`hoisting-winches`)
16. **Port & Shipyard Cranes** (`port-cranes`)
17. **Foundry & Steel Plant Cranes** (`foundry-cranes`)
18. **Custom Engineering Solutions** (`custom-solutions`)

> All 42 product documents have been migrated to Sanity. Product visibility on `/products` is controlled by the `isPublished` boolean in Sanity CMS.

---

## 5. Blog Posts — ⏸️ Deprioritized

> **Status:** Deprioritized — not in the immediate development plan. Blog creation will be re-evaluated after launch of Services and catalog completion.

Planned placeholder topics for future activation:
- *EOT Crane Maintenance: A Complete Guide for Plant Managers*
- *IS:807 Crane Standards — What Every Procurement Engineer Should Know*
- *Gantry vs EOT Crane: Which Is Right for Your Facility?*
- *Wire Rope Hoist vs Chain Hoist: Key Differences and Use Cases*
- *How We Test Every Crane Before Dispatch: The Safe Build Process*

---

## 6. Navigation Link Map

| Nav Label | Target Route | Purpose |
|---|---|---|
| **Products** | `/products` | Catalog listing with dynamic category cards |
| **About** | `/about` | Company history, mission, vision & values |
| **Contact** | `/contact` | Enquiries, direct communication & office map |
| **Request Quote** | `/contact?type=quote` | Quick access to engineering quote proposal |

---

## 7. Footer Link Map

| Section | Link Label | Target URL |
|---|---|---|
| **Equipment & Solutions** | EOT Cranes | `/products?category=eot-cranes` |
| **Equipment & Solutions** | Gantry Cranes | `/products?category=gantry-cranes` |
| **Equipment & Solutions** | Jib Cranes | `/products?category=jib-cranes` |
| **Equipment & Solutions** | Wire Rope Hoists | `/products?category=wire-rope-hoists` |
| **Equipment & Solutions** | View All Equipment | `/products` |
| **Company** | About Us | `/about` |
| **Company** | Request a Quote | `/contact?type=quote` |
| **Company** | Contact Us | `/contact` |
| **Company** | Privacy Policy | `/privacy` |
| **Company** | Terms of Service | `/terms` |
| **Works & Contact** | Address | Deva Road, Lucknow — 226028 |
| **Works & Contact** | Phone | `tel:+919935105322` |
| **Works & Contact** | Email | `mailto:info@safebuilds.in` |
| **Works & Contact** | WhatsApp | `https://wa.me/919935105322` |
