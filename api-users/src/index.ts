import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import userRouter from "./routers/userRouter.js";
import rolesRouter from "./routers/rolesRouter.js";
import authRouter from "./routers/authRouter.js";
import protectedRouter from "./routers/protectedRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:4200", // Angular app
  ],
  credentials: true, // Permitir credenciales si es necesario
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API Users - Server running!",
    version: "1.0.0",
    endpoints: {
      auth: {
        register: "POST /api/v1/auth/register",
        login: "POST /api/v1/auth/login",
        verify: "GET /api/v1/auth/verify",
        profile: "GET /api/v1/auth/profile"
      },
      users: {
        list: "GET /api/v1/users",
        getById: "GET /api/v1/users/:id",
        create: "POST /api/v1/users",
        update: "PUT /api/v1/users/:id",
        delete: "DELETE /api/v1/users/:id"
      },
      roles: "GET /api/v1/roles",
      protected: {
        public: "GET /api/v1/test/public",
        protected: "GET /api/v1/test/protected",
        userOnly: "GET /api/v1/test/user-only",
        adminOnly: "GET /api/v1/test/admin-only",
        adminModerator: "GET /api/v1/test/admin-moderator"
      }
    },
    authentication: {
      info: "Use Bearer token in Authorization header",
      example: "Authorization: Bearer <your-jwt-token>"
    }
  });
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", rolesRouter);
app.use("/api/v1/test", protectedRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado",
    availableEndpoints: "/api/v1"
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📚 API Documentation available at http://localhost:${port}/`);
});
