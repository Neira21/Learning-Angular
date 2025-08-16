import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";
import { LoginResponse } from "../types/auth.types.js";
import { CreateUserData, LoginRequest } from "../types/user.js";
import { RegisterUserSchema } from "../schemas/validation.schemas.js";

export class AuthController {
  /**
   * Registro de usuario
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.usuario || !req.body.password) {
        res.status(400).json({
          success: false,
          message: "Usuario y contraseña son requeridos",
        });
        return;
      }

      const { usuario, password }: CreateUserData = req.body;

      // Validación de datos
      const validation = RegisterUserSchema.safeParse({
        usuario,
        password,
      });

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Datos inválidos",
          errors: validation.error.issues,
        });
        return;
      }

      // Verificar si el usuario ya existe
      const existingUser = await UserService.getUserByUsername(usuario);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "El usuario ya está registrado",
        });
        return;
      }

      // Encriptar contraseña
      const hashedPassword = await AuthService.hashPassword(password);

      // ✅ Crear usuario con la estructura correcta - tipado específico
      const newUserData: CreateUserData = {
        usuario: usuario,
        password: hashedPassword,
        rol_id: 2, // Rol 'user' por defecto
      };

      // createUser devuelve User (con rol expandido)
      const createdUser = await UserService.createUser(newUserData);

      // Generar token
      const token = AuthService.generateToken(createdUser);

      const response: LoginResponse = {
        success: true,
        token: token,
        user: {
          id: createdUser.id,
          usuario: createdUser.usuario,
          role: createdUser.role, // ✅ Ahora devuelve el NOMBRE del rol
        },
        message: "Usuario registrado exitosamente",
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error en registro:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor", // ✅ Corregir typo
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  /**
   * Login de usuario
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validación básica
      if (!req.body.usuario || !req.body.password) {
        res.status(400).json({
          success: false,
          message: "Usuario y contraseña son requeridos",
        });
        return;
      }

      const { usuario, password }: LoginRequest = req.body;

      // Buscar usuario por username
      const user = await UserService.getUserByUsername(usuario);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
        return;
      }

      // Verificar contraseña
      const isPasswordValid = await AuthService.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
        return;
      }

      // Generar token
      const token = AuthService.generateToken(user);

      const response: LoginResponse = {
        success: true,
        token: token,
        user: {
          id: user.id,
          usuario: user.usuario,
          role: user.role,
        },
        message: "Login exitoso",
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  /**
   * Verificar token (para refresh)
   */
  static async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Token inválido",
        });
        return;
      }

      // Buscar usuario actualizado
      const user = await UserService.getUserById(req.user.userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          usuario: user.usuario,
          role: user.role,
        },
        message: "Token válido",
      });
    } catch (error) {
      console.error("Error en verificación de token:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
        return;
      }

      const user = await UserService.getUserById(req.user.userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          usuario: user.usuario,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
