"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address1: z.string().min(5, { message: "Address is required" }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z.string().min(5, { message: "Postal code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  paymentMethod: z.enum(["credit", "paypal"]),
  sameAsBilling: z.boolean().default(true),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit",
      sameAsBilling: true,
    },
  })

  const sameAsBilling = watch("sameAsBilling")

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cart.items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // In a real app, this would call an API endpoint to process the order
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearCart()
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order has been placed.",
      })
      router.push("/account/orders")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculate order summary
  const subtotal = cart.subtotal
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-[#f8f6e9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-8">
                    {/* Contact Information */}
                    <div>
                      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" {...register("firstName")} />
                          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" {...register("lastName")} />
                          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" {...register("email")} />
                          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" {...register("phone")} />
                          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address1">Address Line 1</Label>
                          <Input id="address1" {...register("address1")} />
                          {errors.address1 && <p className="text-sm text-red-500">{errors.address1.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                          <Input id="address2" {...register("address2")} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...register("city")} />
                            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input id="state" {...register("state")} />
                            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input id="postalCode" {...register("postalCode")} />
                            {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" {...register("country")} />
                            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sameAsBilling"
                          className="rounded border-gray-300"
                          {...register("sameAsBilling")}
                        />
                        <Label htmlFor="sameAsBilling">Billing address is the same as shipping address</Label>
                      </div>

                      {!sameAsBilling && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingAddress1">Address Line 1</Label>
                            <Input id="billingAddress1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingAddress2">Address Line 2 (Optional)</Label>
                            <Input id="billingAddress2" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingCity">City</Label>
                              <Input id="billingCity" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingState">State / Province</Label>
                              <Input id="billingState" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingPostalCode">Postal Code</Label>
                              <Input id="billingPostalCode" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingCountry">Country</Label>
                              <Input id="billingCountry" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                      <RadioGroup defaultValue="credit">
                        <div className="flex items-center space-x-2 border rounded-md p-4 mb-2">
                          <RadioGroupItem value="credit" id="credit" {...register("paymentMethod")} />
                          <Label htmlFor="credit" className="flex-1">
                            Credit / Debit Card
                          </Label>
                          <div className="flex space-x-2">
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4">
                          <RadioGroupItem value="paypal" id="paypal" {...register("paymentMethod")} />
                          <Label htmlFor="paypal" className="flex-1">
                            PayPal
                          </Label>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </RadioGroup>

                      {watch("paymentMethod") === "credit" && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input id="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {cart.items.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto space-y-4">
                        {cart.items.map((item) => (
                          <div key={item.id} className="flex space-x-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900">
                    &larr; Return to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
