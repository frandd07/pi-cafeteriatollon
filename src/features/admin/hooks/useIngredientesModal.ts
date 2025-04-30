import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Ingrediente, IngredienteAsignado } from "@/interfaces";

import {
  getIngredientesAsignados,
  getIngredientesDisponibles,
  guardarIngredientesAsignados,
  crearNuevoIngrediente,
} from "../services";

export const useIngredientesModal = (productoId: number, isOpen: boolean) => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [seleccionados, setSeleccionados] = useState<IngredienteAsignado[]>([]);
  const [crearModalAbierto, setCrearModalAbierto] = useState(false);
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");

  const cargarDatos = async () => {
    try {
      const disponibles = await getIngredientesDisponibles();
      const asignados = await getIngredientesAsignados(productoId);
      setIngredientes(disponibles);
      setSeleccionados(asignados);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOpen) cargarDatos();
  }, [isOpen]);

  const toggleSeleccion = (id: number) => {
    const existe = seleccionados.find((i) => i.id === id);
    if (existe) {
      setSeleccionados(seleccionados.filter((i) => i.id !== id));
    } else {
      setSeleccionados([...seleccionados, { id, precioExtra: "0.00" }]);
    }
  };

  const actualizarPrecioExtra = (id: number, precio: string) => {
    setSeleccionados((prev) =>
      prev.map((i) => (i.id === id ? { ...i, precioExtra: precio } : i))
    );
  };

  const guardar = async (onClose: () => void) => {
    try {
      await guardarIngredientesAsignados(productoId, seleccionados);
      toast.success("Ingredientes actualizados");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const crearIngrediente = async () => {
    if (!nuevoIngrediente.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    try {
      await crearNuevoIngrediente(nuevoIngrediente.trim());
      toast.success("Ingrediente creado");
      setNuevoIngrediente("");
      setCrearModalAbierto(false);
      cargarDatos();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
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
  };
};
