import pool from "../database/database.js";
import { User } from "../types/user.js";
import { RowDataPacket, ResultSetHeader } from 'mysql2';


export class UserModel {
static async findAll(): Promise<User[]> {
    const [rows] = await pool.query("SELECT * FROM users");
    console.log("Usuarios obtenidos:", rows);
    return rows as User[];
  }

  static async findById(id: number): Promise<User> {
    if(!id) {
      throw new Error("ID is required");
    }
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);
    console.log("Usuario obtenido:", rows);
    return rows.length > 0 ? (rows[0] as User) : Promise.reject(new Error("User not found"));
  }

  static async create(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (usuario, email, rol_id) VALUES (?, ?, ?)',
      [userData.usuario, userData.password, userData.rol_id]
    );
    return this.findById(result.insertId) as Promise<User>;
  }
}