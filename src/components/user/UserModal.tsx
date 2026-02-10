//UserModal muestra un formulario, recoge datos del usuario (crea y edita) y se envian a UserTable
'use client'; //NextJs, se ejecuta en el Navegador, dado al uso de React (useState, eventos, etc)

//Importamos las tecnolgias necesarias, junto con la Interfaz "User"
//State: Guarda datos en memoria
//Effect: Ejecuta codigo cuando algo cambia
import React, { useState, useEffect } from 'react';
import { User } from '../../types/user';

//Necesario para el uso de la Funcion UserModal
interface UserModalProps {
    isOpen: boolean;//Formulario se muestra o no
    onClose: () => void;//Formulario se cierra
    onSave: (user: any) => void; //Recibe los datos, se envian
    user: User | null;//Se Edita | Se Crea
}

//Funcion UserModal
export default function UserModal({ isOpen, onClose, onSave, user }: UserModalProps) {
    //Formulario, junto con setters
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Administrador');
    const [departamento, setDepartamento] = useState('Infraestructura');
    const [estado, setEstado] = useState<User['status']>('available');

    // Efecto para cargar datos cuando se edita (Editar)
    useEffect(() => {
        if (user) {
            setNombre(user.name);
            setEmail(user.email);
            setRol(user.rol);
            setDepartamento(user.department);
            setEstado(user.status);
        } else {
            // Resetear formulario para nuevo usuario (Crear)
            setNombre('');
            setEmail('');
            setRol('Administrador');
            setDepartamento('Infraestructura');
            setEstado('available');
        }
    }, [user, isOpen]); //Se ejecuta solo si User o isOpen se alteran

    //Si el Formulario se cierra, este deja de existir en la pagina
    if (!isOpen) return null;

    //Esta funcion recibe un evento del Formulario, no retorna nada
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Calcular iniciales automáticamente
        const iniciales = nombre
            .split(' ')
            .map(palabra => palabra[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        const nuevoUsuario = {
            nombre,
            email,
            rol,
            departamento,
            estado,
            iniciales,
        };

        onSave(nuevoUsuario);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {user ? 'Editar usuario' : 'Nuevo usuario'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Rol</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Desarrollador">Desarrollador</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Departamento</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                        >
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Laboratorios">Laboratorios</option>
                            <option value="Desarrollo">Desarrollo</option>
                            <option value="Soporte">Soporte</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finanzas">Finanzas</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Estado</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value as User['status'])}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {user ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}