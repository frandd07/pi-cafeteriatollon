import { useEffect, useState } from "react";
import {
  obtenerPedidosDelUsuario,
  eliminarPedido,
  crearPedido,
} from "../services";
import type { Recreo, ProductoCarrito } from "@/interfaces";

export const useMisPedidos = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    // 1️⃣ recuperar el userId
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setPedidos([]);
      setLoading(false);
      return;
    }

    // 2️⃣ cargar pedidos y ocultar los “recogidos”
    const data = await obtenerPedidosDelUsuario(userId);
    const visibles = data.filter((pedido: any) => pedido.estado !== "recogido");
    setPedidos(visibles);
    setLoading(false);
  };

  const handleEliminarPedido = async (pedidoId: number) => {
    const ok = await eliminarPedido(pedidoId);
    if (ok) await fetchPedidos();
  };

  const hacerPedido = async (
    productos: ProductoCarrito[],
    recreo: Recreo
  ): Promise<number> => {
    const usuario_id = localStorage.getItem("userId");
    if (!usuario_id) throw new Error("Usuario no autenticado");

    setLoading(true);
    try {
      // crearPedido lanza si recibe 400 de “debe actualizar curso”
      const pedidoId = await crearPedido(productos, recreo);
      await fetchPedidos();
      return pedidoId!;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
    const intervalo = setInterval(fetchPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return {
    pedidos,
    loading,
    eliminarPedido: handleEliminarPedido,
    hacerPedido, // lanza errores hacia el componente
  };
};
