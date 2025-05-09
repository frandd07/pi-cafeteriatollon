import { useEffect, useState } from "react";
import { getIngredientesPorProducto } from "../services";
import type { IngredientePrecio } from "@/interfaces";

export const useSeleccionarIngredientes = (
  productoId: number,
  isOpen: boolean
) => {
  const [ingredientes, setIngredientes] = useState<IngredientePrecio[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const data = await getIngredientesPorProducto(productoId);
        setIngredientes(data);
        setSeleccionados([]);
      } catch (e) {
        console.error("Error cargando ingredientes por producto:", e);
        setIngredientes([]);
      }
    })();
  }, [isOpen, productoId]);

  const toggleSeleccion = (id: number) =>
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const calcularTotal = (base: number) =>
    base +
    ingredientes
      .filter((i) => seleccionados.includes(i.id))
      .reduce((sum, i) => sum + i.precio_extra, 0);

  const getIngredientesSeleccionados = () =>
    ingredientes.filter((i) => seleccionados.includes(i.id));

  return {
    ingredientes,
    seleccionados,
    toggleSeleccion,
    calcularTotal,
    getIngredientesSeleccionados,
  };
};
