// =============================================================
// scripts/seed-products.mjs — Safe Build Engineering
// One-time Firestore seeder for the products collection.
//
// Usage:  node scripts/seed-products.mjs
//
// Reads credentials from .env (same file Astro uses).
// Each run is idempotent: checks for existing slug before writing.
// isFeatured: true on first 3 products (order 1, 2, 3).
// =============================================================

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env manually (no dotenv dependency needed in Node 20) ──
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, '../.env');
const envLines  = readFileSync(envPath, 'utf-8').split('\n');

for (const line of envLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  process.env[key] = val;
}

// ── Firebase Init ────────────────────────────────────────────
const app = initializeApp({
  apiKey:            process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

// ── Unsplash crane / industrial image URLs ───────────────────
// Photo IDs sourced by searching Unsplash for:
//   "EOT crane factory", "gantry crane port", "wire rope hoist industrial"
// All are publicly accessible without an API key.
const IMAGES = {
  // EOT / overhead crane — factory interior shots
  eotSmall:   'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80', // industrial overhead crane
  eotMedium:  'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80', // factory crane beam
  eotLarge:   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', // heavy steel factory
  eotHeavy:   'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', // industrial plant crane
  eotMaxDuty: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', // large steel mill crane
  // Gantry cranes — port / outdoor yard
  gantryFull: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', // port gantry crane
  gantryHeavy:'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80', // container gantry port
  semiGantry: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // yard crane outdoor
  // Hoists — wire rope / chain industrial
  hoistWire:  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', // wire rope hoist close-up
  hoistChain: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80', // chain hoist workshop
};

// ── Product Definitions ──────────────────────────────────────
// 12 products total: 5 EOT + 3 Gantry + 4 Hoist
// Ordered by: EOT (1-5) → Gantry (6-8) → Hoist (9-12)
// isFeatured: true on orders 1, 2, 3 (first 3 overall)
const PRODUCTS = [

  // ── EOT CRANES ──────────────────────────────────────────────

  {
    slug:             'eot-crane-5-ton',
    name:             '5-Ton EOT Crane',
    category:         'eot-cranes',
    shortDescription: 'Single-girder electric overhead crane for light-to-medium industrial applications.',
    description:      `The Safe Build 5-Ton EOT Crane is designed for light-to-medium duty lifting in workshops, assembly lines, and small manufacturing units. Its single-girder construction optimises headroom while delivering reliable, precise operation.\n\nBuilt to IS:807 and IS:3177 standards, every unit is load-tested at 125% rated capacity before dispatch. Available with pendant or radio remote control.`,
    specs: {
      capacity:   '5 Ton',
      type:       'Single Girder',
      span:       'Up to 20m',
      liftHeight: 'Up to 8m',
      driveType:  'FRD / CRD',
      dutyCycle:  'M3 / M4',
      hoistSpeed: '6 m/min (FLD) / 0.6 m/min (CRD)',
      ctSpeed:    '10 m/min',
      ltSpeed:    '20 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:807 / IS:3177 / IS:3938',
    },
    imageUrl:    IMAGES.eotSmall,
    galleryUrls: [IMAGES.eotSmall, IMAGES.eotMedium],
    isFeatured:  true,   // ← Featured: order 1
    order:       1,
  },

  {
    slug:             'eot-crane-10-ton',
    name:             '10-Ton EOT Crane',
    category:         'eot-cranes',
    shortDescription: 'Double-girder EOT crane built for medium-duty continuous operation in manufacturing facilities.',
    description:      `The Safe Build 10-Ton EOT Crane is engineered for continuous operation in demanding industrial environments. The double-girder configuration delivers exceptional span capability and headroom, while precision-machined components ensure smooth, reliable lifting cycles shift after shift.\n\nManufactured in compliance with IS:807 and IS:3177, this crane undergoes full load testing at 125% rated capacity before dispatch. Custom span configurations and specialised hook types are available on request.`,
    specs: {
      capacity:   '10 Ton',
      type:       'Double Girder',
      span:       'Up to 28m',
      liftHeight: 'Up to 10m',
      driveType:  'FRD / CRD',
      dutyCycle:  'M4 / M5',
      hoistSpeed: '5 m/min (FLD) / 0.5 m/min (CRD)',
      ctSpeed:    '10 m/min',
      ltSpeed:    '20 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:807 / IS:3177 / IS:3938',
    },
    imageUrl:    IMAGES.eotMedium,
    galleryUrls: [IMAGES.eotMedium, IMAGES.eotLarge],
    isFeatured:  true,   // ← Featured: order 2
    order:       2,
  },

  {
    slug:             'eot-crane-20-ton',
    name:             '20-Ton EOT Crane',
    category:         'eot-cranes',
    shortDescription: 'Heavy-duty double-girder crane engineered for steel plants and fabrication yards.',
    description:      `The Safe Build 20-Ton EOT Crane is built for heavy-duty service in steel fabrication, automotive, and infrastructure sectors. Its box-girder construction and precision drive systems ensure long service life under high-duty-cycle conditions.\n\nConfigured to IS:807 M5/M6 duty class with optional explosion-proof and hazardous-area variants available.`,
    specs: {
      capacity:   '20 Ton',
      type:       'Double Girder (Box)',
      span:       'Up to 32m',
      liftHeight: 'Up to 12m',
      driveType:  'FRD / CRD',
      dutyCycle:  'M5 / M6',
      hoistSpeed: '4 m/min (FLD) / 0.4 m/min (CRD)',
      ctSpeed:    '10 m/min',
      ltSpeed:    '20 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:807 / IS:3177',
    },
    imageUrl:    IMAGES.eotLarge,
    galleryUrls: [IMAGES.eotLarge],
    isFeatured:  true,   // ← Featured: order 3
    order:       3,
  },

  {
    slug:             'eot-crane-50-ton',
    name:             '50-Ton EOT Crane',
    category:         'eot-cranes',
    shortDescription: 'Industrial-grade high-capacity crane for shipbuilding, port, and heavy infrastructure.',
    description:      `The Safe Build 50-Ton EOT Crane is designed for heavy infrastructure lifting — shipyards, ports, railway workshops, and pre-fabricated structure assembly. Dual-hoist configurations and anti-sway technology available on request.\n\nEngineered to IS:807 M6 duty class with full load-test certification.`,
    specs: {
      capacity:   '50 Ton',
      type:       'Double Girder (Box)',
      span:       'Up to 35m',
      liftHeight: 'Up to 15m',
      driveType:  'CRD (Variable Frequency)',
      dutyCycle:  'M5 / M6',
      hoistSpeed: '3 m/min',
      ctSpeed:    '8 m/min',
      ltSpeed:    '16 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Radio Remote / Cabin',
      standards:  'IS:807 / IS:3177',
    },
    imageUrl:    IMAGES.eotHeavy,
    galleryUrls: [IMAGES.eotHeavy],
    isFeatured:  false,
    order:       4,
  },

  {
    slug:             'eot-crane-100-ton',
    name:             '100-Ton EOT Crane',
    category:         'eot-cranes',
    shortDescription: 'Maximum-duty crane system for steel mills and power plant construction.',
    description:      `The Safe Build 100-Ton EOT Crane represents our highest-capacity offering — engineered for steel mills, thermal and hydro power plants, and heavy casting yards. Features cabin-controlled operation, main + auxiliary hoist configuration, and full IS:807 M7 duty compliance.\n\nCustom girder spans, hook types, and buffer configurations available. Site-specific structural analysis provided.`,
    specs: {
      capacity:   '100 Ton',
      type:       'Double Girder (Box)',
      span:       'Up to 40m',
      liftHeight: 'Up to 20m',
      driveType:  'CRD (Variable Frequency)',
      dutyCycle:  'M6 / M7',
      hoistSpeed: '2 m/min (Main) / 4 m/min (Aux)',
      ctSpeed:    '6 m/min',
      ltSpeed:    '12 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Operator Cabin + Radio Remote',
      standards:  'IS:807 / IS:3177',
    },
    imageUrl:    IMAGES.eotMaxDuty,
    galleryUrls: [IMAGES.eotMaxDuty],
    isFeatured:  false,
    order:       5,
  },

  // ── GANTRY CRANES ───────────────────────────────────────────

  {
    slug:             'gantry-crane-10-ton',
    name:             '10-Ton Gantry Crane',
    category:         'gantry-cranes',
    shortDescription: 'Full-gantry ground-running crane for open yards and outdoor fabrication areas.',
    description:      `The Safe Build 10-Ton Full Gantry Crane is designed for outdoor yards, fabrication plots, and facilities without overhead building structure. Steel-fabricated legs run on ground-level rails, delivering full overhead coverage across the entire work area.\n\nAvailable in fixed-height and adjustable-height variants. Suitable for steel fabrication yards, precast concrete yards, and logistics hubs.`,
    specs: {
      capacity:   '10 Ton',
      type:       'Full Gantry',
      span:       'Up to 18m',
      liftHeight: 'Up to 8m',
      driveType:  'FRD / CRD',
      dutyCycle:  'M3 / M4',
      hoistSpeed: '5 m/min',
      ltSpeed:    '15 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:807',
    },
    imageUrl:    IMAGES.gantryFull,
    galleryUrls: [IMAGES.gantryFull],
    isFeatured:  false,
    order:       6,
  },

  {
    slug:             'gantry-crane-25-ton',
    name:             '25-Ton Gantry Crane',
    category:         'gantry-cranes',
    shortDescription: 'Heavy-duty gantry with adjustable spans for port and logistics applications.',
    description:      `The Safe Build 25-Ton Gantry Crane serves port operations, heavy logistics yards, and pre-fabricated construction assembly. Its heavy box-section legs and precision rail system deliver stable lifting across wide spans.\n\nConfigured for M5 duty class with optional anti-sway and load-limit safety systems.`,
    specs: {
      capacity:   '25 Ton',
      type:       'Full Gantry (Box Section)',
      span:       'Up to 24m',
      liftHeight: 'Up to 10m',
      driveType:  'CRD (Variable Frequency)',
      dutyCycle:  'M4 / M5',
      hoistSpeed: '4 m/min',
      ltSpeed:    '12 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Radio Remote',
      standards:  'IS:807',
    },
    imageUrl:    IMAGES.gantryHeavy,
    galleryUrls: [IMAGES.gantryHeavy],
    isFeatured:  false,
    order:       7,
  },

  {
    slug:             'semi-gantry-crane-10-ton',
    name:             '10-Ton Semi-Gantry Crane',
    category:         'gantry-cranes',
    shortDescription: 'Wall-supported semi-gantry for facilities with limited ground space.',
    description:      `The Safe Build 10-Ton Semi-Gantry Crane is the ideal solution when full gantry construction is not feasible. One side runs on a wall-mounted runway rail; the other on a ground-level rail — maximising floor coverage while minimising structural footprint.\n\nCommonly used in maintenance workshops, vehicle service bays, and narrow fabrication halls.`,
    specs: {
      capacity:   '10 Ton',
      type:       'Semi-Gantry',
      span:       'Up to 12m',
      liftHeight: 'Up to 6m',
      driveType:  'FRD',
      dutyCycle:  'M3 / M4',
      hoistSpeed: '5 m/min',
      ltSpeed:    '15 m/min',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant',
      standards:  'IS:807',
    },
    imageUrl:    IMAGES.semiGantry,
    galleryUrls: [IMAGES.semiGantry],
    isFeatured:  false,
    order:       8,
  },

  // ── HOISTS ──────────────────────────────────────────────────

  {
    slug:             'wire-rope-hoist-1-ton',
    name:             '1-Ton Wire Rope Hoist',
    category:         'hoists',
    shortDescription: 'Compact, high-speed wire rope hoist for maintenance bays and light lifting.',
    description:      `The Safe Build 1-Ton Wire Rope Hoist delivers fast, reliable lifting for maintenance operations, tooling changes, and light assembly tasks. Compact design minimises headroom loss while providing smooth lifting via variable frequency control.\n\nAvailable with motorised trolley for use on I-beam or box-section runways. IP55-rated motor for dust-resistant environments.`,
    specs: {
      capacity:   '1 Ton',
      type:       'Wire Rope Hoist',
      liftHeight: 'Up to 12m',
      driveType:  'FRD (Variable Frequency)',
      dutyCycle:  'M3',
      hoistSpeed: '8 m/min (FLD) / 0.8 m/min (CRD)',
      trolleyType:'Manual / Motorised',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:3938',
    },
    imageUrl:    IMAGES.hoistWire,
    galleryUrls: [IMAGES.hoistWire],
    isFeatured:  false,
    order:       9,
  },

  {
    slug:             'wire-rope-hoist-5-ton',
    name:             '5-Ton Wire Rope Hoist',
    category:         'hoists',
    shortDescription: 'Industrial wire rope hoist with FRD/CRD drive options for production lines.',
    description:      `The Safe Build 5-Ton Wire Rope Hoist is a production-grade hoist designed for continuous operation in manufacturing, logistics, and warehouse environments. Dual-speed and variable frequency drive options ensure precise load positioning.\n\nMounts to standard EOT crane trolleys or as a standalone unit on I-beam runway systems. ATEX (explosion-proof) variants available on request.`,
    specs: {
      capacity:   '5 Ton',
      type:       'Wire Rope Hoist',
      liftHeight: 'Up to 20m',
      driveType:  'FRD / CRD',
      dutyCycle:  'M4 / M5',
      hoistSpeed: '6 m/min (FLD) / 0.6 m/min (CRD)',
      trolleyType:'Motorised',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:3938',
    },
    imageUrl:    IMAGES.hoistWire,
    galleryUrls: [IMAGES.hoistWire],
    isFeatured:  false,
    order:       10,
  },

  {
    slug:             'chain-hoist-500kg',
    name:             '500 KG Chain Hoist',
    category:         'hoists',
    shortDescription: 'Portable electric chain hoist for workshop and maintenance operations.',
    description:      `The Safe Build 500 KG Electric Chain Hoist is a portable, compact lifting solution for workshops, maintenance bays, and small assembly operations. Lightweight aluminium body and compact gearbox allow installation in low-headroom locations.\n\nEquipped with automatic brake, limit switch, and IP54-rated enclosure. Available with fixed, push-travel, or motorised trolley.`,
    specs: {
      capacity:   '500 KG',
      type:       'Electric Chain Hoist',
      liftHeight: 'Up to 6m',
      driveType:  'Single Speed',
      dutyCycle:  'M2 / M3',
      hoistSpeed: '8 m/min',
      trolleyType:'Fixed Hook / Push Travel / Motorised',
      powerSupply:'415V / 50Hz / 3-Phase or 230V / 50Hz / Single Phase',
      control:    'Pendant',
      standards:  'IS:3938',
    },
    imageUrl:    IMAGES.hoistChain,
    galleryUrls: [IMAGES.hoistChain],
    isFeatured:  false,
    order:       11,
  },

  {
    slug:             'chain-hoist-2-ton',
    name:             '2-Ton Chain Hoist',
    category:         'hoists',
    shortDescription: 'Medium-duty electric chain hoist with motorised trolley option.',
    description:      `The Safe Build 2-Ton Electric Chain Hoist bridges the gap between portable workshop hoists and full wire rope systems. Ideal for medium-duty maintenance, tooling, and assembly applications with frequent short lifts.\n\nAvailable with motorised cross-travel trolley for use on workshop runway beams. Safety features include overload protection, thermal motor protection, and mechanical brake.`,
    specs: {
      capacity:   '2 Ton',
      type:       'Electric Chain Hoist',
      liftHeight: 'Up to 10m',
      driveType:  'Dual Speed',
      dutyCycle:  'M3 / M4',
      hoistSpeed: '4 m/min (High) / 1 m/min (Low)',
      trolleyType:'Motorised',
      powerSupply:'415V / 50Hz / 3-Phase',
      control:    'Pendant / Radio Remote',
      standards:  'IS:3938',
    },
    imageUrl:    IMAGES.hoistChain,
    galleryUrls: [IMAGES.hoistChain],
    isFeatured:  false,
    order:       12,
  },

];

// ── Seeder ───────────────────────────────────────────────────
async function seed() {
  console.log(`\n🔥 Safe Build Engineering — Firestore Product Seeder`);
  console.log(`   Project: ${process.env.PUBLIC_FIREBASE_PROJECT_ID}`);
  console.log(`   Products to seed: ${PRODUCTS.length}\n`);

  const col = collection(db, 'products');
  let created = 0;
  let skipped = 0;

  for (const product of PRODUCTS) {
    // Check if slug already exists — idempotent
    const existing = await getDocs(query(col, where('slug', '==', product.slug)));
    if (!existing.empty) {
      console.log(`  ⏭  SKIP  [${product.order.toString().padStart(2, '0')}] ${product.slug}`);
      skipped++;
      continue;
    }

    await addDoc(col, {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const featuredMark = product.isFeatured ? ' ⭐' : '';
    console.log(`  ✅ ADD   [${product.order.toString().padStart(2, '0')}] ${product.slug}${featuredMark}`);
    created++;
  }

  console.log(`\n  Done — ${created} created, ${skipped} skipped.\n`);
  process.exit(0);
}

seed().catch(err => {
  console.error('\n❌ Seeder failed:', err.message);
  process.exit(1);
});
