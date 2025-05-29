import { User } from "@/interfaces/user";

interface RegisterPayload extends User {
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;

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
import { supabase } from "@/supabaseClient";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("not confirmed") || msg.includes("confirm")) {
        throw new Error(
          "Debes verificar tu cuenta. Revisa tu correo y haz clic en el enlace de confirmación."
        );
      }
      throw new Error("Correo o contraseña incorrectos.");
    }

    if (!data.session || !data.user) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    // 🚀 Obtenemos el perfil desde la tabla usuarios
    const { data: perfil, error: perfilError } = await supabase
      .from("usuarios")
      .select("id, tipo, verificado") // Asegúrate de traer el campo verificado
      .eq("id", data.user.id)
      .single();

    if (perfilError || !perfil) {
      throw new Error("No se pudo obtener el perfil del usuario");
    }

    // ❌ Si no está verificado por el admin, bloqueamos el acceso
    if (!perfil.verificado) {
      throw new Error(
        "Tu cuenta aún no ha sido verificada por un administrador."
      );
    }

    // 💾 Guardamos datos en localStorage
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("rol", perfil.tipo);
    localStorage.setItem("token", data.session.access_token);

    return {
      data: {
        user: data.user,
        perfil,
      },
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Limpia localStorage si estás usando valores ahí también
    localStorage.removeItem("userId");
    localStorage.removeItem("rol");

    console.log("Sesión cerrada correctamente");
    return { success: true };
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error.message);
    return { error: error.message };
  }
};
