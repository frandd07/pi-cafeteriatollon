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
}
