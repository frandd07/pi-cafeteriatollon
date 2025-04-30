import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { obtenerPedidosDelUsuario, eliminarPedido } from "../services";

export const useMisPedidos = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const data = await obtenerPedidosDelUsuario(userId);
    setPedidos(data);
    setLoading(false);
  };

  const handleEliminarPedido = async (pedidoId: number) => {
    const success = await eliminarPedido(pedidoId); // ✅ ahora sí funciona
    if (success) {
      toast.success("🗑️ Pedido eliminado");
      fetchPedidos();
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
    eliminarPedido: handleEliminarPedido, // renombrado por claridad
  };
};
