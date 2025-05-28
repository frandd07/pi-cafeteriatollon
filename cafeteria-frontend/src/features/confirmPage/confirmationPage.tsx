import { useState, useEffect } from "react";
import { CheckCircle, Mail, ArrowRight, Sparkles } from "lucide-react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function ConfirmationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Crear partículas de celebración
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas de fondo animadas */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute opacity-60 animate-bounce"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          <Sparkles className="w-4 h-4 text-red-400" />
        </div>
      ))}

      {/* Círculos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-16 h-16 rounded-full opacity-25 animate-pulse"
        style={{ backgroundColor: "#ff6c6c", animationDelay: "0.5s" }}
      ></div>

      {/* Contenido principal */}
      <div
        className={`max-w-md w-full text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Icono principal animado */}
        <div className="relative mb-8">
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-2xl animate-bounce mb-4"
            style={{ background: "linear-gradient(135deg, #ff6c6c, #ff8a65)" }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Anillos de pulso */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 border-4 rounded-full animate-ping opacity-30"
              style={{ borderColor: "#ff6c6c" }}
            ></div>
            <div
              className="absolute w-32 h-32 border-2 rounded-full animate-ping opacity-20"
              style={{ borderColor: "#ff8a65", animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* Título principal */}
        <h1
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #ff6c6c, #d32f2f)",
          }}
        >
          ¡Correo Confirmado!
        </h1>

        {/* Subtítulo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Mail className="w-5 h-5" style={{ color: "#ff6c6c" }} />
          <p className="text-gray-600 text-lg">
            Tu cuenta ha sido verificada exitosamente
          </p>
        </div>

        {/* Tarjeta de información */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border mb-8"
          style={{ borderColor: "#ff6c6c22" }}
        >
          <p className="text-gray-700 mb-4">
            ¡Perfecto! Ya tienes acceso completo a todas las funcionalidades de
            la aplicación.
          </p>

          {/* Botón de acción principal */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="group w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
            style={{
              background: "linear-gradient(135deg, #ff6c6c, #f44336)",
              boxShadow: "hover:0 10px 25px rgba(255, 108, 108, 0.3)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #e53935, #d32f2f)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #ff6c6c, #f44336)";
            }}
          >
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          background: "linear-gradient(90deg, #ff6c6c, #ff8a65, #ff6c6c)",
        }}
      ></div>
    </div>
  );
}
