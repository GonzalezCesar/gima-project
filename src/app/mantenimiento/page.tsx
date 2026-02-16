"use client"

import { useState } from "react"
import { Plus, Wrench, Clock, CheckCircle, X, Search } from "lucide-react"
import { mockTecnicos , mockOrdenes} from "@/utils/mockMantenimiento"
import {Orden, OrdenEstado,TipoMantenimiento,Prioridad} from '@/types/mantenimiento';

export default function Mantenimiento() {
    const [ordenes, setOrdenes] = useState<Orden[]>(mockOrdenes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalPendientes = ordenes.filter(o => o.estado === 'pendiente').length;
    const totalEnProceso = ordenes.filter(o => o.estado === 'en-proceso').length;
    const totalCompletadas = ordenes.filter(o => o.estado === 'completada').length;
    const [searchTerm, setSearchTerm] = useState("");

// 2. Lógica de filtrado dinámico
const ordenesFiltradas = ordenes.filter((orden) => {
  const nombreTecnico = orden.tecnicoNombre.toLowerCase();
  const busqueda = searchTerm.toLowerCase();
  
  return nombreTecnico.includes(busqueda);
});
  const [formData, setFormData] = useState({
    activo: '',
    tecnicoId: '',
    estado: '',
    prioridad: 'media' as Prioridad,
    tipo: 'correctivo' as TipoMantenimiento,
    fechaCulminacion:''
  });

  const handleCrearOrden = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tecnico = mockTecnicos.find(t => t.id === formData.tecnicoId);
    
    const nuevaOrden: Orden = {
      id: `ORD-00${ordenes.length + 1}`,
      activo: formData.activo,
      tecnicoId: formData.tecnicoId,
      tecnicoNombre: tecnico ? tecnico.name : 'Sin asignar',
      prioridad: formData.prioridad,
      estado: 'pendiente'  as OrdenEstado,
      tipo: formData.tipo,
      fecha: new Date().toISOString().split('T')[0],
      fechaCulminacion: ''
    };

    setOrdenes([nuevaOrden, ...ordenes]);
    setIsModalOpen(false);
    setFormData({ activo: '', tecnicoId: '', prioridad: 'media', tipo: 'correctivo' ,fechaCulminacion:'',estado:''});
  };

  const tecnicos = mockTecnicos.filter(
    user => user.rol?.toLowerCase() === 'tecnico'
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50/50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between items-center w-full">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Mantenimiento</h1>
                <p className="text-sm text-gray-500">Bienvenido al panel GIMA</p>
            </div>
            <div className="flex items-center gap-6">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                    type="text"
                     placeholder="Buscar técnico..."
                    className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
            </div>
        </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> Nueva Orden
        </button>

      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
            icon={<Clock className="text-orange-600" />} 
            label="Pendientes" 
            value={totalPendientes.toString()} 
            color="bg-orange-100" 
        />
        <StatCard 
            icon={<Wrench className="text-blue-600" />} 
            label="En Proceso" 
            value={totalEnProceso.toString()} 
            color="bg-blue-100" 
        />
        <StatCard 
            icon={<CheckCircle className="text-green-600" />} 
            label="Completadas" 
            value={totalCompletadas.toString()} 
            color="bg-green-100" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
          <tbody className="divide-y divide-gray-100">
            {ordenes.map((orden) => (
              <tr key={orden.id} className="hover:bg-gray-50">
                <td className="p-4 text-xs font-mono text-gray-400">{orden.id}</td>
                <td className="p-4 font-bold text-gray-800">{orden.activo}</td>
                <td className="p-4 text-gray-600">{orden.tecnicoNombre}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    orden.prioridad === 'alta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {orden.prioridad}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 font-bold text-sm mr-3">Editar</button>
                  <button 
                    onClick={() => setOrdenes(ordenes.filter(o => o.id !== orden.id))}
                    className="text-red-400 font-bold text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center">
                        <div>
                    <h2 className="text-xl font-bold text-gray-800 uppercase">Nueva Orden</h2>
          <p className="text-sm text-gray-500">Agendar servicio en mantenimiento</p>
        </div>
        <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleCrearOrden} className="p-6 space-y-4">
        {/* FILA 1: ACTIVO */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Seleccionar Activo</label>
          <select 
            className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.activo} 
            onChange={(e) => setFormData({ ...formData, activo: e.target.value })} 
            required
          >
            <option value="">Seleccione un equipo...</option>
            <option value="Montacargas Yale 2.5T">Montacargas Yale 2.5T</option>
            <option value="Compresor Industrial A-12">Compresor Industrial A-12</option>
          </select>
        </div>

        {/* FILA 2: TÉCNICO */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Técnico Asignado</label>
          <select 
            className="w-full p-2 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.tecnicoId}
            onChange={(e) => setFormData({ ...formData, tecnicoId: e.target.value })}
            required
          >
            <option value="">Seleccione un técnico...</option>
            {tecnicos.map((tec) => (
              <option key={tec.id} value={tec.id}>{tec.name}</option>
            ))}
          </select>
        </div>

        {/* FILA 3: ESTADO Y FECHA (NUEVO) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Estado Inicial</label>
            <select 
              className="w-full p-2 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value as OrdenEstado })}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en-proceso">En Proceso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fecha Culminación</label>
            <input 
              type="date"
              className="w-full p-1.5 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={formData.fechaCulminacion}
              onChange={(e) => setFormData({ ...formData, fechaCulminacion: e.target.value })}
            />
          </div>
        </div>

        {/* FILA 4: PRIORIDAD Y TIPO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Prioridad</label>
            <select 
              className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.prioridad}
              onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as Prioridad })}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 text-center">Tipo</label>
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                type="button" 
                onClick={() => setFormData({ ...formData, tipo: 'correctivo' })}
                className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${
                  formData.tipo === 'correctivo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                Correctivo
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({ ...formData, tipo: 'preventivo' })}
                className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${
                  formData.tipo === 'preventivo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                Preventivo
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
           Notas Adicionales / Instrucciones
          </label>
          <textarea 
            rows={3}
            placeholder="Escriba aquí los detalles del reporte o instrucciones para el técnico..."
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none placeholder:text-gray-300 transition-all"
            
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            type="button" 
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            CANCELAR
          </button>
          <button 
            type="submit"
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
          >
            AGENDAR ORDEN
          </button>
        </div>
      </form>
    </div>
  </div>
            )}
    </div>
  )

}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 ${color} rounded-lg`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  )
}
