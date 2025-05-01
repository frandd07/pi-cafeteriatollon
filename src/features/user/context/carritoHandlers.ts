import toast from "react-hot-toast";
import type { ProductoCarrito, CarritoContextType } from "@/interfaces";

export function createHandlers(
  carrito: ProductoCarrito[],
  setCarrito: React.Dispatch<React.SetStateAction<ProductoCarrito[]>>
): CarritoContextType {
  const añadirProducto = (producto: ProductoCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (p) =>
          p.id === producto.id &&
          JSON.stringify(p.ingredientes) ===
            JSON.stringify(producto.ingredientes)
      );

      return existe
        ? prev.map((p) =>
            p.id === producto.id &&
            JSON.stringify(p.ingredientes) ===
              JSON.stringify(producto.ingredientes)
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          )
        : [...prev, { ...producto, cantidad: 1 }];
    });

    toast.success(`"${producto.nombre}" añadido al carrito`);
  };

  const quitarProducto = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
    toast.success("Producto eliminado del carrito");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    toast("Carrito vaciado");
  };

  return { carrito, añadirProducto, quitarProducto, vaciarCarrito };
}
