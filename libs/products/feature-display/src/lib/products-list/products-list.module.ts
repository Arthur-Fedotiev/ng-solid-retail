import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
