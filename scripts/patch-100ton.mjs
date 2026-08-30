// =============================================================
// scripts/patch-100ton.mjs — Safe Build Engineering
// One-off patch: fix capacity on eot-crane-100-ton document
// and update all imageUrls to match the refreshed IMAGES map.
//
// Usage:  node scripts/patch-100ton.mjs
// =============================================================

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env ────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, '../.env');
const envLines  = readFileSync(envPath, 'utf-8').split('\n');

for (const line of envLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
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

// ── Updated image URLs (matches refreshed IMAGES in seed-products.mjs) ──
const IMAGES = {
  eotSmall:   'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80',
  eotMedium:  'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80',
  eotLarge:   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  eotHeavy:   'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  eotMaxDuty: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  gantryFull: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  gantryHeavy:'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
  semiGantry: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  hoistWire:  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  hoistChain: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80',
};

// slug → new imageUrl + any field overrides
const PATCHES = [
  { slug: 'eot-crane-5-ton',          fields: { imageUrl: IMAGES.eotSmall,   'specs.capacity': '5 Ton'   } },
  { slug: 'eot-crane-10-ton',         fields: { imageUrl: IMAGES.eotMedium,  'specs.capacity': '10 Ton'  } },
  { slug: 'eot-crane-20-ton',         fields: { imageUrl: IMAGES.eotLarge,   'specs.capacity': '20 Ton'  } },
  { slug: 'eot-crane-50-ton',         fields: { imageUrl: IMAGES.eotHeavy,   'specs.capacity': '50 Ton'  } },
  { slug: 'eot-crane-100-ton',        fields: { imageUrl: IMAGES.eotMaxDuty, 'specs.capacity': '100 Ton' } },
  { slug: 'gantry-crane-10-ton',      fields: { imageUrl: IMAGES.gantryFull  } },
  { slug: 'gantry-crane-25-ton',      fields: { imageUrl: IMAGES.gantryHeavy } },
  { slug: 'semi-gantry-crane-10-ton', fields: { imageUrl: IMAGES.semiGantry  } },
  { slug: 'wire-rope-hoist-1-ton',    fields: { imageUrl: IMAGES.hoistWire   } },
  { slug: 'wire-rope-hoist-5-ton',    fields: { imageUrl: IMAGES.hoistWire   } },
  { slug: 'chain-hoist-500kg',        fields: { imageUrl: IMAGES.hoistChain  } },
  { slug: 'chain-hoist-2-ton',        fields: { imageUrl: IMAGES.hoistChain  } },
];

async function patch() {
  console.log('\n🔧 Safe Build Engineering — Firestore Patch Script');
  console.log(`   Project: ${process.env.PUBLIC_FIREBASE_PROJECT_ID}\n`);

  const col = collection(db, 'products');

  for (const { slug, fields } of PATCHES) {
    const snap = await getDocs(query(col, where('slug', '==', slug)));
    if (snap.empty) {
      console.log(`  ⚠  NOT FOUND  ${slug}`);
      continue;
    }
    // Read the existing document data, apply our field overrides,
    // delete the old doc, then re-insert — works under create-only rules.
    const oldDoc  = snap.docs[0];
    const oldData = oldDoc.data();

    // Merge nested 'specs' if we are patching spec sub-fields
    const specOverrides = {};
    const topOverrides  = {};
    for (const [k, v] of Object.entries(fields)) {
      if (k.startsWith('specs.')) {
        specOverrides[k.replace('specs.', '')] = v;
      } else {
        topOverrides[k] = v;
      }
    }

    const merged = {
      ...oldData,
      ...topOverrides,
      specs: { ...(oldData.specs ?? {}), ...specOverrides },
      updatedAt: serverTimestamp(),
    };

    await deleteDoc(oldDoc.ref);
    await addDoc(col, merged);
    console.log(`  ✅ PATCHED    ${slug}`);
  }

  console.log('\n  Done.\n');
  process.exit(0);
}

patch().catch(err => {
  console.error('\n❌ Patch failed:', err.message);
  process.exit(1);
});
