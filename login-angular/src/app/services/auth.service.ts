import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, finalize } from 'rxjs/operators';

// Respuesta del servidor al loguearse
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    usuario: string;  // ← Cambiar a 'usuario'
    role: string;     // ← Agregar 'role'
  };
  message: string;
}

export interface ErrorResponse{
  success: boolean;
  message: string;
}

// Modelo de dato que se envia para login
export interface LoginRequest {
  usuario: string;  // ← Cambiar a 'usuario' para coincidir con la API
  password: string;
}

// Modelo del usuario
export interface User {
  id: number;
  usuario: string;  // ← Cambiar a 'usuario'
  role: string;     // ← Agregar 'role'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // URL de la API (configúrala según tu backend)
  private readonly API_URL = 'http://localhost:4000/api/v1'; // Cambia por tu API

  // Signals para el estado de autenticación (inicialización automática)
  isAuthenticated = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  currentUser = signal<User | null>(null);
  isError = signal<boolean>(false);

  http = inject(HttpClient);

  /**
   * Iniciar sesión
   */
  /**
   * Procesa la respuesta de login/register y actualiza signals/localStorage
   */
  private handleAuthResponse(response: LoginResponse): LoginResponse {
    if (response.success && response.token && response.user) {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      this.isAuthenticated.set(true);
      this.currentUser.set(response.user);
      this.isError.set(false);
    } else {
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
      this.isError.set(true);
    }
    this.isLoading.set(false);
    return response;
  }

  /**
   * Maneja errores de login/register
   */
  private handleAuthError(error: any): Observable<ErrorResponse> {
    this.isLoading.set(false);
    this.isError.set(true);
    console.error('❌ Error en autenticación:', error);
    return throwError(() => ({
      success: false,
      message: error?.error?.message || 'Error de conexión con el servidor',
    }));
  }

  /**
   * Iniciar sesión
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.isLoading.set(true);
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        map((response) => this.handleAuthResponse(response)),
        catchError((error) => this.handleAuthError(error))
      );
  }


  /**
   * Cerrar sesión y borra token y usuario del localStorage
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    console.log('🚪 Sesión cerrada');
  }

  /**
   * Obtener token actual en el local storage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtener usuario almacenado en el localStorage
   */
  private getStoredUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Verificar si hay token válido
   */
  private hasValidToken(): boolean {
    const token = this.getToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  /**
   * Verificar estado de autenticación, se verifica token y usuario almacenado
   */
  private checkAuthStatus(): void {
    const isValid = this.hasValidToken();
    const storedUser = this.getStoredUser();

    console.log('🔍 Verificando estado de autenticación:', {
      hasToken: !!this.getToken(),
      hasUser: !!storedUser,
      isValid,
    });

    this.isAuthenticated.set(isValid);
    this.currentUser.set(storedUser);

    if (!isValid) {
      // Solo limpiar localStorage sin llamar logout
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      //console.log('🧹 Token inválido, limpiando localStorage');
    } else {
      console.log('✅ Usuario autenticado:', storedUser?.usuario);
    }
  }

  constructor() {
    this.checkAuthStatus(); // ← Esto inicializa el estado al cargar la app
  }

  /**
   * Método público para verificar estado de autenticación
   */
  // checkAuthenticationStatus(): boolean {
  //   this.checkAuthStatus();
  //   return this.isAuthenticated();
  // }

  /**
   * Registro de usuario (para API real)
   */
  /**
   * Registro de usuario (misma respuesta que login)
   */
  register(userData: LoginRequest): Observable<LoginResponse> {
    this.isLoading.set(true);
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/register`, userData)
      .pipe(
        map((response) => this.handleAuthResponse(response)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  /**
   * Verificar token con API (para refresh automático)
   */


  /**
   * Cambiar contraseña (para API real)
   */
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<{ success: boolean; message: string }> {
    const token = this.getToken();

    return this.http.post<{ success: boolean; message: string }>(
      `${this.API_URL}/auth/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
