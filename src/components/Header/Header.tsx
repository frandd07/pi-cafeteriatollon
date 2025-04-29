import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (menuAbierto && !target.closest("header")) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuAbierto]);

  const handleLinkClick = (route: string) => {
    console.log(`Navegando a: ${route}`);
    setMenuAbierto(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full">
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("home");
            }}
          >
            <div className="bg-white p-2 rounded-full shadow-md transition-transform group-hover:scale-110">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-black px-4 py-1 rounded-xl transition-all duration-300 ${
                scrolled ? "bg-transparent text-[#fa6a69]" : "text-white"
              }`}
            >
              <span className="hidden sm:inline">Cafetería</span>
              <span className="sm:hidden">Café</span> IES Laguna de Tollón
            </h1>
          </a>

          <nav className="hidden sm:flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 bg-white/90 text-[#fa6a69] font-semibold px-4 py-2 rounded-lg hover:bg-white transition hover:shadow-md"
              aria-label="Iniciar sesión"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("login");
              }}
            >
              <LogIn size={18} />
              <span>Iniciar sesión</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-[#56b0de] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a99c5] transition hover:shadow-md"
              aria-label="Registrarse"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("register");
              }}
            >
              <UserPlus size={18} />
              <span>Registrarse</span>
            </a>
          </nav>

          <button
            className="sm:hidden bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-label="Menú de navegación"
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          menuAbierto
            ? "max-h-48 opacity-100 translate-y-0 py-4"
            : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 flex flex-col gap-3">
          <a
            href="#"
            className="flex items-center justify-center gap-2 bg-white/90 text-[#fa6a69] font-semibold px-4 py-3 rounded-lg hover:bg-white transition"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("login");
            }}
          >
            <LogIn size={18} />
            <span>Iniciar sesión</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 bg-[#56b0de] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#4a99c5] transition"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("register");
            }}
          >
            <UserPlus size={18} />
            <span>Registrarse</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
