import pool from "../bd/bd-config.js";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query(
      "SELECT u.id, u.usuario, r.id as rol_id, r.nombre as role FROM users u INNER JOIN roles r ON u.rol_id = r.id"
    );
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener usuarios",
    });
  }
};
