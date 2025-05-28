"use client";

import { createContext, useState, type ReactNode } from "react";
import type { ProductoCarrito, CarritoContextType } from "@/interfaces";
import { createHandlers } from "./carritoHandlers";

export const CarritoContext = createContext<CarritoContextType | undefined>(
  undefined
);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const value = createHandlers(carrito, setCarrito);

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
};
