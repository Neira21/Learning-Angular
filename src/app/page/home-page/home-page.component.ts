import { Component, Input, OnInit, inject, input, effect } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

import { ProductComponent } from './product/product.component';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductsApiService } from '../../services/products-api.service';
import { iDetailProduct, iStore } from '../../models/store.interface';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    ProductComponent,
    NgFor,
    NgIf,
    RouterLink

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {

  //user para recibir el user desde la ruta
  //tiene que tener el mismo nombre que el de la ruta para que capture el valor
  @Input() user?: string;

  // inyectamos el ActivatedRoute para obtener los valores de la ruta
  // y poder pintar el input user
  private readonly _activeRouter = inject(ActivatedRoute);


  count = 0;
  totalCost = 0;
  private readonly _productApiService = inject(ProductsApiService);
  private readonly _cartService = inject(CartService);

  products: iStore[] = [];

  productsInCart: iDetailProduct[] = [];

  hasError = false;




  ngOnInit(): void {


    this._getValuesRoutes();

    this._productApiService.getProducts().subscribe({
      next: (data) => {
        this.products = data as iStore[];
        console.log('Products from API:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.hasError = true;
      },
    });


    this._cartService.cartObservable$.subscribe({
      next: (number) => (this.count = number),
    });

    this._cartService.productObservable$.subscribe({
      next: (products) => {
        console.log('Products in cart:', products);
        this.productsInCart = products
      },
    });
    this._cartService.totalObservable$.subscribe(cost => {
      this.totalCost = cost;
    });

  }


  private _getValuesRoutes(){
    console.log('Values from route:', this._activeRouter.snapshot.queryParams);

    // pintar el input user
    console.log('@input:', this.user);
  }

  increaseQuantity(id: number) {
    this._cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number) {
    this._cartService.decreaseQuantity(id);
  }
}
