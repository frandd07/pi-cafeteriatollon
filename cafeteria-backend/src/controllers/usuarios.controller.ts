import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

// Obtener usuarios
export const getUsuarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tipo } = req.query;
  let query = supabase
    .from("usuarios")
    .select("id, nombre, apellido1, apellido2, email, tipo, curso, verificado")
    .neq("tipo", "admin");

  if (tipo && tipo !== "todos") {
    query = query.eq("tipo", tipo);
  }

  const { data, error } = await query.order("nombre", { ascending: true });
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
  return;
};

export const verificarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { error } = await supabase
    .from("usuarios")
    .update({ verificado: true })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ success: true });
  return;
};

export const aceptarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { error } = await supabase
    .from("usuarios")
    .update({ aceptado: true, verificado: true })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ success: true });
  return;
};

export const rechazarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { error } = await supabase.from("usuarios").delete().eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ success: true });
  return;
};

// Eliminar usuario
export const eliminarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // 1. Borrar de Supabase Auth directamente
  const { error: authError } = await supabase.auth.admin.deleteUser(id);
  if (authError) {
    console.error("Error al eliminar en Auth:", authError.message);
    res.status(500).json({ error: "Error al eliminar en Auth" });
    return;
  }

  // 2. Borrar de la tabla 'usuarios' (el id es el mismo UUID)
  const { error: deleteError } = await supabase
    .from("usuarios")
    .delete()
    .eq("id", id);

  if (deleteError) {
    res.status(500).json({ error: "Error al eliminar de la tabla usuarios" });
    return;
  }

  res.status(200).json({ success: true });
};
