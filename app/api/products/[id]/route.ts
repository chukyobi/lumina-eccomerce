import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const [product] = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      WHERE p.id = ${id}
    `

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const images = await sql`
      SELECT url FROM "ProductImage"
      WHERE product_id = ${id}
    `

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number.parseFloat(product.price),
      originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice) : null,
      imageUrl: images.length > 0 ? images[0].url : "/placeholder.svg",
      images: images.map((img: any) => img.url),
      categoryId: product.categoryId,
      category: product.category_id
        ? {
            id: product.category_id,
            name: product.category_name,
            slug: product.category_slug,
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
