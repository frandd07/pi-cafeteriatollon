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
