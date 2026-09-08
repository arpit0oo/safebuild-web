// =============================================================
// firestore.ts — Safe Build Engineering
// Typed Firestore helper functions for all collections.
// All functions return typed interfaces from types.ts.
// Used by: SSR pages (server-side data fetching)
// =============================================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore/lite';
import { db } from './firebase';
import type { Product, BlogPost, Enquiry, Quote } from './types';

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------

/** Attaches the Firestore doc ID to a typed data object */
function withId<T>(doc: import('firebase/firestore/lite').DocumentSnapshot): T | null {
  if (!doc.exists()) return null;
  return { id: doc.id, ...doc.data() } as T;
}

// ---------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------

/**
 * Fetch all published products from Firestore.
 * Filters by isPublished === true so unpublished products never reach the UI.
 * No orderBy — avoids Firestore index requirement.
 * Callers are responsible for JS-side filtering and sorting.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const q = query(
      collection(db, 'products'),
      where('isPublished', '==', true),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
  } catch (e) {
    console.error('[getProducts] Firestore fetch failed:', e);
    return [];
  }
}

/**
 * Fetch a single published product by its URL slug.
 * Returns null if not found OR if isPublished === false.
 * Caller should redirect to /products on null.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);

  if (snap.empty) return null;
  const d = snap.docs[0]!;
  const product = { id: d.id, ...d.data() } as Product;

  // Treat unpublished products as not found — redirects to /products
  if (product.isPublished === false) return null;

  return product;
}

/**
 * Fetch featured published products for the homepage (isFeatured === true).
 * Sorted by order asc, optionally limited.
 */
export async function getFeaturedProducts(count: number = 6): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('isPublished', '==', true),
    where('isFeatured', '==', true),
    orderBy('order', 'asc'),
    limit(count),
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

// ---------------------------------------------------------------
// BLOG POSTS
// ---------------------------------------------------------------

/**
 * Fetch all published blog posts, sorted by publishedAt desc.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, 'blogs'),
    where('isPublished', '==', true),
    orderBy('publishedAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
}

/**
 * Fetch a single blog post by its URL slug.
 * Returns null if not found or not published.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(
    collection(db, 'blogs'),
    where('slug', '==', slug),
    where('isPublished', '==', true),
    limit(1),
  );
  const snap = await getDocs(q);

  if (snap.empty) return null;
  const d = snap.docs[0]!;
  return { id: d.id, ...d.data() } as BlogPost;
}

// ---------------------------------------------------------------
// ENQUIRIES — write only (read is CMS-only)
// ---------------------------------------------------------------

/**
 * Submit a contact/enquiry form to Firestore.
 * Returns the new document ID.
 */
export async function submitEnquiry(
  data: Omit<Enquiry, 'id' | 'createdAt' | 'isRead'>,
): Promise<string> {
  const ref = await addDoc(collection(db, 'enquiries'), {
    ...data,
    isRead: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ---------------------------------------------------------------
// QUOTES — write only (read is CMS-only)
// ---------------------------------------------------------------

/**
 * Submit a quote request form to Firestore.
 * Returns the new document ID.
 */
export async function submitQuote(
  data: Omit<Quote, 'id' | 'createdAt' | 'status'>,
): Promise<string> {
  const ref = await addDoc(collection(db, 'quotes'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
