import { supabase } from "@/supabaseClient";

export const añadirAFavoritos = async (
  usuarioId: string,
  productoId: number
) => {
  const { error } = await supabase
    .from("favoritos")
    .insert([{ usuario_id: usuarioId, producto_id: productoId }]);

  if (error) throw new Error(error.message);
};

export const eliminarDeFavoritos = async (
  usuarioId: string,
  productoId: number
) => {
  const { error } = await supabase
    .from("favoritos")
    .delete()
    .eq("usuario_id", usuarioId)
    .eq("producto_id", productoId);

  if (error) throw new Error(error.message);
};

export const obtenerFavoritos = async (usuarioId: string) => {
  const { data, error } = await supabase
    .from("favoritos")
    .select("producto_id")
    .eq("usuario_id", usuarioId);

  if (error) throw new Error(error.message);
  return data?.map((fav) => fav.producto_id) || [];
};
