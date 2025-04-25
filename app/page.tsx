import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import NewsletterSignup from "@/components/newsletter-signup"
import { HeroSection } from "@/components/hero" 

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main className="min-h-screen bg-[#f8f6e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
     
        <HeroSection />

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
                  src="/category-pic-01.jpg?height=300&width=400"
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
                  src="/category-pic-02.jpg?height=300&width=400"
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
                  src="/category-pic-03.jpg?height=300&width=400"
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
