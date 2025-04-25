import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"

    let query = `
      SELECT 
        p.id, p.name, p.description, p.price, p.original_price as "originalPrice", 
        p.category_id as "categoryId", p.featured, p.in_stock as "inStock",
        c.id as "category_id", c.name as "category_name", c.slug as "category_slug",
        pi.url as "imageUrl"
      FROM "Product" p
      LEFT JOIN "Category" c ON p.category_id = c.id
      LEFT JOIN (
        SELECT DISTINCT ON (product_id) id, url, product_id
        FROM "ProductImage"
        ORDER BY product_id, id
      ) pi ON p.id = pi.product_id
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    if (category) {
      query += ` AND p.category_id = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (featured) {
      query += ` AND p.featured = $${paramIndex}`
      params.push(featured)
      paramIndex++
    }

    const products = await sql(query, params)

    const formattedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number.parseFloat(product.price),
      originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice) : null,
      imageUrl: product.imageUrl || "/placeholder.svg",
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
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
