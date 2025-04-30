"use client";

import SeleccionarIngredientesModal from "./SeleccionarIngredientesModal";
import { useMenuCliente } from "../hooks";
import { Spinner } from "@/components/Spinner";

const MenuCliente = () => {
  const {
    productos,
    loading,
    productoSeleccionado,
    modalAbierto,
    abrirModal,
    cerrarModal,
    confirmarProducto,
  } = useMenuCliente();

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestro Menú</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="border rounded-xl p-4 shadow-sm bg-white flex flex-col hover:shadow-md transition"
          >
            {prod.imagen ? (
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="h-40 w-full object-cover rounded mb-4"
              />
            ) : (
              <div className="h-40 w-full bg-gray-100 flex items-center justify-center mb-4 rounded text-sm text-gray-500">
                Sin imagen
              </div>
            )}

            <h3 className="text-lg font-semibold mb-1">{prod.nombre}</h3>
            <p className="text-gray-600 mb-4">{prod.precio.toFixed(2)} €</p>

            <button
              onClick={() => abrirModal(prod)}
              className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded font-medium transition"
            >
              ➕ Añadir al carrito
            </button>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <SeleccionarIngredientesModal
          isOpen={modalAbierto}
          onClose={cerrarModal}
          producto={productoSeleccionado}
          onConfirm={confirmarProducto}
        />
      )}
    </div>
  );
};

export default MenuCliente;
