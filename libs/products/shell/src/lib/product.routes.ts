import { Routes } from '@angular/router';
import { ProductDetailsResolver } from '@sr/products/application';

export const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'display' },
  {
    path: 'display',
    loadComponent: () =>
      import('@sr/products-feature-display').then(
        (m) => m.ProductsListComponent
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
    loadComponent: () =>
      import('@sr/products/feature-details').then(
        (m) => m.ProductDetailsComponent
      ),
  },
];
