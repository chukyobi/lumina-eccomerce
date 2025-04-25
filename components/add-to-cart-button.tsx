"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button onClick={decreaseQuantity} className="px-3 py-2 border-r border-gray-300 hover:bg-gray-50">
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button onClick={increaseQuantity} className="px-3 py-2 border-l border-gray-300 hover:bg-gray-50">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <Button onClick={toggleWishlist} variant="outline" className="border-gray-300">
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>

      <Button onClick={handleAddToCart} className="w-full bg-black hover:bg-gray-800 h-12 text-base">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
    </div>
  )
}
