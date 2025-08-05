import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';


interface ICartProduct{
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const PRODUCTS : ICartProduct[] = [
  {name: 'Product 1', price: 10, quantity: 2, total: 20},
  {name: 'Product 2', price: 15, quantity: 1, total: 15},
  {name: 'Product 3', price: 20, quantity: 3, total: 60},
];


@Component({
  selector: 'app-tabla',
  imports: [MatTableModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'action'];
  dataSource = PRODUCTS; // ✅ Copia del array original


  // con reactive forms
  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    total: PRODUCTS.reduce((sum, product) => sum + product.total, 0),
    products: this.formBuilder.array(PRODUCTS.map(product => this._createFormGroup(product)))
  });

  private _createFormGroup(product: ICartProduct){
    return this.formBuilder.group({
      name: [product.name],
      price: [product.price],
      quantity: [product.quantity],
      total: [product.total]
    });
  }

  private _calculate_row_total() {
    this.productsFormArray.controls.forEach((group) => {
      group.valueChanges.subscribe((value) => {
        console.log('Row value changed:', value);
      });
    });
  }

  get productsFormArray(){
    return this.form.controls.products
  }

  ngOnInit(): void {
    this._calculate_row_total();

  }


  deleteProduct(product: ICartProduct): void {
    console.log('Deleting product:', product);
    const index = this.dataSource.indexOf(product);
    if (index > -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  grandTotal() {
    return this.dataSource.reduce((sum, product) => sum + product.total, 0);
  }

  updateQuantityOnChange(product: ICartProduct): void {
    console.log(`Updating ${product.name}: new quantity = ${product.quantity}`);
  }

  // dataSource = signal([...PRODUCTS]); // ✅ Copia del array original
  // grandTotal = computed(() => {
  //   return this.dataSource().reduce((sum, product) => sum + product.total, 0
  //   );
  // });

  // deleteProduct(product: ICartProduct): void {
  //   console.log('Deleting product:', product);

  //   // ✅ Crear nueva referencia del array sin el producto
  //   this.dataSource.update(products => products.filter(p => p !== product));

  // }


  // updateQuantityOnChange(product: ICartProduct): void {
  //   console.log(`Updating ${product.name}: new quantity = ${product.quantity}`);

  //   // ✅ Recalcular total
  //   product.total = product.price * product.quantity;

  //   // ✅ Actualizar signal para que computed se ejecute
  //   this.dataSource.update(products => [...products]);
  // }

  // constructor(){
  //   effect(()=>{
  //     console.log('Grand total updated:', this.grandTotal());
  //     this.sendAnalytics(this.grandTotal());
  //   })
  // }

  // private sendAnalytics(grandTotal: number): void {
  //   console.log('Sending analytics:', grandTotal);
  // }

  // resetQuantities(): void {
  //   this.dataSource.update(products =>
  //     products.map(product => ({
  //       ...product,
  //       quantity: 1,
  //       total: product.price * 1
  //     }))
  //   );
  // }

}
