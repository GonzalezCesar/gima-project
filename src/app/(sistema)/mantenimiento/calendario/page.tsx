"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ChevronLeft, ChevronRight, CalendarClock } from "lucide-react";

function buildMonth(year: number, month: number) {
  // month: 0-11
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert JS Sunday=0..Saturday=6 to Monday=0..Sunday=6
  const leading = (first.getDay() + 6) % 7;
  const cells: Array<number | null> = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarioMantenimientoPage() {
  const router = useRouter();
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const [viewYear, setViewYear] = useState<number>(todayYear);
  const [viewMonth, setViewMonth] = useState<number>(todayMonth); // 0-11
  const days = useMemo(() => buildMonth(viewYear, viewMonth), [viewYear, viewMonth]);
  const [selected, setSelected] = useState<number | null>(null);

  const go = (delta: number) => {
    // Cambia de mes manteniendo límites de año
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y = y - 1; }
    if (m > 11) { m = 0;  y = y + 1; }
    setViewYear(y);
    setViewMonth(m);
    setSelected(null);
  };

  const MONTHS = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];
  const WEEK = ["LUN","MAR","MIE","JUE","VIE","SAB","DOM"];

  return (
    <div className="min-h-screen">
      <DashboardHeader subtitle="" />

      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/mantenimiento"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            aria-label="Volver a mantenimiento"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M14.707 17.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L9.414 11H20a1 1 0 1 1 0 2H9.414l5.293 4.293Z"/></svg>
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/></svg>
            </div>
            <button
              disabled={selected == null}
              onClick={() => {
                if (selected == null) return;
                const m = String(viewMonth + 1).padStart(2, "0");
                const d = String(selected).padStart(2, "0");
                const date = `${viewYear}-${m}-${d}`;
                router.push(`/mantenimiento/orden/nueva?fecha=${date}`);
              }}
              className={
                `px-5 py-2.5 rounded-full text-sm transition-colors ` +
                (selected == null
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700")
              }
            >
              Crear orden de mantenimiento
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-center">Calendario de Mantenimientos</h2>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Mes anterior"
              onClick={() => go(-1)}
              className="p-2.5 rounded-lg border text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm text-gray-700 font-semibold min-w-48 text-center">
              {MONTHS[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              aria-label="Mes siguiente"
              onClick={() => go(1)}
              className="p-2.5 rounded-lg border text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => { setViewYear(todayYear); setViewMonth(todayMonth); setSelected(null); }}
              className="px-3 py-1.5 rounded-lg border text-sm text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <CalendarClock className="w-4 h-4" />
              Hoy
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-xs font-semibold text-gray-600">
            {WEEK.map((d) => (
              <div key={d} className="py-2 bg-emerald-50 rounded-md border border-emerald-100 mx-1">{d}</div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {days.map((d, i) => {
              const isToday = d === todayDate && viewMonth === todayMonth && viewYear === todayYear;
              const isSelected = d != null && d === selected;
              const base = "aspect-square rounded-xl flex items-center justify-center text-sm select-none ";
              const classes = d
                ? isSelected
                  ? "bg-blue-600 text-white font-semibold ring-4 ring-blue-200"
                  : isToday
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-gray-50 text-gray-800 border border-gray-100 hover:bg-gray-100 cursor-pointer"
                : "bg-transparent";
              return (
                <button
                  key={i}
                  type="button"
                  disabled={d == null}
                  aria-pressed={isSelected}
                  aria-label={d ? `Seleccionar ${d}/${viewMonth + 1}/${viewYear}` : ""}
                  onClick={() => d && setSelected(d)}
                  className={base + classes}
                >
                  {d ?? ""}
                </button>
              );
            })}
          </div>

          {selected != null && (
            <div className="mt-4 text-sm text-gray-700 text-center">
              Fecha seleccionada: <span className="font-semibold">{String(selected).padStart(2, "0")}/{String(viewMonth + 1).padStart(2, "0")}/{viewYear}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
