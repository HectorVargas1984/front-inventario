import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  /**
   * Get all the product
   * @returns Lista de productos 
   */
  getProduct() {
    const enpoint = `${this.url}products`
    return this.http.get(enpoint);
  }

  postSaveProduct(body: any) {
    const enpoint = `${this.url}products`
    return this.http.post(enpoint, body)
  }

}
