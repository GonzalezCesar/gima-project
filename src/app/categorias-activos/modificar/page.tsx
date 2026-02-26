"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  FileText, 
  MapPin, 
  ClipboardList,
  Save
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

type Estado = "operativo" | "mantenimiento" | "revision";

function ModificacionFormulario() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [garantiaHasta, setGarantiaHasta] = useState("");
  const [detalles, setDetalles] = useState("");
  const [estado, setEstado] = useState<Estado>("operativo");

  const params = useSearchParams();
  const id = params ? params.get("id") : null;
  const router = useRouter();

  // Lógica para rellenar datos simulados
  useEffect(() => {
    if (!id) return;
    if (id.startsWith("CAT-")) {
      setNombre("Categoría: " + id);
      setCodigo("CATCODE-" + id.split("-")[1]);
      setCategoria("Categoría genérica");
      setMarca("");
      setUbicacion("");
      setResponsable("");
      setFechaCompra("");
      setGarantiaHasta("");
      setDetalles("Esta vista se abrió desde la lista de categorías.");
      setEstado("operativo");
    } else if (id === "12345") {
      setNombre("SERVIDOR X");
      setCodigo("S-X-0001");
      setCategoria("Servidor");
      setMarca("MarcaEjemplo");
      setUbicacion("Datacenter 1");
      setResponsable("Juan Perez");
      setFechaCompra("2024-07-05");
      setGarantiaHasta("2026-07-05");
      setDetalles("Servidor principal, rack 3.");
      setEstado("operativo");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardar activo:", { id, nombre, codigo, categoria, marca, ubicacion, responsable, fechaCompra, garantiaHasta, detalles, estado });
    alert("Modificación guardada (simulado)");
    router.push("/categorias-activos");
  };

  // colores 
  const getEstadoColors = (estadoActual: string, isSelected: boolean) => {
    if (!isSelected) return "border-slate-200 text-slate-500 hover:border-slate-300 bg-white";
    switch (estadoActual) {
      case "operativo": return "border-emerald-500 bg-emerald-50 text-emerald-800";
      case "mantenimiento": return "border-amber-500 bg-amber-50 text-amber-800";
      case "revision": return "border-blue-500 bg-blue-50 text-blue-800";
      default: return "border-slate-300 bg-slate-50 text-slate-800";
    }
  };

  const getDotColors = (estadoActual: string, isSelected: boolean) => {
    if (!isSelected) return "border-2 border-slate-300 bg-transparent";
    switch (estadoActual) {
      case "operativo": return "bg-emerald-500 border-emerald-500";
      case "mantenimiento": return "bg-amber-500 border-amber-500";
      case "revision": return "bg-blue-500 border-blue-500";
      default: return "bg-slate-500 border-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-10">
      
      <div className="mb-10 border-b border-slate-100 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gima-navy tracking-wide font-title uppercase">
            {nombre || "MODIFICAR ACTIVO"}
          </h2>
          <p className="text-slate-400 text-xs font-bold mt-2 tracking-wider uppercase">
            ID REGISTRO: {id || "No especificado"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-10">
          
          <section>
            <div className="flex items-center gap-2 mb-6 text-gima-blue">
              <FileText size={20} strokeWidth={2.5} />
              <h3 className="font-bold text-gima-navy font-title text-lg">Información General</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Nombre del Activo</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Código Inventario</label>
                <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Categoría</label>
                <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Marca / Fabricante</label>
                <input type="text" value={marca} onChange={e => setMarca(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6 text-gima-blue">
              <MapPin size={20} strokeWidth={2.5} />
              <h3 className="font-bold text-gima-navy font-title text-lg">Ubicación y Adquisición</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Ubicación Física</label>
                <input type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Responsable / Custodio</label>
                <input type="text" value={responsable} onChange={e => setResponsable(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gima-navy font-medium" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Fecha de Compra</label>
                <input type="date" value={fechaCompra} onChange={e => setFechaCompra(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-600 font-medium cursor-pointer" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Garantía Hasta</label>
                <input type="date" value={garantiaHasta} onChange={e => setGarantiaHasta(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-600 font-medium cursor-pointer" />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6 text-gima-blue">
              <ClipboardList size={20} strokeWidth={2.5} />
              <h3 className="font-bold text-gima-navy font-title text-lg">Detalles Adicionales</h3>
            </div>
            <textarea value={detalles} onChange={e => setDetalles(e.target.value)} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all text-gima-navy resize-none" />
          </section>
        </div>

        <div className="lg:w-85 flex flex-col gap-6">
          <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-center font-bold text-gima-navy mb-6 font-title tracking-wide uppercase">Estado Actual</h3>
            
            <div className="space-y-4">
              {[
                { id: 'operativo', label: 'Operativo' },
                { id: 'mantenimiento', label: 'En Mantenimiento' },
                { id: 'revision', label: 'Para Revisión' }
              ].map((st) => {
                const isSelected = estado === st.id;
                return (
                  <label key={st.id} className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${getEstadoColors(st.id, isSelected)}`}>
                    <input type="radio" name="estado" value={st.id} checked={isSelected} onChange={() => setEstado(st.id as Estado)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full mr-3 shrink-0 transition-colors ${getDotColors(st.id, isSelected)}`} />
                    <span className="text-sm font-bold tracking-wide">{st.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Extra */}
            <div className="text-xs text-slate-500 mt-8 space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Adquisición:</span>
                <span className="text-slate-700">{fechaCompra || "N/A"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Últ. Mantenimiento:</span>
                <span className="text-slate-700">08/12/2025</span>
              </div>
            </div>
          </div>

          <button type="submit" className="mt-auto flex items-center justify-center gap-2 bg-gima-blue hover:brightness-90 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 uppercase tracking-widest">
            <Save size={20} />
            GUARDAR CAMBIOS
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ModificacionActivoPage() {
  return (
    <div className="font-sans space-y-6">
      <DashboardHeader title="Modificar activo" subtitle="Actualizar información del equipo" />

      <Link href="/categorias-activos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gima-navy font-medium transition-colors group">
        <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm group-hover:bg-slate-50">
          <ChevronLeft size={16} />
        </div>
        Cancelar y volver
      </Link>

      <Suspense fallback={<div className="p-10 text-center text-slate-500">Cargando datos del activo...</div>}>
        <ModificacionFormulario />
      </Suspense>
    </div>
  );
}