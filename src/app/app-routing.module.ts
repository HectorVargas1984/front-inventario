import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard.routing';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false, useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
