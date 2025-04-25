import { prisma } from "@/lib/db"
import ProductCard from "@/components/product-card"
import ProductFilter from "@/components/product-filter"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        take: 1,
      },
    },
  })

  const categories = await prisma.category.findMany()

  const formattedProducts = products.map((product) => ({
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

  return (
    <div className="bg-[#f8f6e9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilter categories={categories} />
          </div>

          <div className="lg:col-span-3">
            {formattedProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
