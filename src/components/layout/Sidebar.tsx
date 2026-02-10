"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Box,        // Usé Box para activos (más genérico)
  Wrench,
  ClipboardList, // Usé ClipboardList para reportes (visual)
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esto, si no, usa template literals estándar

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Definimos los items aquí para mantener el código limpio
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Box,
      label: "Activos",
      href: "/categorias-activos", // Usando la ruta anidada del Code B
    },
    {
      icon: Wrench,
      label: "Mantenimiento",
      href: "/mantenimiento",
    },
    {
      icon: ClipboardList,
      label: "Reportes",
      href: "/reportes",
    },
    {
      icon: Settings,
      label: "Configuración",
      href: "/configuracion",
    },
  ];

  const handleLogout = () => {
    // Aquí puedes agregar lógica de limpieza de tokens si es necesario
    router.push("/auth/login");
  };

  return (
    <aside
      className={cn(
        "bg-[#001F3F] text-white flex flex-col h-screen sticky top-0 shadow-2xl z-50",
        "transition-all duration-300 ease-in-out shrink-0 rounded-r-3xl", // Estilo visual del Code A
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header: Logo + Toggle */}
      <div className="flex items-center justify-between p-4 mb-4">
        <div
          className={cn(
            "relative h-10 transition-all duration-300 overflow-hidden",
            isOpen ? "w-32 opacity-100" : "w-0 opacity-0"
          )}
        >
          {/* Usamos object-contain y fill para mejor adaptación */}
          <Image
            src="/logo-gima.png"
            alt="GIMA Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Detectar si está activo (coincidencia exacta o sub-ruta)
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" // Caso especial: Dashboard se sombrea solo si es exacto
              : pathname === item.href || pathname.startsWith(`${item.href}/`); // Los demás 
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group overflow-hidden whitespace-nowrap",
                !isOpen && "justify-center", // Centrar icono si está cerrado
                isActive
                  ? "bg-white text-[#001F3F] font-bold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              )}
            >
              <div className="min-w-6"> {/* Contenedor fijo para evitar saltos */}
                <Icon size={20} className={cn(isActive && "animate-pulse-once")} /> 
              </div>
              
              <span
                className={cn(
                  "transition-all duration-300 origin-left",
                  isOpen ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0 hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer: Logout */}
      <div className="p-4 border-t border-white/10 mt-auto overflow-hidden">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 text-gray-300 hover:text-white hover:bg-red-500/20 whitespace-nowrap",
            !isOpen && "justify-center"
          )}
          title="Cerrar sesión"
        >
          <div className="min-w-6">
             <LogOut size={20} />
          </div>
          <span
             className={cn(
               "transition-all duration-300",
               isOpen ? "opacity-100" : "opacity-0 w-0 hidden"
             )}
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  );
}