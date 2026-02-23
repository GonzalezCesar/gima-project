'use client';
import React, { useState } from 'react';
import { User } from '../../types/user';

interface UserRowProps {
    user: User;
    onEliminar: (id: string) => void;
    onEditar: (user: User) => void;
    onGestionarPermisos: (user: User) => void; 
    onVerDetalles:(user:User) =>void;
}

export default function UserRow({ user, onEliminar, onEditar, onGestionarPermisos,onVerDetalles }: UserRowProps) {
    // Estado para el menú desplegable de los tres puntitos
    const [menuAbierto, setMenuAbierto] = useState(false);
    const formatearFecha = (fechaISO: string) => {
        if (!fechaISO) return "Nunca";
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <tr className="border-b hover:bg-gray-50 transition-colors relative">
            {/* Columna USUARIO */}
            <td className="p-4">
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-sm" style={{ backgroundColor: "#F0FDFA", color: "#0B2545" }}>
                        {user.iniciales}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>

            {/* Columna ROL / CARGO */}
            <td className="p-4 text-center">
                <div className="font-medium text-gray-800">{user.rol}</div>
                <div className="text-[10px] font-bold text-blue-500 uppercase italic">
                    {user.internalLevel}
                </div>
            </td>

            {/* Columna DEPARTAMENTO Y CARACTERÍSTICAS */}
            <td className="p-4 text-center">
                <div className="flex flex-col items-center gap-1">
                    <div className="px-3 py-1 rounded-lg bg-gray-200 text-black text-[11px] w-full max-w-[120px]">
                        {user.department}
                    </div>
                </div>
            </td>
            

            {/* Columna ESTADO */}
            <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.status === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                    {user.status === 'available' ? 'Disponible' : 'Inactivo'}
                </span>
            </td>

                {/* NUEVA COLUMNA: ÚLTIMO ACCESO (TIMESTAMP) */}
            <td className="p-4 text-center">
                <div className="text-[11px] text-gray-600 font-medium">
                    {formatearFecha(user.lastAccess)}
                </div>
            </td>
            
            {/* Columna ACCIÓN (Con Menú de 3 puntos) */}
            <td className="p-4 text-center relative">
                <div className="flex justify-center items-center gap-2">
                    {/* Botones principales rápidos */}
                    <button onClick={() => onEditar(user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full" title="Editar datos">
                       Editar ️
                    </button>
                    <button onClick={() => {onEliminar(user.id);setMenuAbierto(false);}} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full">
                        Borrar
                    </button>
                    {/* Botón de Tres Puntos */}
                    <div className="relative">
                        <button 
                            onClick={() => setMenuAbierto(!menuAbierto)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full font-bold"
                        >
                            ⋮
                        </button>

                        {/* Menú Desplegable (Dropdown) */}
                        {menuAbierto && (
                            <>
                                {/* Overlay para cerrar al hacer clic fuera */}
                                <div className="fixed inset-0 z-10" onClick={() => setMenuAbierto(false)}></div>
                                
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20 overflow-hidden text-left">
                                    <button 
                                        onClick={() => {
                                            onGestionarPermisos(user);
                                            setMenuAbierto(false);
                                        }}
                                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                                    >
                                        🔐 Gestionar Permisos
                                    </button>
                                    <button 
                                            onClick={() => {
                                                onVerDetalles(user); 
                                                setMenuAbierto(false);
                                            }}
                                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        👁️ Ver Detalle Completo
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}