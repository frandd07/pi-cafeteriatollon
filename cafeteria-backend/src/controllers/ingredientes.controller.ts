import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export const getIngredientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { data, error } = await supabase
    .from("ingredientes")
    .select("*")
    .eq("habilitado", true)
    .order("nombre");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
  return;
};

export const crearIngrediente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, precio_extra } = req.body;

  const { error } = await supabase
    .from("ingredientes")
    .insert([{ nombre, precio_extra }]);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json({ success: true });
  return;
};

export const actualizarIngrediente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { nombre, precio_extra } = req.body;

  const { error } = await supabase
    .from("ingredientes")
    .update({ nombre, precio_extra })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ success: true });
};

// Al principio del archivo, junto a tus otros exports:
export const eliminarIngrediente = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // Llamada a Supabase para borrar
  const { data, error } = await supabase
    .from("ingredientes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar ingrediente:", error);
    res.status(500).json({ mensaje: "No se pudo eliminar el ingrediente" });
    return;
  }

  res.status(200).json({ mensaje: "Ingrediente eliminado correctamente" });
};

export const getIngredientesPorProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productoId } = req.params;

  const { data, error } = await supabase
    .from("producto_ingrediente")
    .select(
      `
      ingrediente:ingredientes (
        id,
        nombre,
        precio_extra
      )
    `
    )
    .eq("producto_id", productoId);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // data viene como [{ ingrediente: { id, nombre, precio_extra } }, …]
  const ingredientes = data.map((row) => row.ingrediente);
  res.json(ingredientes);
};
