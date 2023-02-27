import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalInscripcioCategoriasComponent } from './components/category/modal-inscripcio-categorias/modal-inscripcio-categorias.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ModalInscripcioCategoriasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
