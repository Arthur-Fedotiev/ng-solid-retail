import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, SharedUiMaterialModule],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
