import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iStore } from '../models/store.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {


  httpClient = inject(HttpClient)

  constructor() { }

  private readonly URL_PRODUCTS = 'https://fakestoreapi.com/products'

  getProducts(){
    return this.httpClient.get<iStore[]>(this.URL_PRODUCTS)
  }

}
