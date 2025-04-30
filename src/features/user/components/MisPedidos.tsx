"use client";

import { Spinner } from "@/components/Spinner";
import { useMisPedidos } from "../hooks";
import { Toaster } from "react-hot-toast";

const MisPedidos = () => {
  const { pedidos, loading, eliminarPedido } = useMisPedidos();

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Toaster position="top-right" />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Mis Pedidos</h2>
            <p className="text-blue-100">
              {pedidos.length} {pedidos.length === 1 ? "pedido" : "pedidos"}{" "}
              realizados
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => {
            const totalPedido = pedido.detalle_pedido.reduce(
              (total: number, detalle: any) => {
                const precioTotal =
                  detalle.precio * detalle.cantidad +
                  (detalle.precio_ingredientes || 0) * detalle.cantidad;
                return total + precioTotal;
              },
              0
            );

            return (
              <div
                key={pedido.id}
                className="border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`h-2 w-full ${
                    pedido.estado === "pendiente"
                      ? "bg-yellow-500"
                      : pedido.estado === "preparando"
                      ? "bg-blue-500"
                      : pedido.estado === "entregado"
                      ? "bg-green-500"
                      : pedido.estado === "rechazado"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                ></div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-100">
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        pedido.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-600"
                          : pedido.estado === "preparando"
                          ? "bg-blue-100 text-blue-600"
                          : pedido.estado === "entregado"
                          ? "bg-green-100 text-green-600"
                          : pedido.estado === "rechazado"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pedido.estado === "pendiente" && "⏳"}
                      {pedido.estado === "preparando" && "🔄"}
                      {pedido.estado === "entregado" && "✅"}
                      {pedido.estado === "rechazado" && "❌"}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">
                        Pedido #{pedido.id}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(pedido.creado_en).toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        pedido.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          : pedido.estado === "preparando"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : pedido.estado === "entregado"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : pedido.estado === "rechazado"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {pedido.estado}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        pedido.pagado
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {pedido.pagado ? "Pagado" : "Pendiente de pago"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-medium text-gray-700 mb-3">Productos</h4>
                  <ul className="space-y-3">
                    {pedido.detalle_pedido.map((detalle: any) => {
                      const precioTotal =
                        detalle.precio * detalle.cantidad +
                        (detalle.precio_ingredientes || 0) * detalle.cantidad;

                      return (
                        <li
                          key={detalle.id}
                          className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold">
                                {detalle.productos?.nombre} x{detalle.cantidad}
                              </p>
                              {detalle.detalle_ingrediente.length > 0 && (
                                <ul className="ml-4 list-disc text-sm text-gray-600 mt-1">
                                  {detalle.detalle_ingrediente.map(
                                    (ing: any, i: number) => (
                                      <li key={i}>
                                        {ing.ingredientes?.nombre} (+
                                        {ing.precio_extra?.toFixed(2)} €)
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </div>
                            <p className="text-right font-medium text-gray-700">
                              {precioTotal.toFixed(2)} €
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {pedido.detalle_pedido.reduce(
                      (total: number, detalle: any) => total + detalle.cantidad,
                      0
                    )}{" "}
                    productos
                  </span>
                  <span className="font-bold text-lg text-blue-700">
                    Total: {totalPedido.toFixed(2)} €
                  </span>
                </div>

                {pedido.estado === "rechazado" && (
                  <div className="p-4 flex justify-end">
                    <button
                      onClick={() => eliminarPedido(pedido.id)}
                      className="px-4 py-2 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-1">
              No hay pedidos
            </h3>
            <p className="text-gray-500">Aún no has realizado ningún pedido.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPedidos;
