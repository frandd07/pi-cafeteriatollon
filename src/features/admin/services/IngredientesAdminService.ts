const API_URL = import.meta.env.VITE_API_URL;

export interface Ingrediente {
  id: number;
  nombre: string;
}

export interface IngredienteAsignado {
  id: number;
  precioExtra: string;
}

// ✅ Obtener ingredientes habilitados
export const getIngredientesDisponibles = async (): Promise<Ingrediente[]> => {
  const res = await fetch(`${API_URL}/ingredientes`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al obtener ingredientes");
  return data;
};

// ✅ Obtener ingredientes asignados a un producto
export const getIngredientesAsignados = async (
  productoId: number
): Promise<IngredienteAsignado[]> => {
  const res = await fetch(`${API_URL}/productos/${productoId}/ingredientes`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al obtener asignados");

  return (data || []).map((item: any) => ({
    id: item.ingrediente_id,
    precioExtra: parseFloat(item.precio_extra).toFixed(2),
  }));
};

// ✅ Guardar ingredientes asignados a un producto
export const guardarIngredientesAsignados = async (
  productoId: number,
  seleccionados: IngredienteAsignado[]
): Promise<void> => {
  const res = await fetch(`${API_URL}/productos/${productoId}/ingredientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(seleccionados),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al guardar ingredientes");
};

// ✅ Crear nuevo ingrediente
export const crearNuevoIngrediente = async (nombre: string): Promise<void> => {
  const res = await fetch(`${API_URL}/ingredientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear ingrediente");
};
