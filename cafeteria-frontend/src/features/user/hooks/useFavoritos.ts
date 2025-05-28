import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import toast from "react-hot-toast";

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      setLoading(true);
      const usuarioId = localStorage.getItem("userId");
      if (!usuarioId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("favoritos")
        .select("producto_id")
        .eq("usuario_id", usuarioId);

      if (error) {
        toast.error("Error al obtener favoritos");
      } else {
        setFavoritos(data.map((f) => f.producto_id));
      }
      setLoading(false);
    };

    fetchFavoritos();
  }, []);

  const toggleFavorito = async (productoId: number) => {
    const usuarioId = localStorage.getItem("userId");
    if (!usuarioId) {
      toast.error("Debes iniciar sesión para usar favoritos");
      return;
    }

    const yaEsFavorito = favoritos.includes(productoId);

    if (yaEsFavorito) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("usuario_id", usuarioId)
        .eq("producto_id", productoId);

      if (error) {
        toast.error("No se pudo eliminar de favoritos");
        return;
      }
      setFavoritos((prev) => prev.filter((id) => id !== productoId));
      toast.success("Eliminado de favoritos");
    } else {
      const { error } = await supabase
        .from("favoritos")
        .insert([{ usuario_id: usuarioId, producto_id: productoId }]);

      if (error) {
        toast.error("No se pudo añadir a favoritos");
        return;
      }
      setFavoritos((prev) => [...prev, productoId]);
      toast.success("Añadido a favoritos");
    }
  };

  const esFavorito = (productoId: number) => favoritos.includes(productoId);

  return { favoritos, toggleFavorito, esFavorito, loading };
};
