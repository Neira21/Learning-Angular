import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-card">
        <div class="error-content">
          <div class="error-number">404</div>
          <div class="error-icon">🚫</div>
          <h1>¡Oops! Página no encontrada</h1>
          <p>La página que estás buscando no existe o fue movida a otra ubicación.</p>

          <div class="error-actions">
            <button
              class="btn-primary"
              (click)="goHome()"
            >
              🏠 Ir al Inicio
            </button>

            <button
              class="btn-secondary"
              (click)="goBack()"
            >
              ⬅️ Volver Atrás
            </button>
          </div>

          <div class="helpful-links">
            <h3>Enlaces útiles:</h3>
            <ul>
              <li><a href="#" (click)="goHome()">🔐 Iniciar Sesión</a></li>
              <li><a href="#" (click)="goHome()">📚 Documentación</a></li>
              <li><a href="#" (click)="goHome()">💬 Soporte</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .not-found-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 50px;
      max-width: 600px;
      text-align: center;
      animation: slideIn 0.6s ease-out;
    }

    .error-number {
      font-size: 8rem;
      font-weight: 900;
      color: #dc3545;
      margin: 0;
      line-height: 1;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }

    .error-icon {
      font-size: 4rem;
      margin: 20px 0;
    }

    h1 {
      color: #333;
      font-size: 2rem;
      margin: 20px 0;
      font-weight: 700;
    }

    p {
      color: #666;
      font-size: 1.1rem;
      margin: 20px 0 30px 0;
      line-height: 1.6;
    }

    .error-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin: 30px 0;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    .helpful-links {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #eee;
    }

    .helpful-links h3 {
      color: #333;
      font-size: 1.2rem;
      margin-bottom: 15px;
    }

    .helpful-links ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .helpful-links li {
      margin: 10px 0;
    }

    .helpful-links a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .helpful-links a:hover {
      color: #764ba2;
      text-decoration: underline;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .not-found-card {
        padding: 30px 20px;
      }

      .error-number {
        font-size: 6rem;
      }

      h1 {
        font-size: 1.5rem;
      }

      .error-actions {
        flex-direction: column;
        align-items: center;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 250px;
      }
    }
  `]
})
export class NotFound {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
