import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/services/product.service';

interface DataDialog {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any
}

@Component({
  selector: 'app-modal-ingresar-product',
  templateUrl: './modal-ingresar-product.component.html',
  styleUrls: ['./modal-ingresar-product.component.css']
})
export class ModalIngresarProductComponent implements OnInit {

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
    private dialogRef: MatDialogRef<ModalIngresarProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    // if (this.data) {
    //   this.updateForm(this.data)
    // }
  }

  onSave() {
    let data = {
      name: this.ProductForm.get('name')?.value,
      description: this.ProductForm.get('description')?.value
    }
    this.productService.postSaveProduct(data)
      .subscribe(data => {
        console.log(data);
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2)
      })

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

}
