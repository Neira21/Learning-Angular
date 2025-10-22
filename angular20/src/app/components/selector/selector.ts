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
  // encapsulation: ViewEncapsulation.None,
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
  empty = true;

  shouldLabelFloat = false;
  required = false;
  disabled = false;
  errorState = false;

  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {
    console.log('Container clicked', event);
  }

  private _parentField = inject(MatFormField);
  overlayOrigin: ElementRef | undefined;
  panelOpen = signal(false);

  open() {
    if (this._parentField) {
      this.overlayOrigin = this._parentField.getConnectedOverlayOrigin();
    }
    this.panelOpen.set(true);
  }

  close() {
    this.panelOpen.set(false);
  }
}
