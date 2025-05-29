import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  const { form, handleChange, handleSubmit, message } = useRegister();

  // Cursos organizados por categorías para mejor UX
  const cursosOrganizados = {
    ESO: {
      "1º ESO": ["1º ESO A", "1º ESO B", "1º ESO C", "1º ESO D"],
      "2º ESO": ["2º ESO A", "2º ESO B", "2º ESO C", "2º ESO D"],
      "3º ESO": ["3º ESO A", "3º ESO B", "3º ESO C", "3º ESO D"],
      "4º ESO": ["4º ESO A", "4º ESO B", "4º ESO C", "4º ESO D"],
    },
    Bachillerato: {
      "1º Bachillerato": ["1º Bachillerato"],
      "2º Bachillerato": ["2º Bachillerato"],
    },
    "Ciclos Formativos": {
      "SMR (Sistemas Microinformáticos y Redes)": ["1º SMR", "2º SMR"],
      "DAM (Desarrollo de Aplicaciones Multiplataforma)": ["1º DAM", "2º DAM"],
    },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo electrónico
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2"></path>
              <path d="M2 6l10 7 10-7"></path>
              <path d="M2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6"></path>
            </svg>
          </div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="nombre@ejemplo.com"
            required
            onChange={handleChange}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            onChange={handleChange}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="apellido1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Primer Apellido
          </label>
          <input
            id="apellido1"
            type="text"
            name="apellido1"
            placeholder="Primer apellido"
            required
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="apellido2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Segundo Apellido
          </label>
          <input
            id="apellido2"
            type="text"
            name="apellido2"
            placeholder="Segundo apellido"
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="tipo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tipo de usuario
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <select
            id="tipo"
            name="tipo"
            required
            onChange={handleChange}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all appearance-none bg-white"
          >
            <option value="">Seleccionar tipo</option>
            <option value="alumno">Alumno</option>
            <option value="profesor">Profesor</option>
            <option value="personal">Personal</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {form.tipo === "alumno" && (
        <div>
          <label
            htmlFor="curso"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Curso
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <select
              id="curso"
              name="curso"
              value={form.curso}
              required
              onChange={handleChange}
              className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all appearance-none bg-white"
            >
              <option value="">Selecciona tu curso</option>
              {Object.entries(cursosOrganizados).map(([categoria, niveles]) => (
                <optgroup key={categoria} label={categoria}>
                  {Object.entries(niveles).map(([nivel, cursos]) =>
                    cursos.map((curso) => (
                      <option key={curso} value={curso}>
                        {curso}
                      </option>
                    ))
                  )}
                </optgroup>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-[#fa6a69] hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa6a69] transition-all duration-150 transform hover:scale-[1.02] cursor-pointer"
        >
          Crear Cuenta
        </button>
      </div>

      {message && (
        <div
          className={`mt-6 p-4 rounded-lg flex items-center ${
            message.includes("error")
              ? "bg-red-50 text-red-700 border-l-4 border-red-400"
              : "bg-green-50 text-green-700 border-l-4 border-green-400"
          }`}
        >
          <span className="mr-2">
            {message.includes("error") ? (
              <svg
                className="text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
              </svg>
            ) : (
              <svg
                className="text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
          </span>
          {message}
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
