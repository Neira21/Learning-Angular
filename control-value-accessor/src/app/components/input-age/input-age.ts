import {
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR = {
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
      [disabled]="disabled()"
      #input
    />
  `,
  styleUrl: './input-age.css',
  providers: [VALUE_ACCESSOR],
})
export class InputAge implements ControlValueAccessor {
  disabled = input<boolean>(false);
  value = signal<string>('');
  changeValue = output<string>();

  // uso de viewChild para obtener el valor del input
  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('input');

  _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    this.changeValue.emit(value);
  }

  writeValue(obj: string): void {
    //throw new Error('Method not implemented.');
    this.value.set(obj);
    this.inputElement().nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
}
