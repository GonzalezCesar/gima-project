'use client';

import React, { useState, useEffect } from 'react';
import { User } from '../../types/user';

// Definimos la lista maestra de permisos (debe coincidir con tus tipos)
const LISTA_MAESTRA_PERMISOS = ['Lectura', 'Escritura', 'Eliminación', 'Exportación'];

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (userId: string, updatedPermissions: string[]) => void;
    user: User | null;
}

export default function PermissionModal({ isOpen, onClose, onSave, user }: PermissionModalProps) {
    // Estado local para manejar los permisos seleccionados en el modal
    const [permisosSeleccionados, setPermisosSeleccionados] = useState<string[]>([]);

    // Cada vez que se abre el modal con un usuario, cargamos sus permisos actuales
    useEffect(() => {
        if (user) {
            setPermisosSeleccionados(user.permissions || []);
        }
    }, [user, isOpen]);

    if (!isOpen || !user) return null;

    // Función para marcar/desmarcar
    const togglePermiso = (permiso: string) => {
        setPermisosSeleccionados(prev => 
            prev.includes(permiso) 
                ? prev.filter(p => p !== permiso) // Lo quita
                : [...prev, permiso]              // Lo agrega
        );
    };

    const handleSave = () => {
        onSave(user.id, permisosSeleccionados);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/* Cabecera */}
                <div className="bg-gray-50 p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        🔐 Permisos de Acceso
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        Configurando permisos para: <span className="font-semibold text-blue-600">{user.name}</span>
                    </p>
                </div>

                {/* Lista de Checkboxes */}
                <div className="p-6 space-y-3">
                    {LISTA_MAESTRA_PERMISOS.map((permiso) => (
                        <label 
                            key={permiso} 
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                permisosSeleccionados.includes(permiso) 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <span className="text-sm font-medium text-gray-700">{permiso}</span>
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                checked={permisosSeleccionados.includes(permiso)}
                                onChange={() => togglePermiso(permiso)}
                            />
                        </label>
                    ))}
                </div>

                {/* Acciones */}
                <div className="p-4 bg-gray-50 flex justify-end gap-2 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}