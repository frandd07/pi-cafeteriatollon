import { useState, useEffect, useCallback } from "react";
import { fetchPedidosRecogidos } from "../services";
import type { PedidoConUsuario } from "@/interfaces";

export function useHistorialPedidos(
  startDate: string,
  endDate: string
): {
  pedidos: PedidoConUsuario[];
  total: number;
  loading: boolean;
  errorMsg: string | null;
  reload: () => void;
} {
  const [pedidos, setPedidos] = useState<PedidoConUsuario[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const from = `${startDate}T00:00:00`;
    const to = `${endDate}T23:59:59`;
    const { data, error } = await fetchPedidosRecogidos(from, to);

    if (error) {
      setErrorMsg(error);
      setPedidos([]);
      setTotal(0);
    } else {
      setPedidos(data);
      setTotal(data.reduce((sum, p) => sum + (p.total || 0), 0));
    }

    setLoading(false);
  }, [startDate, endDate]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { pedidos, total, loading, errorMsg, reload };
}
