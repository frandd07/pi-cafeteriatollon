"use client";

import { useRef, useState } from "react";
import { Gift } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  useAutoScroll,
  useProductosAleatorios,
  useScrollSections,
} from "../hooks";
import { ProductoCard } from "../components";

const LandingPage = () => {
  const { productos, loading } = useProductosAleatorios();
  const carruselRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    section1: false,
    section3: false,
    section4: false,
  });

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useAutoScroll(carruselRef.current);
  useScrollSections((id, visible) =>
    setIsVisible((prev) => ({ ...prev, [id]: visible }))
  );

  return (
    <main className="font-sans overflow-hidden">
      <Header />

      {/* SECTION 1 */}
      <section
        id="section1"
        className={`bg-gradient-to-br from-[#fa6a69] to-[#f43f5e] flex flex-col md:flex-row items-center justify-between py-24 relative transition-all duration-700 ${
          isVisible.section1
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute -left-10 top-1/3 w-32 h-32 bg-yellow-100 rounded-full opacity-40 animate-pulse"></div>

        {/* TEXTO */}
        <div className="w-full md:w-1/2 px-6 md:px-20 xl:px-32 text-white">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-left">
            <span>Sumérgete en un nuevo mundo y...</span>
            <span className="block bg-white bg-clip-text text-transparent">
              PIDE TU DESAYUNO
            </span>
          </h2>
          <p className="text-xl mb-8 text-left">
            Tu desayuno listo en segundos con nuestra app
          </p>

          <div className="w-full flex justify-start">
            <button
              className={`bg-white text-[#fa6a69] px-8 py-4 rounded-full font-extrabold text-lg hover:opacity-90 transition shadow-lg flex items-center gap-2 ${
                hoveredButton === "discover-more" ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredButton("discover-more")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              ¡Descarga nuestra APP!
              <Gift
                size={20}
                className={`transition-transform duration-300 ${
                  hoveredButton === "discover-more" ? "rotate-12" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* MOCKUP */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 px-6">
          <div className="relative p-4 rounded-3xl bg-gradient-to-br from-[#fa6a69] to-[#f43f5e]">
            <div className="bg-white rounded-[2rem] p-4 w-[300px] h-[600px]">
              <img
                src="/images/movil.png"
                alt="App cafetería"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Carrusel */}
      {!loading && (
        <section id="section3" className="bg-white text-[#131b2b] px-6 py-24">
          <div className="max-w-7xl mx-auto relative">
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">
              Productos <span className="italic">destacados</span>
            </h2>

            <div
              ref={carruselRef}
              className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-8"
            >
              {productos.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default LandingPage;
