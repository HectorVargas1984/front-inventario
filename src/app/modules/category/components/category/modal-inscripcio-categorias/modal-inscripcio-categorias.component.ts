import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-modal-inscripcio-categorias',
  templateUrl: './modal-inscripcio-categorias.component.html',
  styleUrls: ['./model-inscripcio-categories.component.css']
})
export class ModalInscripcioCategoriasComponent implements OnInit {

  public categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private CategoryService: CategoryService, private dialogRef: MatDialogRef<ModalInscripcioCategoriasComponent>) { }

  ngOnInit(): void {
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    this.CategoryService.postSaveCategory(data)
      .subscribe(data => {
        console.log(data);
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2)
      })

  }

  onCancel() {
    this.dialogRef.close(3)
  }

}
