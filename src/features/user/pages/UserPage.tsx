"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuCliente,
  CarritoCliente,
  MisPedidos,
  PerfilUsuario,
} from "../components";
import HeaderSencillo from "@/components/Header/HeaderSencillo";
import { Menu } from "lucide-react";
import { useRedireccionCurso } from "@/features/auth";

import { logoutUser } from "@/features/auth";

const UserPage = () => {
  const [seccion, setSeccion] = useState<
    "menu" | "carrito" | "pedidos" | "perfil"
  >("menu");
  useRedireccionCurso(setSeccion);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleSelect = (opcion: typeof seccion) => {
    setSeccion(opcion);
    setSidebarVisible(false); // Oculta la sidebar en móvil
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <HeaderSencillo />

      {/* Botón menú para móviles */}
      <div className="sm:hidden flex items-center justify-between bg-gray-100 p-3 shadow z-40">
        <button onClick={() => setSidebarVisible(!sidebarVisible)}>
          <Menu size={24} />
        </button>
        <span className="font-semibold">Sección: {seccion}</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside
          className={`absolute sm:static top-0 left-0 h-full sm:h-auto w-64 bg-gray-100 p-4 flex flex-col justify-between z-40 transition-transform transform ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="space-y-2">
            <button
              onClick={() => handleSelect("menu")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "menu"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c] text-black"
              }`}
            >
              🍽️ Menú
            </button>
            <button
              onClick={() => handleSelect("carrito")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "carrito"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c] text-black"
              }`}
            >
              🛒 Carrito
            </button>
            <button
              onClick={() => handleSelect("pedidos")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "pedidos"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c] text-black"
              }`}
            >
              📦 Mis pedidos
            </button>
            <button
              onClick={() => handleSelect("perfil")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "perfil"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c] text-black"
              }`}
            >
              👤 Perfil
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full text-left text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded transition cursor-pointer"
          >
            🔒 Cerrar sesión
          </button>
        </aside>

        {/* CONTENIDO */}
        <div className="flex-1 w-full flex flex-col">
          <nav className="hidden sm:block bg-blue-100 p-3">
            Plataforma del cliente - Sección: <strong>{seccion}</strong>
          </nav>

          <main className="p-6 overflow-y-auto flex-1 bg-white">
            {seccion === "menu" && <MenuCliente />}
            {seccion === "carrito" && <CarritoCliente />}
            {seccion === "pedidos" && <MisPedidos />}
            {seccion === "perfil" && <PerfilUsuario />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
