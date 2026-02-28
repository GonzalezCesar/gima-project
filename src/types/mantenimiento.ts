// types/mantenimiento.ts
export type OrdenEstado = 'pendiente' | 'en-proceso' | 'completada' | 'cancelada';
export type Prioridad = 'baja' | 'media' | 'alta';
export type TipoMantenimiento = 'correctivo' | 'preventivo';

export interface Orden {
  id: string;
  activo: string;
  tecnicoId: string; // Relación con el ID del técnico
  tecnicoNombre: string;
  prioridad: Prioridad;
  estado: OrdenEstado;
  tipo: TipoMantenimiento;
  fecha: string;
  fechaCulminacion: string;
}