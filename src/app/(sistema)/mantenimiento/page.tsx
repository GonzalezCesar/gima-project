"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Wrench, Clock, CheckCircle, X, Search, FileText, Download, CalendarDays } from "lucide-react"
import { mockTecnicos, mockOrdenes } from "@/utils/mockMantenimiento"
import { Orden as OrdenBase, OrdenEstado, TipoMantenimiento, Prioridad } from '@/types/mantenimiento'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interface extendida para campos personalizados
interface Orden extends OrdenBase {
  notas?: string;
  tipo: TipoMantenimiento;
}

export default function Mantenimiento() {
  const [ordenes, setOrdenes] = useState<Orden[]>(mockOrdenes as Orden[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ESTADOS PARA EL MODAL DE VISTA PREVIA DEL INFORME
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Orden | null>(null);
  const [lastBudgetData, setLastBudgetData] = useState({ costo: '150.00', presupuestoDisponible: '5000.00', presupuestoUsado: '0.00', horaSugerida: '08:00' });

  const [formData, setFormData] = useState({
    activo: '',
    tecnicoId: '',
    prioridad: 'media' as Prioridad,
    tipo: 'correctivo' as TipoMantenimiento,
    fechaServicio: new Date().toISOString().split('T')[0],
    horaSugerida: '08:00',
    notas: '',
    costo: '150.00',
    presupuestoDisponible: '5000.00',
    presupuestoUsado: '0.00',
    estado: 'pendiente' as OrdenEstado
  });

  const totalPendientes = ordenes.filter(o => o.estado === 'pendiente').length;
  const totalEnProceso = ordenes.filter(o => o.estado === 'en-proceso').length;
  const totalCompletadas = ordenes.filter(o => o.estado === 'completada').length;

  const ordenesFiltradas = ordenes.filter((orden) => {
    const nombreTecnico = orden.tecnicoNombre.toLowerCase();
    const busqueda = searchTerm.toLowerCase();
    return nombreTecnico.includes(busqueda);
  });

  const generarInformeIndividual = (datos: Orden) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text("INFORME DE MANTENIMIENTO DETALLADO", 14, 20);

    autoTable(doc, {
      startY: 30,
      body: [
        ['Nombre del equipo:', datos.activo, 'Tipo de servicio:', datos.tipo?.toUpperCase() || 'N/A'],
        ['Código de inventario:', datos.id, 'Prioridad:', datos.prioridad.toUpperCase()],
      ],
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } }
    });

    doc.setFillColor(37, 99, 235);
    doc.rect(14, 50, 182, 8, 'F');
    doc.setTextColor(255);
    doc.setFontSize(10);
    doc.text("RESUMEN DE ACTIVIDADES REALIZADAS", 18, 55);

    doc.setTextColor(0);
    doc.rect(14, 58, 182, 30);
    doc.setFontSize(9);
    const textoActividad = datos.notas || "No se ingresaron notas adicionales.";
    doc.text(textoActividad, 18, 65, { maxWidth: 170 });

    autoTable(doc, {
      startY: 95,
      head: [['REGISTRO CRONOLÓGICO', 'RESUMEN ECONÓMICO']],
      body: [
        [`Apertura: ${datos.fecha} ${lastBudgetData.horaSugerida}`, `Presupuesto Disponible: $${lastBudgetData.presupuestoDisponible}`],
        [`Estado: ${datos.estado.toUpperCase()}`, `Presupuesto Usado: $${lastBudgetData.presupuestoUsado}`],
        [``, `Costo Estimado: $${lastBudgetData.costo}`],
        [``, `Saldo Restante: $${(parseFloat(lastBudgetData.presupuestoDisponible) - parseFloat(lastBudgetData.presupuestoUsado) - parseFloat(lastBudgetData.costo)).toFixed(2)}`],
        [``, `Moneda: USD`],
      ],
      headStyles: { fillColor: [37, 99, 235] },
      theme: 'grid'
    });

    const finalY = (doc as any).lastAutoTable.finalY + 35;
    doc.line(14, finalY, 80, finalY);
    doc.text("CARLOS MANTILLA", 14, finalY + 5);
    doc.text("Técnico Principal", 14, finalY + 10);

    doc.line(120, finalY, 190, finalY);
    doc.text("ROBERTO GOMEZ", 120, finalY + 5);
    doc.text("Supervisor de Planta", 120, finalY + 10);

    doc.save(`Informe_${datos.activo.replace(/\s+/g, '_')}.pdf`);
  };

  const exportarInformePDF = () => {
    const doc = new jsPDF();
    doc.text("INFORME GENERAL GIMA", 14, 22);
    autoTable(doc, {
      startY: 40,
      head: [['ID', 'ACTIVO', 'TÉCNICO', 'PRIORIDAD', 'ESTADO']],
      body: ordenesFiltradas.map(o => [o.id, o.activo, o.tecnicoNombre, o.prioridad, o.estado]),
      headStyles: { fillColor: [37, 99, 235] }
    });
    doc.save("GIMA_Reporte_General.pdf");
  };

  const handleCrearOrden = (e: React.FormEvent) => {
    e.preventDefault();
    const tecnico = mockTecnicos.find(t => t.id === formData.tecnicoId);
    
    const nuevaOrden: Orden = {
      id: `ORD-${Math.floor(Math.random() * 1000)}`,
      activo: formData.activo,
      tecnicoId: formData.tecnicoId,
      tecnicoNombre: tecnico ? tecnico.name : 'Sin asignar',
      prioridad: formData.prioridad,
      estado: formData.estado,
      tipo: formData.tipo,
      fecha: formData.fechaServicio,
      notas: formData.notas, 
      fechaCulminacion: ''
    };

    setOrdenes([nuevaOrden, ...ordenes]);
    setLastCreatedOrder(nuevaOrden);
    setLastBudgetData({ costo: formData.costo, presupuestoDisponible: formData.presupuestoDisponible, presupuestoUsado: formData.presupuestoUsado, horaSugerida: formData.horaSugerida });
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    setFormData({ 
      activo: '', tecnicoId: '', prioridad: 'media', tipo: 'correctivo', 
      fechaServicio: new Date().toISOString().split('T')[0], horaSugerida: '08:00', 
      notas: '', costo: '150.00', presupuestoDisponible: '5000.00', presupuestoUsado: '0.00', estado: 'pendiente' 
    });
  };

  const tecnicos = mockTecnicos.filter(user => user.rol?.toLowerCase() === 'tecnico');

  return (
    <div className="min-h-screen p-6 bg-gray-50/50 text-gray-800 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mantenimiento</h1>
          <p className="text-sm text-gray-500">Panel de control de servicios</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar técnico..." 
              className="pl-10 pr-4 py-2 border rounded-full bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/mantenimiento/calendario"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <CalendarDays size={18} /> Calendario
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Plus size={18} /> Nueva Orden
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<Clock className="text-orange-600" />} label="Pendientes" value={totalPendientes.toString()} color="bg-orange-100" />
        <StatCard icon={<Wrench className="text-blue-600" />} label="En Proceso" value={totalEnProceso.toString()} color="bg-blue-100" />
        <StatCard icon={<CheckCircle className="text-green-600" />} label="Completadas" value={totalCompletadas.toString()} color="bg-green-100" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Activo</th>
              <th className="p-4">Técnico</th>
              <th className="p-4">Prioridad</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ordenesFiltradas.map((orden) => (
              <tr key={orden.id} className="hover:bg-gray-50">
                <td className="p-4 text-xs font-mono">{orden.id}</td>
                <td className="p-4 font-bold">{orden.activo}</td>
                <td className="p-4">{orden.tecnicoNombre}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    orden.prioridad === 'alta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {orden.prioridad}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => setOrdenes(ordenes.filter(o => o.id !== orden.id))} className="text-red-400 font-bold text-sm hover:text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL PRINCIPAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-white p-6 flex justify-between items-center border-b">
              <div>
                <h2 className="text-xl font-bold uppercase">Nueva Orden</h2>
                <p className="text-[10px] text-gray-400">Agendar servicio en mantenimiento</p>
              </div>
              <X className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleCrearOrden} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Información</label>
                <select 
                  className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm outline-none mt-1"
                  value={formData.activo}
                  onChange={(e) => setFormData({...formData, activo: e.target.value})} required
                >
                  <option value="">Seleccionar Activo...</option>
                  <option value="Servidor Central">Servidor Central</option>
                  <option value="Compresor Industrial">Compresor Industrial</option>
                  <option value="Sistema de Aire">Sistema de Aire</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Fecha</label>
                  <input type="date" className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm mt-1" value={formData.fechaServicio} onChange={(e) => setFormData({...formData, fechaServicio: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Hora</label>
                  <input type="time" className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm mt-1" value={formData.horaSugerida} onChange={(e) => setFormData({...formData, horaSugerida: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Tipo</label>
                  <div className="flex border rounded-lg overflow-hidden mt-1 h-10">
                    <button type="button" onClick={() => setFormData({...formData, tipo: 'correctivo'})} className={`flex-1 text-[10px] font-bold uppercase ${formData.tipo === 'correctivo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>Correctivo</button>
                    <button type="button" onClick={() => setFormData({...formData, tipo: 'preventivo'})} className={`flex-1 text-[10px] font-bold uppercase ${formData.tipo === 'preventivo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>Preventivo</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Prioridad</label>
                  <select className="w-full h-10 px-2 border rounded-lg bg-gray-50 text-sm mt-1" value={formData.prioridad} onChange={(e) => setFormData({...formData, prioridad: e.target.value as Prioridad})}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Técnico</label>
                <select className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm mt-1" value={formData.tecnicoId} onChange={(e) => setFormData({...formData, tecnicoId: e.target.value})} required>
                  <option value="">Seleccionar Técnico...</option>
                  {tecnicos.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Presupuesto</label>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  <div>
                    <label className="text-[9px] text-gray-400">Disponible ($)</label>
                    <input type="number" step="0.01" min="0" className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm" value={formData.presupuestoDisponible} onChange={(e) => setFormData({...formData, presupuestoDisponible: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400">Usado ($)</label>
                    <input type="number" step="0.01" min="0" className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm" value={formData.presupuestoUsado} onChange={(e) => setFormData({...formData, presupuestoUsado: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400">Costo estimado ($)</label>
                    <input type="number" step="0.01" min="0" className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm" value={formData.costo} onChange={(e) => setFormData({...formData, costo: e.target.value})} />
                  </div>
                </div>
                {parseFloat(formData.presupuestoUsado) + parseFloat(formData.costo) > parseFloat(formData.presupuestoDisponible) && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium">⚠ El costo usado + estimado supera el presupuesto disponible</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Notas</label>
                <textarea rows={3} className="w-full p-3 border rounded-lg bg-gray-50 text-sm resize-none mt-1" value={formData.notas} onChange={(e) => setFormData({...formData, notas: e.target.value})} />
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-bold uppercase text-xs">Cancelar</button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-bold uppercase text-xs">Agendar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE VISTA PREVIA DEL INFORME (ESTILO IMAGEN) */}
      {isSuccessModalOpen && lastCreatedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl my-8 animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col">
            
            {/* CABECERA AZUL DEL SISTEMA */}
            <div className="bg-[#004a7c] p-4 flex justify-between items-center text-white">
              <h2 className="text-sm font-bold uppercase tracking-wider">Informe de Mantenimiento</h2>
              <button onClick={() => setIsSuccessModalOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* CONTENIDO DEL INFORME (ESTILO HOJA PAPEL) */}
            <div className="p-8 bg-gray-50 flex-1 overflow-y-auto">
              <div className="bg-white mx-auto shadow-lg border border-gray-200 p-10 max-w-[850px] min-h-[1000px] relative">
                
                {/* Header del Documento */}
                <div className="flex justify-between items-start mb-8 border-b pb-6">
                  <div>
                    <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Informe de Mantenimiento</h1>
                    <p className="text-xs text-gray-500 mt-1">Caton #: orden #: {lastCreatedOrder.id}</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-900 flex items-center justify-center rounded">
                    <span className="text-white font-black text-2xl">A</span>
                  </div>
                </div>

                {/* Info Principal */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-10 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Nombre del equipo:</span>
                    <span className="font-bold text-gray-800">{lastCreatedOrder.activo.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Tipo de servicio:</span>
                    <span className="font-bold text-gray-800">{lastCreatedOrder.tipo.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Código de inventario:</span>
                    <span className="font-bold text-gray-800">85</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Referencias de falla:</span>
                    <span className="font-bold text-gray-800">N/A</span>
                  </div>
                </div>

                {/* Sección Actividades */}
                <div className="mb-8">
                  <div className="bg-[#006699] text-white px-4 py-1.5 text-[11px] font-bold uppercase mb-2 tracking-wide">
                    Resumen de actividades realizadas
                  </div>
                  <div className="border border-gray-200 p-5 rounded-sm min-h-[120px] text-gray-700 text-sm leading-relaxed">
                    {lastCreatedOrder.notas || "Mantenimiento preventivo programado para asegurar el correcto funcionamiento del activo. Limpieza interna y revisión de componentes críticos."}
                  </div>
                </div>

                {/* Secciones Inferiores */}
                <div className="grid grid-cols-2 gap-8 mb-20">
                  <div>
                    <div className="bg-[#006699] text-white px-4 py-1.5 text-[11px] font-bold uppercase mb-2 tracking-wide">
                      Registro Cronológico
                    </div>
                    <div className="border border-gray-200 p-4 text-sm space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>APERTURA DE ORDEN:</span>
                        <span className="font-bold text-gray-800">{lastCreatedOrder.fecha} 08:30</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>CIERRE DE ORDEN:</span>
                        <span className="font-bold text-gray-800">---</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-[#006699] text-white px-4 py-1.5 text-[11px] font-bold uppercase mb-2 tracking-wide">
                      Resumen Económico
                    </div>
                    <div className="border border-gray-200 p-4 text-sm space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Presupuesto Disponible:</span>
                        <span className="font-bold text-gray-800">${lastBudgetData.presupuestoDisponible}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Presupuesto Usado:</span>
                        <span className="font-bold text-gray-800">${lastBudgetData.presupuestoUsado}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 items-baseline border-t border-gray-100 pt-2">
                        <span>Costo Estimado intervención:</span>
                        <span className="font-bold text-lg text-blue-900">${lastBudgetData.costo}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 items-baseline border-t border-gray-100 pt-2">
                        <span>Saldo Restante:</span>
                        <span className={`font-bold text-lg ${(parseFloat(lastBudgetData.presupuestoDisponible) - parseFloat(lastBudgetData.presupuestoUsado) - parseFloat(lastBudgetData.costo)) < 0 ? 'text-red-600' : 'text-green-700'}`}>
                          ${(parseFloat(lastBudgetData.presupuestoDisponible) - parseFloat(lastBudgetData.presupuestoUsado) - parseFloat(lastBudgetData.costo)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-500 text-[10px]">
                        <span>Moneda:</span>
                        <span>USD</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Firmas */}
                <div className="flex justify-around items-end pt-12">
                  <div className="text-center w-48">
                    <div className="border-t border-gray-400 pt-2 font-bold text-sm text-gray-800 uppercase">Carlos Mantilla</div>
                    <div className="text-xs text-gray-500">Técnico Principal</div>
                  </div>
                  <div className="text-center w-48">
                    <div className="border-t border-gray-400 pt-2 font-bold text-sm text-gray-800 uppercase">Roberto Gomez</div>
                    <div className="text-xs text-gray-500">Supervisor de Planta</div>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTONES DE ACCIÓN (ESTILO IMAGEN) */}
            <div className="bg-white p-6 border-t flex justify-end gap-3 items-center">
              <button 
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-8 py-2.5 bg-white border border-gray-300 text-gray-600 rounded font-bold hover:bg-gray-50 transition-all uppercase text-xs"
              >
                Cerrar
              </button>
              
              <button 
                onClick={() => {
                  generarInformeIndividual(lastCreatedOrder);
                  setIsSuccessModalOpen(false);
                }}
                className="px-6 py-2.5 bg-blue-600 text-white rounded font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-xs uppercase"
              >
                <Download size={16} />
                Descargar Informe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER ACTION */}
      <div className="mt-6 flex justify-between items-center bg-white p-6 rounded-xl border">
        <div className="text-left">
          <h4 className="font-bold text-sm uppercase">Responsable</h4>
          <p className="text-blue-600 font-bold text-lg">CARLOS MANTILLA</p>
        </div>
        <button onClick={exportarInformePDF} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex gap-2">
          <FileText size={18} /> GENERAR INFORME GENERAL
        </button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 ${color} rounded-lg`}>{icon}</div>
      <div className="text-left">
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  )
}