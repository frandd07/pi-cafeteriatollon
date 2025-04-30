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
  const { nombre } = req.body;

  const { error } = await supabase.from("ingredientes").insert({ nombre });
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json({ success: true });
  return;
};
