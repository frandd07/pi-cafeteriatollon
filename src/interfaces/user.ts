export interface User {
  id?: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  rol: "alumno" | "profesor/personal";
  curso?: string; // solo si el rol es 'alumno'
  created_at?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido1?: string;
  apellido2?: string;
  email: string;
  tipo: string;
  curso?: string;
  verificado: boolean;
  debe_actualizar_curso: boolean;
}

export interface PerfilData {
  curso: string;
  debe_actualizar_curso: boolean;
  nombre: string;
  apellido1: string;
  email: string;
  verificado: boolean;
}
