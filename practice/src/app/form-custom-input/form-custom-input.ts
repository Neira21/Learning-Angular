import { finalize } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-custom-input.html',
  styleUrl: './form-custom-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCustomInput),
      multi: true,
    },
  ],
})
export class FormCustomInput implements ControlValueAccessor {
  control = input.required<FormControl<any>>();

  onTouched = () => {};

  onChange = (_value: any) => {};

  writeValue(value: any): void {
    if (value !== this.control().value) {
      this.control().setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control().disable();
    } else {
      this.control().enable();
    }
  }
}
