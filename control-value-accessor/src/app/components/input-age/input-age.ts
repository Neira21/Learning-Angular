import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-age',
  imports: [],
  template: `
    <input
      type="text"
      placeholder="Tu edad"
      (input)="_onInput($event)"
      [disabled]="disabled()"
      [value]="value()"
      #input
    />
  `,
  styleUrl: './input-age.css',
})
export class InputAge {
  disabled = input<boolean>(false);
  value = input<string>('');
  changeValue = output<string>();

  _onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    this.changeValue.emit(value);
  }
}
