"use client";

import { useState } from "react";
import {
  Search,
  Clock,
  UserCircle,
  ShieldCheck,
  Wrench,
  LogIn,
  Trash2,
} from "lucide-react";

interface HistoryRecord {
  id: string;
  userName: string;
  role: string;
  action: string;
  description: string;
  timeAgo: string;
  date: string;
  hour: string;
}

/* Placeholders*/
const mockHistory: HistoryRecord[] = [
  {
    id: "1",
    userName: "ELENA RIVAS",
    role: "Supervisor",
    action: "Edición de repuestos",
    description: "Actualizó stock de Rodamiento 6200 de 10 a 15 unidades.",
    timeAgo: "Hace 5 min",
    date: "12/08/2025",
    hour: "09:00:12",
  },
  {
    id: "2",
    userName: "CARLOS MENDOZA",
    role: "Administrador",
    action: "Inicio de sesión",
    description: "Acceso exitoso desde Terminal Planta B.",
    timeAgo: "Hace 2 h",
    date: "12/08/2025",
    hour: "07:30:12",
  },
  {
    id: "3",
    userName: "JUAN PEREZ",
    role: "Técnico",
    action: "Cierre de Orden",
    description: "Finalizó mantenimiento en Prensa Hidráulica H1.",
    timeAgo: "Hace 35 min",
    date: "12/08/2025",
    hour: "09:00:12",
  },
  {
    id: "4",
    userName: "MARIA RIVAS",
    role: "Supervisor",
    action: "Eliminación de Usuario",
    description: "Eliminó el acceso del contratista temporal ID 9902.",
    timeAgo: "Hace 15 min",
    date: "12/08/2025",
    hour: "09:10:45",
  },
];

/* Acciones */
function getActionStyle(action: string) {
  if (action.includes("Edición") || action.includes("Cierre"))
    return { icon: Wrench, color: "bg-blue-50 text-blue-700" };

  if (action.includes("Inicio"))
    return { icon: LogIn, color: "bg-green-50 text-green-700" };

  if (action.includes("Eliminación"))
    return { icon: Trash2, color: "bg-red-50 text-red-700" };

  return { icon: ShieldCheck, color: "bg-gray-100 text-gray-700" };
}

export default function HistorialPage() {
  const [busqueda, setBusqueda] = useState("");

  const registrosFiltrados = mockHistory.filter(
    (item) =>
      item.userName.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.action.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.description.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        {/* Encabezado */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900">
            Historial de usuarios
          </h1>
          <p className="text-gray-600">Auditoría y trazabilidad del sistema</p>
        </div>

        {/* Buscador */}
        <div className="mb-6 relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar en historial..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-all duration-200"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/*  Contenedor del historial */}
        <div className="bg-gray-100 rounded-xl p-6 space-y-4">
          {registrosFiltrados.map((record, index) => {
            const actionStyle = getActionStyle(record.action);
            const ActionIcon = actionStyle.icon;

            return (
              <div
                key={record.id}
                className="flex justify-between items-center bg-white border border-gray-200
                           rounded-lg px-6 py-4 hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-300 ease-out
                           animate-slide-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Usuario */}
                <div className="flex items-center gap-3 w-1/4">
                  <UserCircle className="text-gray-400" size={34} />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {record.userName}
                    </p>
                    <p className="text-sm text-green-600">{record.role}</p>
                  </div>
                </div>

                {/* Acción */}
                <div className="w-1/5">
                  <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${actionStyle.color}`}
                  >
                    <ActionIcon size={16} />
                    {record.action}
                  </span>
                </div>

                {/* Tiempo */}
                <div className="w-1/6 text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={16} />
                  {record.timeAgo}
                </div>

                {/* Descripción */}
                <div className="w-1/3 text-sm text-gray-600 italic">
                  "{record.description}"
                </div>

                {/* Fecha */}
                <div className="text-right text-sm text-gray-500">
                  <div>{record.date}</div>
                  <div>{record.hour}</div>
                </div>
              </div>
            );
          })}

          {registrosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No se encontraron registros.
            </p>
          )}
        </div>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        .animate-slide-up {
          opacity: 0;
          transform: translateY(8px);
          animation: slideUp 0.35s ease forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
