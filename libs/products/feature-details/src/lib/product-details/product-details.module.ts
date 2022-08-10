import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LowestTierPricePipeModule } from './lowest-tier-price.pipe';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedUiMaterialModule,
    FlexLayoutModule,
    FormsModule,
    LowestTierPricePipeModule,
  ],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
