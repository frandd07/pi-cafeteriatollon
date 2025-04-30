import { useEffect, useState } from "react";
import { Producto } from "@/interfaces";
import { obtenerProductosAleatorios } from "../services/ProductosService";

export function useProductosAleatorios() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProductosAleatorios()
      .then(setProductos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { productos, loading };
}
