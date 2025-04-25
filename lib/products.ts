import { prisma } from "@/lib/db"
import type { Product } from "@/lib/types"

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      category: true,
      images: {
        take: 1,
      },
    },
  })

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price.toString()),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : undefined,
    imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
    categoryId: product.categoryId,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          description: product.category.description || undefined,
          imageUrl: product.category.imageUrl || undefined,
        }
      : undefined,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }))
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      images: true,
    },
  })

  if (!product) return null

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price.toString()),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : undefined,
    imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
    images: product.images.map((img) => img.url),
    categoryId: product.categoryId,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          description: product.category.description || undefined,
          imageUrl: product.category.imageUrl || undefined,
        }
      : undefined,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      images: {
        take: 1,
      },
    },
  })

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price.toString()),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : undefined,
    imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
    categoryId: product.categoryId,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          description: product.category.description || undefined,
          imageUrl: product.category.imageUrl || undefined,
        }
      : undefined,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }))
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        take: 1,
      },
    },
  })

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price.toString()),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : undefined,
    imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
    categoryId: product.categoryId,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
          description: product.category.description || undefined,
          imageUrl: product.category.imageUrl || undefined,
        }
      : undefined,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }))
}

export async function getCategories() {
  return prisma.category.findMany()
}
