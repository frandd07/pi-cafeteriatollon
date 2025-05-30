import { Producto } from "@/interfaces";
import { useNavigate } from "react-router-dom";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-w-[280px] bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      {producto.imagen && (
        <div className="relative overflow-hidden h-52">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          {producto.nombre}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-green-700">
            {producto.precio.toFixed(2)} €
          </p>
          <button
            onClick={handleAddClick}
            className="cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
