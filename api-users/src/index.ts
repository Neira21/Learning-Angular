import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import { testConnection } from "./bd/bd-config.js";
import userRouter from "./routers/userRouter.js";
import rolesRouter from "./routers/userRoles.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Función para inicializar el servidor
async function startServer() {
  // Probar conexión a la base de datos
  const isConnected = await testConnection();
  
  if (!isConnected) {
    console.error('❌ No se pudo conectar a la base de datos. Saliendo...');
    process.exit(1);
  }

  app.get("/", (req: Request, res: Response) => {
    res.json({ 
      message: "API Users - Server running!",
      endpoints: {
        users: "/api/v1/users",
        roles: "/api/v1/roles"
      }
    });
  });

  app.use("/api/v1", userRouter);
  app.use("/api/v1", rolesRouter);

  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}

// Iniciar el servidor
startServer().catch(error => {
  console.error('❌ Error starting server:', error);
  process.exit(1);
});
