import { Router } from "express";
import {
  getUsuarios,
  verificarUsuario,
  aceptarUsuario,
  rechazarUsuario,
  eliminarUsuario,
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/", getUsuarios);
router.patch("/:id/verificar", verificarUsuario);

router.patch("/:id/aceptar", aceptarUsuario);
router.delete("/:id/rechazar", rechazarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
