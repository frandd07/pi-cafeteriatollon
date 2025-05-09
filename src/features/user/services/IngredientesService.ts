import { IngredientePrecio } from "@/interfaces";

const API_URL = import.meta.env.VITE_API_URL;

export const getIngredientes = async (): Promise<IngredientePrecio[]> => {
  try {
    const res = await fetch(`${API_URL}/ingredientes`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return data.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      precio_extra: parseFloat(item.precio_extra),
    }));
  } catch (error) {
    console.error("❌ Error al obtener ingredientes:", error);
    return [];
  }
};

export const getIngredientesPorProducto = async (
  productoId: number
): Promise<IngredientePrecio[]> => {
  const res = await fetch(`${API_URL}/ingredientes/producto/${productoId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.map((i: any) => ({
    id: i.id,
    nombre: i.nombre,
    precio_extra: parseFloat(i.precio_extra),
  }));
};
