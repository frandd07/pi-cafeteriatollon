export interface IngredientePrecio {
  id: number;
  nombre: string;
  precio_extra: number;
}

export interface Ingrediente {
  id: number;
  nombre: string;
  precio_extra: number;
}

export interface IngredientesModalProps {
  productoId: number;
  nombreProducto: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IngredienteAsignado {
  ingrediente_id: number;
  precio_extra: number;
}
