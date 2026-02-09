'use client';

import React from 'react';
import { User } from '../../types/user';

interface UserDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

export default function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
                
                {/* Cabecera Estilo Perfil */}
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                        ✕
                    </button>
                    <div className="absolute -bottom-12 left-8">
                        <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
                            <div className="h-full w-full rounded-xl flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: "#F0FDFA", color: "#0B2545" }}>
                                {user.iniciales}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido del Perfil */}
                <div className="pt-16 p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-blue-600 font-medium">{user.rol}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                            user.status === 'available' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                            {user.status === 'available' ? '• Disponible' : '• Inactivo'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                            <p className="text-sm text-gray-700 break-all">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Departamento</p>
                            <p className="text-sm text-gray-700">{user.department}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nivel Interno</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">
                                {user.internalLevel}
                            </span>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-100" />

                    {/* Sección de Características */}
                    <div className="mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sobre el Perfil</p>
                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                            {user.characteristics || "No hay descripción disponible para este usuario."}
                        </p>
                    </div>

                    {/* Sección de Permisos (Badges) */}
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Permisos de Sistema</p>
                        <div className="flex flex-wrap gap-2">
                            {user.permissions.length > 0 ? (
                                user.permissions.map((perm) => (
                                    <span key={perm} className="px-3 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-md shadow-sm uppercase">
                                        {perm}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-400 italic">Sin permisos asignados</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 flex justify-center">
                    <button 
                        onClick={onClose}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Cerrar Vista Detallada
                    </button>
                </div>
            </div>
        </div>
    );
}