// Usuario tal como está en la base de datos (con rol_id)
export interface UserDB {
  id: number;
  usuario: string;
  password: string;
  rol_id: number;
}

// Usuario con información del rol expandida (con JOIN)
export interface User {
  id: number;
  usuario: string;
  password: string;
  rol_id: number;
  role: string; // Nombre del rol (viene del JOIN)
}

// Para crear usuario (solo campos necesarios)
export interface CreateUserData {
  usuario: string;
  password: string;
  rol_id: number;
}

// Para respuestas públicas (sin password)
export interface UserResponse {
  id: number;
  usuario: string;
  role: string; // Solo el nombre del rol
}

// Para registro (sin rol_id, se asigna automáticamente)
export interface RegisterUserData {
  usuario: string;
  password: string;
}

export interface Rol {
  id: number;
  nombre: string;
}


