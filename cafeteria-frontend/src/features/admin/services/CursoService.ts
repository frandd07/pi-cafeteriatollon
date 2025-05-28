import { supabase } from "@/supabaseClient";

export async function iniciarNuevoCurso() {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/usuarios/iniciar-curso`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error al activar curso");
  }
}
