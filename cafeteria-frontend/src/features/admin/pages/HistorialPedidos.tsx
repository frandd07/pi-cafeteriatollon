"use client";

import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { useHistorialPedidos } from "../hooks/useHistorialPedidos";

const HistorialPedidos: React.FC = () => {
  const [startDate, setStartDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  const { pedidos, total, loading, errorMsg, reload } = useHistorialPedidos(
    startDate,
    endDate
  );

  return (
    <div className="w-full px-2">
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
          onClick={reload}
          className="cursor-pointer self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
              <th className="p-2 border">Contenido</th>
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
                  {p.usuarios?.nombre || "—"} {p.usuarios?.apellido1 || ""}
                </td>
                <td className="p-2 border">
                  <ul className="list-disc pl-4">
                    {p.detalle_pedido.map((d) => (
                      <li key={d.id}>
                        {d.productos?.nombre || "Producto"} x{d.cantidad}
                        {d.detalle_ingrediente.length > 0 && (
                          <span>
                            {" ("}
                            {d.detalle_ingrediente
                              .map((di) => di.ingredientes?.nombre)
                              .join(", ")}
                            {")"}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
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
