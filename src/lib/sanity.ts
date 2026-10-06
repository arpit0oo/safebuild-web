import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN,
})

// Get all published products
export async function getProducts() {
  return sanityClient.fetch(`
    *[_type == "product" && isPublished == true] {
      name,
      "slug": slug.current,
      category,
      categoryName,
      "image": image.asset->url,
      tagline,
      description,
      shortDescription,
      order,
      isFeatured,
      isPublished,
      skyhawkUrl,
      features,
      "specs": specs[]{key, value},
      "sections": sections[]{
        title,
        type,
        bullets,
        text,
        tableRows[]{key, value}
      },
      seoTitle,
      seoDescription,
      seoKeywords
    }
  `)
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "product" && slug.current == $slug && isPublished == true][0] {
      name,
      "slug": slug.current,
      category,
      categoryName,
      "image": image.asset->url,
      tagline,
      description,
      shortDescription,
      order,
      isFeatured,
      isPublished,
      skyhawkUrl,
      features,
      "specs": specs[]{key, value},
      "sections": sections[]{
        title,
        type,
        bullets,
        text,
        tableRows[]{key, value}
      },
      seoTitle,
      seoDescription,
      seoKeywords
    }
  `, { slug })
}

// Get featured products for homepage
export async function getFeaturedProducts(count: number = 6) {
  return sanityClient.fetch(`
    *[_type == "product" && isPublished == true && isFeatured == true][0...$count] {
      name,
      "slug": slug.current,
      category,
      categoryName,
      "image": image.asset->url,
      tagline,
      isFeatured,
      isPublished
    }
  `, { count })
}

// Get all published categories
export async function getCategories() {
  return sanityClient.fetch(`
    *[_type == "category" && isPublished == true] {
      name,
      "slug": slug.current,
      "image": image.asset->url,
      description,
      features,
      isPublished,
      seoTitle,
      seoDescription,
      seoKeywords
    }
  `)
}

// Get single category by slug
export async function getCategoryBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "category" && slug.current == $slug && isPublished == true][0] {
      name,
      "slug": slug.current,
      "image": image.asset->url,
      description,
      features,
      isPublished,
      seoTitle,
      seoDescription,
      seoKeywords
    }
  `, { slug })
}
