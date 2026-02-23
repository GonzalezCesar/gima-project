'use client';

import React, { useState, useEffect } from 'react';
import { User, UserEstado, InternalLevel, Rol, Departamento } from '../../types/user';
import {inspect} from "util";
import colors = module

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: any) => void;
    user: User | null;
}

// Listas extraídas de tus tipos para llenar los Selects
const LISTA_ROLES: Rol[] = ['Ingeniero', 'Analista', 'Especialista', 'Consultor', 'Contador', 'Desarrollador', 'Médico', 'Recepcionista'];
const LISTA_DEPARTAMENTOS: Departamento[] = ['Sistemas', 'Recursos Humanos', 'Finanzas', 'Ventas', 'Operaciones', 'Mantenimiento', 'Laboratorio', 'Marketing'];
const LISTA_NIVELES: InternalLevel[] = ['Director ejecutivo', 'Presidente', 'Vicepresidente', 'Líder de departamento', 'Asistente', 'Supervisor', 'Operativos', 'Administrador', 'Tecnico'];

const NIVELES_SEGURIDAD = {
    'Nivel 1': ['Lectura'],
    'Nivel 2': ['Lectura', 'Escritura'],
    'Nivel 3': ['Lectura', 'Escritura', 'Exportación'],
    'Nivel 4': ['Lectura', 'Escritura', 'Exportación', 'Eliminación'],
};

export default function UserModal({ isOpen, onClose, onSave, user }: UserModalProps) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState<Rol>('Ingeniero');
    const [departamento, setDepartamento] = useState<Departamento>('Sistemas');
    const [estado, setEstado] = useState<UserEstado>('available');
    const [nivelInterno, setNivelInterno] = useState<InternalLevel>('Operativos');
    const [nivelSeguridad, setNivelSeguridad] = useState('Nivel 1');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});

    useEffect(() => {
        if (user) {
            setNombre(user.name);
            setEmail(user.email);
            setRol(user.rol);
            setDepartamento(user.department);
            setEstado(user.status);
            setNivelInterno(user.internalLevel);
            setCaracteristicas(user.characteristics);
            if (user.permissions.length >= 4) setNivelSeguridad('Nivel 4');
            else if (user.permissions.length === 3) setNivelSeguridad('Nivel 3');
            else if (user.permissions.length === 2) setNivelSeguridad('Nivel 2');
            else setNivelSeguridad('Nivel 1');
        } else {
            setNombre('');
            setEmail('');
            setRol('Ingeniero');
            setDepartamento('Sistemas');
            setEstado('available');
            setNivelInterno('Operativos');
            setNivelSeguridad('Nivel 1');
            setCaracteristicas('');
            setErrores({});
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const generarIDUnico = (prefijo: string = 'USR'): string => {
        const timestamp = Date.now().toString(36); 
        const aleatorio = Math.random().toString(36).substring(2, 7).toUpperCase();
        return `${prefijo}-${timestamp}-${aleatorio}`;
    };
    const validarDatos = () => {
        const nuevosErrores: { nombre?: string; email?: string } = {};
        
        // 1. Validar Nombre (mínimo 3 letras, solo letras y espacios)
        const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
        if (!nombreRegex.test(nombre.trim())) {
            nuevosErrores.nombre = "Nombre inválido (3-40 letras, sin números)";
        }

        // 2. Validar Email (formato estándar)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            nuevosErrores.email = "Ingrese un correo electrónico válido";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const esValido = validarDatos(); 

    if (!esValido) return; 
    const ahora = new Date().toISOString();
    const nombreLimpio = nombre.trim();
    const iniciales = nombreLimpio.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);

    onSave({
        id: user?.id || generarIDUnico('USR'),
        iniciales,
        name: nombreLimpio,
        email: email.trim().toLowerCase(),
        rol,
        department: departamento,
        status: estado,
        internalLevel: nivelInterno,
        characteristics: caracteristicas,
        permissions: NIVELES_SEGURIDAD[nivelSeguridad as keyof typeof NIVELES_SEGURIDAD],
        
        createdAt: user?.createdAt || ahora, 
        lastAccess: ahora, 
    });

    onClose();
};

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border-2 " style={{borderColor: "#0B2545"}}>
                <div className=" p-6 border-b-2" style={{backgroundColor: "#0066FF", borderColor: "#0B2545"}}>
                    <h2 className=" font-bold text-white gap-2 text-center" style={{fontSize: '30px'}}>
                        {user ? ' Editar Perfil' : ' Crear Nuevo Usuario'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campos de Texto */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre Completo</label>
                                <input type="text" className="font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none duration-300  hover:border-blue-400 hover:bg-white " value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            {errores.nombre && <p className="text-[10px] text-red-500 mt-1 font-bold">{errores.nombre}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Corporativo</label>
                                <input type="email" className="font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none duration-300  hover:border-blue-400 hover:bg-white " value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {errores.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errores.email}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Departamento</label>
                                <select className=" font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none duration-300  hover:border-blue-400 hover:bg-white " value={departamento} onChange={(e) => setDepartamento(e.target.value as Departamento)}>
                                    {LISTA_DEPARTAMENTOS.map(d => <option key={d} value={d}  className="font-medium">{d}</option>)}
                                </select>
                            </div>
                            
                        </div>

                        {/* Menus Desplegables Dinámicos */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cargo (Rol)</label>
                                <select className="appearance-none font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300  hover:border-blue-400 hover:bg-white " value={rol} onChange={(e) => setRol(e.target.value as Rol)}>
                                    {LISTA_ROLES.map(r => <option key={r} value={r} className="font-medium">{r}</option>)}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nivel Interno</label>
                                <select className="appearance-none font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300  hover:border-blue-400 hover:bg-white " value={nivelInterno} onChange={(e) => setNivelInterno(e.target.value as InternalLevel)}>
                                    {LISTA_NIVELES.map(n => <option key={n} value={n} className="font-medium">{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estado</label>
                                <select className="appearance-none font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300  hover:border-blue-400 hover:bg-white " value={estado} onChange={(e) => setEstado(e.target.value as UserEstado)}>
                                    <option value="available" className="text-green-600 font-medium"> Disponible</option>
                                    <option value="unavailable" className="text-red-600 font-medium"> No disponible</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Nivel de Seguridad con Estilo Diferente */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Seguridad y Permisos</label>
                        <select className="appearance-none w-full px-4 py-2 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-blue-700 transition-all duration-300  hover:border-blue-400 hover:bg-white" value={nivelSeguridad} onChange={(e) => setNivelSeguridad(e.target.value)}>
                            <option value="Nivel 1" className="font-medium">Nivel 1 (Básico)</option>
                            <option value="Nivel 2" className="font-medium">Nivel 2 (Intermedio)</option>
                            <option value="Nivel 3" className="font-medium">Nivel 3 (Avanzado)</option>
                            <option value="Nivel 4" className="font-medium">Nivel 4 (Administrador Total)</option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Características / Notas</label>
                        <textarea className="font-medium w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300  hover:border-blue-400 hover:bg-white" rows={2} value={caracteristicas} onChange={(e) => setCaracteristicas(e.target.value)} />
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="px-10 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                            {user ? 'Guardar Cambios' : 'Crear Usuario'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}