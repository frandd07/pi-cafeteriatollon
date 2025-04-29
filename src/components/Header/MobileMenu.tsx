import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const MobileMenu = ({ menuAbierto }: any) => {
  return (
    <div
      className={`sm:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
        menuAbierto
          ? "max-h-48 opacity-100 translate-y-0 py-4"
          : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
      }`}
    >
      <nav className="container mx-auto px-4 flex flex-col gap-3">
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 bg-white/90 text-[#fa6a69] font-semibold px-4 py-3 rounded-lg hover:bg-white transition"
        >
          <LogIn size={18} />
          <span>Iniciar sesión</span>
        </Link>
        <Link
          to="/register"
          className="flex items-center justify-center gap-2 bg-[#56b0de] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#4a99c5] transition"
        >
          <UserPlus size={18} />
          <span>Registrarse</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
