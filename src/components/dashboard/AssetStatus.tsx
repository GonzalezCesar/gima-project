export function AssetStatus() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm w-full">
      {/* Encabezado de estado de activos*/}
      <div className="flex items-center gap-3 mb-10">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
          Estado de activos
        </h3>
      </div>

      {/* Barras de estado de los diferentes estados de los activos*/}
      <div className="space-y-10">
        <StatusBar label="Operativo" percentage={85} color="bg-[#008f7a]" />
        <StatusBar label="En mantenimiento" percentage={10} color="bg-orange-500" />
        <StatusBar label="Fuera de servicio" percentage={5} color="bg-red-600" />
      </div>

      {/* Alerta de atención al final */}
      <div className="mt-12 bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-center gap-4">
        <div className="min-w-[40px] h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500 font-black">!</div>
        <p className="text-sm text-orange-800 leading-relaxed">
          <span className="font-bold italic">Atención:</span> El porcentaje de equipos en mantenimiento ha subido un 2% esta semana. Revise las órdenes de trabajo pendientes en el laboratorio de química.
        </p>
      </div>
    </div>
  );
}

{/*Funcion del estado de la barra */}
function StatusBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-slate-700 text-lg">{label}</span>
        <span className="font-bold text-slate-900 text-lg">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-5">
        <div 
          className={`${color} h-5 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}