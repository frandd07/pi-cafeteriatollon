"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { MenuCliente } from "../components";
import { CarritoCliente } from "../components";
import { MisPedidos } from "../components";
import HeaderSencillo from "@/components/Header/HeaderSencillo";

const UserPage = () => {
  const [seccion, setSeccion] = useState<
    "menu" | "carrito" | "pedidos" | "perfil"
  >("menu");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <HeaderSencillo />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-100 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <button
              onClick={() => setSeccion("menu")}
              className="w-full text-left cursor-pointer hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600"
            >
              🍽️ Menú
            </button>
            <button
              onClick={() => setSeccion("carrito")}
              className="w-full text-left cursor-pointer hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600"
            >
              🛒 Carrito
            </button>
            <button
              onClick={() => setSeccion("pedidos")}
              className="w-full text-left cursor-pointer hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600"
            >
              📦 Mis pedidos
            </button>
            <button
              onClick={() => setSeccion("perfil")}
              className="w-full text-left cursor-pointer hover:bg-blue-100 px-3 py-2 rounded transition text-blue-600"
            >
              👤 Perfil
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
        <div className="flex-1 flex flex-col">
          {/* NAVBAR */}
          <nav className="bg-blue-100 p-3">
            Plataforma del cliente - Sección: <strong>{seccion}</strong>
          </nav>

          {/* CONTENIDO dinámico */}
          <main className="p-6 overflow-y-auto flex-1 bg-white">
            {seccion === "menu" && <MenuCliente />}
            {seccion === "carrito" && <CarritoCliente />}
            {seccion === "pedidos" && <MisPedidos />}

            {seccion === "perfil" && (
              <div>👤 Aquí va el perfil del usuario</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
