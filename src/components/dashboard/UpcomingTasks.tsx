export function UpcomingTasks() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sshadow-sm w-full">
        <div className="flex items-center gap-3 mb-6">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Próximos mantenimientos preventivos</h3>
        </div>

        <div className="bg-emerald-50/30 p-4 rounded-xl flex justify-between items-center border border-emerald-100">
        {/* Parte Izquierda Texto */}
            <div className="flex items-center gap-4">
                <div>
                <p className="font-bold text-slate-800 text-base">Servidor Lab C-1</p>
                <p className="text-xs text-slate-500 font-medium">Programado: 12 may 2024</p>
                </div>
            </div>
        </div>    
    </div>
    
  );
}
