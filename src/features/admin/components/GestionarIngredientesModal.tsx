"use client";
import { getIngredientes } from "@/features/user";
import {
  actualizarIngrediente,
  crearNuevoIngrediente,
  deleteIngrediente,
} from "../services";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast as toaster } from "react-hot-toast";
import { Ingrediente } from "@/interfaces";
import { Trash2 } from "lucide-react";

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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toaster.error("Error al obtener ingredientes: " + msg);
    }
  };

  useEffect(() => {
    if (isOpen) fetchIngredientes();
  }, [isOpen]);

  const handleGuardarFila = async (id: number) => {
    const { nombre, precio_extra } = edits[id]!;
    if (!nombre.trim() || isNaN(parseFloat(precio_extra))) {
      toaster.error("Nombre y precio válidos obligatorios");
      return;
    }
    try {
      await actualizarIngrediente(id, {
        nombre: nombre.trim(),
        precio_extra: parseFloat(precio_extra),
      });
      toaster.success("Ingrediente actualizado");
      fetchIngredientes();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toaster.error("Error al actualizar ingrediente: " + msg);
    }
  };

  const handleCrear = async () => {
    if (!nuevoNombre.trim() || isNaN(parseFloat(nuevoPrecio))) {
      toaster.error("Nombre y precio correctos obligatorios");
      return;
    }
    try {
      await crearNuevoIngrediente({
        nombre: nuevoNombre.trim(),
        precio_extra: parseFloat(nuevoPrecio),
      });
      toaster.success("Ingrediente creado");
      setNuevoNombre("");
      setNuevoPrecio("");
      setCrearModalVisible(false);
      fetchIngredientes();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toaster.error("Error al crear ingrediente: " + msg);
    }
  };

  const handleEliminarFila = (id: number) => {
    toaster(
      (t: any) => (
        <div className="flex flex-col p-2">
          <span className="mb-2">
            ¿Seguro que quieres eliminar este ingrediente?
          </span>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              onClick={() => toaster.dismiss(t.id)}
            >
              No
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              onClick={async () => {
                toaster.dismiss(t.id);
                try {
                  await deleteIngrediente(id);
                  toaster.success("Ingrediente eliminado");
                  setIngredientes((prev) => prev.filter((i) => i.id !== id));
                  setEdits((prev) => {
                    const copy = { ...prev };
                    delete copy[id];
                    return copy;
                  });
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : String(err);
                  toaster.error("Error al eliminar ingrediente: " + msg);
                }
              }}
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <>
      {/* Modal Principal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          {/* Backdrop negro */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-80"
            leave="ease-in duration-150"
            leaveFrom="opacity-80"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" aria-hidden="true" />
          </Transition.Child>

          {/* Contenedor centrado */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative z-10 w-full max-w-2xl bg-white rounded-xl p-6 shadow-xl">
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
                      <button
                        onClick={() => handleEliminarFila(ing.id)}
                        className="p-1 hover:bg-red-100 rounded"
                        title="Eliminar ingrediente"
                      >
                        <Trash2
                          size={16}
                          className="cursor-pointer text-red-600"
                        />
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Modal Hijo: Crear Nuevo Ingrediente */}
      <Transition appear show={crearModalVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setCrearModalVisible(false)}
        >
          {/* Backdrop oscuro */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-80"
            leave="ease-in duration-200"
            leaveFrom="opacity-80"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" aria-hidden="true" />
          </Transition.Child>

          {/* Wrapper full-screen para centrar verticalmente */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* Contenedor centrado */}
            <div className="flex items-center justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative z-10 w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
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
