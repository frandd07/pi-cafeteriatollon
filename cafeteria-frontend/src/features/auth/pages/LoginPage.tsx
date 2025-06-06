"use client";

import HeaderSencillo from "@/components/Header/HeaderSencillo";
import { LoginForm } from "../components";
import { Footer } from "@/components/Footer";

const LoginPage = () => {
  return (
    <>
      {/* 1) Header fijo arriba */}
      <HeaderSencillo />

      {/* 2) Main empujado bajo el header */}
      <main className="pt-28 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md px-4 sm:px-0">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <a href="/" className="block">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-32 h-32 object-contain"
              />
            </a>
          </div>

          <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-center text-gray-600 mb-8">Accede a tu cuenta</p>

          {/* Contenedor blanco con borde coral */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-200 relative overflow-visible">
            {/* Filo coral superior */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#fa6a69]" />

            {/* 3) Formulario */}
            <LoginForm />

            {/* Separador y CTA */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    ¿Nuevo en la plataforma?
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => (location.href = "/register")}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa6a69] cursor-pointer"
                >
                  Crear una cuenta nueva
                </button>
              </div>
            </div>

            {/* Elemento decorativo */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-red-100 rounded-full opacity-30" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
