import { Router } from "express";
import {
  getProductos,
  crearProducto,
  toggleProducto,
  getIngredientesProducto,
  asignarIngredientes,
  getProductosAdmin,
} from "../controllers/productos.controller";

const router = Router();

router.get("/", getProductos);
router.post("/", crearProducto);
router.patch("/:id/estado", toggleProducto);
router.get("/:id/ingredientes", getIngredientesProducto);
router.post("/:id/ingredientes", asignarIngredientes);
router.get("/admin", getProductosAdmin);

export default router;
