import { Router } from "express";
import {
  crearPedido,
  obtenerPedidos,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedidos.controller";

const router = Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.patch("/:id", actualizarPedido);
router.delete("/:id", eliminarPedido);

export default router;
