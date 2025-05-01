import { Router } from "express";
import {
  getIngredientes,
  crearIngrediente,
  actualizarIngrediente,
} from "../controllers/ingredientes.controller";

const router = Router();

router.get("/", getIngredientes);
router.post("/", crearIngrediente);
router.patch("/:id", actualizarIngrediente);

export default router;
