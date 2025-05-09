import { useState } from "react";
import { useCarrito } from "../context";
import { toast } from "react-hot-toast";
import { crearPedido } from "../services";
import type { Recreo, ProductoCarrito } from "@/interfaces";

export const useCarritoCliente = () => {
  const { carrito, quitarProducto, vaciarCarrito } = useCarrito();
  const [recreo, setRecreo] = useState<Recreo>("primer");
  const [loading, setLoading] = useState(false);

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const confirmarPedido = async () => {
    if (carrito.length === 0) {
      toast.error("Añade al menos un producto al carrito");
      return;
    }

    setLoading(true);
    try {
      const pedidoId = await crearPedido(carrito as ProductoCarrito[], recreo);
      // suponemos que crearPedido lanza si hay 400
      toast.success("✅ Pedido confirmado correctamente");
      vaciarCarrito();
      return pedidoId;
    } catch (err: any) {
      console.log("🛑 Error al crear pedido:", err.message);
      const msg = err.message || "";
      if (msg.includes("actualizar tu curso")) {
        toast.error("🚨 Debes actualizar tu curso antes de realizar pedidos");
      } else {
        toast.error(msg || "Error al confirmar pedido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    carrito,
    quitarProducto,
    vaciarCarrito,
    recreo,
    setRecreo,
    total,
    loading,
    confirmarPedido,
  };
};
