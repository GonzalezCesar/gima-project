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
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <DashboardHeader subtitle="Gestión de activos disponibles" />

      <div className="w-full mx-auto">
        <Link href="/configuracion">
          <button className="flex items-center gap-2 text-gray-500 m-6 hover:text-[#0d2344] transition-colors">
            <div className="bg-white p-1 rounded-md shadow-sm">
              <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-medium">Volver a configuración</span>
          </button>
        </Link>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
          <div className="bg-gima-light p-10 pb-8 border-b border-blue-50">
            <div className="flex justify-end gap-3 w-full">
              <button className="p-3 bg-white border border-slate-200 text-gima-gray rounded-xl hover:bg-slate-50 transition-colors shadow-sm shrink-0">
                <Filter size={20} />
              </button>

              <button className="bg-gima-blue hover:brightness-90 text-white px-6 sm:px-6 py-3 rounded-xl flex items-center gap-2 ">
                <Plus size={20} strokeWidth={3} />
                <span className="hidden sm:inline">NUEVA CATEGORÍA</span>
                <span className="sm:hidden">NUEVA</span>
              </button>
            </div>
          </div>

          <div className="p-10 pt-6">
            <section className="bg-white rounded-2xl sm:rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              {/* BARRA DE HERRAMIENTAS */}
              <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
                <div className="relative w-full sm:w-72">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-end sm:self-center">
                  Total: {filteredCategories.length} Resultados
                </span>
              </div>

              {/* TABLA CONTAINER CON SCROLL */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-160">
                  <thead>
                    <tr className="bg-slate-50/80 text-gima-navy border-b border-slate-100">
                      <th className="py-4 px-4 sm:py-5 sm:px-8 text-xs font-extrabold uppercase tracking-widest font-title">
                        ID
                      </th>
                      <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs font-extrabold uppercase tracking-widest font-title">
                        Nombre
                      </th>
                      <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs font-extrabold uppercase tracking-widest font-title">
                        Descripción
                      </th>
                      <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs font-extrabold uppercase tracking-widest font-title text-center">
                        Activos
                      </th>
                      <th className="py-4 px-4 sm:py-5 sm:px-8 text-xs font-extrabold uppercase tracking-widest font-title text-right">
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
                          <td className="py-4 px-4 sm:py-5 sm:px-8 font-medium text-slate-500 text-xs sm:text-sm">
                            {item.id}
                          </td>
                          <td className="py-4 px-4 sm:py-5 sm:px-6 font-bold text-gima-navy text-xs sm:text-sm">
                            {item.name}
                          </td>
                          <td className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm text-slate-500 max-w-xs truncate">
                            {item.description}
                          </td>
                          <td className="py-4 px-4 sm:py-5 sm:px-6 text-center">
                            <span className="bg-blue-50 text-blue-700 py-1.5 px-3 sm:px-4 rounded-lg text-xs font-bold border border-blue-100">
                              {item.total}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:py-5 sm:px-8 text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
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

        </div>
      </div>
    </div>
  );
}
