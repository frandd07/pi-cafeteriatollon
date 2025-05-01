const API_URL = "http://localhost:3001"; // Cambiar en producción

export const eliminarProducto = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al eliminar producto");

    return true;
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    return false;
  }
};
