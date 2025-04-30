const API_URL = "http://localhost:3001";

import { IngredientePrecio } from "@/interfaces";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  ingredientes?: IngredientePrecio[];
}

export const crearPedido = async (
  productos: ProductoCarrito[],
  recreo: "primer" | "segundo"
): Promise<number | null> => {
  const usuario_id = localStorage.getItem("userId");
  if (!usuario_id) throw new Error("Usuario no autenticado");

  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos, recreo, usuario_id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.pedidoId ?? null;
};

export const actualizarPedido = async (
  pedidoId: number,
  campos: { estado?: string; pagado?: boolean }
) => {
  const res = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campos),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar pedido");
  }
};

export const eliminarPedido = async (pedidoId: number): Promise<boolean> => {
  const res = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("❌ Error al eliminar pedido:", error);
    return false;
  }

  return true;
};

export const obtenerPedidosDelUsuario = async (usuarioId: string) => {
  const res = await fetch(
    `${API_URL}/pedidos?user_id=${usuarioId}&rol=cliente`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
