import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Wave separator */}
        <div className="relative -mt-28 mb-12">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-28 fill-gray-900 transform rotate-180"
          ></svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contacto primero */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[#fa6a69]">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-[#fa6a69] mt-1 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Av. Blas Infante, s/n, 41749 El Cuervo, Sevilla
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#fa6a69] flex-shrink-0" />
                <span className="text-gray-300">+34 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#fa6a69] flex-shrink-0" />
                <span className="text-gray-300">cafeterialaguna@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Ubicación como cuadro pequeño */}
          <div>
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <div className="p-3 bg-gradient-to-r from-[#fa6a69] to-[#e85958]">
                <h4 className="text-xl font-semibold flex items-center">
                  <MapPin size={20} className="mr-2" /> Nuestra Ubicación
                </h4>
              </div>

              <div className="aspect-video w-full h-40">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.473467438095!2d-6.036515725792161!3d36.85508436460647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0d94efb48872e9%3A0xf0b4da93d1ea943a!2sInstituto%20de%20Educaci%C3%B3n%20Secundaria%20IES%20Laguna%20de%20Toll%C3%B3n!5e0!3m2!1ses!2ses!4v1743780090036!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación IES Laguna de Tollón"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-3 bg-gray-800 flex justify-between items-center">
                <p className="text-sm text-gray-300">IES Laguna de Tollón</p>
                <a
                  href="https://maps.app.goo.gl/aCmim8jB1mKudzdU8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#fa6a69] hover:text-[#e85958] text-sm font-medium"
                >
                  Cómo llegar <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[#fa6a69]">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 block"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 block"
                >
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 block"
                >
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[#fa6a69]">
              Horario
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Clock
                  size={18}
                  className="text-[#fa6a69] mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-white font-medium">Lunes - Viernes</p>
                  <p className="text-gray-300">7:30 - 12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Copyright y enlaces legales */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            <p>
              © {new Date().getFullYear()} Café Campus. Todos los derechos
              reservados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white transition">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white transition">
              Términos de Uso
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
            <div className="flex items-center">
              <span>Hecho por</span>
              <Heart size={14} className="text-[#fa6a69] mx-1" />
              <span>Fran</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
