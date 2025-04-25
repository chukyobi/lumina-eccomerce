import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import AccountNav from "@/components/account-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      orders: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="bg-[#f8f6e9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <AccountNav />
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>My Account</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile">
                  <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">{user.name}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">{user.email}</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline">Edit Profile</Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium">Password</h3>
                        <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure.</p>
                        <div className="mt-4">
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="orders">
                    {user.orders.length === 0 ? (
                      <div className="text-center py-8">
                        <h3 className="text-lg font-medium">No orders yet</h3>
                        <p className="mt-1 text-sm text-gray-500">When you place an order, it will appear here.</p>
                        <div className="mt-4">
                          <Button>Start Shopping</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.orders.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${Number(order.total).toFixed(2)}</p>
                                <p
                                  className={`text-sm ${
                                    order.status === "delivered"
                                      ? "text-green-600"
                                      : order.status === "cancelled"
                                        ? "text-red-600"
                                        : "text-blue-600"
                                  }`}
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
