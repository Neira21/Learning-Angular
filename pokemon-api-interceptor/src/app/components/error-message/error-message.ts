import { Component, Input } from '@angular/core';
import { Error } from '../../interfaces/error';
@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css'
})
export class ErrorMessage {
  @Input() errorMessage!: Error | null;
}
