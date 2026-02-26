"use client"

import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { ChartPlaceholder } from "@/components/ui/ChartPlaceholder"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader subtitle="Bienvenido al panel GIMA" />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
        </div>

        {/* Chart */}
        <ChartPlaceholder title="Disponibilidad de activos" period="Últimos 6 meses" />
      </div>
    </div>
  )
}
