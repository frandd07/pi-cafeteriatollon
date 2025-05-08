import { usePerfilUsuario } from "../hooks/usePerfilUsuario";
import { useState } from "react";

const PerfilUsuario = () => {
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
    } catch (error) {
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

  const nombreCompleto =
    perfil?.nombre && perfil?.apellido1
      ? `${perfil.nombre} ${perfil.apellido1}`
      : "Usuario";

  const iniciales = nombreCompleto
    .split(" ")
    .map((nombre) => nombre[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cabecera con avatar */}
      <div className="bg-gradient-to-r from-[#fa6a69] to-[#fa8c8b] p-6 flex items-center">
        <div className="h-20 w-20 rounded-full flex items-center justify-center bg-white text-[#fa6a69] text-2xl font-bold mr-4 shadow-md">
          {iniciales}
        </div>
        <div className="text-white">
          <h2 className="text-2xl font-semibold">{nombreCompleto}</h2>
          <p className="text-white opacity-90">
            {perfil?.email || "Sin correo"}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {mensaje.texto && (
          <div
            className={`mb-4 p-3 rounded-md ${
              mensaje.tipo === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Información académica
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curso actual
            </label>
            <div className={`relative ${!puedeEditar ? "opacity-75" : ""}`}>
              <input
                type="text"
                value={curso || ""}
                onChange={(e) => setCurso(e.target.value)}
                disabled={!puedeEditar || guardando}
                placeholder="No disponible"
                className={`w-full p-3 border ${
                  !puedeEditar ? "bg-gray-50" : "bg-white"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              />
              {!puedeEditar && (
                <div className="absolute right-3 top-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {!puedeEditar ? (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center text-amber-700 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 flex-shrink-0"
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
              <span>No puedes editar tu curso en este momento.</span>
            </div>
          ) : (
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className={`w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all ${
                guardando ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {guardando ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
