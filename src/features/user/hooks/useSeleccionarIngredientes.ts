import { useEffect, useState } from "react";
import { getIngredientesPorProducto } from "../services";

import { IngredientePrecio } from "@/interfaces";

export const useSeleccionarIngredientes = (
  productoId: number,
  isOpen: boolean
) => {
  const [ingredientes, setIngredientes] = useState<IngredientePrecio[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const fetchIngredientes = async () => {
    const data = await getIngredientesPorProducto(productoId);
    setIngredientes(data);
    setSeleccionados([]);
  };

  useEffect(() => {
    if (isOpen) {
      fetchIngredientes();
    }
  }, [isOpen, productoId]);

  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const calcularTotal = (precioBase: number) => {
    const extra = ingredientes
      .filter((i) => seleccionados.includes(i.id))
      .reduce((acc, i) => acc + i.precio_extra, 0);
    return precioBase + extra;
  };

  const getIngredientesSeleccionados = (): IngredientePrecio[] => {
    return ingredientes.filter((i) => seleccionados.includes(i.id));
  };

  return {
    ingredientes,
    seleccionados,
    toggleSeleccion,
    calcularTotal,
    getIngredientesSeleccionados,
  };
};
