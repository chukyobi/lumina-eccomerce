import { getProductsByCategory } from "@/lib/products"
import ProductCard from "@/components/product-card"

interface RelatedProductsProps {
  currentProductId: string
  categoryId: string
}

export default async function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
  const products = await getProductsByCategory(categoryId)

  // Filter out the current product and limit to 4 related products
  const relatedProducts = products.filter((product) => product.id !== currentProductId).slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
