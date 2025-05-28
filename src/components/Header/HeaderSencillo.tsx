import { Link, useLocation } from "react-router-dom";

const HeaderSencillo = () => {
  const { pathname } = useLocation();
  // Define aquí las rutas donde SÍ quieres el link
  const rutasClickables = ["/login", "/register"];

  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="bg-white p-2 rounded-full shadow-md transition-transform hover:scale-110">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-6 h-6 object-contain"
        />
      </div>
      <h1 className="text-white text-2xl md:text-3xl font-black">
        Cafetería IES Laguna de Tollón
      </h1>
    </div>
  );

  return (
    <header className="w-full z-10 bg-[#fa6a69] shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center">
        {rutasClickables.includes(pathname) ? (
          <Link to="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
        ) : (
          <Logo />
        )}
      </div>
    </header>
  );
};

export default HeaderSencillo;
