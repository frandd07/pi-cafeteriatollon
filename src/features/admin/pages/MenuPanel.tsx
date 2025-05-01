"use client";

import { Fragment, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { IngredientesModal } from "../components";
import { GestionarIngredientesModal } from "../components";
import { Spinner } from "@/components/Spinner";
import { eliminarProducto as eliminarProductoService } from "../services/ProductosAdminService";
import { Producto } from "@/interfaces";

const MenuPanel = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [crearProductoOpen, setCrearProductoOpen] = useState(false);
  const [gestionarIngOpen, setGestionarIngOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });
  const [ingredientesProductoId, setIngredientesProductoId] = useState<
    number | null
  >(null);
  const [ingredientesProductoNombre, setIngredientesProductoNombre] =
    useState("");

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      toast.error("Error al cargar productos");
    } else {
      setProductos(data as Producto[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const toggleHabilitado = async (id: number, habilitado: boolean) => {
    const { error } = await supabase
      .from("productos")
      .update({ habilitado: !habilitado })
      .eq("id", id);
    if (error) toast.error("Error al cambiar estado");
    else fetchProductos();
  };

  const eliminarProducto = (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <p className="font-medium">¿Eliminar producto?</p>
        <p className="text-sm text-gray-500 mb-4">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer px-3 py-1 bg-gray-200 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const ok = await eliminarProductoService(id);
              ok
                ? toast.success("Producto eliminado")
                : toast.error("Error al eliminar");
              fetchProductos();
            }}
            className="cursor-pointer px-3 py-1 bg-red-600 text-white rounded"
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
    const { error } = await supabase
      .from("productos")
      .insert([{ nombre, precio: parseFloat(precio), imagen }]);
    if (error) toast.error("Error al crear producto");
    else {
      toast.success("Producto creado");
      setCrearProductoOpen(false);
      setNuevoProducto({ nombre: "", precio: "", imagen: "" });
      fetchProductos();
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center mb-8 gap-2">
        <h2 className="text-2xl font-bold">Gestión del Menú</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCrearProductoOpen(true)}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 px-5 py-2.5 rounded shadow text-gray-900 flex items-center justify-center sm:justify-start gap-2"
          >
            Añadir producto
          </button>
          <button
            onClick={() => setGestionarIngOpen(true)}
            className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 px-5 py-2.5 rounded shadow text-white flex items-center justify-center sm:justify-start gap-2"
          >
            Gestionar ingredientes
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className={`border rounded-xl overflow-hidden shadow flex flex-col transition ${
              prod.habilitado ? "bg-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {/* Imagen y badges */}
            <div className="relative">
              {prod.imagen ? (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className={`h-48 w-full object-cover ${
                    !prod.habilitado && "grayscale opacity-70"
                  }`}
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                  Sin imagen
                </div>
              )}
              <span
                className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  prod.habilitado
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {prod.habilitado ? "Activo" : "Inactivo"}
              </span>
              <button
                onClick={() => eliminarProducto(prod.id)}
                className="cursor-pointer absolute top-3 right-3 p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {/* Info */}
            <div className="p-4 flex-grow">
              <h3 className="font-semibold mb-1">{prod.nombre}</h3>
              <p className="font-bold">{prod.precio.toFixed(2)} €</p>
            </div>
            {/* Acciones */}
            <div className="px-4 pb-4 space-y-2">
              <button
                onClick={() => toggleHabilitado(prod.id, prod.habilitado)}
                className={`cursor-pointer w-full py-2 rounded text-white ${
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
                className="cursor-pointer w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Editar ingredientes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Crear producto */}
      <Transition appear show={crearProductoOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setCrearProductoOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
                  <Dialog.Title className="text-xl font-bold mb-4">
                    Añadir nuevo producto
                  </Dialog.Title>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={nuevoProducto.nombre}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            nombre: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Precio (€)
                      </label>
                      <input
                        type="number"
                        value={nuevoProducto.precio}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            precio: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        URL Imagen
                      </label>
                      <input
                        type="text"
                        value={nuevoProducto.imagen}
                        onChange={(e) =>
                          setNuevoProducto({
                            ...nuevoProducto,
                            imagen: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setCrearProductoOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={crearProducto}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Crear
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal: Ingredientes por producto */}
      {ingredientesProductoId != null && (
        <IngredientesModal
          productoId={ingredientesProductoId}
          nombreProducto={ingredientesProductoNombre}
          isOpen={!!ingredientesProductoId}
          onClose={() => setIngredientesProductoId(null)}
        />
      )}

      {/* Modal: Gestión global de ingredientes */}
      <GestionarIngredientesModal
        isOpen={gestionarIngOpen}
        onClose={() => setGestionarIngOpen(false)}
      />
    </div>
  );
};

export default MenuPanel;
