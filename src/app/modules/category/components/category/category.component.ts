import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../../shared/services/category.service';
import { CategoryElement } from '../../../Interfaces/categoryDataSource';
import { MatDialog } from '@angular/material/dialog';
import { ModalInscripcioCategoriasComponent } from './modal-inscripcio-categorias/modal-inscripcio-categorias.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(private categoriesservices: CategoryService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  openCategoryDialog() {
    const dialogRef = this.dialog.open(ModalInscripcioCategoriasComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar('Categoria Agregada', 'Exitosa'),
          this.getCategories();
      } else if (result == 2) {
        this.openSnackBar('Error al guadar Categoria', 'Error')
      }
    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

}

