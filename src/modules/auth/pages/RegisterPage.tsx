"use client";

import { Link } from "react-router-dom";
import { RegisterForm } from "../components";
import HeaderSencillo from "@/components/Header/HeaderSencillo";
import { Footer } from "@/components/Footer";

const RegisterPage = () => {
  return (
    <>
      <HeaderSencillo />
      <div className="pt-28 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <Link to="/" className="block">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-32 h-32 object-contain"
              />
            </Link>
          </div>

          <h2 className="text-center cursor-pointer text-3xl font-bold text-gray-800 mb-2 ">
            Crear Cuenta
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Regístrate para acceder a la plataforma
          </p>

          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-200 relative overflow-visible">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#fa6a69]"></div>

            <RegisterForm />

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    ¿Ya tienes una cuenta?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => (location.href = "/login")}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa6a69] cursor-pointer"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-red-100 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
