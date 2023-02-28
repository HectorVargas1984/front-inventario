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
  * busca categoria por id
  * @returns objetos de categorias
  */
  getCategoriesById(id: any) {

    const endpoint = `${this.url}categories/${id}`;
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

  /**
   * Update Catgories
   * @param body {name, categories}
   * @param id id categories
   * @returns  objeto modificado
   */
  putUpdateCategory(body: any, id: any) {

    const endpoint = `${this.url}categories/${id}`
    return this.http.put(endpoint, body);

  }

  /**
   * Delete Category
   * @param id 
   * @returns 
   */
  deleteCategory(id: any) {

    const endpoint = `${this.url}categories/${id}`
    return this.http.delete(endpoint);

  }

}
