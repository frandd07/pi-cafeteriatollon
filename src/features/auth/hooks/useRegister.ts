import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services";

export const useRegister = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    tipo: "",
    curso: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Registrando...");

    const res = await registerUser(form as any);

    if (res?.error) {
      setMessage("❌ " + res.error);
    } else {
      setMessage("✅ Registro exitoso. Confirma tu cuenta");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return {
    form,
    message,
    handleChange,
    handleSubmit,
  };
};
