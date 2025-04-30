import { useState, useEffect } from "react";

type SpinnerSize = "sm" | "md" | "lg";

const CORAL = "#fa6a69";
const YELLOW = "#f4d03e";

const Spinner = ({
  size = "md",
  text = "Cargando",
}: {
  size?: SpinnerSize;
  text?: string;
}) => {
  const [dots, setDots] = useState("");

  // Animación de los puntos suspensivos
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  // Mapeo de tamaños
  const sizeClasses: Record<
    SpinnerSize,
    {
      container: string;
      outer: string;
      middle: string;
      inner: string;
    }
  > = {
    sm: {
      container: "w-16 h-16",
      outer: "w-16 h-16",
      middle: "w-12 h-12",
      inner: "w-8 h-8",
    },
    md: {
      container: "w-24 h-24",
      outer: "w-24 h-24",
      middle: "w-16 h-16",
      inner: "w-10 h-10",
    },
    lg: {
      container: "w-32 h-32",
      outer: "w-32 h-32",
      middle: "w-24 h-24",
      inner: "w-16 h-16",
    },
  };

  const sizeCls = sizeClasses[size];
  const textSizeClass =
    size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Contenedor principal */}
      <div
        className={`relative ${sizeCls.container} flex items-center justify-center`}
      >
        {/* Anillo exterior con rotación */}
        <div
          className={`absolute ${sizeCls.outer} border-4 rounded-full animate-spin`}
          style={{
            borderColor: YELLOW,
            borderTopColor: CORAL,
            borderRightColor: YELLOW,
            animationDuration: "3s",
          }}
        />

        {/* Anillo medio con rotación contraria */}
        <div
          className={`absolute ${sizeCls.middle} border-4 rounded-full animate-spin`}
          style={{
            borderColor: CORAL,
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            animationDuration: "1.5s",
            animationDirection: "reverse",
          }}
        />

        {/* Anillo interior pulsante */}
        <div
          className={`${sizeCls.inner} border-4 rounded-full animate-pulse flex items-center justify-center`}
          style={{ borderColor: YELLOW }}
        >
          <div
            className="w-1/2 h-1/2 rounded-full animate-ping"
            style={{ backgroundColor: CORAL, animationDuration: "1s" }}
          />
        </div>
      </div>

      {/* Texto con efecto fade */}
      {text && (
        <div
          className={`mt-6 font-bold ${textSizeClass} tracking-wide flex items-center`}
          style={{ color: CORAL }}
        >
          <span className="animate-pulse mr-1">{text}</span>
          <span className="w-8 text-left">{dots}</span>
        </div>
      )}
    </div>
  );
};

export default Spinner;
