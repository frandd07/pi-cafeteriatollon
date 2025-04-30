"use client";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { IngredientesModal } from "../components";
import { Spinner } from "@/components/Spinner";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string;
  habilitado: boolean;
}

const MenuPanel = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });
  const [ingredientesProductoId, setIngredientesProductoId] = useState<
    number | null
  >(null);
  const [ingredientesProductoNombre, setIngredientesProductoNombre] =
    useState<string>("");

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error al cargar productos:", error.message);
    } else {
      setProductos(data as Producto[]);
    }

    setLoading(false);
  };

  const toggleHabilitado = async (id: number, habilitado: boolean) => {
    const { error } = await supabase
      .from("productos")
      .update({ habilitado: !habilitado })
      .eq("id", id);

    if (error) {
      console.error("Error al cambiar estado:", error.message);
    } else {
      fetchProductos();
    }
  };

  const crearProducto = async () => {
    const { nombre, precio, imagen } = nuevoProducto;

    if (!nombre || !precio) {
      toast.error("Nombre y precio son obligatorios");
      return;
    }

    const { error } = await supabase.from("productos").insert([
      {
        nombre,
        precio: parseFloat(precio),
        imagen,
      },
    ]);

    if (error) {
      toast.error("Error al crear producto");
    } else {
      toast.success("Producto creado");
      setIsOpen(false);
      setNuevoProducto({ nombre: "", precio: "", imagen: "" });
      fetchProductos();
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Gestión del Menú</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-md font-medium shadow-sm transition duration-150 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Añadir producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className={`border rounded-xl overflow-hidden shadow-md flex flex-col transition-all duration-200 hover:shadow-lg ${
              prod.habilitado
                ? "bg-white border-gray-200"
                : "bg-gray-100 border-gray-200 text-gray-500"
            }`}
          >
            <div className="relative">
              {prod.imagen ? (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className={`h-48 w-full object-cover transition ${
                    !prod.habilitado ? "grayscale opacity-70" : ""
                  }`}
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </div>
              )}
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  prod.habilitado
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {prod.habilitado ? "Activo" : "Inactivo"}
              </div>
            </div>

            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {prod.nombre}
              </h3>
              <p className="text-lg font-bold text-gray-700">
                {prod.precio.toFixed(2)} €
              </p>
            </div>

            <div className="px-4 pb-4 space-y-2">
              <button
                onClick={() => toggleHabilitado(prod.id, prod.habilitado)}
                className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
                  prod.habilitado
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {prod.habilitado ? "Desactivar" : "Activar"}
              </button>
              <button
                onClick={() => {
                  setIngredientesProductoId(prod.id);
                  setIngredientesProductoNombre(prod.nombre);
                }}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M4.93 4.93l14.14 14.14M20 12H4"></path>
                </svg>
                Editar ingredientes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de creación */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-xl font-bold text-gray-900 mb-4">
                    Añadir nuevo producto
                  </Dialog.Title>

                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del producto
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Hamburguesa clásica"
                        value={nuevoProducto.nombre}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            nombre: e.target.value,
                          })
                        }
                        className="border border-gray-300 px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio (€)
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={nuevoProducto.precio}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            precio: e.target.value,
                          })
                        }
                        className="border border-gray-300 px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de imagen (opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={nuevoProducto.imagen}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            imagen: e.target.value,
                          })
                        }
                        className="border border-gray-300 px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={crearProducto}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                    >
                      Crear producto
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {ingredientesProductoId && (
        <IngredientesModal
          productoId={ingredientesProductoId}
          nombreProducto={ingredientesProductoNombre}
          isOpen={!!ingredientesProductoId}
          onClose={() => setIngredientesProductoId(null)}
        />
      )}
    </div>
  );
};

export default MenuPanel;
