export interface RegisterRequest {
  usuario: string;
  password: string;
}

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken?: string; // Agregar refresh token
  user: {
    id: number;
    usuario: string;
    role: string; // Nombre del rol, no el ID
  };
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    usuario: string;
    role: string;
  };
  message?: string;
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