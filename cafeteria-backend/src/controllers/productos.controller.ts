import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("habilitado", true)
    .order("nombre", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
  return;
};

export const crearProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre, precio, imagen } = req.body;

  const { error } = await supabase
    .from("productos")
    .insert([{ nombre, precio, imagen }]);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json({ success: true });
  return;
};

export const toggleProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { habilitado } = req.body;

  const { error } = await supabase
    .from("productos")
    .update({ habilitado })
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ success: true });
  return;
};

export const getIngredientesProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("producto_ingrediente")
    .select(
      `
      ingrediente_id,
      precio_extra,
      ingredientes ( nombre )
    `
    )
    .eq("producto_id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
  return;
};

export const asignarIngredientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const ingredientes = req.body;

  // Eliminar asignaciones anteriores
  await supabase.from("producto_ingrediente").delete().eq("producto_id", id);

  if (ingredientes.length > 0) {
    const inserts = ingredientes.map((i: any) => ({
      producto_id: parseInt(id),
      ingrediente_id: i.id,
      precio_extra: parseFloat(i.precioExtra),
    }));

    const { error } = await supabase
      .from("producto_ingrediente")
      .insert(inserts);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  res.json({ success: true });
  return;
};

export const getProductosAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { data, error } = await supabase
    .from("productos")
    .select("*") // sin filtro por habilitado
    .order("nombre", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
};

// Añadir producto a favoritos
export const añadirAFavoritos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { usuario_id, producto_id } = req.body;

  const { error } = await supabase
    .from("favoritos")
    .insert([{ usuario_id, producto_id }]);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json({ success: true });
};

// Eliminar producto de favoritos
export const eliminarDeFavoritos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { usuario_id, producto_id } = req.body;

  const { error } = await supabase
    .from("favoritos")
    .delete()
    .eq("usuario_id", usuario_id)
    .eq("producto_id", producto_id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ success: true });
};

// Obtener productos favoritos de un usuario
export const obtenerFavoritosUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { usuario_id } = req.params;

  const { data, error } = await supabase
    .from("favoritos")
    .select("producto_id")
    .eq("usuario_id", usuario_id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
};

export const eliminarProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase.from("productos").delete().eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ success: true });
};
