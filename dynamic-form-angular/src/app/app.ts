import { Subscription } from 'rxjs';

import { Component, computed, inject, signal, OnDestroy } from '@angular/core';

import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

// Interface para producto
interface Product {
  id: number;
  name: string;
  priceUnitario: number;
}

// Tipo de producto para el formulario
type ProductForm = FormGroup<{
  product: FormControl<Product | null>;
  subTotal: FormControl<number>;
  quantity: FormControl<number>;
}>;

// Tipo de formulario principal
type Form = FormGroup<{
  client: FormControl<string>;
  products: FormArray<ProductForm>;
  Total: FormControl<number>;
}>;

@Component({
  selector: 'app-root',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private subscription = new Subscription();

  // Array de productos para el formulario
  productos: Product[] = [
    { id: 1, name: 'Cucumber', priceUnitario: 15.5 },
    { id: 2, name: 'Tomato', priceUnitario: 10 },
    { id: 3, name: 'Carrot', priceUnitario: 12 },
    { id: 4, name: 'Apple', priceUnitario: 11 },
  ];

  // Referencia para acceder al array de productos del formulario
  get productArray(): FormArray<ProductForm> {
    return this.form.get('products') as FormArray<ProductForm>;
  }

  get Total(): Number {
    return this.form.get('Total')?.value || 0;
  }

  // Injectar NonNullableFormBuilder para evitar valores nulos
  formBuilder = inject(NonNullableFormBuilder);

  form: Form = this.formBuilder.group({
    client: ['', [Validators.required, Validators.minLength(3)]],
    products: this.formBuilder.array<ProductForm>([this.createProductForm()]),
    Total: [0],
  });

  constructor() {
    this.subscription.add(
      this.productArray.valueChanges.subscribe(() => {
        console.log('Productos cambiados');
        console.log(this.productArray.controls[0]?.value.product?.priceUnitario);
        this.updateTotal();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ✅ Método para calcular y actualizar el total
  private updateTotal(): void {
    const total = this.productArray.controls.reduce((sum, control) => {
      const subTotal = control.get('subTotal')?.value || 0;
      return sum + subTotal;
    }, 0);
    this.form.get('Total')?.setValue(total);
  }

  createProductForm(): ProductForm {
    return this.formBuilder.group({
      product: this.formBuilder.control<Product | null>(null, [Validators.required]),
      subTotal: this.formBuilder.control<number>(0, [Validators.min(0)]),
      quantity: this.formBuilder.control<number>(0, [Validators.required, Validators.min(1), Validators.max(999)]),
    });
  }

  save() {
    console.log('save');
    console.log(this.form);
    if (this.form.invalid) {
      console.warn('⚠️ Formulario inválido');
      this.markFormGroupTouched();
      return;
    }

    console.log('✅ Guardando carrito:', this.form.value);
    console.log(`📊 Total: $${this.Total}`);
  }

  markFormGroupTouched() {
    this.form.markAllAsTouched();
    this.productArray.controls.forEach((control) => {
      control.markAllAsTouched();
    });
  }

  change(e: MatSelectChange, index: number) {
    this.productArray.at(index).patchValue({
      subTotal: e.value?.priceUnitario || 0, // Actualizar precio basado en el producto seleccionado
      quantity: 1, // Reiniciar cantidad al seleccionar un nuevo producto
    });
  }

  changeQuantity(index: number, e: Event) {
    if (!this.productArray.at(index)) return;
    if (index < 0) return;
    const quantity = Number((e.target as HTMLInputElement).value);

    const productForm = this.productArray.at(index);
    const price = productForm.get('product')?.value?.priceUnitario || 0;

    productForm.patchValue({
      quantity,
      subTotal: price * quantity,
    });
  }

  add() {
    console.log('add');
    this.productArray.push(this.createProductForm());
  }

  delete(index: number) {
    console.log('delete', index);
    this.productArray.removeAt(index);
    this.updateTotal();
  }
}
