"use client";

import React from "react";
import Link from "next/link";
import {
  Settings,
  LayoutDashboard,
  Wrench,
  Bell,
  User,
  Search,
  Globe, // Changed to Globe as MapPin is not available in the context
} from "lucide-react";

interface ConfigCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href?: string;
}

const ConfigCard: React.FC<ConfigCardProps> = ({ title, desc, icon, href }) => {
  const cardContent = (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex gap-4 items-start h-full">
      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-slate-700">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1 text-black">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};


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
          href="/configuracion/idiomas"
        />
        <ConfigCard
          title="Gestión de usuarios"
          desc="Roles y permisos"
          icon={<User size={20} />}
          href="/configuracion/User"
        />
        <ConfigCard
          title="Ubicaciones"
          desc="Gestionar ubicaciones"
          icon={<Globe size={20} />}
          href="/configuracion/ubicaciones"
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
