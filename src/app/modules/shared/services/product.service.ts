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

  /**
   * Save teh product
   * @param body 
   * @returns 
   */
  postSaveProduct(body: any) {

    console.log("datebody", body);
    const enpoint = `${this.url}products`
    return this.http.post(enpoint, body)
  }

  UpdateProduct(body: any, id: any) {
    const enpoint = `${this.url}products/${id}`
    return this.http.put(enpoint, body)
  }

}
