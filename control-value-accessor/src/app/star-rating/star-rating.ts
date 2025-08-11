import { Component, input, model, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'star-rating',
    '(mouseleave)': 'handleMouseLeave()',
    '[class.disabled]': 'isDisabled()',
  }
})
export class StarRating {

  starCount = input.required<number>();
  rating = model<number>(0);
  isDisabled = input(false, {alias: 'disabled'})

  stars = signal<boolean[]>([]);
  hoveredIndex = signal<number>(-1);

  ngOnInit(): void {
    this.stars.set(Array(this.starCount()).fill(false));
  }

  rate(rating: number) {
    if (this.isDisabled()) return;
    this.rating.set(rating);
  }

  handleMouseOver(index: number) {
    if (this.isDisabled()) return;
    this.hoveredIndex.set(index);
  }

  handleMouseLeave() {
    this.hoveredIndex.set(-1);
  }
}
