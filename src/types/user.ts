export type UserEstado = 'available' | 'unavailable' | 'active' | 'inactive';

//Nuevos campos Departamento , Rol , Nivel Interno, Permisos y caracteristicas 
export type InternalLevel = 'Director ejecutivo' | 'Presidente' | 'Vicepresidente'| 'Líder de departamento'| 'Asistente'| 'Supervisor' | 'Operativos'| 'Administrador'| 'Tecnico'; 
export type Departamento = 'Sistemas'  | 'Recursos Humanos'  | 'Finanzas'| 'Ventas' | 'Operaciones' | 'Mantenimiento'| 'Laboratorio' | 'Marketing';
export type Rol =  'Ingeniero' | 'Analista'  | 'Especialista' | 'Consultor' | 'Contador' | 'Desarrollador'  | 'Médico'  | 'Recepcionista';
export type Permission = 'Lectura' | 'Escritura' | 'Eliminación' | 'Exportación';

export const ALL_PERMISSIONS: Permission[] = ['Lectura', 'Escritura', 'Eliminación', 'Exportación'];

export interface User {
    id: string;
    iniciales: string;
    name: string;
    email: string;
    rol: Rol;
    department: Departamento;
    status: UserEstado;
    internalLevel: InternalLevel; 
    characteristics: string;
    permissions: string[];
    lastAccess: string;
    createdAt: string;
}