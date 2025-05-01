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
