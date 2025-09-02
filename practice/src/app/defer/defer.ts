import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { ErrorComponent } from '@app/error/error';

@Component({
  selector: 'app-defer',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './defer.html',
  styleUrl: './defer.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Defer implements OnInit {
  /*
  Permite cargar contenido de forma diferida, segun una condición
  Mejora el rendimiento, aplica lazy loading ya que retraza la carga de partes no críticas
   */
  protected isImageVisible = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.isImageVisible.set(true);
    }, 3000);
  }
}
