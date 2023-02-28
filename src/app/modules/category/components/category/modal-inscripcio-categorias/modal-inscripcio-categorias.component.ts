import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../shared/services/category.service';

interface DataDialog{
  id:number,
  name:string,
  description:string
}

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

  constructor(
    private fb: FormBuilder, 
    private CategoryService: CategoryService, 
    private dialogRef: MatDialogRef<ModalInscripcioCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DataDialog
    ) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data){      
      this.updateForm(this.data)
    }
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if(this.data != null){
      this.CategoryService.putUpdateCategory(data, this.data.id)
      .subscribe(data=>{
        this.dialogRef.close(1)
      },(error: any) => {
        this.dialogRef.close(2)
      })
    }else{
      this.CategoryService.postSaveCategory(data)
      .subscribe(data => {
        console.log(data);
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2)
      })
    }    
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  updateForm(data:DataDialog){    
    this.categoryForm.controls['name']?.setValue(data.name);
    this.categoryForm.controls['description']?.setValue(data.description);
  }

}
