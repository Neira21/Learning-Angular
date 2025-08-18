import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService.js';
import { JwtPayload } from '../types/auth.types.js';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload;
    }
  }
}

/**
 * Middleware para verificar tokens JWT
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = AuthService.extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
      return;
    }

    const decoded = AuthService.verifyToken(token);
    
    // Acá está el payload decodificado osea la información del usuario segun el token
    req.user = decoded;

    console.log('Token verificado con éxito:', req.user);
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

/**
 * Middleware para verificar roles específicos, los roles validos se pasan como un array
 * @param allowedRoles - Array de roles permitidos
 * @returns {Function} - Middleware que verifica el rol del usuario
 * @throws {Error} - Si el usuario no está autenticado o no tiene el rol
 */
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
        return;
      }

      if (!allowedRoles.includes(String(req.user.role))) {
        res.status(403).json({
          success: false,
          message: 'Permisos insuficientes'
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error en verificación de permisos',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
};
