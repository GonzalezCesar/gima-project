import React, { useState } from 'react';
import { Calendar, Clock, Laptop, User, ClipboardList, AlertCircle } from 'lucide-react';
//-----------Componente creado por nicol----------------------
export default function FormNewOrden({ onClose }) {
  const [tipoServicio, setTipoServicio] = useState('Correctivo');

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">NUEVA ORDEN</h1>
        <p className="text-sm text-gray-500">Agendar servicio en mantenimiento</p>
      </header>

      <form className="space-y-6">
        
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <Laptop size={18} />
            <h2 className="text-sm uppercase tracking-wide">Información del activo</h2>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Seleccionar Activo</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option>Seleccione un equipo...</option>
              <option>Laptop Dell XPS 13</option>
              <option>Monitor LG UltraWide</option>
            </select>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Programación */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <Calendar size={18} />
            <h2 className="text-sm uppercase tracking-wide">Programación</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Fecha del servicio</label>
              <div className="relative">
                <input type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Hora sugerida</label>
              <div className="relative">
                <input type="time" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Asignación y Tipo */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <ClipboardList size={18} />
            <h2 className="text-sm uppercase tracking-wide">Asignación y tipo</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Tipo de servicio</label>
              <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                <button 
                  type="button"
                  onClick={() => setTipoServicio('Correctivo')}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${tipoServicio === 'Correctivo' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Correctivo
                </button>
                <button 
                  type="button"
                  onClick={() => setTipoServicio('Preventivo')}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${tipoServicio === 'Preventivo' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Preventivo
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Prioridad</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1 pt-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Técnico Asignado</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Juan Pérez</option>
              <option>María García</option>
            </select>
          </div>
        </section>

        {/* Notas adicionales */}
        <section className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Notas adicionales/Instrucciones</label>
          <textarea 
            placeholder="Notes..."
            rows={4}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </section>

        <div className="flex gap-4 pt-4">
          <button 
          onClick={onClose}
            type="button"
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            CANCELAR
          </button>
          <button 
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-200"
          >
            AGENDAR ORDEN
          </button>
        </div>
      </form>
    </div>
  );
};
