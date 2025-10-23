import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl, AbstractControlDirective } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { Emoji } from './data';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { EMOJIS } from './data';
@Component({
  selector: 'app-selector',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  templateUrl: './selector.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: Selector,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './selector.css',
})
export class Selector implements MatFormFieldControl<Emoji> {
  get value() {
    return this._value;
  }

  set value(emoji: Emoji | null) {
    this._value = emoji;
    this.stateChanges.next();
  }

  private _value: Emoji | null = null;

  stateChanges = new Subject<void>();

  id = '';
  placeholder = '';
  ngControl: NgControl | null = null;

  focused = false;
  get empty() {
    return !this._value || this.value?.simbol === ''; // Debe reflejar si hay valor o no
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty; // Label flota cuando hay foco o valor
  }
  required = false;
  disabled = false;
  errorState = false;

  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {
    this.open();
  }

  private _parentField = inject(MatFormField);
  overlayOrigin: ElementRef | undefined;
  panelOpen = signal(false);

  emojis = signal<Emoji[]>(EMOJIS);

  open() {
    if (this._parentField) {
      this.overlayOrigin = this._parentField.getConnectedOverlayOrigin();
    }
    this.focused = true; // Marcar como enfocado
    this.panelOpen.set(true);
    this.stateChanges.next(); // Notificar cambios
  }

  close() {
    this.panelOpen.set(false);
    this.focused = false; // Quitar foco
    this.stateChanges.next(); // Notificar cambios
  }

  selectedEmoji(emoji: Emoji) {
    this._value = emoji;
    this.stateChanges.next();
    this.close();
  }
}
