import React, { useState } from "react";
import { usePerfilUsuario } from "../hooks/usePerfilUsuario";

const PerfilUsuario: React.FC = () => {
  const { curso, setCurso, puedeEditar, cargando, perfil, guardarCurso } =
    usePerfilUsuario();
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const handleGuardar = async () => {
    try {
      setGuardando(true);
      await guardarCurso();
      setMensaje({
        texto: "¡Cambios guardados correctamente!",
        tipo: "success",
      });
      setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
    } catch {
      setMensaje({ texto: "Error al guardar los cambios", tipo: "error" });
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="p-8 text-red-600">
        ⚠️ No se pudo cargar tu perfil. Por favor, recarga la página.
      </div>
    );
  }

  const nombreCompleto = `${perfil.nombre} ${perfil.apellido1}`;
  const iniciales = nombreCompleto
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#fa6a69] to-[#fa8c8b] p-8 flex items-center">
        <div className="h-24 w-24 rounded-full flex items-center justify-center bg-white text-[#fa6a69] text-3xl font-bold mr-6 shadow-lg">
          {iniciales}
        </div>
        <div className="text-white">
          <h2 className="text-3xl font-semibold">{nombreCompleto}</h2>
          <p className="text-white opacity-90 text-lg">
            {perfil.email || "Sin correo"}
          </p>
        </div>
      </div>
      <div className="p-8">
        {mensaje.texto && (
          <div
            className={`mb-6 p-4 rounded-md ${
              mensaje.tipo === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {mensaje.texto}
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            Información académica
          </h3>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Curso actual
            </label>
            <input
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              disabled={!puedeEditar || guardando}
              placeholder="No disponible"
              className={`w-full p-4 border ${
                !puedeEditar ? "bg-gray-50" : "bg-white"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg`}
            />
            {!puedeEditar && (
              <div className="mt-2 text-amber-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                No puedes editar tu curso en este momento.
              </div>
            )}
          </div>
          {puedeEditar && (
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className={`cursor-pointer w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all text-lg ${
                guardando ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
