import { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../services/PerfilService";
import { supabase } from "@/supabaseClient";
import toast from "react-hot-toast";

export const usePerfilUsuario = () => {
  const [perfil, setPerfil] = useState<{
    curso: string;
    debeActualizar: boolean;
    nombre: string;
    apellido1: string;
    email: string;
  } | null>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [curso, setCurso] = useState("");
  const [puedeEditar, setPuedeEditar] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("No hay userId en localStorage");
        setCargando(false);
        return;
      }

      try {
        const data = await obtenerPerfilUsuario(userId);

        setPerfil({
          curso: data.curso ?? "",
          debeActualizar: data.debe_actualizar_curso,
          nombre: data.nombre ?? "",
          apellido1: data.apellido1 ?? "",
          email: data.email ?? "",
        });

        setUsuarioId(userId);
        setCurso(data.curso ?? "");
        setPuedeEditar(data.debe_actualizar_curso);
      } catch (error: any) {
        console.error("Error al cargar perfil:", error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  const guardarCurso = async () => {
    if (!usuarioId) return;

    const { error } = await supabase
      .from("usuarios")
      .update({
        curso,
        debe_actualizar_curso: false,
        verificado: true,
      })
      .eq("id", usuarioId);

    if (!error) {
      toast.success("Curso actualizado correctamente 🎉");
      setPuedeEditar(false);
    } else {
      toast.error("Error al actualizar el curso");
    }
  };

  return {
    perfil,
    usuarioId,
    curso,
    setCurso,
    puedeEditar,
    cargando,
    guardarCurso,
  };
};
