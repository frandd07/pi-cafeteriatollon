import { Producto } from "@/interfaces";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001";

export const fetchProductosActivos = async (): Promise<Producto[] | null> => {
  try {
    const res = await fetch(`${API_URL}/productos`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.filter((p: Producto) => p.habilitado);
  } catch (error) {
    toast.error("Error al cargar productos");
    console.error("❌ Backend:", error);
    return null;
  }
};
