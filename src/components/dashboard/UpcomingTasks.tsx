export function UpcomingTasks() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full shadow-sm">

      {/*Titulo de mantenimientos preventivos*/}
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight"> Próximos mantenimientos preventivos</h3>
      </div>

      {/* Caja de ejemplo de mantenimiento programado */}
      <div className="bg-emerald-50/40 p-4 rounded-3xl flex justify-between items-center border border-emerald-50">
        {/* Titulo del ejemplo */}
        <div className="flex items-center gap-4">
            <div>
            <p className="font-bold text-slate-800 text-base">Servidor Lab C-1</p>
            <p className="text-xs text-slate-500 font-medium">Programado: 12 may 2024</p>
            </div>
        </div>

        {/* Boton de asignar */}
        <button className="text-blue-600 font-bold text-sm hover:underline px-4">
            Asignar
        </button>
      </div>
    </div>
  );
}