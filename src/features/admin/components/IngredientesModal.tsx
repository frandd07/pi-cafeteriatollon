"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IngredientesModalProps } from "@/interfaces";
import { useIngredientesModal } from "../hooks";

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
    nuevoNombre,
    setNuevoNombre,
    nuevoPrecio,
    setNuevoPrecio,
    toggleSeleccion,
    guardar,
    crearIngrediente,
  } = useIngredientesModal(productoId, isOpen);

  return (
    <>
      {/* Modal Principal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-80"
            leave="ease-in duration-150"
            leaveFrom="opacity-80"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-80"
              aria-hidden="true"
            />
          </Transition.Child>

          {/* Panel centrado */}
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
              <Dialog.Panel className="relative z-10 w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-4">
                  Ingredientes de: {nombreProducto}
                </Dialog.Title>

                {/* Se elimina el botón "+ Nuevo" según solicitud */}
                <div className="mb-3">
                  <h4 className="font-semibold">Selecciona ingredientes</h4>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
                  {ingredientes.map((ing) => {
                    const asign = seleccionados.find(
                      (x) => x.ingrediente_id === ing.id
                    );
                    return (
                      <div
                        key={ing.id}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!asign}
                            onChange={() => toggleSeleccion(ing.id)}
                          />
                          <span>{ing.nombre}</span>
                        </label>
                        {asign && (
                          <input
                            type="number"
                            step="0.01"
                            className="w-20 border px-1 py-0.5 rounded text-sm bg-gray-100 cursor-not-allowed"
                            value={asign.precio_extra.toFixed(2)}
                            disabled
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => guardar(onClose)}
                    className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Modal de creación */}
      <Transition appear show={crearModalAbierto} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setCrearModalAbierto(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-80"
            leave="ease-in duration-150"
            leaveFrom="opacity-80"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-80"
              aria-hidden="true"
            />
          </Transition.Child>

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
              <Dialog.Panel className="relative z-10 w-full max-w-sm bg-white rounded-xl p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  Nuevo ingrediente
                </Dialog.Title>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-2"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  step="0.01"
                  value={nuevoPrecio}
                  onChange={(e) => setNuevoPrecio(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setCrearModalAbierto(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={crearIngrediente}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Crear
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default IngredientesModal;
