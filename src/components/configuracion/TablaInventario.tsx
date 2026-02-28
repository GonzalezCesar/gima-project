import { Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

// Definimos la estructura de la tabla
interface Activo {
  id: string;
  idActivo: string;
  idArticulo: string;
  estado: string;
  ubicacion: string;
  ultMantenimiento: string;
}

// los datos que la página principal le pasará a esta tabla
interface TablaInventarioProps {
  data: Activo[];
  busqueda: string;
  onDeleteClick: (id: string) => void;
}

export default function TablaInventario({ data, busqueda, onDeleteClick }: TablaInventarioProps) {

  // Función para pintar el semáforo de estado
  const getStatusBadge = (estado: string) => {
    const statusNormalizado = estado.toLowerCase();

    if (statusNormalizado.includes("mantenimiento")) {
      return "bg-amber-100 text-amber-700 border-amber-200"; // Amarillo
    }
    if (statusNormalizado.includes("operativo")) {
      return "bg-emerald-100 text-emerald-700 border-emerald-200"; // Verde
    }
    if (statusNormalizado.includes("activo")) {
      return "bg-blue-100 text-blue-700 border-blue-200"; // Azul
    }
    return "bg-slate-100 text-slate-700 border-slate-200"; // Por defecto (Gris)
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 text-gima-navy border-b border-slate-100">
            <th className="py-5 px-8 text-xs font-extrabold uppercase tracking-widest font-title">ID ACTIVOS</th>
            <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title">ID ARTÍCULOS</th>
            <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title text-center">ESTADO</th>
            <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title">UBICACIÓN</th>
            <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-widest font-title">ULT. MANTENIMIENTO</th>
            <th className="py-5 px-8 text-xs font-extrabold uppercase tracking-widest font-title text-right">ACCIONES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="py-5 px-8 font-bold text-gima-navy text-sm">{item.idActivo}</td>
                <td className="py-5 px-6 font-medium text-slate-600 text-sm">{item.idArticulo}</td>
                <td className="py-5 px-6 text-center">
                  <span className={`py-1.5 px-4 rounded-lg text-xs font-bold border transition-colors ${getStatusBadge(item.estado)}`}>
                    {item.estado}
                  </span>
                </td>
                <td className="py-5 px-6 text-sm text-slate-500">{item.ubicacion}</td>
                <td className="py-5 px-6 text-sm text-slate-500">{item.ultMantenimiento}</td>
                <td className="py-5 px-8 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/categorias-activos/modificar?id=${item.idArticulo}`}>
                      <button className="p-2 text-slate-400 hover:text-gima-blue hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    <button onClick={() => onDeleteClick(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-10 text-center text-slate-400 text-sm">
                No se encontraron activos para "{busqueda}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}