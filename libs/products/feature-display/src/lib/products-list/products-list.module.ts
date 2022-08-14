import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { SharedUiListModule } from '@omnia/shared/ui-list';
import { ProductsUiModule } from '@omnia/products/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, SharedUiListModule, ProductsUiModule, RouterModule],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
