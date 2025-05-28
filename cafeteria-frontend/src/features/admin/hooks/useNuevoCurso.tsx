import { toast } from "react-hot-toast";
import { iniciarNuevoCurso } from "../services/CursoService";

export const useNuevoCurso = () => {
  const activar = () => {
    toast(
      (t) => (
        <span className="flex flex-col gap-2">
          ¿Iniciar un nuevo curso escolar? <br />
          Esto hará que todos los alumnos deban actualizar su curso.
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await iniciarNuevoCurso();
                  toast.success("Nuevo curso activado 🎓");
                } catch (err: any) {
                  toast.error(`Error al activar curso: ${err.message}`);
                }
              }}
              className="cursor-pointer px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Confirmar
            </button>
          </div>
        </span>
      ),
      { duration: 10000 }
    );
  };

  return { activar };
};
