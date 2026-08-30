// =============================================================
// firebase.ts — Safe Build Engineering
// Initializes the Firebase app, Firestore, and Auth instances.
// Used by: firestore.ts (server-side), client forms
// Includes fallbacks and guards for Cloudflare Workers SSR context.
// =============================================================

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore/lite';
import { getAuth, type Auth } from 'firebase/auth';

// Environment variable accessor with fallback defaults for Cloudflare Pages SSR.
// Firebase client keys are non-secret public identifiers designed for client/SSR embedding.
const firebaseConfig = {
  apiKey:            import.meta.env.PUBLIC_FIREBASE_API_KEY            || 'AIzaSyAf8-c4-22co8tNOb1oe-sVCqWIo3Zr24s',
  authDomain:        import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN        || 'safebuild-296c3.firebaseapp.com',
  projectId:         import.meta.env.PUBLIC_FIREBASE_PROJECT_ID         || 'safebuild-296c3',
  storageBucket:     import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET     || 'safebuild-296c3.firebasestorage.app',
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '704843592260',
  appId:             import.meta.env.PUBLIC_FIREBASE_APP_ID             || '1:704843592260:web:bdddcc32345906d5918211',
};

// Safe singleton initialization
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  auth = getAuth(app);
} catch (e) {
  console.error('[firebase.ts] Failed to initialize Firebase:', e);
}

export { app, db, auth };
