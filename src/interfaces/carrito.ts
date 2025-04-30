export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  ingredientes?: {
    id: number;
    nombre: string;
    precio_extra: number;
  }[];
}

export interface CarritoContextType {
  carrito: ProductoCarrito[];
  añadirProducto: (producto: ProductoCarrito) => void;
  quitarProducto: (id: number) => void;
  vaciarCarrito: () => void;
}
