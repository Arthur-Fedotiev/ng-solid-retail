import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, SharedUiMaterialModule],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
