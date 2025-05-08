import { Router } from "express";
import {
  getUsuarios,
  verificarUsuario,
  aceptarUsuario,
  rechazarUsuario,
  eliminarUsuario,
  iniciarNuevoCursoEscolar,
} from "../controllers/usuarios.controller";
import { esAdmin } from "../middlewares/esAdmin";

const router = Router();

router.get("/", getUsuarios);
router.patch("/:id/verificar", verificarUsuario);

router.patch("/:id/aceptar", aceptarUsuario);
router.delete("/:id/rechazar", rechazarUsuario);
router.delete("/:id", eliminarUsuario);
router.put("/iniciar-curso", esAdmin, iniciarNuevoCursoEscolar);

export default router;
