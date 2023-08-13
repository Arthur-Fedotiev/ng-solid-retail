import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {
  ProductDetailsResolver,
  PRODUCTS_DISPLAY_VM_QUERY,
} from '@sr/products/application';
import { ResolvedDataKeys } from '@sr/shared/util';

export const PRODUCT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'display' },
  {
    path: 'display',
    loadComponent: () =>
      import('@sr/products-feature-display').then(
        (m) => m.ProductsDisplayFeatureComponent
      ),
    resolve: {
      [ResolvedDataKeys.ViewModel]: () =>
        inject(PRODUCTS_DISPLAY_VM_QUERY).get(),
    },
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
