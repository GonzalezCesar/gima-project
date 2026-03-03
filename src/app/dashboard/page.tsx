"use client"

import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { AssetStatus } from "@/components/dashboard/AssetStatus";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader subtitle="Bienvenido al panel GIMA" showSearch = {false} />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total activos" value="12345" trend={12} trendLabel="este mes" />
          <StatCard title="En mantenimiento" value="8" />
          <StatCard title="Técnicos disponibles" count={5} total={8} highlighted ={true} />
        </div>

        {/*Estado de activos */}
        <AssetStatus/>

        {/*Proximos mantenimientos preventivos */}
        <UpcomingTasks/>
      </div>
    </div>
  )
}
