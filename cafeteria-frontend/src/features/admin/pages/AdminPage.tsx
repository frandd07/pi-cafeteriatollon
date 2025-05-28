"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderSencillo from "@/components/Header/HeaderSencillo";
import { UsuariosPanel } from "../components";
import MenuPanel from "./MenuPanel";
import AdminPedidos from "./AdminPedidos";
import HistorialPedidos from "./HistorialPedidos";

import { Menu } from "lucide-react";
import { logoutUser } from "@/features/auth";
import { useNuevoCurso } from "../hooks";

const AdminPage = () => {
  const [seccion, setSeccion] = useState<
    "usuarios" | "menu" | "pedidos" | "historial"
  >("usuarios");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const { activar: activarNuevoCurso } = useNuevoCurso();

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
      <div className="md:hidden flex items-center justify-between bg-gray-100 p-3 shadow z-40">
        <button onClick={() => setSidebarVisible(!sidebarVisible)}>
          <Menu size={24} />
        </button>
        <span className="font-semibold text-sm">
          Sección: <strong>{seccion}</strong>
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside
          className={`absolute md:static top-0 left-0 h-full md:h-auto w-64 bg-gray-100 p-4 flex flex-col justify-between z-40 transition-transform transform ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="space-y-2">
            <button
              onClick={() => handleSelect("usuarios")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "usuarios"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c]"
              }`}
            >
              👥 Usuarios
            </button>

            <button
              onClick={() => handleSelect("menu")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "menu"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c]"
              }`}
            >
              🍽️ Menú
            </button>

            <button
              onClick={() => handleSelect("pedidos")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "pedidos"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c]"
              }`}
            >
              📦 Pedidos
            </button>

            <button
              onClick={() => handleSelect("historial")}
              className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                seccion === "historial"
                  ? "bg-[#ff6c6c] text-white"
                  : "bg-gray-100 hover:bg-[#ff9c9c]"
              }`}
            >
              📜 Historial
            </button>
          </div>

          {/* Botones al fondo */}
          <div className="space-y-0 mt-auto mb-10 md:mb-0">
            <button
              onClick={activarNuevoCurso}
              className="w-full text-left px-3 py-8 md:py-2 rounded transition cursor-pointer text-yellow-700 hover:bg-yellow-200"
            >
              🏫 Iniciar nuevo curso escolar
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-8 md:py-2 rounded cursor-pointer transition text-red-600 hover:bg-red-600 hover:text-white -mt-2"
            >
              🔒 Cerrar sesión
            </button>
          </div>
        </aside>

        {/* CONTENIDO */}
        <div className="flex-1 w-full flex flex-col">
          <nav className="hidden md:block bg-blue-100 p-3 text-sm">
            Panel de administración - Sección: <strong>{seccion}</strong>
          </nav>

          <main className="p-6 overflow-y-auto flex-1 bg-white">
            {seccion === "usuarios" && <UsuariosPanel />}
            {seccion === "menu" && <MenuPanel />}
            {seccion === "pedidos" && <AdminPedidos />}
            {seccion === "historial" && <HistorialPedidos />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
