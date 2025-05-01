const API_URL = import.meta.env.VITE_API_URL;

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
