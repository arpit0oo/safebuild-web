import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore/lite';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';

const app = initializeApp({
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);

// ── STEP 1: Clear existing products ─────────────────────────
console.log('\n🗑️  Clearing existing products...');
const existingSnap = await getDocs(collection(db, 'products'));
for (const d of existingSnap.docs) {
  await deleteDoc(doc(db, 'products', d.id));
  console.log(`  Deleted: ${d.id}`);
}

// ── STEP 2: Seed all categories ──────────────────────────────
console.log('\n📦 Seeding categories...');
const categoryFiles = readdirSync('./safebuild-categories').filter(f => f.endsWith('.json'));
let catCount = 0;
for (const file of categoryFiles) {
  const data = JSON.parse(readFileSync(`./safebuild-categories/${file}`, 'utf8'));
  await setDoc(doc(db, 'categories', data.slug), data);
  console.log(`  ✅ ${data.name}`);
  catCount++;
}

// ── STEP 3: Seed all products ────────────────────────────────
console.log('\n🏗️  Seeding products...');
const productFiles = readdirSync('./safebuild-products').filter(f => f.endsWith('.json') && f !== '_index.json');
let prodCount = 0;
for (const file of productFiles) {
  const data = JSON.parse(readFileSync(`./safebuild-products/${file}`, 'utf8'));
  await setDoc(doc(db, 'products', data.slug), data);
  console.log(`  ✅ ${data.name}`);
  prodCount++;
}

console.log(`\n🎉 Done!`);
console.log(`   Categories seeded: ${catCount}`);
console.log(`   Products seeded:   ${prodCount}`);
