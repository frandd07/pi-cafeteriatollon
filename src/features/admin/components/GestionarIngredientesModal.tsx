"use client";
import { getIngredientes } from "@/features/user";
import { actualizarIngrediente, crearNuevoIngrediente } from "../services";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Ingrediente } from "@/interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GestionarIngredientesModal({ isOpen, onClose }: Props) {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [edits, setEdits] = useState<
    Record<number, { nombre: string; precio_extra: string }>
  >({});
  const [crearModalVisible, setCrearModalVisible] = useState(false);

  // Campos del modal hijo
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  const fetchIngredientes = async () => {
    try {
      const data = await getIngredientes();
      setIngredientes(data);
      // Inicializar edits
      const initial: Record<number, any> = {};
      data.forEach((i) => {
        initial[i.id] = {
          nombre: i.nombre,
          precio_extra: i.precio_extra.toFixed(2),
        };
      });
      setEdits(initial);
    } catch {
      toast.error("Error al obtener ingredientes");
    }
  };

  useEffect(() => {
    if (isOpen) fetchIngredientes();
  }, [isOpen]);

  const handleGuardarFila = async (id: number) => {
    const { nombre, precio_extra } = edits[id]!;
    if (!nombre.trim() || isNaN(parseFloat(precio_extra))) {
      toast.error("Nombre y precio válidos obligatorios");
      return;
    }
    try {
      await actualizarIngrediente(id, {
        nombre: nombre.trim(),
        precio_extra: parseFloat(precio_extra),
      });
      toast.success("Ingrediente actualizado");
      fetchIngredientes();
    } catch {
      toast.error("Error al actualizar ingrediente");
    }
  };

  const handleCrear = async () => {
    if (!nuevoNombre.trim() || isNaN(parseFloat(nuevoPrecio))) {
      toast.error("Nombre y precio correctos obligatorios");
      return;
    }
    try {
      await crearNuevoIngrediente({
        nombre: nuevoNombre.trim(),
        precio_extra: parseFloat(nuevoPrecio),
      });
      toast.success("Ingrediente creado");
      setNuevoNombre("");
      setNuevoPrecio("");
      setCrearModalVisible(false);
      fetchIngredientes();
    } catch {
      toast.error("Error al crear ingrediente");
    }
  };

  return (
    <>
      {/* Modal Principal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Fondo y centratado omitidos */}
          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-xl">
              <Dialog.Title className="text-lg font-bold mb-4">
                Gestionar Ingredientes
              </Dialog.Title>

              <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                {ingredientes.map((ing) => (
                  <div key={ing.id} className="flex gap-3 items-center">
                    <input
                      type="text"
                      className="w-1/2 border px-3 py-1 rounded"
                      value={edits[ing.id]?.nombre || ""}
                      onChange={(e) =>
                        setEdits((prev) => ({
                          ...prev,
                          [ing.id]: {
                            ...prev[ing.id],
                            nombre: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      step="0.01"
                      className="w-1/3 border px-3 py-1 rounded"
                      value={edits[ing.id]?.precio_extra || ""}
                      onChange={(e) =>
                        setEdits((prev) => ({
                          ...prev,
                          [ing.id]: {
                            ...prev[ing.id],
                            precio_extra: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() => handleGuardarFila(ing.id)}
                      className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCrearModalVisible(true)}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ➕ Nuevo ingrediente
                </button>
                <button
                  onClick={onClose}
                  className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Modal Hijo: Crear Nuevo Ingrediente */}
      <Transition appear show={crearModalVisible} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setCrearModalVisible(false)}
        >
          {/* Backdrop oscuro */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          {/* Contenedor centrado */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-bold mb-4">
                    Crear Nuevo Ingrediente
                  </Dialog.Title>

                  <div className="flex flex-col gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="border px-3 py-2 rounded"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Precio"
                      className="border px-3 py-2 rounded"
                      value={nuevoPrecio}
                      onChange={(e) => setNuevoPrecio(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setCrearModalVisible(false)}
                      className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCrear}
                      className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Añadir
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
