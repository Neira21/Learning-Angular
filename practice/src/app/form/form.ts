import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormChild } from '@app/form-child/form-child';

export interface ItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  value: FormControl<number>;
}

export type CustomFormGroup = FormGroup<ItemForm>;

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormChild],
  templateUrl: './form.html',
  styleUrl: './form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  items = signal(this.form.controls.items.controls);

  addItem() {
    const id = this.items().length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      value: this.fb.control(0, { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);
    this.items.set([...this.form.controls.items.controls]);
  }

  removeItem() {}
}
