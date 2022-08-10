import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetailsResolver } from '@omnia/products/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'display' },
      {
        path: 'display',
        loadChildren: () =>
          import('@omnia/products-feature-display').then(
            (m) => m.ProductsFeatureDisplayModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('@omnia/products/feature-create-product').then(
            (m) => m.ProductsFeatureCreateProductModule
          ),
      },
      {
        path: ':id/edit',
        resolve: {
          product: ProductDetailsResolver,
        },
        loadChildren: () =>
          import('@omnia/products/feature-create-product').then(
            (m) => m.ProductsFeatureCreateProductModule
          ),
      },
      {
        path: ':id',
        resolve: {
          product: ProductDetailsResolver,
        },
        loadChildren: () =>
          import('@omnia/products/feature-details').then(
            (m) => m.ProductsFeatureDetailsModule
          ),
      },
    ]),
  ],
})
export class ProductsShellModule {}
