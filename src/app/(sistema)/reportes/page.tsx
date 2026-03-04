"use client"

import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ReportStatCard } from "@/components/reportes/ReportStatCard";
import { ReportTable } from "@/components/reportes/ReportTable";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8 space-y-8">
      <DashboardHeader subtitle="Reportes de mantenimientos" />

      {/* Header con botón de acción */}
      <div className="flex justify-between items-center">
        <div>
           <Link href="/dashboard" className="flex items-center text-gray-500 text-sm mb-2 hover:text-blue-600">
             <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio
           </Link>
        </div>
        <button className="bg-[#007EA7] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#005F7D] transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Crear Reporte
        </button>
      </div>

      {/* Grid de Estadísticas de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportStatCard title="ALERTAS CRÍTICAS" value={10} color="text-red-500" />
        <ReportStatCard title="EN PROCESO" value={20} color="text-blue-500" />
        <ReportStatCard title="COMPLETADO" value={40} color="text-emerald-500" />
      </div>

      {/* Tabla de Mantenimientos */}
      <ReportTable />
    </div>
  );
}