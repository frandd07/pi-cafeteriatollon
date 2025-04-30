"use client";

import { Spinner } from "@/components/Spinner";
import { useUsuariosPanel } from "../hooks";

const UsuariosPanel = () => {
  const {
    usuarios,
    loading,
    filtroTipo,
    setFiltroTipo,
    busqueda,
    setBusqueda,
    verificarUsuario,
    eliminarUsuario,
  } = useUsuariosPanel();

  if (loading) return <Spinner />;

  const usuariosFiltrados = usuarios.filter(
    (user) =>
      `${user.nombre} ${user.apellido1 ?? ""} ${user.apellido2 ?? ""}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      user.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <h2 className="text-xl font-bold">Gestión de Usuarios</h2>

        <div className="flex gap-3">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="border px-2 py-1 rounded"
          >
            <option value="todos">Todos</option>
            <option value="alumno">Alumnos</option>
            <option value="profesor">Profesores</option>
            <option value="personal">Personal</option>
          </select>

          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email"
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Nombre completo</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Tipo</th>
            <th className="border px-4 py-2 text-left">Curso</th>
            <th className="border px-4 py-2 text-left">Verificado</th>
            <th className="border px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                {user.nombre} {user.apellido1 ?? ""} {user.apellido2 ?? ""}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.tipo}</td>
              <td className="border px-4 py-2">
                {user.tipo === "alumno" ? user.curso : "-"}
              </td>
              <td className="border px-4 py-2">
                {user.verificado ? "✅" : "❌"}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {!user.verificado && (
                  <button
                    onClick={() => verificarUsuario(user.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Verificar
                  </button>
                )}
                <button
                  onClick={() => eliminarUsuario(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosPanel;
