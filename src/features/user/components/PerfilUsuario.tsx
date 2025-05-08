import { usePerfilUsuario } from "../hooks/usePerfilUsuario";

const PerfilUsuario = () => {
  const { curso, setCurso, puedeEditar, cargando, perfil, guardarCurso } =
    usePerfilUsuario();

  if (cargando)
    return <p className="text-center text-gray-500">Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Perfil del usuario</h2>

      <div className="mb-4 text-sm text-gray-700">
        <p>
          <strong>Nombre:</strong> {perfil?.nombre} {perfil?.apellido1}
        </p>
        <p>
          <strong>Email:</strong> {perfil?.email}
        </p>
      </div>

      <label className="block mb-2 font-medium">Curso actual:</label>
      <input
        type="text"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        disabled={!puedeEditar}
        placeholder="No disponible"
        className="w-full px-3 py-2 border rounded mb-4"
      />

      {puedeEditar ? (
        <button
          onClick={guardarCurso}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      ) : (
        <p className="text-sm text-gray-500 mt-3">
          No puedes editar tu curso en este momento.
        </p>
      )}
    </div>
  );
};

export default PerfilUsuario;
