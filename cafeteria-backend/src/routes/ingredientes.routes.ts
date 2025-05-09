import { Router } from "express";
import {
  getIngredientes,
  crearIngrediente,
  actualizarIngrediente,
  eliminarIngrediente,
  getIngredientesPorProducto,
} from "../controllers/ingredientes.controller";

const router = Router();

router.get("/", getIngredientes);
router.post("/", crearIngrediente);
router.patch("/:id", actualizarIngrediente);
router.delete("/:id", eliminarIngrediente);
router.get("/producto/:productoId", getIngredientesPorProducto);
export default router;
