import { inject, InjectionToken } from '@angular/core';
import { ProductsApi } from '@omnia/products/domain';
import { ENVIRONMENT } from '@omnia/shared/environments';
import { FirestoreProductsApiService } from '../firestore/firestore-products-api.service';

export const PRODUCTS_API = new InjectionToken<ProductsApi>('ProductsApi', {
  providedIn: 'root',
  factory: () =>
    inject(ENVIRONMENT).production
      ? inject(FirestoreProductsApiService)
      : inject(FirestoreProductsApiService),
});
