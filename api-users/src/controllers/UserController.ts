import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { UserResponse } from "../types/user.js";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();

      // Filtrar información sensible (no devolver passwords)
      const safeUsers: UserResponse[] = users.map((user) => ({
        id: user.id,
        usuario: user.usuario,
        role: user.role, // Asumiendo que 'role' es un string representando el nombre del rol
      }));

      res.json({
        success: true,
        data: safeUsers,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const user = await UserService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      // Filtrar información sensible
      const safeUser: UserResponse = {
        id: user.id,
        usuario: user.usuario,
        role: user.role,
      };

      res.json({
        success: true,
        data: safeUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);

      // Filtrar información sensible
      const safeUser: UserResponse = {
        id: newUser.id,
        usuario: newUser.usuario,
        role: newUser.role,
      };

      res.status(201).json({
        success: true,
        data: safeUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const userData = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const updatedUser = await UserService.updateUser(id, userData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      // Filtrar información sensible
      const safeUser: UserResponse = {
        id: updatedUser.id,
        usuario: updatedUser.usuario,
        role: updatedUser.role,
      };

      res.json({
        success: true,
        data: safeUser,
        message: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      // Verificar que el usuario no se esté eliminando a sí mismo
      if (req.user && req.user.userId === id) {
        return res.status(400).json({
          success: false,
          message: "No puedes eliminar tu propia cuenta",
        });
      }
      // Sacar nombre de usuario para el mensaje
      const userName = await UserService.getUserById(id);
      const deleted = await UserService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      res.json({
        success: true,
        message: {
          text: "Usuario eliminado exitosamente",
          userName: userName ? userName.usuario : "Desconocido",
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
