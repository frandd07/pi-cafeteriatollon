import { Request, Response } from "express";
import { supabase } from "../services/supabaseClient";

export const crearPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📥 Cuerpo recibido en crearPedido:", req.body);
    const { productos, recreo, usuario_id } = req.body;

    // Validar usuario_id
    if (!usuario_id) {
      res.status(400).json({ error: "usuario_id es obligatorio" });
      return;
    }

    const total = productos.reduce(
      (acc: number, p: any) => acc + p.precio * p.cantidad,
      0
    );

    // Insertar el pedido usando "usuario_id" tal cual está en la tabla
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([
        {
          usuario_id,
          total,
          recreo,
          estado: "pendiente",
          pagado: false,
        },
      ])
      .select()
      .single();

    if (pedidoError || !pedido) {
      res
        .status(500)
        .json({ error: pedidoError?.message || "Error al crear pedido" });
      return;
    }

    const pedidoId = pedido.id;

    // Insertar detalles
    for (const producto of productos) {
      const { data: detallePedido, error: detalleError } = await supabase
        .from("detalle_pedido")
        .insert([
          {
            pedido_id: pedidoId,
            producto_id: producto.id,
            cantidad: producto.cantidad,
            precio: producto.precio,
          },
        ])
        .select()
        .single();

      if (detalleError || !detallePedido) {
        res
          .status(500)
          .json({ error: detalleError?.message || "Error en detalle_pedido" });
        return;
      }

      // Ingredientes
      if (producto.ingredientes?.length) {
        const idsIngredientes = producto.ingredientes.map((ing: any) => ing.id);

        const { data: ingredientesDB, error: ingError } = await supabase
          .from("ingredientes")
          .select("id, precio_extra")
          .in("id", idsIngredientes);

        if (ingError) {
          res.status(500).json({ error: ingError.message });
          return;
        }

        const detalleIngredientes = producto.ingredientes.map((ing: any) => {
          const ingDB = ingredientesDB.find((i) => i.id === ing.id);
          return {
            detalle_pedido_id: detallePedido.id,
            ingrediente_id: ing.id,
            precio_extra: ingDB?.precio_extra ?? 0, // Fallback si no lo encuentra
          };
        });

        const { error: errorIng } = await supabase
          .from("detalle_ingrediente")
          .insert(detalleIngredientes);

        if (errorIng) {
          res.status(500).json({ error: errorIng.message });
          return;
        }
      }
    }

    // Devolver OK
    res.status(201).json({ success: true, pedidoId });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error general al crear pedido" });
    return;
  }
};

export const obtenerPedidos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rol, user_id } = req.query;
    console.log("📥 Obteniendo pedidos - user_id:", user_id, "| rol:", rol);

    let query = supabase
      .from("pedidos")
      .select(
        `
        id, creado_en, recreo, estado, pagado, total,
        usuarios ( nombre, apellido1, apellido2, tipo, curso ),
        detalle_pedido (
          id, producto_id, cantidad, precio,
          productos ( nombre ),
          detalle_ingrediente (
            ingrediente_id, precio_extra,
            ingredientes ( nombre )
          )
        )
      `
      )
      .order("creado_en", { ascending: false });

    if (rol !== "admin") {
      query = query.eq("usuario_id", user_id);
    }

    const { data, error } = await query;
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data);
    return;
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos" });
    return;
  }
};

export const actualizarPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const campos = req.body;

  try {
    const { error } = await supabase
      .from("pedidos")
      .update(campos)
      .eq("id", id);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ success: true });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar pedido" });
    return;
  }
};

export const eliminarPedido = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from("pedidos").delete().eq("id", id);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ success: true });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar pedido" });
    return;
  }
};
