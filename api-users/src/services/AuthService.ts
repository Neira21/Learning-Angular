import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../types/user.js';
import { JwtPayload } from '../types/auth.types.js';

export class AuthService {
  private static readonly JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private static readonly REFRESH_SECRET: string = process.env.REFRESH_SECRET || 'your-refresh-secret';

  private static readonly JWT_EXPIRES_IN = '1h';
  private static readonly SALT_ROUNDS = 12;
  private static readonly REFRESH_TOKEN_EXPIRES = '7d';


  /**
   * Genera un token JWT para el usuario
   */
  static generateToken(user: User): {accessToken: string, refreshToken: string} {
    const payload = {
      userId: user.id,
      usuario: user.usuario,
      role: user.role
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES
    });

    return {
      accessToken,
      refreshToken
    }
  }

  /**
   * Verifica y decodifica un token JWT
   */
  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }



  /**
   * Encripta una contraseña
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compara una contraseña con su hash
   */
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Extrae el token del header Authorization
   */
  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}
