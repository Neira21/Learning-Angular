import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map, finalize } from 'rxjs/operators';

// Respuesta del servidor al loguearse
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  message: string;
}

// Modelo de dato que se envia para login
export interface LoginRequest {
  email: string;
  password: string;
}

// Modelo del usuario
export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // HttpClient inyectado de forma lazy (NO en constructor)
  private get http() {
    return inject(HttpClient);
  }

  // URL de la API (configúrala según tu backend)
  private readonly API_URL = 'http://localhost:3000/api'; // Cambia por tu API

  // Signals para el estado de autenticación (inicialización automática)
  isAuthenticated = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor() {
    // Verificar automáticamente el estado de autenticación al inicializar el servicio
    this.checkAuthStatus();
  }

  // Usuarios mock para simular base de datos
  private mockUsers = [
    { id: 1, email: 'admin@test.com', password: '123456', name: 'Administrador' },
    { id: 2, email: 'user@test.com', password: 'password', name: 'Usuario Normal' },
    { id: 3, email: 'demo@test.com', password: 'demo123', name: 'Usuario Demo' }
  ];


  /**
   * Iniciar sesión
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.isLoading.set(true);

    // OPCIÓN 1: Usar API real (descomenta cuando tengas backend)
    // return this.loginWithAPI(credentials);

    // OPCIÓN 2: Usar mock (actual - para desarrollo)
    return this.mockLogin(credentials).pipe(
      delay(100), // Simular latencia de red - AUMENTADO para ver loading
      finalize(() => this.isLoading.set(false)),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Login con API real (para cuando tengas backend)
   */
  private loginWithAPI(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (response.success && response.token && response.user) {
            // Guardar token y usuario
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

            // Actualizar signals
            this.isAuthenticated.set(true);
            this.currentUser.set(response.user);
            this.isLoading.set(false);
          }
          return response;
        }),
        catchError(error => {
          this.isLoading.set(false);
          console.error('❌ Error en login API:', error);
          return throwError(() => ({
            success: false,
            message: error?.error?.message || 'Error de conexión con el servidor'
          }));
        })
      );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    console.log('🚪 Sesión cerrada');
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
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
   * Verificar estado de autenticación
   */
  private checkAuthStatus(): void {
    const isValid = this.hasValidToken();
    const storedUser = this.getStoredUser();

    console.log('🔍 Verificando estado de autenticación:', {
      hasToken: !!this.getToken(),
      hasUser: !!storedUser,
      isValid
    });

    this.isAuthenticated.set(isValid);
    this.currentUser.set(storedUser);

    if (!isValid) {
      // Solo limpiar localStorage sin llamar logout
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      console.log('🧹 Token inválido, limpiando localStorage');
    } else {
      console.log('✅ Usuario autenticado:', storedUser?.name);
    }
  }

  /**
   * Método público para verificar estado de autenticación
   */
  checkAuthenticationStatus(): boolean {
    this.checkAuthStatus();
    return this.isAuthenticated();
  }

  /**
   * Login mock (simula API)
   */
  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    const user = this.mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const token = this.generateMockToken();
      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name
      };

      // Guardar en localStorage
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));

      // Actualizar signals
      this.isAuthenticated.set(true);
      this.currentUser.set(userData);
      this.isLoading.set(false);

      return of({
        success: true,
        token,
        user: userData,
        message: 'Login exitoso'
      });
    } else {
      this.isLoading.set(false);
      return throwError(() => ({
        success: false,
        message: 'Credenciales incorrectas'
      }));
    }
  }

  /**
   * Generar token mock
   */
  private generateMockToken(): string {
    return 'mock_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Obtener usuarios disponibles (para testing)
   */
  getAvailableUsers() {
    return this.mockUsers.map(user => ({
      email: user.email,
      password: user.password,
      name: user.name
    }));
  }

  /**
   * Registro de usuario (para API real)
   */
  register(userData: { email: string; password: string; name: string }): Observable<LoginResponse> {
    this.isLoading.set(true);

    return this.http.post<LoginResponse>(`${this.API_URL}/auth/register`, userData)
      .pipe(
        catchError(error => {
          this.isLoading.set(false);
          return throwError(() => ({
            success: false,
            message: error?.error?.message || 'Error al registrar usuario'
          }));
        })
      );
  }

  /**
   * Verificar token con API (para refresh automático)
   */
  verifyToken(): Observable<{ valid: boolean; user?: User }> {
    const token = this.getToken();
    if (!token) {
      return of({ valid: false });
    }

    return this.http.get<{ valid: boolean; user?: User }>(`${this.API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(() => {
        // Si el token no es válido, limpiar todo
        this.logout();
        return of({ valid: false });
      })
    );
  }

  /**
   * Cambiar contraseña (para API real)
   */
  changePassword(oldPassword: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    const token = this.getToken();

    return this.http.post<{ success: boolean; message: string }>(`${this.API_URL}/auth/change-password`, {
      oldPassword,
      newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
