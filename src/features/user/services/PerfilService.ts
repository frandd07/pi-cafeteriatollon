import { supabase } from "@/supabaseClient";

export const obtenerPerfilUsuario = async (userId: string) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("curso, debe_actualizar_curso, nombre, apellido1, email")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
