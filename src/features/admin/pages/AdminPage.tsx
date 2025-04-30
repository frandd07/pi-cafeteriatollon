"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { UsuariosPanel } from "../components";
import MenuPanel from "./MenuPanel";
import HeaderSencillo from "@/components/Header/HeaderSencillo";
import AdminPedidos from "./AdminPedidos";
import { Menu } from "lucide-react";

const AdminPage = () => {
  const [seccion, setSeccion] = useState<"usuarios" | "menu" | "pedidos">(
    "usuarios"
  );
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
        {/* SIDEBAR superpuesta en móvil */}
        <aside
          className={`absolute md:static top-0 left-0 h-full md:h-auto w-64 bg-gray-100 p-4 flex flex-col justify-between z-40 transition-transform transform ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="space-y-2">
            <button
              onClick={() => handleSelect("usuarios")}
              className="w-full text-left hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600 cursor-pointer"
            >
              Usuarios
            </button>
            <button
              onClick={() => handleSelect("menu")}
              className="w-full text-left hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600 cursor-pointer"
            >
              Menú
            </button>
            <button
              onClick={() => handleSelect("pedidos")}
              className="w-full text-left hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600 cursor-pointer"
            >
              Pedidos
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full text-left text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded cursor-pointer transition"
          >
            Cerrar sesión
          </button>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
