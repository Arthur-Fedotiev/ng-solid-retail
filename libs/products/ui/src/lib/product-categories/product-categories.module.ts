import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { ProductCategoriesComponent } from './product-categories.component';

@NgModule({
  declarations: [ProductCategoriesComponent],
  imports: [CommonModule, SharedUiMaterialModule],
  exports: [ProductCategoriesComponent],
})
export class ProductCategoriesModule {}
