import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LowestTierPricePipeModule } from './lowest-tier-price.pipe';
import { ProductPriceModule } from '../product-price/product-price.module';
import { ProductsUiModule } from '@omnia/products/ui';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedUiMaterialModule,
    FlexLayoutModule,
    FormsModule,
    LowestTierPricePipeModule,
    ProductPriceModule,
    ProductsUiModule,
  ],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
