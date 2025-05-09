export interface PedidoConUsuario {
  id: number;
  creado_en: string;
  total: number;
  usuarios: {
    nombre: string;
    apellido1: string;
    apellido2: string;
  };
}
