export type userEstado = 'active' | 'inactive' | 'available' | 'unavailable';
export type innerlevel = 'TÉCNICAS' | 'KPI/C' | 'OTRO';

export interface User {
    id: string;
    iniciales: string;
    name: string;
    email: string;
    rol: string;
    department: string;
    status: userEstado;
    hireDate: string;
    lastAccess: string;
    internalLevel: innerlevel;
    characteristics: string;
    permissions: string[];
    position?: string;
    userId?: string;
}

export type UserFormData = Omit<User, 'id' | 'lastAccess'>;