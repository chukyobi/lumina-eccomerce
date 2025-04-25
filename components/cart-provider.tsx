"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product, CartItem } from "@/lib/types"

interface CartContextType {
  cart: {
    items: CartItem[]
    subtotal: number
  }
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: React.ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<{
    items: CartItem[]
    subtotal: number
  }>({
    items: [],
    subtotal: 0,
  })

  // Load cart from localStorage on initial load
  useEffect(() => {
    const loadCart = () => {
      try {
        if (typeof window !== "undefined") {
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            setCart(parsedCart)
          }
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cart])

  const calculateSubtotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((item) => item.id === product.id)

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        newItems = [...prevCart.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        }
      } else {
        // Add new item
        newItems = [
          ...prevCart.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity,
          },
        ]
      }

      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId)
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
      }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) => (item.id === productId ? { ...item, quantity } : item))
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems),
      }
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
