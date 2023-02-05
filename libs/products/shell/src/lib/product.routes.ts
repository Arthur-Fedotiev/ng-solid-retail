import { Routes } from '@angular/router';
import { ProductDetailsResolver } from '@sr/products/data-access';

export const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'display' },
  {
    path: 'display',
    loadChildren: () =>
      import('@sr/products-feature-display').then(
        (m) => m.ProductsFeatureDisplayModule
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@sr/products/feature-create-product').then(
        (m) => m.CreateProductComponent
      ),
  },
  {
    path: ':id/edit',
    resolve: {
      product: ProductDetailsResolver,
    },
    loadComponent: () =>
      import('@sr/products/feature-create-product').then(
        (m) => m.CreateProductComponent
      ),
  },
  {
    path: ':id',
    resolve: {
      product: ProductDetailsResolver,
    },
    loadChildren: () =>
      import('@sr/products/feature-details').then(
        (m) => m.ProductsFeatureDetailsModule
      ),
  },
];
