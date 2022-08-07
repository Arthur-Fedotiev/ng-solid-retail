import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { SharedUiListModule } from '@omnia/shared/ui-list';
import { ProductsUiModule } from '@omnia/products/ui';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, SharedUiListModule, ProductsUiModule],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
