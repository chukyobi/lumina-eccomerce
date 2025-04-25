import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import NewsletterSignup from "@/components/newsletter-signup"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main className="min-h-screen bg-[#f8f6e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="w-full max-w-6xl mx-auto bg-[#f8f6e9] rounded-3xl shadow-lg overflow-hidden my-8">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-2">
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">#2025</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <Star className="w-4 h-4 text-black" fill="none" />
                </div>
              </div>

              <p className="text-sm">
                Renowned for her <span className="font-bold">vibrant</span> and{" "}
                <span className="font-bold">daring</span> designs on the web, we launched Lumina to the house.
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Curate Your
                <br />
                True Style
              </h1>

              <div className="pt-4">
                <Link href="/products/categories/winter" className="inline-block">
                  <Button className="bg-black text-white hover:bg-gray-800">Shop Collection</Button>
                </Link>
              </div>

              <div className="pt-8">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Reflective Running Jogging Jacket"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute -bottom-4 left-4 right-4 bg-white p-3 rounded-lg">
                    <p className="font-medium text-sm">Reflective Running Jogging Jacket</p>
                    <div className="flex justify-between mt-1">
                      <span className="font-bold">$350.00</span>
                      <span className="text-gray-400 line-through text-sm">$400.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 z-10">
                <div className="flex items-center space-x-2">
                  <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Person in yellow jacket"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-1/4 right-4 bg-white p-3 rounded-lg">
                <div className="text-3xl font-bold">60K</div>
                <div className="text-sm">Happy Customer</div>
              </div>

              <div className="absolute bottom-16 right-4 bg-white p-3 rounded-lg max-w-[180px]">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-black" />
                  <span className="ml-2 text-sm font-medium">Explore our</span>
                </div>
                <p className="text-sm">brand-new & unworn items</p>
              </div>

              <div className="absolute -bottom-4 left-0 right-0 mx-auto max-w-[90%] bg-white rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="bg-yellow-300 text-black text-xs px-4 py-1 rounded-full inline-block mb-2">
                      Newsletter
                    </div>
                    <p className="text-sm">
                      Subscribe newsletter and get <br />
                      30% off your first order
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                  </div>
                  <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-sm font-medium flex items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products/categories/men" className="group">
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Men's Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold">Men</h3>
                    <p className="text-white text-sm mt-1">Explore Collection</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/products/categories/women" className="group">
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Women's Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold">Women</h3>
                    <p className="text-white text-sm mt-1">Explore Collection</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/products/categories/accessories" className="group">
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold">Accessories</h3>
                    <p className="text-white text-sm mt-1">Explore Collection</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12">
          <div className="bg-white rounded-xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter and get 30% off your first order</p>
              <NewsletterSignup />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
