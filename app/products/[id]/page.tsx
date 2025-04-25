import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductImageGallery from "@/components/product-image-gallery"
import RelatedProducts from "@/components/related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-[#f8f6e9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <ProductImageGallery
              mainImage={product.imageUrl}
              images={product.images || [product.imageUrl]}
              productName={product.name}
            />

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center mt-4 mb-6">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">4.0 (24 reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through text-xl">${product.originalPrice.toFixed(2)}</span>
                      <span className="bg-red-100 text-red-800 text-sm px-2 py-0.5 rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-green-600 mt-2">In Stock</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Color</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"></button>
                  <button className="w-8 h-8 rounded-full bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-black"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-500 focus:outline-none focus:ring-2 focus:ring-black"></button>
                  <button className="w-8 h-8 rounded-full bg-red-500 focus:outline-none focus:ring-2 focus:ring-black"></button>
                </div>
              </div>

              <div className="mt-auto">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <RelatedProducts currentProductId={product.id} categoryId={product.categoryId} />
        </div>
      </div>
    </div>
  )
}
