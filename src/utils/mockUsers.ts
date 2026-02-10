import { User } from '../types/user';

export type Permission = 'Lectura' | 'Escritura' | 'Eliminación' | 'Exportación';

export const ALL_PERMISSIONS: Permission[] = ['Lectura', 'Escritura', 'Eliminación', 'Exportación'];

export const mockUsers: User[] = [
    {
        id: '1',
        iniciales: 'FC',
        name: 'Frank Chacon',
        email: 'frankManuel1991@gmail.com',
        rol: 'Ingeniero',
        department: 'Sistemas',
        status: 'unavailable',
        internalLevel: 'Administrador',
        characteristics: 'Experto en arquitectura frontend y liderazgo de equipos técnicos.',
        permissions: ['Lectura', 'Escritura', 'Eliminación', 'Exportación'],
        createdAt: '2024-05-10T14:20:00Z', // Ingresó hace tiempo
        lastAccess: '2026-02-09T09:30:00Z' 
    },
    {
        id: '2',
        iniciales: 'NE',
        name: 'Nour Ehab',
        email: 'NourEhab19@gmail.com',
        rol: 'Médico',
        department: 'Laboratorio',
        status: 'available',
        internalLevel: 'Tecnico',
        characteristics: 'Especialista en gestión hospitalaria y análisis de datos clínicos.',
        permissions: ['Lectura', 'Exportación'],
        createdAt: '2025-01-20T11:00:00Z',
        lastAccess: '2026-02-08T18:15:00Z'
    },
    {
        id: '3',
        iniciales: 'YD',
        name: 'Yasmin dos Santos',
        email: 'Yasmin2Santos@gmail.com',
        rol: 'Consultor',
        department: 'Recursos Humanos',
        status: 'unavailable',
        internalLevel: 'Asistente',
        characteristics: 'Enfoque en capacitación interna y bienestar organizacional.',
        permissions: ['Lectura'],
        createdAt: '2025-08-15T09:45:00Z',
        lastAccess: '2026-02-06T10:00:00Z'
    },
    {
        id: '4',
        iniciales: 'VC',
        name: 'Valeria Castro',
        email: 'ValeriaCastro@gmail.com',
        rol: 'Médico',
        department: 'Mantenimiento',
        status: 'available',
        internalLevel: 'Supervisor',
        characteristics: 'Supervisión de protocolos médicos y seguridad en planta.',
        permissions: ['Lectura', 'Escritura'],
        createdAt: '2026-01-05T08:30:00Z', // Reciente
        lastAccess: '2026-02-09T12:00:00Z'
    }
];