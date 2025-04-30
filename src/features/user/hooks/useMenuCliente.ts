import { useEffect, useState } from "react";
import { fetchProductosActivos } from "../services";
import { useCarrito } from "../context";
import { Producto } from "@/interfaces";

export const useMenuCliente = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { añadirProducto } = useCarrito();

  const abrirModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setModalAbierto(false);
  };

  const cargarProductos = async () => {
    setLoading(true);
    const data = await fetchProductosActivos();
    if (data) setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const confirmarProducto = ({
    producto,
    ingredientes,
    precioTotal,
  }: {
    producto: Producto;
    ingredientes: any[];
    precioTotal: number;
  }) => {
    añadirProducto({
      ...producto,
      cantidad: 1,
      precio: precioTotal,
      ingredientes,
    });
  };

  return {
    productos,
    loading,
    productoSeleccionado,
    modalAbierto,
    abrirModal,
    cerrarModal,
    confirmarProducto,
  };
};
