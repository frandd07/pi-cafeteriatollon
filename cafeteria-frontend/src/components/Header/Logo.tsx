import { Link } from "react-router-dom";

interface LogoProps {
  scrolled: boolean;
}

const Logo = ({ scrolled }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="bg-white p-2 rounded-full shadow-md transition-transform hover:scale-110">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-6 h-6 object-contain"
        />
      </div>
      <h1
        className={`text-xl sm:text-2xl md:text-3xl font-black px-4 py-1 rounded-xl transition-all duration-300 ${
          scrolled ? "text-[#ff5c64]" : "text-white"
        }`}
      >
        <span className="hidden sm:inline">Cafetería</span>
        <span className="sm:hidden">Café</span> IES Laguna de Tollón
      </h1>
    </Link>
  );
};

export default Logo;
