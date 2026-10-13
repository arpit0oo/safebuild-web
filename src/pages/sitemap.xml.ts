export const prerender = false;

import { getProducts } from '../lib/sanity';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export async function GET() {
  const BASE_URL = 'https://safebuilds.in';

  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/products`,
    `${BASE_URL}/services`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
  ];

  let productUrls: string[] = [];
  try {
    const products = await getProducts();
    if (Array.isArray(products)) {
      productUrls = products
        .filter((p) => p && typeof p.slug === 'string' && p.slug.trim().length > 0)
        .map((p) => `${BASE_URL}/products/${p.slug.trim()}`);
    }
  } catch (error) {
    console.error('[sitemap.xml] Failed to fetch products from Sanity:', error);
  }

  const allUrls = [...staticUrls, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
