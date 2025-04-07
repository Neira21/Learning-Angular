import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly _route = inject(Router);

  clickSignIn(): void {
    console.log('Sign in clicked');
    this._route.navigate(['/store'], { queryParams: { user: 'alvaro' } });
  }

}
