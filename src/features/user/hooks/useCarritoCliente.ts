import { useState } from "react";
import { useCarrito } from "../context";

import toast from "react-hot-toast";

import { crearPedido } from "../services";

export const useCarritoCliente = () => {
  const { carrito, quitarProducto, vaciarCarrito } = useCarrito();
  const [recreo, setRecreo] = useState<"primer" | "segundo">("primer");

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const confirmarPedido = async () => {
    const pedidoId = await crearPedido(carrito, recreo);
    if (!pedidoId) {
      toast.error("Error al confirmar pedido");
      return;
    }

    toast.success("Pedido confirmado correctamente");
    vaciarCarrito();
  };

  return {
    carrito,
    quitarProducto,
    vaciarCarrito,
    recreo,
    setRecreo,
    total,
    confirmarPedido,
  };
};
