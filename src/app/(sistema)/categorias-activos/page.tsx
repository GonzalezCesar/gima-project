"use client";

import { useState } from "react";
import { Plus, Search, ChevronLeft } from "lucide-react";
import DeleteAlert from "@/components/ui/DeleteAlerta";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import Link from "next/link";
import TablaInventario from "@/components/configuracion/TablaInventario";

// Datos de prueba
const initialActivos = [
  { id: "1", idActivo: "ACT-001", idArticulo: "12345", estado: "Mantenimiento", ubicacion: "Data center", ultMantenimiento: "10/02/2024" },
  { id: "2", idActivo: "ACT-002", idArticulo: "67890", estado: "Operativo", ubicacion: "Data center", ultMantenimiento: "12/02/2024" },
  { id: "3", idActivo: "ACT-003", idArticulo: "23478", estado: "Activo", ubicacion: "Soporte Técnico", ultMantenimiento: "15/01/2024" },
  { id: "4", idActivo: "ACT-004", idArticulo: "98564", estado: "Activo", ubicacion: "Almacén", ultMantenimiento: "20/12/2023" },
];

export default function InventarioActivosPage() {
  const [activos, setActivos] = useState(initialActivos);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  // Filtro
  const filteredActivos = activos.filter(
    (item) => item.idActivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idArticulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Controladores de borrado
  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    setActivos(activos.filter((item) => item.id !== idToDelete));
    setIsAlertOpen(false);
    setIdToDelete(null);
  };

  return (
    <div className="font-sans space-y-6">
      <DashboardHeader
        title="Gestión de activos"
        subtitle="Gestión de inventario de activos" />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-gima-navy font-title tracking-wide">
            INVENTARIO DE ACTIVOS
          </h1>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-gray-500 mt-5 hover:text-[#0d2344] transition-colors group">
              <div className="bg-white p-1 rounded-md shadow-sm group-hover:bg-slate-100">
                <ChevronLeft size={16} />
              </div>
              <span className="text-sm font-medium">Volver al inicio</span>
            </button>
          </Link>
        </div>

        <Link href="/categorias-activos/registro">
          <button className="bg-gima-blue hover:brightness-90 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
            <Plus size={20} strokeWidth={3} />
            <span>AGREGAR ACTIVOS</span>
          </button>
        </Link>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">

        {/* BARRA DE HERRAMIENTAS */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-80">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por ID activo o artículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 border border-transparent focus:border-blue-200"
            />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total: {filteredActivos.length} Equipos
          </span>
        </div>

        {/* Tabla */}
        <TablaInventario
          data={filteredActivos}
          busqueda={searchTerm}
          onDeleteClick={handleDeleteClick}
        />

      </section>

      <DeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar Activo?"
        description="Esta acción no se puede deshacer y el equipo será borrado del sistema."
      />
    </div>
  );
}