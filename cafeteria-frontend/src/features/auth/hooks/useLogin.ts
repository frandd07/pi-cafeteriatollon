import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Iniciando sesión...");

    const res = await loginUser(email, password);
    if (res?.error) {
      if (res.error.includes("verificada")) {
        toast.error(
          "Tu cuenta aún no ha sido verificada por el administrador."
        );
      } else {
        toast.error("" + res.error);
      }
      setMessage("");
    } else if (res?.data?.perfil?.tipo) {
      toast.success("Sesión iniciada. Bienvenido " + res.data.user.email);
      const { tipo } = res.data.perfil;
      localStorage.setItem("userId", res.data.perfil.id);
      localStorage.setItem("rol", tipo);

      navigate(tipo === "admin" ? "/admin" : "/menu");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleLogin,
  };
};
