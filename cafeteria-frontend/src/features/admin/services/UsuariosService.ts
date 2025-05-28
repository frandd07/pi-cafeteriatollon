import { Usuario } from "@/interfaces";
const API_URL = import.meta.env.VITE_API_URL;

// Obtener usuarios filtrados
export const getUsuariosFiltrados = async (
  tipo: "todos" | "alumno" | "profesor" | "personal"
): Promise<Usuario[] | null> => {
  const res = await fetch(`${API_URL}/usuarios?tipo=${tipo}`);
  if (!res.ok) {
    const err = await res.json();
    console.error("❌", err);
    return null;
  }
  return (await res.json()) as Usuario[];
};

// Verificar usuario (admin)
export const marcarUsuarioComoVerificado = async (
  id: string
): Promise<boolean> => {
  const res = await fetch(`${API_URL}/usuarios/${id}/verificar`, {
    method: "PATCH",
  });
  return res.ok;
};

// Aceptar usuario (admin)
export const aceptarUsuario = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/usuarios/${id}/aceptar`, {
    method: "PATCH",
  });
  return res.ok;
};

// Rechazar (eliminar) usuario (admin)
export const rechazarUsuario = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/usuarios/${id}/rechazar`, {
    method: "DELETE",
  });
  return res.ok;
};

// Borrar usuario
export const eliminarUsuario = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};

export const eliminarUsuariosMasivo = async (
  ids: string[]
): Promise<boolean> => {
  const token = localStorage.getItem("token"); // 🔐 Recupera el access_token

  const res = await fetch(`${API_URL}/usuarios/eliminar-masivo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("❌ Error al eliminar usuarios:", errorData);
  }

  return res.ok;
};
