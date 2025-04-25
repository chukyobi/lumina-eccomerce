import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"

    const whereClause: any = {}

    if (category) {
      whereClause.categoryId = category
    }

    if (featured) {
      whereClause.featured = true
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        images: {
          take: 1,
        },
      },
    })

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number.parseFloat(product.price.toString()),
      originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : null,
      imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
      categoryId: product.categoryId,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
          }
        : null,
      featured: product.featured,
      inStock: product.inStock,
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
