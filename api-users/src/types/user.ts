// Usuario con información del rol expandida (con JOIN)
export interface User {
  id: number;
  usuario: string;
  password: string;
  rol_id: number;
  role: string; // Viene de la tabla roles, es el nombre del rol
}

export interface Rol {
  id: number;
  nombre: string;
}

export type CreateUserData = Omit<User, "id" | "role">; // Sin id
export type UserResponse = Omit<User, "password" | "rol_id">; // Sin password ni rol_id
export type LoginRequest = Omit<User, "id" | "rol_id" | "role">; // Sin password para el login
