"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  FileText, 
  MapPin, 
  ClipboardList,
  Save
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/layout/DashboardHeader"; 

export default function NuevoActivoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    categoria: "",
    marca: "",
    ubicacion: "",
    responsable: "",
    fechaCompra: "",
    garantia: "",
    estado: "operativo",
    detalles: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
    // backend
  };

  // COLORES PARA EL ESTADO
  const getEstadoColors = (estado: string, isSelected: boolean) => {
    if (!isSelected) return "border-slate-200 text-slate-500 hover:border-slate-300 bg-white";

    switch (estado) {
      case "operativo": return "border-emerald-500 bg-emerald-50 text-emerald-800";
      case "mantenimiento": return "border-amber-500 bg-amber-50 text-amber-800";
      case "revision": return "border-blue-500 bg-blue-50 text-blue-800";
      default: return "border-slate-300 bg-slate-50 text-slate-800";
    }
  };

  const getDotColors = (estado: string, isSelected: boolean) => {
    if (!isSelected) return "border-2 border-slate-300 bg-transparent";

    switch (estado) {
      case "operativo": return "bg-emerald-500 border-emerald-500";
      case "mantenimiento": return "bg-amber-500 border-amber-500";
      case "revision": return "bg-blue-500 border-blue-500";
      default: return "bg-slate-500 border-slate-500";
    }
  };

  return (
    <div className="font-sans space-y-6">
      
      {/* HEADER */}
      <DashboardHeader title="Registro de activo" subtitle="Añadir un nuevo equipo al sistema" />

      {/* BOTÓN VOLVER */}
      <Link href="/categorias-activos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gima-navy font-medium transition-colors group">
        <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm group-hover:bg-slate-50">
          <ChevronLeft size={16} />
        </div>
        Volver al inventario
      </Link>

      {/* CONTENEDOR PRINCIPAL DEL FORMULARIO */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-10">
        
        {/* Título del Activo */}
        <div className="mb-10 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-black text-gima-navy tracking-wide font-title uppercase">
            {formData.nombre || "NUEVO ACTIVO"}
          </h2>
          <p className="text-slate-400 text-xs font-bold mt-2 tracking-wider uppercase">
            ID ACTIVO: {formData.codigo || "Autogenerado al guardar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
          
          {/* COLUMNA IZQUIERDA (Campos principales) */}
          <div className="flex-1 space-y-10">
            
            {/* SECCIÓN: Información General */}
            <section>
              <div className="flex items-center gap-2 mb-6 text-gima-blue">
                <FileText size={20} strokeWidth={2.5} />
                <h3 className="font-bold text-gima-navy font-title text-lg">Información General</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Nombre del Activo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Código Inventario</label>
                  <input type="text" name="codigo" value={formData.codigo} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Categoría</label>
                  <select name="categoria" value={formData.categoria} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium appearance-none">
                    <option value="">Seleccionar...</option>
                    <option value="computo">Cómputo</option>
                    <option value="mobiliario">Mobiliario</option>
                    <option value="vehiculos">Vehículos</option>
                    <option value="redes">Redes</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Marca / Fabricante</label>
                  <input type="text" name="marca" value={formData.marca} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
                </div>
              </div>
            </section>

            {/* SECCIÓN: Ubicación y Adquisición */}
            <section>
              <div className="flex items-center gap-2 mb-6 text-gima-blue">
                <MapPin size={20} strokeWidth={2.5} />
                <h3 className="font-bold text-gima-navy font-title text-lg">Ubicación y Adquisición</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Ubicación Física</label>
                  <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Responsable / Custodio</label>
                  <input type="text" name="responsable" value={formData.responsable} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
                </div>
                {/* CAMPOS DE FECHA CON NUEVO DISEÑO */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Fecha de Compra</label>
                  <input type="date" name="fechaCompra" value={formData.fechaCompra} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-600 font-medium cursor-pointer" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Garantía Hasta</label>
                  <input type="date" name="garantia" value={formData.garantia} onChange={handleChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-600 font-medium cursor-pointer" />
                </div>
              </div>
            </section>

            {/* SECCIÓN: Detalles Adicionales */}
            <section>
              <div className="flex items-center gap-2 mb-6 text-gima-blue">
                <ClipboardList size={20} strokeWidth={2.5} />
                <h3 className="font-bold text-gima-navy font-title text-lg">Detalles Adicionales</h3>
              </div>
              <textarea 
                name="detalles"
                value={formData.detalles}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all text-gima-navy resize-none"
                placeholder="Escribe aquí observaciones o detalles extra del activo..."
              />
            </section>
          </div>

          {/* COLUMNA DERECHA (Estado Inicial) */}
          <div className="lg:w-85 flex flex-col gap-6">
            <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-center font-bold text-gima-navy mb-6 font-title tracking-wide uppercase">Estado Inicial</h3>
              
              <div className="space-y-4">
                {/* Opciones de Estado iteradas con los nuevos colores */}
                {[
                  { id: 'operativo', label: 'Operativo' },
                  { id: 'mantenimiento', label: 'En Mantenimiento' },
                  { id: 'revision', label: 'Para Revisión' }
                ].map((st) => {
                  const isSelected = formData.estado === st.id;
                  
                  return (
                    <label 
                      key={st.id}
                      className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${getEstadoColors(st.id, isSelected)}`}
                    >
                      <input 
                        type="radio" 
                        name="estado" 
                        value={st.id}
                        checked={isSelected}
                        onChange={handleChange}
                        className="sr-only" 
                      />
                      <div className={`w-4 h-4 rounded-full mr-3 shrink-0 transition-colors ${getDotColors(st.id, isSelected)}`} />
                      <span className="text-sm font-bold tracking-wide">
                        {st.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Botón de Guardar */}
            <button 
              type="submit"
              className="mt-auto flex items-center justify-center gap-2 bg-gima-blue hover:brightness-90 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 uppercase tracking-widest"
            >
              <Save size={20} />
              REGISTRAR ACTIVO
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}