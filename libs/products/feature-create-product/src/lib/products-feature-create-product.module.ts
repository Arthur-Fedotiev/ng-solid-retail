import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductModule } from './create-product/create-product.module';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CreateProductComponent,
      },
    ]),
    CommonModule,
    CreateProductModule,
  ],
})
export class ProductsFeatureCreateProductModule {}
