import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular17';
  isModalOpen = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  // ✅ Método para recibir el nuevo valor del modal
  onTitleChanged(newTitle: string): void {
    this.title = newTitle;
    console.log('Title changed to:', newTitle);
  }
}
