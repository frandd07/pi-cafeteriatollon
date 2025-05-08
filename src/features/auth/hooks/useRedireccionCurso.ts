import { useEffect } from "react";
import { supabase } from "@/supabaseClient";

type Seccion = "menu" | "carrito" | "pedidos" | "perfil";

export const useRedireccionCurso = (
  setSeccion: React.Dispatch<React.SetStateAction<Seccion>>
) => {
  useEffect(() => {
    const checkCurso = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("debe_actualizar_curso")
        .eq("id", user.id)
        .single();

      if (!error && usuario?.debe_actualizar_curso) {
        setSeccion("perfil");
      }
    };

    checkCurso();
  }, [setSeccion]);
};
