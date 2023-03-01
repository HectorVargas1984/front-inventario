import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../../Interfaces/productDataSource';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];

  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private productService: ProductService) { }

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

}
