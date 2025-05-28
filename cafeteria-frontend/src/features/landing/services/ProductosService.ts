import { Producto } from "@/interfaces";

export async function obtenerProductosAleatorios(): Promise<Producto[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");

  const data: Producto[] = await res.json();
  return data;
}
