import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, SharedUiMaterialModule, FlexLayoutModule],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
