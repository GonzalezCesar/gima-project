"use client";

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronLeft,
} from "lucide-react";
import DeleteAlert from "@/components/ui/DeleteAlerta";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import Link from "next/link";

// Datos ejemplo
const initialCategories = [
  {
    id: "CAT-001",
    name: "COMPUTO",
    description: "Laptops, Desktops, Servidores y Periféricos",
    total: 120,
  },
  {
    id: "CAT-002",
    name: "MOBILIARIO",
    description: "Sillas ergonómicas, Escritorios y Archivos",
    total: 45,
  },
  {
    id: "CAT-003",
    name: "VEHÍCULOS",
    description: "Flota de transporte y vehículos de carga",
    total: 12,
  },
  {
    id: "CAT-004",
    name: "REDES",
    description: "Routers, Switches y Cableado estructurado",
    total: 85,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  // Lógica de Filtrado
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== idToDelete));
    setIsAlertOpen(false);
    setIdToDelete(null);
  };

  return (
    <div className="font-sans space-y-6">
      <DashboardHeader subtitle="Gestión de activos disponibles" />
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-gima-navy font-title tracking-wide">
            CATEGORÍAS
          </h1>
          <p className="text-gima-gray text-sm mt-1 font-medium">
            Clasificación de equipos
          </p>
          <Link href="/configuracion">
            <button className="flex items-center gap-2 text-gray-500 mt-5 hover:text-[#0d2344] transition-colors">
              <div className="bg-white p-1 rounded-md shadow-sm">
                <ChevronLeft size={16} />
              </div>
              <span className="text-sm font-medium">
                Volver a configuración
              </span>
            </button>
          </Link>
        </div>

        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-200 text-gima-gray rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={20} />
          </button>

          <button className="bg-gima-blue hover:brightness-90 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 transform active:scale-95">
            <Plus size={20} strokeWidth={3} />
            <span>NUEVA CATEGORÍA</span>
          </button>
        </div>
      </div>

      {/* TARJETA DE LA TABLA */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        {/* BARRA DE HERRAMIENTAS */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-72">
            <Search
              className="absolute left-4 top-3 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
            />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total: {filteredCategories.length} Resultados
          </span>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-gima-navy border-b border-slate-100">
                <th className="py-5 px-8 text-xs font-extrabold uppercase tracking-widest font-title">
                  ID
                </th>
                <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title">
                  Nombre
                </th>
                <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title">
                  Descripción
                </th>
                <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title text-center">
                  Activos
                </th>
                <th className="py-5 px-8 text-xs font-extrabold uppercase tracking-widest font-title text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Iteramos sobre los filtrados */}
              {filteredCategories.length > 0 ? (
                filteredCategories.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="py-5 px-8 font-medium text-slate-500 text-sm">
                      {item.id}
                    </td>
                    <td className="py-5 px-6 font-bold text-gima-navy text-sm">
                      {item.name}
                    </td>
                    <td className="py-5 px-6 text-sm text-slate-500 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="bg-blue-50 text-blue-700 py-1.5 px-4 rounded-lg text-xs font-bold border border-blue-100">
                        {item.total}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-gima-blue hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Mensaje cuando no encuentra nada */
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-400 text-sm"
                  >
                    No se encontraron resultados para "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <DeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar Categoría?"
        description="Esta acción no se puede deshacer."
      />
    </div>
  );
}
