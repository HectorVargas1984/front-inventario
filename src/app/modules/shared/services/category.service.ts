import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }


  /**
   * solicita todas la categorias
   * @returns objetos de categorias
   */
  getCategories() {

    const endpoint = `${this.url}categories`;
    return this.http.get(endpoint);

  }

  /**
   * Save the categories
   * @param body {name, categories}
   * @returns objeto guardado
   */
  postSaveCategory(body: any) {
    const endpoint = `${this.url}categories`;
    return this.http.post(endpoint, body);
  }
}
