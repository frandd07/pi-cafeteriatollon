import { Usuario } from "../hooks";

const API_URL = "http://localhost:3001"; // Cambia en producción

// ✅ Obtener usuarios filtrados por tipo
export const getUsuariosFiltrados = async (
  tipo: "todos" | "alumno" | "profesor" | "personal"
): Promise<Usuario[] | null> => {
  try {
    const res = await fetch(`${API_URL}/usuarios?tipo=${tipo}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);
    return data as Usuario[];
  } catch (error) {
    console.error("❌ Error en getUsuariosFiltrados:", error);
    return null;
  }
};

// ✅ Verificar usuario (por parte del admin)
export const marcarUsuarioComoVerificado = async (
  id: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id}/verificar`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Error al verificar usuario");
    return true;
  } catch (error) {
    console.error("❌ Error al verificar usuario:", error);
    return false;
  }
};
