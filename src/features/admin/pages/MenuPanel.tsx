"use client";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { IngredientesModal } from "../components";
import { Spinner } from "@/components/Spinner";
import { eliminarProducto as eliminarProductoService } from "../services/ProductosAdminService";
import { Producto } from "@/interfaces";

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

  const eliminarProducto = (id: number) => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-2 w-80">
        <p className="font-medium text-gray-800">¿Eliminar producto?</p>
        <p className="text-sm text-gray-500">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              const success = await eliminarProductoService(id);
              toast.dismiss(t.id);
              if (success) {
                toast.success("Producto eliminado correctamente");
                fetchProductos();
              } else {
                toast.error("Error al eliminar el producto");
              }
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
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
          className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-md font-medium shadow-sm transition duration-150 flex items-center gap-2"
        >
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
                  Imagen no disponible
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    prod.habilitado
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {prod.habilitado ? "Activo" : "Inactivo"}
                </span>
              </div>
              <button
                onClick={() => eliminarProducto(prod.id)}
                className="cursor-pointer absolute top-3 right-3 p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
              >
                <Trash2 size={16} />
              </button>
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
                className={` cursor-pointer w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
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
                className="cursor-pointer w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Editar ingredientes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de creación y modal de ingredientes se mantienen igual */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
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
                      className="cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={crearProducto}
                      className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
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
