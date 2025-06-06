import { useState, useEffect } from "react";
import { Logo, NavigationMenu, MobileMenuButton, MobileMenu } from "./index";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo scrolled={scrolled} />
        <NavigationMenu scrolled={scrolled} />
        <MobileMenuButton
          menuAbierto={menuAbierto}
          setMenuAbierto={setMenuAbierto}
        />
      </div>
      <MobileMenu menuAbierto={menuAbierto} />
    </header>
  );
};

export default Header;
