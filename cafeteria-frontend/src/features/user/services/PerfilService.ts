const API_URL = import.meta.env.VITE_API_URL;
import { PerfilData } from "@/interfaces";

// 1) Obtener perfil de un usuario por ID
export const obtenerPerfilUsuario = async (
  userId: string
): Promise<PerfilData> => {
  const res = await fetch(`${API_URL}/usuarios/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      // Si GET también requiere autenticación,
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar perfil`);
  }
  return (await res.json()) as PerfilData;
};

// 2) Actualizar el perfil de un usuario por ID
export const actualizarPerfilUsuario = async (
  userId: string,
  updates: Partial<PerfilData>
): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/usuarios/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status} al actualizar perfil`);
  }
};
