'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DashboardHeader } from '@/components/layout/DashboardHeader';


// Componente para mostrar iconos SVG
const SVGIcon = ({ name, className = 'w-5 h-5', white = false }: { name: string; className?: string; white?: boolean }) => {
  // Si es el ícono de check, forzamos el color blanco
  const isCheck = name === 'check';
  
  // Clases condicionales
  const iconClasses = [
    'inline-block',
    className,
    (white || isCheck) ? 'filter brightness-0 invert' : ''
  ].filter(Boolean).join(' ');
  
  return (
    <span className={iconClasses}>
      {name === 'logo' ? (
        <Image 
          src="/imagenes/logo/logo.svg" 
          alt="" 
          width={20} 
          height={20} 
          className="w-full h-full"
        />
      ) : (
        <Image 
          src={`/imagenes/iconos/${name}.svg`} 
          alt="" 
          width={20} 
          height={20} 
          className="w-full h-full"
        />
      )}
    </span>
  )
}
// Los íconos se pueden implementar usando etiquetas <img> o componentes de imagen de Next.js
// Ejemplo: <img src="/ruta/al/icono.svg" alt="Descripción" className="w-6 h-6" />

// (Menu lateral eliminado: solo se mantienen componentes usados en esta vista)

export default function IdiomasPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('es-latam')
  const [dateFormat, setDateFormat] = useState('DD/MM/AAAA')
  const [timezone, setTimezone] = useState('America/Caracas')
  const [timeFormat, setTimeFormat] = useState('12h')

  const languages = [
    { id: 'es-latam', name: 'Español (latinoamérica)', nativeName: 'Español', isDefault: true },
    { id: 'en', name: 'Inglés', nativeName: 'English' },
    { id: 'ja', name: 'Japonés', nativeName: 'Japanese' }
  ]

  const dateFormats = [
    { value: 'DD/MM/AAAA', label: 'DD/MM/AAAA (31/12/2026)' },
    { value: 'MM/DD/AAAA', label: 'MM/DD/AAAA (12/31/2026)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2026-12-31)' }
  ]

  const timezones = [
    { value: 'America/Caracas', label: 'América/Caracas (GMT-04:00)' },
    { value: 'America/New_York', label: 'America/New_York (GMT-05:00)' },
    { value: 'Europe/Madrid', label: 'Europe/Madrid (GMT+01:00)' }
  ]

  const timeFormats = [
    { value: '12h', label: '12 Horas (2:30PM)' },
    { value: '24h', label: '24 Horas (14:30)' }
  ]

  const handleSave = () => {
    // Lógica para guardar preferencias
    alert('Preferencias guardadas correctamente')
  }
  

  return (
    <div className="min-h-screen bg-white ">
      {/* Sidebar removed: simplified layout */}
    <DashboardHeader subtitle="Bienvenido al panel GIMA" />


      {/* Contenido principal */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300">
        <div className="w-full mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gima-navy">Idioma y Región</h1>
              <p className="text-sm text-gima-navy/70 mt-1">Personaliza la experiencia local del sistema</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gima-navy/10">
            <div className="flex items-center mb-4">
              <span className="mr-2">
                <SVGIcon name="globo" className="w-5 h-5" />
              </span>
              <span className="text-sm font-medium text-gima-navy">IDIOMA DEL SISTEMA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedLanguage === lang.id
                      ? 'border-gima-blue bg-gima-blue/10'
                      : 'border-gima-navy/20 hover:border-gima-navy/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gima-navy text-sm sm:text-base">{lang.name}</p>
                      <p className="text-xs sm:text-sm text-gima-navy/70">{lang.nativeName}</p>
                      {lang.isDefault && (
                        <span className="text-xs text-gima-blue mt-1 inline-block">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    {selectedLanguage === lang.id && (
                      <div className="w-5 h-5 rounded-full bg-gima-blue flex items-center justify-center flex-shrink-0 ml-2">
                        <SVGIcon name="check" white={true} className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gima-navy/10 pt-6">
              <div className="flex items-center mb-4">
                <span className="text-gima-blue mr-2">
                <SVGIcon name="formato_regionales" className="w-5 h-5" />
              </span>
                <span className="text-sm font-medium text-gima-navy">FORMATOS REGIONALES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gima-navy mb-1">Formato de fecha</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full p-2.5 text-sm text-gima-navy border border-gima-navy/30 rounded-lg focus:ring-2 focus:ring-gima-blue focus:border-transparent"
                  >
                    {dateFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zona horaria</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-2.5 text-sm text-gima-navy border border-gima-navy/30 rounded-lg focus:ring-2 focus:ring-gima-blue focus:border-transparent"
                  >
                    {timezones.map((zone) => (
                      <option key={zone.value} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formato de hora</label>
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="w-full p-2.5 text-sm text-gima-navy border border-gima-navy/30 rounded-lg focus:ring-2 focus:ring-gima-blue focus:border-transparent"
                  >
                    {timeFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto flex items-center justify-center bg-gima-blue hover:bg-gima-navy text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-colors"
              >
                <SVGIcon name="check" className="w-4 h-4 mr-2" />
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
