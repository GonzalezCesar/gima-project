"use client"; 

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Bell, User, BookOpen, FileCheck, AlertCircle, MessageSquare, Zap, Wrench, Bot, Sparkles, Send
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function Dashboard() {
  
  const [activeTab, setActiveTab] = useState<'chat' | 'diagnostico'>('diagnostico');

  return (
    <main className="p-8 w-full h-full overflow-y-auto flex flex-col">
      <DashboardHeader subtitle="Bienvenido al panel GIMA" />
      {/* header*/}
      {/* <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gima-navy font-title tracking-wide">
            REPORTES
          </h1>
          <p className="text-gima-gray text-sm mt-1 font-medium">
            Clasificación de reportes
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gima-gray" size={18} />
            <input type="text" placeholder="Buscar" className="pl-12 pr-4 py-2.5 bg-white rounded-full w-64 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gima-blue/20 transition-all" />
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-gima-blue transition-all"><Bell size={20} className="text-slate-600 hover:text-gima-blue" /></button>
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md hover:text-gima-blue transition-all"><User size={20} className="text-slate-600 hover:text-gima-blue" /></button>
          </div>
        </div>
      </header> */}

      {/* cards del dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<BookOpen size={24} />} title="Reportes Generados" value="345" subtext="Reportes en el Ultimo mes" />
        <StatCard icon={<FileCheck size={24} />} title="Reportes Atendidos" value="Ultimo: 09/09/2021" subtext="" isDate={true} />
        <StatCard icon={<AlertCircle size={24} />} title="Reportes Pendientes" value="254" subtext="Requieren acción" />
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm flex-1 flex flex-col min-h-125">
        
        {/* nav bar interna */}
        <div className="mx-6 mt-6 mb-8 bg-gima-light rounded-full px-8 py-3 flex items-center justify-between">
            <div className="flex gap-24 text-sm font-medium text-slate-500">
              <button className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Historial de Reportes</button>
              <button className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Generar Reportes</button>
              <button className="hover:text-gima-navy hover:bg-white/50 px-4 py-2 rounded-full transition-all">Programados</button>
            </div>
            
            <Link href="/asistencia">
              <button className="bg-gima-navy text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-gima-navy/20 flex items-center gap-2 transform hover:scale-105 active:scale-95">
                Asistencia IA
              </button>
            </Link>
        </div>

        {/* tabs */}
        <div className="px-10 flex gap-8 border-b border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'chat' 
                ? "text-gima-navy font-bold border-gima-navy scale-105" 
                : "text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200"
            }`}
          >
            <MessageSquare size={18} /> Chat
          </button>
          
          <button 
             onClick={() => setActiveTab('diagnostico')}
             className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'diagnostico' 
                ? "text-gima-navy font-bold border-gima-navy scale-105" 
                : "text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-200"
            }`}
          >
            <Zap size={18} /> Diagnóstico
          </button>
        </div>

        {/* contenido cambiante (chat/diagnostico) */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 relative">
           
           {activeTab === 'chat' ? (
             /* vista del chat */
             <div className="h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
                
                {/* zona de mensajes */}
                <div className="flex-1 bg-slate-50/50 rounded-2xl p-8 mb-4 border border-slate-100 flex flex-col gap-6 overflow-y-auto">
                    
                    {/* mensaje del bot */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-3xl w-full">
                       <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-3">
                          <Bot size={20} className="text-gima-navy" />
                          <span className="font-bold text-gima-navy text-sm uppercase tracking-wider">GIMA bot</span>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">
                          ¡Hola! Soy GIMA-AI. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre el estado de equipos o procedimientos de mantenimiento.
                       </p>
                    </div>

                </div>

                {/* input area */}
                <div className="relative mb-1">
                   <input 
                     type="text" 
                     placeholder="Escribe tu consulta..." 
                     className="w-full bg-gima-light/50 pl-6 pr-14 py-3 rounded-xl text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gima-blue/20 transition-all border border-transparent focus:border-gima-blue/10"
                   />
                   <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gima-blue text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md shadow-gima-blue/20">
                      <Send size={16} />
                   </button>
                </div>
             </div>

           ) : (
             /* vista de diagnostico */
             <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <Wrench className="text-red-400" size={32} />
                </div>
                <h3 className="font-microgramma text-xl text-black mb-2">Diagnóstico Inteligente</h3>
                <p className="text-slate-500 text-sm max-w-md">
                   Selecciona "Asistencia IA" arriba para iniciar un análisis completo en pantalla dedicada.
                </p>
             </div>
           )}

        </div>
      </div>
    </main>
  );
}

// Componente para las cards del dashboard
function StatCard({ icon, title, value, subtext, isDate = false }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-50 group hover:-translate-y-1">
      <div className="mb-4 text-slate-700 p-3 bg-slate-50 w-fit rounded-xl border border-slate-100 group-hover:bg-gima-light group-hover:text-gima-blue transition-colors">{icon}</div>
      <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider opacity-80">{title}</h3>
      {isDate ? <div className="text-sm font-medium text-slate-600 mb-1 bg-slate-100 w-fit px-3 py-1 rounded-full">{value}</div> : <><div className="text-xs text-slate-400 mb-1">{subtext}</div><div className="text-4xl font-microgramma text-slate-800">{value}</div></>}
    </div>
  );
}