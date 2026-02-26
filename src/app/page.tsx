"use client"
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ChartPlaceholder } from "@/components/ui/ChartPlaceholder";

export default function Home() {
  
  return (
    <div className="min-h-screen">
          <DashboardHeader subtitle="Bienvenido al panel GIMA" />
    
          <div className="p-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total activos" value="12345" trend={12} trendLabel="este mes" />
              <StatCard title="En mantenimiento" value="8" />
              <StatCard title="Presupuesto ejecutado" value="100$" highlighted={true} />
            </div>
    
            {/* Chart */}
            <ChartPlaceholder title="Proximos mantenimientos preventivos" period="Últimos 6 meses" />
          </div>
        </div>
  )
}
