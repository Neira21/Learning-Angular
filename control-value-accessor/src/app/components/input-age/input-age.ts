import {
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputAge),
  multi: true,
};

const VALIDATOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputAge),
  multi: true,
};

@Component({
  selector: 'app-input-age',
  imports: [],
  template: `
    <input
      type="text"
      placeholder="Tu edad"
      (input)="_onInput($event)"
      (blur)="_onBlur()"
      [disabled]="disabled()"
      #input
    />
  `,
  styleUrl: './input-age.css',
  providers: [VALUE_ACCESSOR, VALIDATOR],
})
export class InputAge implements ControlValueAccessor, Validator {
  disabled = signal<boolean>(false);
  value = signal<string>('');

  // uso de viewChild para obtener el valor del input
  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('input');
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  private _onValidatorChange = () => {};

  _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    this.onChange(value);
  }

  _onBlur() {
    this.onTouched();
  }

  writeValue(obj: string): void {
    //throw new Error('Method not implemented.');
    this.value.set(obj);
    this.inputElement().nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!this.isValid(value)) {
      return { invalidAge: 'Age must contain only numbers' };
    }
    if (!this.NoMore6Numbers(value)) {
      return { maxLengthAge: 'Age must be less than 6 digits' };
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  private isValid(value: string): boolean {
    const regex = /^\d+$/;
    return regex.test(value);
  }

  private NoMore6Numbers(value: string): boolean {
    return value.length <= 6;
  }
}
