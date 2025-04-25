import { sql } from "@/lib/db"
import type { Product, Category } from "@/lib/types"

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug", 
        c.description as "category_description", c.image_url as "category_imageUrl",
        pi.url as "imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) id, url, product_id
        FROM "ProductImage"
        ORDER BY product_id, id
      ) pi ON p.id = pi.product_id
      WHERE p.featured = true
    `

    return products.map(formatProduct)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const [product] = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug", 
        c.description as "category_description", c.image_url as "category_imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      WHERE p.id = ${id}
    `

    if (!product) return null

    const images = await sql`
      SELECT url FROM "ProductImage"
      WHERE product_id = ${id}
    `

    return {
      ...formatProduct(product),
      images: images.map((img) => img.url),
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug", 
        c.description as "category_description", c.image_url as "category_imageUrl",
        pi.url as "imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) id, url, product_id
        FROM "ProductImage"
        ORDER BY product_id, id
      ) pi ON p.id = pi.product_id
      WHERE p.category_id = ${categoryId}
    `

    return products.map(formatProduct)
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug", 
        c.description as "category_description", c.image_url as "category_imageUrl",
        pi.url as "imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) id, url, product_id
        FROM "ProductImage"
        ORDER BY product_id, id
      ) pi ON p.id = pi.product_id
    `

    return products.map(formatProduct)
  } catch (error) {
    console.error("Error fetching all products:", error)
    return []
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await sql`
      SELECT id, name, slug, description, image_url as "imageUrl"
      FROM "Category"
    `

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || undefined,
      imageUrl: category.imageUrl || undefined,
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug", 
        c.description as "category_description", c.image_url as "category_imageUrl",
        pi.url as "imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) id, url, product_id
        FROM "ProductImage"
        ORDER BY product_id, id
      ) pi ON p.id = pi.product_id
      WHERE c.slug = ${slug}
    `

    return products.map(formatProduct)
  } catch (error) {
    console.error(`Error fetching products for category slug ${slug}:`, error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const [category] = await sql`
      SELECT id, name, slug, description, image_url as "imageUrl"
      FROM "Category"
      WHERE slug = ${slug}
    `

    if (!category) return null

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || undefined,
      imageUrl: category.imageUrl || undefined,
    }
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error)
    return null
  }
}

// Helper function to format product data
function formatProduct(product: any): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice) : undefined,
    imageUrl: product.imageUrl || "/placeholder.svg",
    categoryId: product.categoryId,
    category: product.category_id
      ? {
          id: product.category_id,
          name: product.category_name,
          slug: product.category_slug,
          description: product.category_description || undefined,
          imageUrl: product.category_imageUrl || undefined,
        }
      : undefined,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.created_at ? new Date(product.created_at) : new Date(),
    updatedAt: product.updated_at ? new Date(product.updated_at) : new Date(),
  }
}
