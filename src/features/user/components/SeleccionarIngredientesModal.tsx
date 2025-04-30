"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IngredientePrecio } from "@/interfaces";
import { useSeleccionarIngredientes } from "../hooks";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Props {
  producto: Producto;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (datos: {
    producto: Producto;
    ingredientes: IngredientePrecio[];
    precioTotal: number;
  }) => void;
}

const SeleccionarIngredientesModal = ({
  producto,
  isOpen,
  onClose,
  onConfirm,
}: Props) => {
  const {
    ingredientes,
    seleccionados,
    toggleSeleccion,
    calcularTotal,
    getIngredientesSeleccionados,
  } = useSeleccionarIngredientes(producto.id, isOpen);

  const confirmar = () => {
    onConfirm({
      producto,
      ingredientes: getIngredientesSeleccionados(),
      precioTotal: calcularTotal(producto.precio),
    });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold mb-4">
                  {producto.nombre}
                </Dialog.Title>

                {ingredientes.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Sin ingredientes personalizables.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {ingredientes.map((ing) => (
                      <label
                        key={ing.id}
                        className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(ing.id)}
                            onChange={() => toggleSeleccion(ing.id)}
                          />
                          <span>{ing.nombre}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          +{ing.precio_extra.toFixed(2)} €
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="mt-6 text-right font-semibold">
                  Total: {calcularTotal(producto.precio).toFixed(2)} €
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmar}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SeleccionarIngredientesModal;
