import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListModule } from './products-list/products-list.module';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
];

@NgModule({
  imports: [CommonModule, ProductsListModule, RouterModule.forChild(routes)],
})
export class ProductsFeatureDisplayModule {}
