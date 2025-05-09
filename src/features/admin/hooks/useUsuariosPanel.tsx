import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  getUsuariosFiltrados,
  marcarUsuarioComoVerificado,
  eliminarUsuario as eliminarUsuarioService,
  eliminarUsuariosMasivo,
} from "../services";
import { Usuario } from "@/interfaces";

export const useUsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros existentes
  const [filtroTipo, setFiltroTipo] = useState<
    "todos" | "alumno" | "profesor" | "personal"
  >("todos");
  const [busqueda, setBusqueda] = useState("");

  // --- NUEVO filtro de estado ---
  type EstadoFiltro =
    | "todos"
    | "noVerificados"
    | "debenActualizar"
    | "normales";
  const [filtroEstado, setFiltroEstado] = useState<EstadoFiltro>("todos");
  // --------------------------------

  const fetchUsuarios = async () => {
    setLoading(true);
    const data = await getUsuariosFiltrados(filtroTipo);
    if (data) setUsuarios(data);
    setLoading(false);
  };

  // Aplica filtros de búsqueda, tipo y estado sobre el array que viene de la API
  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter((u) => {
        // filtro por texto (nombre + apellidos)
        const texto = `${u.nombre} ${u.apellido1} ${
          u.apellido2 || ""
        }`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
      })
      .filter((u) => {
        // filtro por tipo
        return filtroTipo === "todos" || u.tipo === filtroTipo;
      })
      .filter((u) => {
        // filtro por estado de verificación / actualización
        switch (filtroEstado) {
          case "noVerificados":
            return !u.verificado;
          case "debenActualizar":
            return u.debe_actualizar_curso;
          case "normales":
            return u.verificado && !u.debe_actualizar_curso;
          default:
            return true;
        }
      });
  }, [usuarios, busqueda, filtroTipo, filtroEstado]);

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
            className="cursor-pointer px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleEliminar(id, t.id)}
            className="cursor-pointer px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };

  const eliminarUsuariosSeleccionados = (ids: string[]) => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col gap-2 w-80">
        <p className="font-medium text-gray-800">
          ¿Eliminar {ids.length} usuarios?
        </p>
        <p className="text-sm text-gray-500">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const ok = await eliminarUsuariosMasivo(ids);
              if (ok) {
                toast.success("✅ Usuarios eliminados");
                fetchUsuarios();
              } else {
                toast.error("❌ Error al eliminar usuarios");
              }
            }}
            className="cursor-pointer px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
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
    usuarios: usuariosFiltrados, // ahora devolvemos los ya filtrados
    loading,
    filtroTipo,
    setFiltroTipo,
    busqueda,
    setBusqueda,
    filtroEstado, // expuesto para el componente
    setFiltroEstado, // expuesto para el componente
    verificarUsuario,
    eliminarUsuario,
    eliminarUsuariosSeleccionados,
  };
};
