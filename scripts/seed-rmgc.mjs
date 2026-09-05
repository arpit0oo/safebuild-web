import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite';
import { readFileSync } from 'fs';

const app = initializeApp({
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);
const data = JSON.parse(readFileSync('./safebuild-products/rail-mounted-gantry-crane-rmgc.json', 'utf8'));
await setDoc(doc(db, 'products', data.slug), data);
console.log('✅ RMGC seeded:', data.name);
