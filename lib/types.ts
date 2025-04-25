export interface User {
  id: string
  name: string
  email: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  imageUrl: string
  images?: string[]
  categoryId: string
  category?: Category
  featured?: boolean
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  products?: Product[]
}



export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  shippingAddress: Address
  billingAddress: Address
  paymentIntentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  name: string
  price: number
  quantity: number
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Address {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}
