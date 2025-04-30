import { Router } from "express";
import {
  getIngredientes,
  crearIngrediente
} from "../controllers/ingredientes.controller";

const router = Router();

router.get("/", getIngredientes);
router.post("/", crearIngrediente);

export default router;
