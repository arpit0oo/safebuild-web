// =============================================================
// scripts/update-images-and-publish.mjs
// Safe Build Engineering — One-shot image + publish migration
//
// What this does:
//   1. For the 11 known product categories (slugs listed below):
//      - Sets image = "/images/categories/{category-slug}.png"
//        NOTE: image field name is "image", NOT "imageUrl" (confirmed from seeding scripts)
//      - Sets isPublished = true
//   2. For all OTHER products (categories without images):
//      - Sets isPublished = false (leaves image field unchanged)
//
// Run: node scripts/update-images-and-publish.mjs
// =============================================================

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  writeBatch,
} from 'firebase/firestore/lite';

// ── Firebase config (from .env) ──────────────────────────────
const firebaseConfig = {
  apiKey:            'AIzaSyAf8-c4-22co8tNOb1oe-sVCqWIo3Zr24s',
  authDomain:        'safebuild-296c3.firebaseapp.com',
  projectId:         'safebuild-296c3',
  storageBucket:     'safebuild-296c3.firebasestorage.app',
  messagingSenderId: '704843592260',
  appId:             '1:704843592260:web:bdddcc32345906d5918211',
};

// ── Published categories ─────────────────────────────────────
// These are the EXACT `category` field values stored in Firestore.
// The image filename is identical to the category slug.
// i.e. category "chain-hoist" → /images/categories/chain-hoist.png
//
// 11 categories with real images → isPublished: true
// All others                     → isPublished: false
const PUBLISHED_CATEGORIES = new Set([
  'chain-hoist',
  'chain-pulley-block',
  'double-girder-cranes',
  'heavy-duty-gantry-crane',
  'goliath-crane',
  'heavy-duty-crane',
  'hot-crane',
  'industrial-eot-crane',
  'overhead-trolley',
  'rail-mounted-gantry-crane',
  'underslung-crane',
]);

// ── Main ─────────────────────────────────────────────────────
async function main() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Fetching all products from Firestore...');
  const snap = await getDocs(collection(db, 'products'));
  const products = snap.docs;
  console.log(`  Found ${products.length} products.\n`);

  // Firestore writeBatch: max 500 ops per commit
  let batch = writeBatch(db);
  let opsInBatch = 0;
  let totalUpdated = 0;
  let publishedCount = 0;
  let unpublishedCount = 0;

  for (const d of products) {
    const data = d.data();
    const categorySlug = data.category ?? '';
    const docRef = doc(db, 'products', d.id);

    if (PUBLISHED_CATEGORIES.has(categorySlug)) {
      // Category has a real image — publish and set image path
      const imagePath = `/images/categories/${categorySlug}.png`;
      batch.update(docRef, {
        image: imagePath,
        isPublished: true,
      });
      console.log(`  ✅ PUBLISH  "${data.name ?? d.id}"  (${categorySlug})  →  ${imagePath}`);
      publishedCount++;
    } else {
      // No image for this category — hide it
      batch.update(docRef, {
        isPublished: false,
      });
      console.log(`  ⬜ HIDE     "${data.name ?? d.id}"  (${categorySlug})`);
      unpublishedCount++;
    }

    opsInBatch++;
    totalUpdated++;

    // Commit every 450 ops to stay under the 500-op batch limit
    if (opsInBatch >= 450) {
      console.log(`\nCommitting batch of ${opsInBatch} ops...`);
      await batch.commit();
      console.log('Batch committed.\n');
      batch = writeBatch(db);
      opsInBatch = 0;
    }
  }

  // Commit remaining ops
  if (opsInBatch > 0) {
    console.log(`\nCommitting final batch of ${opsInBatch} ops...`);
    await batch.commit();
    console.log('Final batch committed.\n');
  }

  console.log('─'.repeat(60));
  console.log(`Done. ${totalUpdated} products processed.`);
  console.log(`  ✅ Published (image set):  ${publishedCount}`);
  console.log(`  ⬜ Hidden (no image):      ${unpublishedCount}`);
  process.exit(0);
}

main().catch(err => {
  console.error('\nScript failed:', err);
  process.exit(1);
});
