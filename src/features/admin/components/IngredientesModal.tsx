"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useIngredientesModal } from "../hooks";

interface IngredientesModalProps {
  productoId: number;
  nombreProducto: string;
  isOpen: boolean;
  onClose: () => void;
}

const IngredientesModal = ({
  productoId,
  nombreProducto,
  isOpen,
  onClose,
}: IngredientesModalProps) => {
  const {
    ingredientes,
    seleccionados,
    crearModalAbierto,
    setCrearModalAbierto,
    nuevoIngrediente,
    setNuevoIngrediente,
    toggleSeleccion,
    actualizarPrecioExtra,
    guardar,
    crearIngrediente,
  } = useIngredientesModal(productoId, isOpen);

  return (
    <>
      {/* Modal principal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-bold mb-4">
                    Ingredientes de: {nombreProducto}
                  </Dialog.Title>

                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">
                      Selecciona los ingredientes:
                    </h4>
                    <button
                      onClick={() => setCrearModalAbierto(true)}
                      className="cursor-pointer text-sm text-blue-600 underline"
                    >
                      ➕ Nuevo ingrediente
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                    {ingredientes.map((ing) => {
                      const sel = seleccionados.find((i) => i.id === ing.id);
                      return (
                        <div
                          key={ing.id}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={!!sel}
                            onChange={() => toggleSeleccion(ing.id)}
                          />
                          <span className="flex-1">{ing.nombre}</span>
                          {sel && (
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="w-24 border px-2 py-1 rounded text-sm"
                              value={sel.precioExtra}
                              onChange={(e) =>
                                actualizarPrecioExtra(ing.id, e.target.value)
                              }
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={onClose}
                      className="cursor-pointer px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => guardar(onClose)}
                      className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal para crear nuevo ingrediente */}
      <Transition appear show={crearModalAbierto} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setCrearModalAbierto(false)}
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
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold mb-4">
                    Crear nuevo ingrediente
                  </Dialog.Title>

                  <input
                    type="text"
                    placeholder="Nombre del ingrediente"
                    value={nuevoIngrediente}
                    onChange={(e) => setNuevoIngrediente(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-4"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setCrearModalAbierto(false)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={crearIngrediente}
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
    </>
  );
};

export default IngredientesModal;
