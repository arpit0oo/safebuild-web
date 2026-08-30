// =============================================================
// firebase.ts — Safe Build Engineering
// Initializes the Firebase app, Firestore, and Auth instances.
// Used by: firestore.ts (server-side), QuoteForm.astro (client)
// =============================================================

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// All environment variables must be prefixed with PUBLIC_ in Astro
// so they are available in both SSR (server) and client contexts.
// Set these in .env and in Cloudflare Pages > Settings > Environment Variables.
const firebaseConfig = {
  apiKey:            import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:        import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initializing on hot-reload in dev mode
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

if (getApps().length === 0) {
  app  = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

db   = getFirestore(app);
auth = getAuth(app);

export { app, db, auth };
