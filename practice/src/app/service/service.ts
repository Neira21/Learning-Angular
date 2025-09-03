import { response } from './../types/character';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { UserService } from '@app/services/user-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServiceElement } from './serviceElement/serviceElement';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-service',
  imports: [
    ServiceElement,
    //AsyncPipe,
    JsonPipe,
    KeyValuePipe,
  ], // ← Sin imports, solo signals
  templateUrl: './service.html',
  styleUrl: './service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 1. Parametros de entrada
  // 2. Cambios por interaccion del usuario
  // 3. Cambios por llamadas async
})
export class Service {
  protected readonly title = signal('Rick and Morty API');
  private apiService = inject(UserService);
  protected error = signal<{ message: string; status?: number } | undefined>(
    undefined
  );

  protected apiResponse: Signal<response | undefined> = toSignal(
    this.apiService.getUsers().pipe(
      catchError((error) => {
        this.error.set({
          message: error.messagea || 'Error desconocido',
          status: error.status || 0,
        });
        return of(undefined);
      })
    ),
    {
      initialValue: undefined,
    }
  );
}
