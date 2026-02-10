
'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { mockUsers } from '@/utils/mockUsers';
import UserRow from './UserRow';
import UserModal from './UserModal'; 
import UserDetailModal from './UserDetailModal';
import PermissionModal from './PermissionModal';

export default function UserTable() {
    // 1. ESTADO: Guardar la lista de usuarios
    const [users, setUsers] = useState<User[]>(mockUsers);

    // 2. ESTADO: Guardar el texto de búsqueda
    const [busqueda, setBusqueda] = useState('');

    // 3. ESTADO: Controlar modal (AGREGAR)
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);
    const [isPermodalOpen, setIsPermodalOpen] = useState(false)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    // 4. FUNCIÓN: Eliminar usuario por ID
    const eliminarUsuario = (id: string) => {
        const nuevosUsuarios = users.filter(user => user.id !== id);
        setUsers(nuevosUsuarios);
    };

    // 5. FUNCIÓN: Abrir modal para nuevo usuario (AGREGAR)
    const abrirModalNuevo = () => {
        setUsuarioEditando(null);
        setModalAbierto(true);
    };

    // 6. FUNCIÓN: Abrir modal para editar usuario (AGREGAR)
    const abrirModalEditar = (user: User) => {
        setUsuarioEditando(user);
        setModalAbierto(true);
    };
    const abrirModalPermissions = (user: User) => {
        setUsuarioEditando(user);
        setIsPermodalOpen(true);
    };
    const abrirModalDetails = (user: User) => { // 3. Función para detalles
        setUsuarioEditando(user);
        setIsDetailModalOpen(true);
    };
    // 7. FUNCIÓN: Cerrar modal (AGREGAR)
    const cerrarModal = () => {
        setModalAbierto(false);
        setUsuarioEditando(null);
    };

    // 8. FUNCIÓN: Guardar usuario (AGREGAR)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const guardarUsuario = (userData: any) => {
        if (usuarioEditando) {
            // Modo edición: actualizar usuario existente
            setUsers(users.map(u =>
                u.id === usuarioEditando.id
                    ? { ...userData, id: usuarioEditando.id }
                    : u
            ));
        } else {
            // Modo creación: agregar nuevo usuario
            const nuevoUsuario: User = {
                ...userData,
                id: Date.now().toString(), // ID temporal
            };
            setUsers([...users, nuevoUsuario]);
        }
        cerrarModal();
    };


    // 9. FILTRAR usuarios según búsqueda (CORREGIR nombres de propiedades)
    const usuariosFiltrados = users.filter(user =>
        user.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.department.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (

        <div className="bg-gray-50">
            <div className="p-6">
               {/*Titulo */}
                <div className="flex flex-col gap-4 mb-10">
                    

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                           <button 
                        onClick={() => window.history.back()} 
                        className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all w-fit"
                    >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm group-hover:bg-blue-50 transition-colors">
                            ←
                        </span>
                    </button>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                Gestión de Usuarios
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm ml-12">
                            Monitoreo de actividad, permisos y perfiles administrativos.
                        </p>
                    </div>
                </div>
                

                {/* Barra de búsqueda y botón */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        {/* Icono de lupa (pueden instalar lucide-react después) */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            🔍
                        </div>
                    </div>

                    <button
                        onClick={abrirModalNuevo} // Agregar onClick aquí
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nuevo usuario
                    </button>
                </div>

                {/* Tabla de usuarios */}
                <div className="bg-white rounded-lg border border-gray-200 ">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: "#F0FDFA" }}>
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                USUARIO
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold  uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                ROL/CARGO
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold  uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                DEPARTAMENTO
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                ESTADO
                            </th>
                              <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                Último Acceso
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold  uppercase tracking-wider" style={{ color: "#0B2545" }}>
                                ACCIÓN
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {usuariosFiltrados.map(user => (
                            <UserRow
                                key={user.id}
                                user={user}
                                onEliminar={eliminarUsuario}
                                onEditar={abrirModalEditar} 
                                onGestionarPermisos={abrirModalPermissions}
                                onVerDetalles={abrirModalDetails}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>

                <UserModal
                    isOpen={modalAbierto}
                    onClose={cerrarModal}
                    onSave={guardarUsuario}
                    user={usuarioEditando}
                />
                <PermissionModal 
                    isOpen={isPermodalOpen}
                    user={usuarioEditando}
                    onClose={() => setIsPermodalOpen(false)}
                    onSave={(userId, newPerms) => {setUsers(prevUsers => 
                                        prevUsers.map(u => 
                                            u.id === userId 
                                                ? { ...u, permissions: newPerms }: u));
                                console.log("Permisos actualizados para el usuario:", userId, newPerms);
                            }}
                    />
                    <UserDetailModal 
                        isOpen={isDetailModalOpen}
                        user={usuarioEditando}
                        onClose={() => setIsDetailModalOpen(false)}
                    />
            </div>
        </div>
    );
}