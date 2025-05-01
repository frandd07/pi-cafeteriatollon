import { useEffect, useState } from "react";
import { getUsuariosFiltrados, marcarUsuarioComoVerificado } from "../services";
import toast from "react-hot-toast";
import { eliminarUsuario as eliminarUsuarioService } from "../services/userService";
import { Usuario } from "@/interfaces";

export const useUsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<
    "todos" | "alumno" | "profesor" | "personal"
  >("todos");
  const [busqueda, setBusqueda] = useState("");

  const fetchUsuarios = async () => {
    setLoading(true);

    const data = await getUsuariosFiltrados(filtroTipo);
    if (data) setUsuarios(data);

    setLoading(false);
  };

  const verificarUsuario = async (id: string) => {
    const success = await marcarUsuarioComoVerificado(id);
    if (success) fetchUsuarios();
  };

  const handleEliminar = async (id: string, toastId: string) => {
    const success = await eliminarUsuarioService(id);
    toast.dismiss(toastId);
    if (success) {
      toast.success("✅ Usuario eliminado correctamente");
      fetchUsuarios();
    } else {
      toast.error("❌ Error al eliminar el usuario");
    }
  };

  const eliminarUsuario = (id: string) => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-2 w-80">
        <p className="font-medium text-gray-800">¿Eliminar usuario?</p>
        <p className="text-sm text-gray-500">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleEliminar(id, t.id)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    fetchUsuarios();
  }, [filtroTipo]);

  return {
    usuarios,
    loading,
    filtroTipo,
    setFiltroTipo,
    busqueda,
    setBusqueda,
    verificarUsuario,
    eliminarUsuario,
  };
};
