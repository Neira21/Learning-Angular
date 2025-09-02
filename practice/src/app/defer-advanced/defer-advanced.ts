import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-defer-advanced',
  imports: [],
  templateUrl: './defer-advanced.html',
  styleUrl: './defer-advanced.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferAdvanced {
  protected isImageVisible = signal(false);

  onImageLoad() {
    this.isImageVisible.set(true);
  }
}
