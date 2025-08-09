import { booleanAttribute, Component, computed, effect, signal, untracked } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';


interface Product{
  id: string;
  nombre: string;
  price: number;
  quantity: number;

}

type ProductoSimple = Omit<Product, 'quantity'>;


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  products = signal<ProductoSimple[]>([
    { id: 'camisa', nombre: 'Camisa', price: 200 },
    { id: 'pantalon', nombre: 'Pantalón', price:  300 },
    { id: 'zapatos', nombre: 'Zapatos', price: 150 },
    { id: 'chaqueta', nombre: 'Chaqueta', price: 100 },
    { id: 'bufanda', nombre: 'Bufanda', price: 150 },
    { id: 'gorro', nombre: 'Gorro', price: 250 },
  ])
  // products: ProductoSimple[] = [
  //   { id: 'camisa', nombre: 'Camisa', price: 200 },
  //   { id: 'pantalon', nombre: 'Pantalón', price:  300 },
  //   { id: 'zapatos', nombre: 'Zapatos', price: 150 },
  //   { id: 'chaqueta', nombre: 'Chaqueta', price: 100 },
  //   { id: 'bufanda', nombre: 'Bufanda', price: 150 },
  //   { id: 'gorro', nombre: 'Gorro', price: 250 },
  // ]

  //productoSeleccionado: Product | null = null;

  productoSeleccionado = signal<Product | null> (null);

  //isUsingCodePoint: boolean = false
  isUsingCodePoints = signal<boolean>(false)

  //protected totalPromo = 500
  protected totalPromo = signal<number>(500)

  // retornará true si se usa el codigo de puntos  o si el total precio es mayor a total promo (500)
  // get enablePromo() : boolean{
  //   return this.isUsingCodePoints() || this.totalPrice() >= this.totalPromo();
  // }

  // enablePromo = computed(()=> {
  //   return this.isUsingCodePoints() || this.totalPrice() >= this.totalPromo();
  // })

  enablePromo = false

  constructor(){
    // untracked
    // effect(()=>{
    //   this.enablePromo = untracked(()=> this.isUsingCodePoints()) || this.totalPrice() >= this.totalPromo();
    // })

    effect(()=>{
      this.enablePromo = this.isUsingCodePoints() || this.totalPrice() >= this.totalPromo();
    })
  }


  // get totalPrice():number{
  //   if(!this.productoSeleccionado()) return 0;
  //   return this.productoSeleccionado()!.price * this.productoSeleccionado()!.quantity;
  // }
  totalPrice = computed(()=> {
  if(!this.productoSeleccionado()) return 0;
    return this.productoSeleccionado()!.price * this.productoSeleccionado()!.quantity;
  })

  selectProduct(e: Event){
    const selectedElement = e.target as HTMLSelectElement;
    const productSelected = this.products().find(product => product.id === selectedElement.value);
    if(!productSelected) return;
    //this.productoSeleccionado! = { ...productSelected, quantity: 1 };
    this.productoSeleccionado.set({ ...productSelected, quantity: 1 });

  }



  handleQuantity(num:number){
    if(this.productoSeleccionado()!.quantity + num === 0) return;

    this.productoSeleccionado.update(product => ({...product!, quantity: product!.quantity + num}))
    //this.productoSeleccionado()!.quantity = this.productoSeleccionado()!.quantity + num
  }



  addToCart(){
    this.productoSeleccionado.set(null);
  }


  handleRadio(e: Event) {
    const radioElement = e.target as HTMLInputElement;
    this.isUsingCodePoints.set(booleanAttribute(radioElement.value));
  }

}
