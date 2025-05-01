import { Router } from "express";
import {
  getProductos,
  crearProducto,
  toggleProducto,
  getIngredientesProducto,
  asignarIngredientes,
  getProductosAdmin,
  añadirAFavoritos,
  eliminarDeFavoritos,
  obtenerFavoritosUsuario,
  eliminarProducto,
} from "../controllers/productos.controller";

const router = Router();

router.get("/", getProductos);
router.post("/", crearProducto);
router.patch("/:id/estado", toggleProducto);
router.get("/:id/ingredientes", getIngredientesProducto);
router.post("/:id/ingredientes", asignarIngredientes);
router.get("/admin", getProductosAdmin);
router.post("/favoritos", añadirAFavoritos);
router.delete("/favoritos", eliminarDeFavoritos);
router.get("/favoritos/:usuario_id", obtenerFavoritosUsuario);
router.delete("/:id", eliminarProducto);

export default router;
