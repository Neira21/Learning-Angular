import { Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <mat-toolbar class="shadow-sm">
      <button mat-icon-button (click)="onToggle.emit()">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class Header {
  onToggle = output();
}
