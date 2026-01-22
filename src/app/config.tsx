"use client";

import React from "react";
import {
  Settings,
  LayoutDashboard,
  Wrench,
  Bell,
  User,
  Search,
} from "lucide-react";

interface ConfigCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function ConfiguracionPage() {
  return (
    <section className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-black">Configuración</h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar"
            className="pl-10 pr-4 py-2 rounded-full border bg-white outline-none"
          />
        </div>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConfigCard
          title="Idioma y región"
          desc="Zona horaria y formato de fecha"
          icon={<LayoutDashboard size={20} />}
        />
        <ConfigCard
          title="Gestión de usuarios"
          desc="Roles y permisos"
          icon={<User size={20} />}
        />
        <ConfigCard
          title="Notificaciones"
          desc="Alertas y correos"
          icon={<Bell size={20} />}
        />
        <ConfigCard
          title="Seguridad"
          desc="Contraseñas y auditorías"
          icon={<Settings size={20} />}
        />
        <ConfigCard
          title="Gestión de repuestos"
          desc="Materiales y herramientas"
          icon={<Wrench size={20} />}
        />
        <ConfigCard
          title="Gestión módulo IA"
          desc="Configuración de IA"
          icon={<Settings size={20} />}
        />
      </section>
    </section>
  );
}

const ConfigCard: React.FC<ConfigCardProps> = ({ title, desc, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex gap-4 items-start">
      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1 text-black">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
};
