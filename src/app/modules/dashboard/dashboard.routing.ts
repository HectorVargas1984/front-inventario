import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { CategoryComponent } from '../category/components/category/category.component';

const routes: Routes = [

    {
        path: '', component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'category', component: CategoryComponent },

        ]
    },



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
