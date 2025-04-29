import { Link } from "react-router-dom";

const HeaderSencillo = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fa6a69] shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center">
        <Link to="/" className="flex items-center gap-3">
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
        </Link>
      </div>
    </header>
  );
};

export default HeaderSencillo;
