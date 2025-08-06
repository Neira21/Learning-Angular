import { RolModel } from "../models/RolModel.js";
import { UserModel } from "../models/UserModel.js";
import { Rol } from "../types/user.js";

export class RolService {

  static async getAllRoles(): Promise<Rol[]> {
    return await RolModel.findAll();
  }

  static async getRoleById(id: number): Promise<Rol | null> {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    return await RolModel.findById(id);
  }

  static async createRol(rolData: Omit<Rol, 'id'>): Promise<Rol> {
    // Validaciones de negocio
    if (!rolData.nombre) {
      throw new Error('Nombre es requerido');
    }

    return await RolModel.create(rolData);
  }





}