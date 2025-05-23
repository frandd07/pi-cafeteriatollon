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
    .select(
      "id, nombre, apellido1, apellido2, email, tipo, curso, verificado,debe_actualizar_curso"
    )
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

// Iniciar nuevo curso escolar
export const iniciarNuevoCursoEscolar = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = await supabase
    .from("usuarios")
    .update({
      debe_actualizar_curso: true,
    })
    .eq("tipo", "alumno");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ success: true });
};

// Eliminar múltiples usuarios
export const eliminarUsuariosMasivo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("📦 Body recibido en eliminar-masivo:", req.body);
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    res
      .status(400)
      .json({ error: "Se requiere un array de IDs para eliminar." });
    return;
  }

  // 1. Eliminar de Supabase Auth
  for (const id of ids) {
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) {
      console.error(
        `Error al eliminar usuario ${id} en Auth:`,
        authError.message
      );
    }
  }

  // 2. Eliminar de la tabla 'usuarios'
  const { error } = await supabase.from("usuarios").delete().in("id", ids);

  if (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar usuarios en la base de datos." });
    return;
  }

  res.status(200).json({ success: true });
};

export const actualizarUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  const { error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ success: true });
};

export const getUsuarioPorId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("usuarios")
    .select(
      "id, nombre, apellido1, apellido2, email, tipo, curso, verificado, debe_actualizar_curso"
    )
    .eq("id", id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  if (!data) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  res.status(200).json(data);
};
