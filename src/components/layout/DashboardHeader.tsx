"use client"

import { Bell, User, Search } from "lucide-react"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  subtitle?: string
}

export function DashboardHeader({ subtitle = "Bienvenido al panel GIMA" }: DashboardHeaderProps) {
  const pathname = usePathname()
  const pathParts = pathname.split("/").filter((part) => part)
  const lastPart = pathParts.length > 0 ? pathParts[pathParts.length - 1] : "Dashboard"
  const title = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar activo..."
              className="pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
