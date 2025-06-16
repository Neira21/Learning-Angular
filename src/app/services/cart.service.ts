import { Injectable } from '@angular/core';
import { iDetailProduct, iStore } from '../models/store.interface';
import { Subject } from 'rxjs';

//el subject de rxjs es un tipo de observable que permite emitir valores y ser observado por otros componentes
//es útil para crear un flujo de datos entre componentes sin necesidad de usar un servicio de estado global
//en este caso, usamos un subject para emitir la lista de productos del carrito, el contador del carrito y la cantidad total del carrito

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // variable privada para almacenar los productos del carrito y usar acá en el servicio
  private _productsDetail: iDetailProduct[] = [];
  private _count = 0;


  // Subject para emitir la lista de productos del carrito para que los componentes se suscriban
  private _productsSubject = new Subject<iDetailProduct[]>();
  productObservable$ = this._productsSubject.asObservable();

  // Subject para emitir el contador del carrito para que los componentes se suscriban

  private _countSubject = new Subject<number>();
  cartObservable$ = this._countSubject.asObservable();

  // Subject para emitir el total del carrito
  private _totalSubject = new Subject<number>();
  totalObservable$ = this._totalSubject.asObservable();


  // para actualizar el monto total del carrito
  updateTotalCost(){
    const total = this._productsDetail.reduce((acc, item) => acc + item.total, 0);
    this._totalSubject.next(total);
  }


  addToCard(product: iStore) {
    const idProduct = product.id;
    const index = this._productsDetail.findIndex(({ product }) => product.id === idProduct);

    if (index === -1) {
      // Si el producto no existe, lo agregamos con cantidad 1
      this._productsDetail.push({ product, count: 1, total: product.price });
    } else {
      // Si ya existe, aumentamos la cantidad y el total
      this.increaseQuantity(idProduct);
      return;
    }

    this._updateCount(); // Actualiza el contador del carrito
    this.updateTotalCost(); // Actualizar el total del carrito
    this._productsSubject.next(this._productsDetail); // Emitimos la lista actualizada
  }

  increaseQuantity(id: number) {
    const index = this._productsDetail.findIndex(({ product }) => product.id === id);
    if (index !== -1) {
      this._productsDetail[index].count += 1;
      this._productsDetail[index].total = this._productsDetail[index].count * this._productsDetail[index].product.price;
      this._updateCount();
      this.updateTotalCost(); // Actualizar el total del carrito
      this._productsSubject.next(this._productsDetail);
    }
  }

  decreaseQuantity(id: number) {
    const index = this._productsDetail.findIndex(({ product }) => product.id === id);
    if (index !== -1) {
      this._productsDetail[index].count -= 1;

      if (this._productsDetail[index].count === 0) {
        // Si la cantidad es 0, eliminamos el producto del carrito
        this._productsDetail.splice(index, 1);
      } else {
        // Si no, recalculamos el total
        this._productsDetail[index].total = this._productsDetail[index].count * this._productsDetail[index].product.price;
      }

      this._updateCount();
      this.updateTotalCost(); // Actualizar el total del carrito
      this._productsSubject.next(this._productsDetail);
    }
  }



  private _updateCount() {
    this._count = this._productsDetail.reduce((acc, item) => acc + item.count, 0);
    this._countSubject.next(this._count);
  }
}
