import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Importar las rutas
import authRoutes from "./routes/auth.routes";
import usuariosRoutes from "./routes/usuarios.routes";
import productosRoutes from "./routes/productos.routes";
import pedidosRoutes from "./routes/pedidos.routes";
import ingredientesRoutes from "./routes/ingredientes.routes";

const app = express();
const PORT = parseInt(process.env.PORT || "3001");

app.use(cors());
app.use(express.json());

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/ingredientes", ingredientesRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor escuchando en http://0.0.0.0:${PORT}`);
});
