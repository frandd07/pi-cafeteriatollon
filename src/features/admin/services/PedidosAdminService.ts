const API_URL = import.meta.env.VITE_API_URL;
import { PedidoConUsuario } from "@/interfaces";
import { supabase } from "@/supabaseClient";

// ✅ Obtener todos los pedidos (admin)
export const fetchPedidosDesdeSupabase = async () => {
  try {
    const res = await fetch(`${API_URL}/pedidos?rol=admin`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("❌ Error al cargar pedidos:", error);
    return [];
  }
};

export async function fetchPedidosRecogidos(
  from: string,
  to: string
): Promise<{ data: PedidoConUsuario[]; error: string | null }> {
  // Ejecutamos la consulta
  const { data, error } = await supabase
    .from("pedidos")
    .select("id, creado_en, total, usuarios (nombre, apellido1, apellido2)")
    .eq("estado", "recogido")
    .gte("creado_en", from)
    .lte("creado_en", to)
    .order("creado_en", { ascending: false });

  // Convertimos posibles null/undefined en array vacío
  const rawData: any[] = data ?? [];

  if (error) {
    console.error("Error al cargar historial:", error);
    return { data: [], error: error.message };
  }

  // Formateamos resultados
  const pedidosFormateados: PedidoConUsuario[] = rawData.map((p: any) => ({
    id: p.id,
    creado_en: p.creado_en,
    total: p.total,
    usuarios:
      Array.isArray(p.usuarios) && p.usuarios[0]
        ? p.usuarios[0]
        : { nombre: "", apellido1: "", apellido2: "" },
  }));

  return { data: pedidosFormateados, error: null };
}
