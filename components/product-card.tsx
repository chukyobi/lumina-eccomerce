"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button onClick={toggleFavorite} className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm z-10">
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.originalPrice && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-4 transform transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button onClick={handleAddToCart} className="w-full bg-black hover:bg-gray-800">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
