import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryElement } from '../../../Interfaces/categoryDataSource';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(private categoriesservices: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesservices.getCategories()
      .subscribe(data => {

        console.log("data", data);
        this.processCategoriesResponse(data);
      }, error => {
        console.error("ah ocurrido un error", error)
      })
  }

  processCategoriesResponse(resp: any) {

    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code == "00") {

      let listaCategory = resp.categoryResponse.category;

      listaCategory.forEach((e: CategoryElement) => {
        console.log('Elemeto', e);
        dataCategory.push(e)
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }

}
