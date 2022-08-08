import { NgModule } from '@angular/core';
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
    CreateProductModule,
  ],
})
export class ProductsFeatureCreateProductModule {}
