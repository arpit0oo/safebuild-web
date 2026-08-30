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
  slug: string;              // URL slug, e.g. "eot-crane-10-ton"
  name: string;              // "10-Ton EOT Crane"
  category: ProductCategory;
  shortDescription: string;  // ~80 chars for listing cards
  description: string;       // Full HTML/Markdown for detail page
  specs: ProductSpecs;
  imageUrl: string;          // Primary image
  galleryUrls: string[];     // Additional images
  isFeatured: boolean;       // Show on homepage featured section
  order: number;             // Manual sort order
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ProductCategory = 'eot-cranes' | 'gantry-cranes' | 'hoists';

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
