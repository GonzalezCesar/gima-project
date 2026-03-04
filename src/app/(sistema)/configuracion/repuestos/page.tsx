"use client"
import { useState } from "react";
import { FormularioRepuestos } from "./FormularioRepuestos";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Plus, ChevronLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function RepuestosPage() {
  // Estado para controlar la apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Arreglo de datos simulados (mock data)
  const repuestos = [
    { codigo: "LC-001", descripcion: "Memoria RAM 16GB DDR4", categoria: "Computo", ubicacion: "Almacen", stock: "15" },
    { codigo: "LC-001", descripcion: "Memoria RAM 16GB DDR4", categoria: "Computo", ubicacion: "Almacen", stock: "15" },
    { codigo: "LC-001", descripcion: "Memoria RAM 16GB DDR4", categoria: "Computo", ubicacion: "Almacen", stock: "15" },
  ];

  return (
    // Contenedor principal
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <DashboardHeader />
      <div className="w-full mx-auto">

        {/* BOTÓN VOLVER */}
        <Link href="/configuracion" >
          <button className="flex items-center gap-2 text-gray-500 m-3 hover:text-[#0d2344] transition-colors">
            <div className="bg-white p-1 rounded-md shadow-sm"><ChevronLeft size={16} /></div>
            <span className="text-sm font-medium">Volver a configuración</span>
          </button>
        </Link>

        {/* ================= CONTENEDOR PRINCIPAL ================= */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">

          {/* CABECERA DEL CONTENIDO */}
          <div className="bg-gima-light p-10 pb-8 border-b border-blue-50">
            <div className="flex justify-between items-start">
              <div>

                <h3 className="text-xl font-bold text-gima-navy font-microgramma uppercase">
                  Gestión de repuestos
                </h3>

                <p className="text-gray-400 text-sm font-archivo">
                  Control de stock, partes y consumibles
                </p>
              </div>

              {/* BOTÓN NUEVO REPUESTO */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gima-blue text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#0052cc] transition-all shadow-lg shadow-blue-100 font-microgramma text-xs font-bold uppercase">
                <Plus size={20} strokeWidth={3} />
                Nuevo repuesto
              </button>
            </div>
          </div>

          {/* ================= TABLA ================= */}
          <div className="p-10 pt-6">
            <div className="w-full">

              {/* CABECERA DE LA TABLA */}
              <div className="grid grid-cols-6 bg-[#DAFAFE] p-6 rounded-t-[30px] text-gima-navy font-microgramma font-bold text-[10px] uppercase tracking-[0.2em]">
                <span>Código</span>
                <span>Descripción</span>
                <span>Categoría</span>
                <span>Ubicación</span>
                <span>Stock</span>
                <span className="text-center">Acciones</span>
              </div>

              {/* CUERPO DE LA TABLA */}
              <div className="border-x border-b border-gray-100 rounded-b-[30px] overflow-hidden font-archivo">

                {/* Iteración sobre el arreglo de repuestos */}
                {repuestos.map((loc, index) => (
                  <div
                    key={index}
                    className=" grid grid-cols-6 items-center p-6 bg-white border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    {/* ATRIBUTOS */}
                    <span className="text-sm text-gray-400 font-medium">{loc.codigo}</span>
                    <span className="text-sm font-bold text-gima-navy">{loc.descripcion}</span>
                    <div>
                      <span className="bg-[#E3F2FD] text-gima-navy px-4 py-1.5 rounded-full text-[10px] font-bold">
                        {loc.categoria}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">{loc.ubicacion}</span>
                    <span className="text-sm font-bold text-gima-navy">{loc.stock}</span>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="flex justify-center gap-3">
                      {/* Editar */}
                      <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Pencil size={18} />
                      </button>

                      {/* Eliminar */}
                      <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormularioRepuestos isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
