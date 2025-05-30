"use client";

import { useState } from "react";
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
    filtroEstado,
    setFiltroEstado,
    verificarUsuario,
    eliminarUsuario,
    eliminarUsuariosSeleccionados,
  } = useUsuariosPanel();

  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());

  const usuariosFiltrados = usuarios.filter(
    (user) =>
      // filtro de búsqueda
      `${user.nombre} ${user.apellido1 ?? ""} ${user.apellido2 ?? ""}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      user.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleSeleccion = (id: string) => {
    setSeleccionados((prev) => {
      const copia = new Set(prev);
      copia.has(id) ? copia.delete(id) : copia.add(id);
      return copia;
    });
  };

  const seleccionarTodos = () => {
    if (seleccionados.size === usuariosFiltrados.length) {
      setSeleccionados(new Set());
    } else {
      setSeleccionados(new Set(usuariosFiltrados.map((u) => u.id)));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      {/* Encabezado y filtros */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <h2 className="text-xl font-bold">Gestión de Usuarios</h2>

        <div className="flex gap-3">
          {/* Filtro por tipo */}
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="cursor-pointer border px-2 py-1 rounded"
          >
            <option value="todos">Todos</option>
            <option value="alumno">Alumnos</option>
            <option value="profesor">Profesores</option>
            <option value="personal">Personal</option>
          </select>

          {/* Filtro de búsqueda */}
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email"
            className="border px-2 py-1 rounded"
          />

          {/* Filtro por estado */}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as any)}
            className="cursor-pointer border px-2 py-1 rounded"
          >
            <option value="todos">Todos los estados</option>
            <option value="noVerificados">No verificados</option>
            <option value="debenActualizar">Por actualizar</option>
            <option value="normales">Al día</option>
          </select>
        </div>
      </div>

      {/* Botón de eliminación masiva */}
      {seleccionados.size > 0 && (
        <div className="mb-4">
          <button
            onClick={() =>
              eliminarUsuariosSeleccionados(Array.from(seleccionados))
            }
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Eliminar {seleccionados.size} seleccionados
          </button>
        </div>
      )}

      {/* Tabla de usuarios */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-white">
          <tr>
            <th className="border px-4 py-2">
              <input
                type="checkbox"
                checked={
                  seleccionados.size === usuariosFiltrados.length &&
                  usuariosFiltrados.length > 0
                }
                onChange={seleccionarTodos}
              />
            </th>
            <th className="border px-4 py-2 text-left">Nombre completo</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Tipo</th>
            <th className="border px-4 py-2 text-left">Curso</th>
            <th className="border px-4 py-2 text-left">Verificado</th>
            <th className="border px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((user) => {
            // Colores más contrastados:
            // - No verificados: rojo intenso
            // - Por actualizar: gris oscuro
            // - Normales: blanco
            const bgClass = !user.verificado
              ? "bg-red-300"
              : user.debe_actualizar_curso
              ? "bg-gray-300"
              : "bg-white";

            return (
              <tr key={user.id} className={bgClass}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={seleccionados.has(user.id)}
                    onChange={() => toggleSeleccion(user.id)}
                  />
                </td>
                <td className="border px-4 py-2">
                  {user.nombre} {user.apellido1 ?? ""} {user.apellido2 ?? ""}
                </td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.tipo}</td>
                <td className="border px-4 py-2">
                  {user.tipo === "alumno" ? user.curso : "-"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {user.verificado ? "✅" : "❌"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {!user.verificado && (
                    <button
                      onClick={() => verificarUsuario(user.id)}
                      className="cursor-pointer bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Verificar
                    </button>
                  )}
                  <button
                    onClick={() => eliminarUsuario(user.id)}
                    className="cursor-pointer bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosPanel;
