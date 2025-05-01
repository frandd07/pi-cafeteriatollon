"use client";
import { Toaster } from "react-hot-toast";
import { usePedidosAdmin } from "../hooks";
import { Spinner } from "@/components/Spinner";

const AdminPedidos = () => {
  const {
    pedidos,
    pedidosFiltrados,
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
  } = usePedidosAdmin();

  const recreoLabels: Record<string, string> = {
    primer: "Primer recreo",
    segundo: "Segundo recreo",
    lo_antes_posible: "Lo antes posible",
  };

  if (loading) return <Spinner />;
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Toaster position="top-right" />

      {/* Header con estadísticas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            📦 Pedidos de Usuarios
            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {pedidos.length} activos
            </span>
          </h2>
          <p className="text-gray-500 mt-1">
            Gestiona todos los pedidos desde este panel
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Filtrar por estado
          </h3>
          <div className="flex gap-2 flex-wrap">
            {estados.map((estado) => (
              <button
                key={estado}
                className={`cursor-pointer px-4 py-2 text-sm rounded-lg transition-all duration-200 flex items-center ${
                  filtro === estado
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFiltro(estado)}
              >
                {estado === "pendiente" && "⏳ "}
                {estado === "aceptado" && "✅ "}
                {estado === "listo" && "📦 "}
                {estado === "recogido" && "🛕️ "}
                {estado === "rechazado" && "❌ "}
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                {filtro === estado && (
                  <span className="ml-2 w-5 h-5 flex items-center justify-center bg-white text-blue-600 rounded-full text-xs">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros por nombre e ID */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Buscar por nombre
              </h3>
              <input
                type="text"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                placeholder="Introduce el nombre o apellidos..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Buscar por número de pedido
              </h3>
              <input
                type="text"
                value={filtroId}
                onChange={(e) => setFiltroId(e.target.value)}
                placeholder="Introduce el ID del pedido..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de tarjetas de pedidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map((pedido) => {
            // Cálculo del total del pedido: se utiliza únicamente el precio base (ya con ingredientes incluidos)
            const totalPedido = pedido.detalle_pedido.reduce(
              (total: number, detalle: any) => {
                return total + detalle.precio * detalle.cantidad;
              },
              0
            );

            return (
              <div
                key={pedido.id}
                className="border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                {/* Cabecera del pedido */}
                <div
                  className={`px-6 py-4 border-b flex justify-between items-center ${
                    pedido.estado === "pendiente"
                      ? "bg-yellow-50 border-yellow-200"
                      : pedido.estado === "aceptado"
                      ? "bg-blue-50 border-blue-200"
                      : pedido.estado === "listo"
                      ? "bg-green-50 border-green-200"
                      : pedido.estado === "recogido"
                      ? "bg-purple-50 border-purple-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        pedido.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-600"
                          : pedido.estado === "aceptado"
                          ? "bg-blue-100 text-blue-600"
                          : pedido.estado === "listo"
                          ? "bg-green-100 text-green-600"
                          : pedido.estado === "recogido"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {pedido.estado === "pendiente" && "⏳"}
                      {pedido.estado === "aceptado" && "✅"}
                      {pedido.estado === "listo" && "📦"}
                      {pedido.estado === "recogido" && "🛍️"}
                      {pedido.estado === "rechazado" && "❌"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(pedido.creado_en).toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      pedido.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : pedido.estado === "aceptado"
                        ? "bg-blue-100 text-blue-800"
                        : pedido.estado === "listo"
                        ? "bg-green-100 text-green-800"
                        : pedido.estado === "recogido"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pedido.estado?.charAt(0).toUpperCase() +
                      pedido.estado?.slice(1) || "Pendiente"}
                  </span>
                </div>

                {/* Detalles del alumno */}
                <div className="px-6 py-4 border-b bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-3 sm:mb-0">
                      {pedido.usuarios?.tipo === "alumno" && (
                        <p className="text-gray-500 text-sm mb-1">
                          Datos del alumno
                        </p>
                      )}
                      <p className="font-medium">
                        {pedido.usuarios?.nombre} {pedido.usuarios?.apellido1}{" "}
                        {pedido.usuarios?.apellido2}
                      </p>
                      <p className="text-sm text-gray-600">
                        {pedido.usuarios?.tipo === "alumno"
                          ? `Curso: ${pedido.usuarios?.curso}`
                          : pedido.usuarios?.tipo
                          ? pedido.usuarios.tipo.charAt(0).toUpperCase() +
                            pedido.usuarios.tipo.slice(1)
                          : "Sin tipo"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Recreo: {recreoLabels[pedido.recreo] || pedido.recreo}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end min-w-[180px]">
                      <p className="text-gray-500 text-sm mb-1">
                        Estado de pago
                      </p>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center w-11 h-6 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pedido.pagado}
                            onChange={() => togglePagado(pedido)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition-all duration-300"></div>
                          <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </label>
                        <span className="text-sm font-medium text-gray-700">
                          {pedido.pagado ? "Pagado" : "No pagado"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de productos */}
                <div className="px-6 py-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Productos solicitados
                  </h4>
                  <ul className="space-y-3">
                    {pedido.detalle_pedido.map((detalle: any) => (
                      <li
                        key={detalle.id}
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {detalle.productos?.nombre || "Producto"}
                          </p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            x{detalle.cantidad}
                          </span>
                        </div>
                        {detalle.detalle_ingrediente.length > 0 && (
                          <ul className="mt-2 border-t pt-2 text-sm text-gray-600">
                            <p className="text-xs uppercase text-gray-500 mb-1">
                              Ingredientes extra:
                            </p>
                            {detalle.detalle_ingrediente.map(
                              (ing: any, i: number) => (
                                <li
                                  key={i}
                                  className="flex justify-between items-center py-1"
                                >
                                  <span>{ing.ingredientes?.nombre}</span>
                                  <span className="font-medium">
                                    +{ing.precio_extra?.toFixed(2)} €
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visualización del total del pedido */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                  <span className="font-bold text-lg text-blue-700">
                    Total: {totalPedido.toFixed(2)} €
                  </span>
                </div>

                {/* Acciones del pedido */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {pedido.estado === "pendiente" && (
                      <>
                        <button
                          onClick={() =>
                            actualizarEstado(pedido.id, "aceptado")
                          }
                          className="cursor-pointer px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition duration-150 flex items-center"
                        >
                          <span className="mr-1">✅</span> Aceptar
                        </button>
                        <button
                          onClick={() =>
                            actualizarEstado(pedido.id, "rechazado")
                          }
                          className="cursor-pointer px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition duration-150 flex items-center"
                        >
                          <span className="mr-1">❌</span> Rechazar
                        </button>
                      </>
                    )}
                    {pedido.estado === "aceptado" && (
                      <button
                        onClick={() => actualizarEstado(pedido.id, "listo")}
                        className="cursor-pointer px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition duration-150 flex items-center"
                      >
                        <span className="mr-1">📦</span> Marcar como listo
                      </button>
                    )}
                    {pedido.estado === "listo" && pedido.pagado && (
                      <button
                        onClick={() => actualizarEstado(pedido.id, "recogido")}
                        className="cursor-pointer px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition duration-150 flex items-center"
                      >
                        <span className="mr-1">🛍️</span> Marcar como recogido
                      </button>
                    )}
                  </div>
                </div>
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
            <p className="text-gray-500">
              No se encontraron pedidos con el filtro actual
            </p>
            <button
              onClick={() => setFiltro("")}
              className="cursor-pointer mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition duration-150"
            >
              Ver todos los pedidos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPedidos;
