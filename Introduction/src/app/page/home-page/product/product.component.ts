import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { iStore } from '../../../models/store.interface';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) product? : iStore;

  private readonly _cartService = inject(CartService);

  clickAddToCard():void{
    this._cartService.addToCard(this.product!);
  }

}
