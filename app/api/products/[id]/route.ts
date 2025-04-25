import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number.parseFloat(product.price.toString()),
      originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : null,
      imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
      images: product.images.map((img) => img.url),
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
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error("Product API error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
