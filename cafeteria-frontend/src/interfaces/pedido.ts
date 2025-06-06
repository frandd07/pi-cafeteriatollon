export interface PedidoConUsuario {
  id: number;
  creado_en: string;
  total: number;
  usuarios: {
    nombre: string;
    apellido1: string;
    apellido2: string;
  };
  detalle_pedido: DetallePedidoHistorial[];
}

export interface DetalleIngredienteHistorial {
  precio_extra: number;
  ingredientes: {
    nombre: string;
  };
}

export interface DetallePedidoHistorial {
  id: number;
  cantidad: number;
  productos: {
    nombre: string;
  };
  detalle_ingrediente: DetalleIngredienteHistorial[];
}
