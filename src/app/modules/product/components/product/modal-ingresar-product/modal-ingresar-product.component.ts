import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/services/product.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { CategoryElement } from 'src/app/modules/Interfaces/categoryDataSource';

interface DataDialog {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}

@Component({
  selector: 'app-modal-ingresar-product',
  templateUrl: './modal-ingresar-product.component.html',
  styleUrls: ['./modal-ingresar-product.component.css'],
})
export class ModalIngresarProductComponent implements OnInit {
  category: CategoryElement[] = [];

  selectedFile!: File;
  nameImg: string = '';

  public ProductForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    account: ['', Validators.required],
    category: ['', Validators.required],
    picture: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ModalIngresarProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    // if (this.data) {
    //   this.updateForm(this.data)
    // }

    this.getCategory();
  }

  onSave() {
    let data = {
      name: this.ProductForm.get('name')?.value,
      price: this.ProductForm.get('price')?.value,
      account: this.ProductForm.get('account')?.value,
      category: this.ProductForm.get('category')?.value,
      pricture: this.selectedFile,
    };

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.pricture, data.pricture?.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);

    this.productService.postSaveProduct(uploadImageData).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close(1);
      },
      (error: any) => {
        this.dialogRef.close(2);
      }
    );

    // if (this.data != null) {
    //   this.CategoryService.putUpdateCategory(data, this.data.id)
    //     .subscribe(data => {
    //       this.dialogRef.close(1)
    //     }, (error: any) => {
    //       this.dialogRef.close(2)
    //     })
    // } else {
    // }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // updateForm(data: DataDialog) {
  //   this.categoryForm.controls['name']?.setValue(data.name);
  //   this.categoryForm.controls['description']?.setValue(data.description);
  // }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log('data', data);
        this.category = data.categoryResponse.category;
        console.log('category', this.category);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onFileChange(event: any) {

    console.log('event', event)
    this.selectedFile = event.target.files[0];
    console.log('file', this.selectedFile);

    this.nameImg = event.target.files[0].name;
    console.log('name', this.nameImg)
  }
}
