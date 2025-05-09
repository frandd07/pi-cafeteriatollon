import { Request, Response, NextFunction } from "express";
import { supabase } from "../services/supabaseClient";

export const esAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const { data: authData, error: authError } = await supabase.auth.getUser(
    token
  );

  if (authError || !authData.user) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  const userId = authData.user.id;
  const { data: usuario, error: usuarioError } = await supabase
    .from("usuarios")
    .select("tipo")
    .eq("id", userId)
    .single();

  if (usuarioError || !usuario || usuario.tipo !== "admin") {
    res.status(403).json({ error: "Acceso restringido a administradores" });
    return;
  }

  (req as any).user = authData.user;
  next();
};
