import { Link } from "react-router-dom";
import routes from "@/routes/routes";
import { UserPlus } from "lucide-react";

interface NavigationMenuProps {
  scrolled: boolean;
}

const NavigationMenu = ({ scrolled }: NavigationMenuProps) => {
  return (
    <nav className="hidden sm:flex items-center gap-4">
      <Link
        to={routes.login}
        className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg hover:bg-white transition hover:shadow-md ${
          scrolled ? "bg-white text-[#ff5c64]" : "bg-white/90 text-[#fa6a69]"
        }`}
        aria-label="Iniciar sesión"
      >
        Iniciar sesión
      </Link>

      <Link
        to={routes.register}
        className="flex items-center gap-2 bg-[#56b0de] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a99c5] transition hover:shadow-md"
        aria-label="Registrarse"
      >
        <UserPlus size={18} />
        <span>Registrarse</span>
      </Link>
    </nav>
  );
};

export default NavigationMenu;
