"use client"

import React, { useState } from "react"
import { DashboardHeader } from "@/components/layout/DashboardHeader"
import Link from "next/link"

/*
  Documentación extensa y guía de integración (DESARROLLADOR):

  Objetivo:
  - Mantener la UI exactamente en el formato esperado por el diseño mientras
    no haya una BD configurada. No mostrar "números ficticios" en las
    métricas principales; en su lugar, mostrar un placeholder visual (—)
    cuando no existan datos reales.

  Comportamiento actual implementado en este archivo:
  - Los `StatusCard` ya no muestran valores numéricos ficticios. Si la
    propiedad `count` no está presente o no es un número, se renderiza
    un guion (`—`) gris como placeholder. Esto preserva el layout y el
    peso visual del componente para cuando lleguen los datos reales.
  - Las filas de "Ordenes de trabajo" se mantienen como ejemplos visibles
    (tal como solicitaste) para referencia visual. Para dejar claro que
    se trata de datos de ejemplo y evitar confusiones con datos reales,
    la sección muestra una pequeña etiqueta `Ejemplo` en la esquina.

  Cómo integrar datos reales cuando la BD/endpoint estén disponibles:
  1) Implementar un servicio en `src/services/dataService.ts` que exponga
     funciones como `getMaintenanceSummary()` y `getWorkOrders()`.
  2) Reemplazar las llamadas locales (los ejemplos aquí) por fetching real
     en un hook (por ejemplo `useEffect`) o, en el caso de Next.js App Router,
     usar funciones `fetch` en un componente servidor y pasar los props al
     cliente. Ejemplo de contrato esperado:
     - getMaintenanceSummary() -> { pendiente: number, en_progreso: number, programado: number, completado: number }
     - getWorkOrders() -> Array<{ id, title, type, date, severity, status }>
  3) Mapear los valores recibidos a las props de `StatusCard` y `WorkOrderRow`.
  4) Mantener el mismo formato: si un campo falta, el componente ya maneja
     placeholders (p. ej. `—` para números y textos grises para campos vacíos).

  Notas sobre UX y visualización temporal:
  - Mientras no hay datos, mostramos el placeholder en las métricas y
    mantenemos ejemplos en la lista de órdenes con la etiqueta `Ejemplo`.
  - Cuando lleguen datos reales, simplemente actualizar la fuente de datos
    (y pasar `count` como número) hará que los `StatusCard` muestren
    automáticamente los números reales.

  Seguridad / producción:
  - No incluir credenciales en código. Usar variables de entorno y un
    servicio/dependency injection para los detalles de BD.
  - Añadir manejo de errores y estados de carga para mejorar la UX.
*/

export default function MantenimientoPage() {
  const [query, setQuery] = useState("")

  return (
    <div className="min-h-screen">
      <DashboardHeader subtitle="" />

      <div className="p-8 space-y-6">
        <div className="flex items-center justify-end">
          <Link href="/mantenimiento/calendario">
            <button className="px-5 py-3 bg-blue-600 text-white rounded-full text-base flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true">
                <path d="M19,2.02v-.52c0-.83-.67-1.5-1.5-1.5s-1.5,.67-1.5,1.5v.5H8v-.5c0-.83-.67-1.5-1.5-1.5s-1.5,.67-1.5,1.5v.52C2.2,2.28,0,4.64,0,7.5v11c0,3.03,2.47,5.5,5.5,5.5h13c3.03,0,5.5-2.47,5.5-5.5V7.5c0-2.86-2.2-5.22-5-5.48ZM10,14v-4h4v4h-4Zm4,3v4h-4v-4h4ZM3,10H7v4H3v-4Zm14,0h4v4h-4v-4ZM5.5,5h13c1.21,0,2.22,.86,2.45,2H3.05c.23-1.14,1.24-2,2.45-2Zm-2.5,13.5v-1.5H7v4h-1.5c-1.38,0-2.5-1.12-2.5-2.5Zm15.5,2.5h-1.5v-4h4v1.5c0,1.38-1.12,2.5-2.5,2.5Z" />
              </svg>
              Calendario
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
           <StatusCard title="PENDIENTE" colorKey="red" iconSrc="/imagenes/iconos/reloj.svg" />
           <StatusCard title="EN PROGRESO" colorKey="orange" iconSrc="/imagenes/iconos/reloj.svg" />
           <StatusCard title="PROGRAMADO" colorKey="blue" iconSrc="/imagenes/iconos/reloj.svg" />
           <StatusCard title="COMPLETADO" colorKey="emerald" iconSrc="/imagenes/iconos/reloj.svg" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 relative">
          <h2 className="text-xl font-semibold mb-4">Ordenes de trabajo</h2>

          {/*
            Nota visual: las filas que siguen son ejemplos estáticos usados
            para diseño y visualización. Cuando lleguen los datos reales
            desde la BD, sustituir este bloque por un mapeo del array
            devuelto por `getWorkOrders()`.
          */}

          <div className="absolute top-6 right-6">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border">Ejemplo</span>
          </div>

          <div className="space-y-3">
            <WorkOrderRow id="MNT-01" title="Servidor" type="Preventivo" date="12/05/2024" severity="ALTA" status="COMPLETADO" />
            <WorkOrderRow id="MNT-02" title="Aire acondicionado" type="Correctivo" date="20/05/2024" severity="MEDIA" status="EN PROCESO" />
            <WorkOrderRow id="MNT-03" title="Aire acondicionado" type="Preventivo" date="30/03/2024" severity="BAJA" status="PROGRAMADO" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ title, count, colorKey, iconSrc }: { title: string; count?: number | null; colorKey: string; iconSrc?: string }) {
  const map: Record<string, { bgHex: string; iconHex: string }> = {
    // fondos más suaves / pastel para el círculo del icono
    red: { bgHex: '#ecbdbd', iconHex: '#DC2626' },
    orange: { bgHex: '#f5e2c9', iconHex: '#B45309' },
    blue: { bgHex: '#cfe0f8', iconHex: '#1D4ED8' },
    emerald: { bgHex: '#93e7b4', iconHex: '#059669' },
  }
  const cfg = map[colorKey] ?? map.blue

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: cfg.bgHex }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill={cfg.iconHex} aria-hidden="true">
            <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm2.5,14.33c.479-.276,.643-.888,.366-1.366l-1.866-3.232V6c0-.552-.447-1-1-1s-1,.448-1,1v6c0,.176,.046,.348,.134,.5l2,3.464c.186,.321,.521,.5,.867,.5,.17,0,.342-.043,.499-.134Z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold uppercase">{title}</div>
            {typeof count === "number" ? (
              <div className="mt-2 text-base font-bold">{count}</div>
            ) : (
              <div className="mt-2 text-base font-bold text-gray-400">—</div>
            )}
        </div>
      </div>
    </div>
  )
}

function WorkOrderRow({ id, title, type, date, severity, status }: { id: string; title: string; type: string; date: string; severity: string; status: string }) {
  const severityColor = severity === "ALTA" ? "bg-red-100 text-red-700" : severity === "MEDIA" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
  const statusDot = status === "COMPLETADO" ? "bg-emerald-600" : status === "EN PROCESO" ? "bg-orange-500" : "bg-blue-500"
  const typeBadgeClass = type.toLowerCase().includes("prevent") ? "bg-sky-600 text-white" : "bg-orange-500 text-white"

  return (
    <div className="w-full p-4 rounded-md bg-emerald-50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-white rounded-md text-sm font-medium border shadow-sm">{id}</div>
        <div>
          <div className="text-sm font-semibold">{title.toUpperCase()}</div>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
            <span className={`inline-block px-2 py-1 rounded text-xs ${typeBadgeClass}`}>{type}</span>
            <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${severityColor}`}>{severity}</div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
          <div className="text-sm text-gray-700 font-medium">{status}</div>
        </div>
      </div>
    </div>
  )
}
