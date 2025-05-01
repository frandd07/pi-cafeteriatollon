export interface IngredientePrecio {
  id: number;
  nombre: string;
  precio_extra: number;
}

export interface Ingrediente {
  id: number;
  nombre: string;
}

export interface IngredienteAsignado {
  id: number;
  precioExtra: string;
}

export interface IngredientesModalProps {
  productoId: number;
  nombreProducto: string;
  isOpen: boolean;
  onClose: () => void;
}
