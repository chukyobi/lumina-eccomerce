"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, Heart, CreditCard, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export default function AccountNav() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    { name: "Account Overview", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Payment Methods", href: "/account/payment", icon: CreditCard },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-medium">Account</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm rounded-md ${
                    pathname === item.href ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
