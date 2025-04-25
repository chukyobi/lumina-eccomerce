import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import ProductCard from "@/components/product-card"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          images: {
            take: 1,
          },
        },
      },
    },
  })

  if (!category) {
    notFound()
  }

  const products = category.products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number.parseFloat(product.price.toString()),
    originalPrice: product.originalPrice ? Number.parseFloat(product.originalPrice.toString()) : undefined,
    imageUrl: product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
    categoryId: product.id,
    featured: product.featured,
    inStock: product.inStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }))

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
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}
