const API_URL = import.meta.env.VITE_API_URL;

export const aceptarUsuario = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id}/aceptar`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Error al aceptar usuario");
    return true;
  } catch (error) {
    console.error("❌", error);
    return false;
  }
};

export const rechazarUsuario = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id}/rechazar`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al rechazar usuario");
    return true;
  } catch (error) {
    console.error("❌", error);
    return false;
  }
};

export const getUsuariosFiltrados = async (
  tipo: "todos" | "alumno" | "profesor" | "personal"
) => {
  try {
    const res = await fetch(`${API_URL}/usuarios?tipo=${tipo}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("❌", error);
    return null;
  }
};

export const verificarUsuario = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/usuarios/${id}/verificar`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Error al verificar usuario");
    return true;
  } catch (error) {
    console.error("❌", error);
    return false;
  }
};

export const eliminarUsuario = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:3001/usuarios/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("DEBUG:", data); //log para ver el error real

    if (!res.ok) throw new Error(data.error || "Error al eliminar usuario");
    return true;
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    return false;
  }
};
