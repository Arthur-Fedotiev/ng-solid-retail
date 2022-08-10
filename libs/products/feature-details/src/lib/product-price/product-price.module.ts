import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPriceComponent } from './product-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductPriceComponent],
  imports: [
    CommonModule,
    SharedUiMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [ProductPriceComponent],
})
export class ProductPriceModule {}
