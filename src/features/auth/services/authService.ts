import { User } from "@/interfaces/user";

interface RegisterPayload extends User {
  password: string;
}

const API_URL = "http://localhost:3001";

// 🔐 Registro
export const registerUser = async (payload: RegisterPayload) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

// 🔓 Login + obtener perfil
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    // Guardar datos en localStorage
    if (data?.perfil?.id && data?.perfil?.tipo) {
      localStorage.setItem("userId", data.perfil.id);
      localStorage.setItem("rol", data.perfil.tipo);
      console.log("Login exitoso. userId guardado:", data.perfil.id);
    } else {
      console.error("El backend no devolvió un perfil correcto:", data);
    }

    return {
      data: {
        user: data.user,
        perfil: data.perfil,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
