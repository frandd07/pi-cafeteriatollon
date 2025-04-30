import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, ...userData } = req.body;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    res.status(400).json({ error: authError.message });
    return;
  }

  const userId = authData.user?.id;
  if (!userId) {
    res.status(400).json({ error: "No se obtuvo ID del usuario" });
    return;
  }

  const { error: insertError } = await supabase
    .from("usuarios")
    .insert([{ id: userId, email, ...userData }]);

  if (insertError) {
    res.status(400).json({ error: insertError.message });
    return;
  }

  res.status(201).json({ success: true });
  return;
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError) {
    res.status(401).json({ error: authError.message });
    return;
  }

  const user = authData.user;
  const { data: perfil, error: perfilError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if (perfilError) {
    res.status(400).json({ error: perfilError.message });
    return;
  }

  if (!perfil.verificado) {
    res.status(403).json({ error: "Cuenta no verificada" });
    return;
  }

  res.json({ user, perfil });
  return;
};
