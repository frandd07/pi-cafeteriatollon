import { Router } from "express";
import {
  getUsuarios,
  verificarUsuario,
  aceptarUsuario,
  rechazarUsuario,
  eliminarUsuario,
  iniciarNuevoCursoEscolar,
  eliminarUsuariosMasivo,
  actualizarUsuario,
  getUsuarioPorId,
} from "../controllers/usuarios.controller";
import { esAdmin } from "../middlewares/esAdmin";

const router = Router();

router.post("/eliminar-masivo", esAdmin, eliminarUsuariosMasivo);
router.get("/", getUsuarios);
router.get("/:id", getUsuarioPorId);
router.patch("/:id/verificar", verificarUsuario);

router.patch("/:id/aceptar", aceptarUsuario);
router.delete("/:id/rechazar", rechazarUsuario);
router.delete("/:id", eliminarUsuario);
router.put("/iniciar-curso", esAdmin, iniciarNuevoCursoEscolar);
router.patch("/:id", actualizarUsuario);

export default router;
