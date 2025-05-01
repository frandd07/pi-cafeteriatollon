"use client";

import { useState, useEffect } from "react";
import {
  getIngredientesDisponibles,
  getIngredientesAsignados,
  guardarIngredientesAsignados,
  crearNuevoIngrediente,
} from "../services/IngredientesAdminService";
import type { Ingrediente, IngredienteAsignado } from "@/interfaces";

export function useIngredientesModal(productoId: number, isOpen: boolean) {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [seleccionados, setSeleccionados] = useState<IngredienteAsignado[]>([]);
  const [crearModalAbierto, setCrearModalAbierto] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const disp = await getIngredientesDisponibles();
        const asig = await getIngredientesAsignados(productoId);
        setIngredientes(disp);
        setSeleccionados(asig);
      } catch (err) {
        console.error("Error cargando ingredientes:", err);
      }
    })();
  }, [isOpen, productoId]);

  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) => {
      const exists = prev.find((x) => x.ingrediente_id === id);
      if (exists) {
        return prev.filter((x) => x.ingrediente_id !== id);
      } else {
        const ing = ingredientes.find((i) => i.id === id);
        const precioDefecto = ing ? ing.precio_extra : 0;
        return [...prev, { ingrediente_id: id, precio_extra: precioDefecto }];
      }
    });
  };

  const guardar = async (onClose: () => void) => {
    try {
      await guardarIngredientesAsignados(
        productoId,
        seleccionados.map(({ ingrediente_id, precio_extra }) => ({
          ingrediente_id,
          precio_extra,
        }))
      );
      onClose();
    } catch (err) {
      console.error("Error al guardar asignaciones:", err);
    }
  };

  const crearIngrediente = async () => {
    if (!nuevoNombre.trim() || isNaN(parseFloat(nuevoPrecio))) return;
    try {
      await crearNuevoIngrediente({
        nombre: nuevoNombre.trim(),
        precio_extra: parseFloat(nuevoPrecio),
      });
      const disp = await getIngredientesDisponibles();
      setIngredientes(disp);
      setCrearModalAbierto(false);
      setNuevoNombre("");
      setNuevoPrecio("");
    } catch (err) {
      console.error("Error al crear ingrediente:", err);
    }
  };

  return {
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
  };
}
