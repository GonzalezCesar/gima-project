type Priority = 'ALTA' | 'MEDIA' | 'BAJA';
type Status = 'COMPLETADO' | 'EN PROCESO' | 'PROGRAMADO';

interface Report {
  id: string;
  asset: string;
  desc: string;
  priority: Priority; // Aquí obligamos a que sea uno de los 3 tipos
  status: Status;     // Aquí también
  tech: string;
}

const reportsData: Report[] = [
  { 
    id: "1234", 
    asset: "SERVIDOR 123", 
    desc: "Restauracion de conectores", 
    priority: "ALTA", 
    status: "COMPLETADO", 
    tech: "PEDRO PEREZ" 
  },
  { 
    id: "6789", 
    asset: "AIRE ACONDICIONADO", 
    desc: "Fallo del compresor", 
    priority: "MEDIA", 
    status: "EN PROCESO", 
    tech: "JUAN PEREZ" 
  },
  { 
    id: "45132", 
    asset: "CPU PRINCIPAL", 
    desc: "Servicio de mantenimiento", 
    priority: "BAJA", 
    status: "PROGRAMADO", 
    tech: "LUIS SOTO" 
  },
];

export const ReportTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50">
        <h2 className="font-bold text-gray-800">Mantenimientos prioritarios pendientes de ejecución</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {reportsData.map((report) => (
          <div key={report.id} className="grid grid-cols-5 items-center p-8 hover:bg-gray-50 transition-colors">
            <span className="text-gray-400 font-mono text-sm bg-gray-100 w-fit px-4 py-1 rounded">#{report.id}</span>
            <div>
              <p className="font-bold text-sm text-gray-800">{report.asset}</p>
              <p className="text-xs text-gray-500">{report.desc}</p>
            </div>
            <PriorityBadge priority={report.priority} />
            <StatusBadge status={report.status} />
            <span className="text-sm font-bold text-gray-700 text-right">{report.tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: 'ALTA' | 'MEDIA' | 'BAJA' }) => {
  const colors: Record<string , string> = {
    ALTA: "bg-red-100 text-red-600",
    MEDIA: "bg-orange-100 text-orange-600",
    BAJA: "bg-blue-100 text-blue-600",
  };
 return <span className={`px-3 py-1 rounded-full text-[10px] font-bold w-fit ${colors[priority]}`}>{priority}</span>;
};

const StatusBadge = ({ status }: { status: 'COMPLETADO' | 'EN PROCESO' | 'PROGRAMADO' }) => {
  const dotColor: Record<string , string> = {
    COMPLETADO: "bg-emerald-500",
    "EN PROCESO": "bg-orange-500",
    PROGRAMADO: "bg-blue-500",
  };
  return (
    <div className="flex items-center text-[10px] font-bold text-gray-600">
      <div className={`w-2 h-2 rounded-full mr-2 ${dotColor[status]}`} />
      {status}
    </div>
  );
};