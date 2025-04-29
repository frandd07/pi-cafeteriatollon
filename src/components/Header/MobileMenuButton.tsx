import { Menu, X } from "lucide-react";

const MobileMenuButton = ({ menuAbierto, setMenuAbierto }: any) => {
  return (
    <button
      className="sm:hidden bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
      onClick={() => setMenuAbierto(!menuAbierto)}
      aria-expanded={menuAbierto}
      aria-label="Menú de navegación"
    >
      {menuAbierto ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

export default MobileMenuButton;
