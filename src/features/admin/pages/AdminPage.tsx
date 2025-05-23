"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { UsuariosPanel } from "../components";
import MenuPanel from "./MenuPanel";
import HeaderSencillo from "@/components/Header/HeaderSencillo";
import AdminPedidos from "./AdminPedidos";
import HistorialPedidos from "./HistorialPedidos"; // ← Nuevo import
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import { logoutUser } from "@/features/auth";

const AdminPage = () => {
  // ✅ Añadimos "historial" al tipo de sección
  const [seccion, setSeccion] = useState<
    "usuarios" | "menu" | "pedidos" | "historial"
  >("usuarios");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    const mostrarToken = async () => {
      const session = await supabase.auth.getSession();
      console.log("TOKEN DEL ADMIN:", session.data.session?.access_token);
    };
    mostrarToken();
  }, []);

  const handleSelect = (opcion: typeof seccion) => {
    setSeccion(opcion);
    setSidebarVisible(false); // Oculta la sidebar en móvil
  };

  const activarNuevoCurso = async () => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          ¿Iniciar un nuevo curso escolar? <br />
          Esto hará que todos los alumnos deban actualizar su curso.
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const session = await supabase.auth.getSession();
                  const token = session.data.session?.access_token;
                  const res = await fetch(
                    "http://localhost:3001/usuarios/iniciar-curso",
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (res.ok) {
                    toast.success("Nuevo curso activado 🎓");
                  } else {
                    const { error } = await res.json();
                    toast.error(`Error al activar curso: ${error}`);
                  }
                } catch (error) {
                  toast.error("Error inesperado");
                  console.error("Error:", error);
                }
              }}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Confirmar
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
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

            {/* Nuevo botón Historial */}
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
          <div className="space-y-2 mt-auto">
            <button
              onClick={activarNuevoCurso}
              className="w-full text-left px-3 py-2 rounded transition cursor-pointer text-yellow-700 hover:bg-yellow-200 bg-white"
            >
              🏫 Iniciar nuevo curso escolar
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded cursor-pointer transition"
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
            {seccion === "historial" && <HistorialPedidos />} {/* ← Aquí */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
