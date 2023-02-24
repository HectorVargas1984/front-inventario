import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    HomeComponent
  ]
})
export class DashboardModule { }
