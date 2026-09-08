// =============================================================
// types.ts — Safe Build Engineering
// Canonical TypeScript interfaces for all Firestore collections.
// =============================================================

import type { Timestamp } from 'firebase/firestore/lite';

// -------------------------------------------------------------
// PRODUCT
// Firestore collection: "products"
// -------------------------------------------------------------
export interface ProductSpecs {
  capacity: string;     // e.g. "10 Ton"
  span: string;         // e.g. "Up to 28m"
  liftHeight: string;   // e.g. "Up to 10m"
  driveType: string;    // e.g. "FRD / CRD"
  dutyCycle: string;    // e.g. "M4 / M5"
  [key: string]: string; // allow extra spec fields from CMS
}

export interface Product {
  id: string;                // Firestore document ID
  slug: string;              // URL slug, e.g. "goliath-crane"
  name: string;              // "Goliath Crane"
  category: string;          // Category slug — matches Firestore `category` field exactly
                             // e.g. 'double-girder-cranes', 'goliath-crane', 'chain-hoist'
                             // NOTE: ProductCategory union type removed — 18+ categories exist
  shortDescription: string;  // ~80 chars for listing cards
  description: string;       // Full body text for detail page
  specs: Record<string, string>; // Human-readable key/value pairs from CMS
  image: string;             // Primary image path, e.g. "/images/categories/chain-hoist.png"
                             // Empty string ("") if no image assigned yet
                             // NOTE: Firestore field is "image", NOT "imageUrl"
  galleryUrls?: string[];    // Additional images (optional)
  isFeatured: boolean;       // Show on homepage featured section
  isPublished: boolean;      // Controls visibility — false = hidden from all public pages
  order: number;             // Manual sort order
  tagline?: string;          // Short marketing tagline (falls back to shortDescription)
  categoryName?: string;     // Human-readable category label from Firestore
  features?: string[];       // Bullet-point feature list (rendered in Section 3)
  sections?: Array<{         // Structured detail-page sections — renderer is LIVE
    title: string;
    type: 'bullets' | 'table' | 'text';
    content: string[] | Record<string, string> | string;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ProductCategory union type removed — 18+ categories now live in Firestore.
// The `category` field on Product is now typed as `string`.
// See CONTENT.md for the full list of category slugs.
export type ProductCategory = string; // kept as alias for backward compat, do not use for narrowing

// -------------------------------------------------------------
// BLOG POST
// Firestore collection: "blogs"
// -------------------------------------------------------------
export interface BlogPost {
  id: string;
  slug: string;              // URL slug, e.g. "eot-crane-maintenance-guide"
  title: string;
  excerpt: string;           // ~150 chars for listing cards
  body: string;              // Full HTML content (rendered with set:html)
  coverImageUrl: string;
  author: string;
  tags: string[];            // e.g. ["EOT Cranes", "Safety"]
  publishedAt: Timestamp;
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// -------------------------------------------------------------
// ENQUIRY
// Firestore collection: "enquiries"
// Written by: Contact page form
// -------------------------------------------------------------
export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  source: EnquirySource;
  productSlug?: string;      // If submitted from a product detail page
  createdAt?: Timestamp;
  isRead: boolean;
}

export type EnquirySource = 'contact-form' | 'product-page';

// -------------------------------------------------------------
// QUOTE REQUEST
// Firestore collection: "quotes"
// Written by: Quote form (contact page / product detail page)
// -------------------------------------------------------------
export interface Quote {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  productInterest: string;   // Product name or "General"
  capacity: string;          // e.g. "10 Ton"
  span: string;              // e.g. "20m"
  liftHeight: string;        // e.g. "8m"
  additionalNotes: string;
  createdAt?: Timestamp;
  status: QuoteStatus;
}

export type QuoteStatus = 'new' | 'in-review' | 'quoted' | 'closed';
