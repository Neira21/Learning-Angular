import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";
import { Request, Response } from "express";

const protectedRouter: Router = Router();

/**
 * Ruta pública para testing
 */
protectedRouter.get("/public", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Esta es una ruta pública - accesible sin autenticación",
    timestamp: new Date().toISOString()
  });
});

/**
 * Ruta protegida básica - requiere solo autenticación
 */
protectedRouter.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Esta es una ruta protegida - requiere autenticación",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

/**
 * Ruta solo para usuarios - requiere autenticación
 */
protectedRouter.get("/user-only", authMiddleware, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Ruta accesible para usuarios autenticados",
    user: {
      id: req.user?.userId,
      usuario: req.user?.usuario,
      role: req.user?.role
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Ruta solo para administradores - requiere autenticación y rol admin
 */
protectedRouter.get("/admin-only", 
  authMiddleware, 
  roleMiddleware(['admin']), 
  (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Esta es una ruta exclusiva para administradores",
      user: req.user,
      timestamp: new Date().toISOString(),
      adminFeatures: [
        "Gestión de usuarios",
        "Configuración del sistema",
        "Reportes avanzados"
      ]
    });
  }
);

/**
 * Ruta para múltiples roles - admins y moderadores
 */
protectedRouter.get("/admin-moderator", 
  authMiddleware, 
  roleMiddleware(['admin', 'moderator']), 
  (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Ruta para administradores y moderadores",
      user: req.user,
      timestamp: new Date().toISOString(),
      allowedActions: [
        "Moderar contenido",
        "Gestionar usuarios",
        "Ver reportes"
      ]
    });
  }
);

export default protectedRouter;
