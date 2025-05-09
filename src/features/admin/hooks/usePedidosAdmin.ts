import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// ✅ Funciones específicas del admin
import { fetchPedidosDesdeSupabase } from "../services";

// ✅ Funciones generales del módulo pedidos
import { actualizarPedido, eliminarPedido } from "@/features/user";

export const usePedidosAdmin = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ultimoTotal, setUltimoTotal] = useState(0);
  const [filtro, setFiltro] = useState<string>("todos");
  const [filtroNombre, setFiltroNombre] = useState<string>("");
  const [filtroId, setFiltroId] = useState<string>("");

  const fetchPedidos = async () => {
    const data = await fetchPedidosDesdeSupabase();
    if (!data) return;

    const pedidosVisibles = data.filter(
      (pedido: any) =>
        pedido.estado !== "rechazado" && pedido.estado !== "recogido"
    );

    if (pedidosVisibles.length > ultimoTotal && ultimoTotal !== 0) {
      toast.success("🛎️ ¡Nuevo pedido recibido!");
    }

    setUltimoTotal(pedidosVisibles.length);
    setPedidos(pedidosVisibles);
    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
    const intervalo = setInterval(fetchPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const actualizarEstado = async (pedidoId: number, nuevoEstado: string) => {
    await actualizarPedido(pedidoId, { estado: nuevoEstado });
    fetchPedidos();
  };

  const togglePagado = async (pedido: any) => {
    if (pedido.estado !== "aceptado") {
      toast.error("El pedido debe ser aceptado antes de marcarlo como pagado.");
      return;
    }
    await actualizarPedido(pedido.id, { pagado: !pedido.pagado });
    fetchPedidos();
  };

  const estados = ["todos", "pendiente", "aceptado", "listo"];

  const pedidosFiltradosPorEstado =
    filtro === "todos"
      ? pedidos
      : pedidos.filter((pedido) => pedido.estado === filtro);

  const pedidosFiltrados = pedidosFiltradosPorEstado.filter((pedido) => {
    const nombreCompleto = `${pedido.usuarios?.nombre || ""} ${
      pedido.usuarios?.apellido1 || ""
    } ${pedido.usuarios?.apellido2 || ""}`.toLowerCase();

    const coincideNombre = nombreCompleto.includes(filtroNombre.toLowerCase());
    const coincideId = pedido.id.toString().includes(filtroId);

    return coincideNombre && coincideId;
  });

  return {
    pedidosFiltrados,
    pedidos,
    loading,
    filtro,
    setFiltro,
    filtroNombre,
    setFiltroNombre,
    filtroId,
    setFiltroId,
    actualizarEstado,
    togglePagado,
    estados,
  };
};
