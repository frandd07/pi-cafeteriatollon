import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, message, handleLogin } =
    useLogin();

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
            placeholder="nombre@ejemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
        </div>
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
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-[#fa6a69] focus:border-[#fa6a69] outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-2">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-[#fa6a69] hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa6a69] transition-all duration-150 transform hover:scale-[1.02] cursor-pointer"
        >
          Iniciar Sesión
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

export default LoginForm;
