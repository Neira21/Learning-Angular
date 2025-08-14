export interface RegisterRequest {
  usuario: string;
  password: string;
  // No incluir rol_id, se asigna automáticamente
}

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    usuario: string;
    role: string; // Nombre del rol, no el ID
  };
  message: string;
}

export interface JwtPayload {
  userId: number;
  usuario: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Para extender Request de Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        usuario: string;
        role: string;
      };
    }
  }
}