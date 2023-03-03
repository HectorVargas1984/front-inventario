import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../../Interfaces/productDataSource';
import { ProductService } from '../../../shared/services/product.service';
import { ModalIngresarProductComponent } from './modal-ingresar-product/modal-ingresar-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];

  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private productService: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct()
      .subscribe((data: any) => {
        console.log("repuesta del servicio", data);
        this.processProductResponse(data)
      }, (error: any) => {
        console.log("error", error);
      });
  }

  processProductResponse(resp: any) {

    const dataProduct: ProductElement[] = [];

    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.productResponse.products;
      listCProduct.forEach((element: ProductElement) => {
        element.category = element.category.name
        element.picture = `data:image/jpeg;base64,${element.picture}`
        dataProduct.push(element)
      });

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(ModalIngresarProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar('Producto Agregada', 'Exitosa'),
          this.getProducts();
      } else if (result == 2) {
        this.openSnackBar('Error al guadar Producto', 'Error')
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

}
