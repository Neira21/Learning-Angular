import pool from "../database/database.js";
import { User, CreateUserData } from "../types/user.js";
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserModel {
  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.id, u.usuario, u.password, u.rol_id, r.nombre as role 
       FROM users u 
       INNER JOIN roles r on u.rol_id = r.id`
    );
    
    return rows as User[];
  }

  static async findById(id: number): Promise<User | null> {
    if (!id) {
      throw new Error("ID is required");
    }
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT u.id, u.usuario, u.password, u.rol_id, r.nombre as role
       FROM users u
       INNER JOIN roles r on u.rol_id = r.id
       WHERE u.id = ?`,
      [id]
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  static async findByUsername(usuario: string): Promise<User | null> {
    if (!usuario) {
      throw new Error("Username is required");
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.id, u.usuario, u.password, u.rol_id, r.nombre as role
       FROM users u
       INNER JOIN roles r on u.rol_id = r.id
       WHERE u.usuario = ?`,
      [usuario]
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  // Recibe CreateUserData (solo campos básicos), devuelve User (con role del JOIN)
  static async create(userData: CreateUserData): Promise<User> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (usuario, password, rol_id) VALUES (?, ?, ?)',
      [userData.usuario, userData.password, userData.rol_id] // Usar rol_id del userData
    );
    
    const createdUser = await this.findById(result.insertId);
    if (!createdUser) {
      throw new Error("Error al crear usuario");
    }
    return createdUser;
  }

  static async update(id: number, userData: Partial<User>): Promise<User | null> {
    if (!id) {
      throw new Error("ID is required");
    }

    // Construir query dinámicamente
    const fields: string[] = [];
    const values: any[] = [];

    if (userData.usuario !== undefined) {
      fields.push('usuario = ?');
      values.push(userData.usuario);
    }
    if (userData.password !== undefined) {
      fields.push('password = ?');
      values.push(userData.password);
    }
    if (userData.role !== undefined) {
      fields.push('role = ?');
      values.push(userData.role);
    }

    if (fields.length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    await pool.query<ResultSetHeader>(query, values);
    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    if (!id) {
      throw new Error("ID is required");
    }

    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }
}