import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetailsModule } from './product-details/product-details.module';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ProductDetailsComponent }]),
    CommonModule,
    ProductDetailsModule,
    ProductDetailsModule,
  ],
})
export class ProductsFeatureDetailsModule {}
