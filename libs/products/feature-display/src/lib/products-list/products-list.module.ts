import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { SharedUiListModule } from '@omnia/shared/ui-list';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, SharedUiListModule],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
