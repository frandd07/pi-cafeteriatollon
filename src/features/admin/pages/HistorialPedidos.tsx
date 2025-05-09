"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Spinner } from "@/components/Spinner";
import type { PedidoConUsuario } from "@/interfaces";

const HistorialPedidos: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [pedidos, setPedidos] = useState<PedidoConUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchHistorial = async () => {
    setLoading(true);
    setErrorMsg(null);

    const from = `${startDate}T00:00:00`;
    const to = `${endDate}T23:59:59`;

    // Solo pedidos con estado "recogido"
    const response = await supabase
      .from("pedidos")
      .select("id, creado_en, total, usuarios (nombre, apellido1, apellido2)")
      .eq("estado", "recogido")
      .gte("creado_en", from)
      .lte("creado_en", to)
      .order("creado_en", { ascending: false });

    const rawData = response.data ?? [];
    const error = response.error;

    if (error) {
      console.error("Error al cargar historial:", error);
      setErrorMsg(error.message);
      setPedidos([]);
      setTotal(0);
    } else {
      // Convertimos usuarios: [...] → objeto único
      const pedidosFormateados: PedidoConUsuario[] = rawData.map((p: any) => ({
        id: p.id,
        creado_en: p.creado_en,
        total: p.total,
        usuarios:
          Array.isArray(p.usuarios) && p.usuarios[0]
            ? p.usuarios[0]
            : { nombre: "", apellido1: "", apellido2: "" },
      }));

      setPedidos(pedidosFormateados);
      setTotal(
        pedidosFormateados.reduce((sum, pedido) => sum + (pedido.total || 0), 0)
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        📜 Historial de Pedidos Recogidos
      </h2>

      {/* Filtros de fecha */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Desde:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Hasta:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={fetchHistorial}
          className="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Filtrar
        </button>
      </div>

      {/* Mensaje de error */}
      {errorMsg && <p className="text-red-600 mb-4">Error: {errorMsg}</p>}

      {/* Total */}
      <div className="mb-4 text-right">
        <span className="font-semibold text-lg">
          Total: {total.toFixed(2)} €
        </span>
      </div>

      {/* Contenido */}
      {loading ? (
        <Spinner />
      ) : pedidos.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Total (€)</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{p.id}</td>
                <td className="p-2 border">
                  {new Date(p.creado_en).toLocaleString("es-ES")}
                </td>
                <td className="p-2 border">
                  {p.usuarios.nombre} {p.usuarios.apellido1}
                </td>
                <td className="p-2 border text-right">{p.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">
          No hay pedidos recogidos en ese rango.
        </p>
      )}
    </div>
  );
};

export default HistorialPedidos;
