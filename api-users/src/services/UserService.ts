import { UserModel } from "../models/UserModel.js";
import { User, CreateUserData } from "../types/user.js";

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

  static async getUserByUsername(usuario: string): Promise<User | null> {
    if (!usuario) {
      throw new Error('Usuario es requerido');
    }
    return await UserModel.findByUsername(usuario);
  }

  // Tipado correcto: recibe CreateUserData (sin role), devuelve User (con role)
  static async createUser(userData: CreateUserData): Promise<User> {
    // Validaciones de negocio
    if (!userData.usuario) {
      throw new Error('Usuario es requerido');
    }
    
    // UserModel.create hace el JOIN y devuelve el User completo con role
    return await UserModel.create(userData);
  }

  static async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    
    return await UserModel.update(id, userData);
  }

  static async deleteUser(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    
    return await UserModel.delete(id);
  }
}