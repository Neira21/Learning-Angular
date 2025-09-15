import { Request, Response } from "express";
import { RolService } from "../services/RolService.js";

export class RolesController {
  static async getRoles(req: Request, res: Response) {
    try {
      const roles = await RolService.getAllRoles();
      res.json({
        success: true,
        data: roles,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener roles",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const role = await RolService.getRoleById(id);

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Rol no encontrado",
        });
      }

      res.json({
        success: true,
        data: role,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener rol",
      });
    }
  }

  static async createRol(req: Request, res: Response) {
    try {
      console.log("Datos del rol:", req.body);
      const rolData = req.body;
      const newRol = await RolService.createRol(rolData);
      res.status(201).json({
        success: true,
        data: newRol,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear rol",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
