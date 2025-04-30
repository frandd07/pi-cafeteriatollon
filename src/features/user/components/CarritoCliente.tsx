"use client";
import { useCarritoCliente } from "../hooks";

const CarritoCliente = () => {
  const {
    carrito,
    quitarProducto,
    vaciarCarrito,
    recreo,
    setRecreo,
    total,
    confirmarPedido,
  } = useCarritoCliente();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛒 Tu carrito</h2>

      {carrito.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🛍️</span>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-1">
            Tu carrito está vacío
          </h3>
          <p className="text-gray-500">
            Agrega productos del menú para hacer tu pedido.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {carrito.map((prod) => (
              <div
                key={prod.id}
                className="border rounded-lg p-4 shadow bg-white flex flex-col"
              >
                {prod.imagen ? (
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="h-32 w-full object-cover rounded mb-3"
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-100 flex items-center justify-center mb-3 rounded text-sm text-gray-500">
                    Sin imagen
                  </div>
                )}

                <h3 className="text-lg font-semibold">{prod.nombre}</h3>
                <p className="text-gray-600">
                  {prod.precio.toFixed(2)} € x {prod.cantidad}
                </p>

                {Array.isArray(prod.ingredientes) &&
                  prod.ingredientes.length > 0 && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-semibold">Ingredientes:</p>
                      <ul className="list-disc list-inside">
                        {prod.ingredientes.map((ing: any) => (
                          <li key={ing.id}>
                            {ing.nombre}
                            {ing.precio_extra > 0 &&
                              ` (+${ing.precio_extra.toFixed(2)} €)`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <p className="mt-3 font-bold">
                  Total: {(prod.precio * prod.cantidad).toFixed(2)} €
                </p>

                <button
                  onClick={() => quitarProducto(prod.id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition cursor-pointer"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-gray-800">
                Total del pedido: {total.toFixed(2)} €
              </p>
              <select
                value={recreo}
                onChange={(e) =>
                  setRecreo(e.target.value as "primer" | "segundo")
                }
                className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
              >
                <option value="primer">Primer recreo</option>
                <option value="segundo">Segundo recreo</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={vaciarCarrito}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition cursor-pointer"
              >
                Vaciar carrito
              </button>

              <button
                onClick={confirmarPedido}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer"
              >
                Confirmar pedido
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoCliente;
