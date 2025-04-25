import type { Product, Category } from "@/lib/types"

export const categories: Category[] = [
  {
    id: "cat_men",
    name: "Men",
    slug: "men",
    description: "Men's clothing and accessories",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "cat_women",
    name: "Women",
    slug: "women",
    description: "Women's clothing and accessories",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "cat_accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories for all",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "cat_winter",
    name: "Winter",
    slug: "winter",
    description: "Winter collection to keep you warm and stylish",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "cat_sale",
    name: "Sale",
    slug: "sale",
    description: "Discounted items at great prices",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Reflective Running Jogging Jacket",
    description:
      "Stay visible and stylish with our reflective running jacket. Perfect for early morning or evening jogs.",
    price: 350,
    originalPrice: 400,
    imageUrl: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    categoryId: "cat_winter",
    category: categories.find((c) => c.id === "cat_winter"),
    featured: true,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_002",
    name: "Vibrant Yellow Puffer Jacket",
    description: "Make a statement with this bold yellow puffer jacket. Warm, comfortable, and eye-catching.",
    price: 450,
    originalPrice: undefined,
    imageUrl: "/placeholder.svg?height=600&width=600",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    categoryId: "cat_winter",
    category: categories.find((c) => c.id === "cat_winter"),
    featured: true,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_003",
    name: "Classic White T-Shirt",
    description: "A wardrobe essential. Our classic white tee is made from premium cotton for ultimate comfort.",
    price: 35,
    originalPrice: 45,
    imageUrl: "/placeholder.svg?height=600&width=600",
    images: ["/placeholder.svg?height=600&width=600"],
    categoryId: "cat_men",
    category: categories.find((c) => c.id === "cat_men"),
    featured: true,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod_004",
    name: "Slim Fit Black Jeans",
    description: "These versatile black jeans offer both style and comfort for everyday wear.",
    price: 85,
    originalPrice: undefined,
    imageUrl: "/placeholder.svg?height=600&width=600",
    images: ["/placeholder.svg?height=600&width=600"],
    categoryId: "cat_men",
    category: categories.find((c) => c.id === "cat_men"),
    featured: true,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock data functions to use as fallbacks
export function getFeaturedProductsMock(): Promise<Product[]> {
  return Promise.resolve(products.filter((p) => p.featured))
}

export function getProductByIdMock(id: string): Promise<Product | null> {
  const product = products.find((p) => p.id === id) || null
  return Promise.resolve(product)
}

export function getProductsByCategoryMock(categoryId: string): Promise<Product[]> {
  return Promise.resolve(products.filter((p) => p.categoryId === categoryId))
}

export function getAllProductsMock(): Promise<Product[]> {
  return Promise.resolve(products)
}

export function getCategoriesMock(): Promise<Category[]> {
  return Promise.resolve(categories)
}
