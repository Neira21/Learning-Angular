import { UserModel } from "../models/UserModel.js";
import { User } from "../types/user.js";

export class UserService {

  static async getAllUsers(): Promise<User[]> {
    return await UserModel.findAll();
  }

  static async getUserById(id: number): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    return await UserModel.findById(id);
  }

  static async createUser(userData: User): Promise<User> {
    // Validaciones de negocio
    if (!userData.usuario) {
      throw new Error('Usuario y email son requeridos');
    }
    
    return await UserModel.create(userData);
  }





}