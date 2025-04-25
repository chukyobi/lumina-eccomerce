import { notFound } from "next/navigation"
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { sql } from "@/lib/db"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategorySlug(slug)

  return (
    <div className="bg-[#f8f6e9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          {category.description && <p className="mt-2 text-gray-600">{category.description}</p>}
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p className="text-gray-500">We couldn't find any products in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const categories = await sql`SELECT slug FROM "Category"`
    return categories.map((category: any) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
