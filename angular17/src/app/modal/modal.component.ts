import { Component, inject, output } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private fb = inject(NonNullableFormBuilder);

  valueChanged = output<string>();

  form = this.fb.group({
    newValue: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const newValue = this.form.get('newValue')?.value!;
      console.log('newValue', newValue);
      this.valueChanged.emit(newValue);
      this.form.reset();
    }
  }
}
