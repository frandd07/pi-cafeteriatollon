import { Request, Response, NextFunction } from "express";
import { supabase } from "../services/supabaseClient";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) return res.status(401).json({ error: "Token inválido" });

  (req as any).user = data.user;
  next();
};
