import connection from "../bd/bd-config.js";




export default class UserModel {
  static async getAllUsers() {
    try {
      const [rows] = await connection.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

}