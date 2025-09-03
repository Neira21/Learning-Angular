import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemForm } from '@app/form/form';

@Component({
  selector: 'app-form-child',
  imports: [ReactiveFormsModule],
  templateUrl: './form-child.html',
  styleUrl: './form-child.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormChild {
  formGroup = input.required<FormGroup<ItemForm>>();
}
