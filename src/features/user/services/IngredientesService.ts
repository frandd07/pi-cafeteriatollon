import { IngredientePrecio } from "@/interfaces";

const API_URL = "http://localhost:3001";

export const getIngredientesPorProducto = async (
  productoId: number
): Promise<IngredientePrecio[]> => {
  try {
    const res = await fetch(`${API_URL}/productos/${productoId}/ingredientes`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return data.map((item: any) => ({
      id: item.ingrediente_id,
      nombre: item.ingredientes?.nombre || "Sin nombre",
      precio_extra: parseFloat(item.precio_extra),
    }));
  } catch (error) {
    console.error("❌ Error al obtener ingredientes del producto:", error);
    return [];
  }
};
