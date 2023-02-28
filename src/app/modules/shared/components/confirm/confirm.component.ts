import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    if (!this.data) {
      this.categoryService.deleteCategory(this.data.id)
        .subscribe((d: any) => {
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2)
        })
    } else {
      this.dialogRef.close(2)
    }

  }

}
