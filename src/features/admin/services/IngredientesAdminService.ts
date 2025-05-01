// src/services/ingredientesAdminService.ts
import { Ingrediente } from "@/interfaces";
const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los ingredientes habilitados
export const getIngredientesDisponibles = async (): Promise<Ingrediente[]> => {
  const res = await fetch(`${API_URL}/ingredientes`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Error al obtener ingredientes");
  }
  return data as Ingrediente[];
};

// Obtener los ingredientes asignados a un producto
export async function getIngredientesAsignados(productoId: number) {
  const res = await fetch(`${API_URL}/productos/${productoId}/ingredientes`);
  if (!res.ok) throw new Error("Error cargando ingredientes asignados");
  const data = (await res.json()) as Array<{
    ingrediente_id: number;
    ingredientes: { nombre: string; precio_extra: number };
  }>;
  return data.map((item) => ({
    ingrediente_id: item.ingrediente_id,
    precio_extra: item.ingredientes.precio_extra,
  }));
}

// Guardar (POST) las asignaciones de ingredientes de un producto
export const guardarIngredientesAsignados = async (
  productoId: number,
  asignaciones: { ingrediente_id: number; precio_extra?: number }[]
): Promise<void> => {
  const res = await fetch(`${API_URL}/productos/${productoId}/ingredientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asignaciones),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Error al guardar ingredientes asignados");
  }
};

// Crear un nuevo ingrediente
export const crearNuevoIngrediente = async (ingrediente: {
  nombre: string;
  precio_extra: number;
}): Promise<void> => {
  const res = await fetch(`${API_URL}/ingredientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingrediente),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear ingrediente");
  }
};

// Actualizar un ingrediente existente (PATCH)
export const actualizarIngrediente = async (
  id: number,
  updates: Partial<Pick<Ingrediente, "nombre" | "precio_extra">>
): Promise<void> => {
  const res = await fetch(`${API_URL}/ingredientes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Error al actualizar ingrediente");
  }
};

export async function deleteIngrediente(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/ingredientes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const { mensaje } = await res.json();
    throw new Error(mensaje || "Error eliminando ingrediente");
  }
}
