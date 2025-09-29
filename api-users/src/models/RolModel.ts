import pool from "../database/database.js";
import { Rol } from "../types/user.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class RolModel {
  static async findAll(): Promise<Rol[]> {
    const [rows] = await pool.query("SELECT * FROM roles");
    console.log("Roles obtenidos:", rows);
    return rows as Rol[];
  }

  static async findById(id: number): Promise<Rol | null> {
    if (!id) {
      throw new Error("ID is required");
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM roles WHERE id = ?",
      [id]
    );
    return rows.length > 0 ? (rows[0] as Rol) : null;
  }

  static async create(rolData: Omit<Rol, "id">): Promise<Rol> {
    console.log("Creando rol con datos ( MODEL) :", rolData);
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO roles (nombre) VALUES (?)",
      [rolData.nombre]
    );
    console.log("Rol creado:", result);
    return this.findById(result.insertId) as Promise<Rol>;
  }
}
