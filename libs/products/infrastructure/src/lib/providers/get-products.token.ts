import { inject, InjectionToken } from '@angular/core';
import { ProductsApi } from '@sr/products/entities';
import { FirestoreProductsApiService } from '../firestore/firestore-products-api.service';

export const PRODUCTS_API = new InjectionToken<ProductsApi>('ProductsApi', {
  providedIn: 'root',
  factory: () => inject(FirestoreProductsApiService),
});
