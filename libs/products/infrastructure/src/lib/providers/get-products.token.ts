import { inject, InjectionToken } from '@angular/core';
import { ProductsApi } from '@omnia/products/domain';
import { HttpProductsService } from '../http-products-service.service';

export const PRODUCTS_API = new InjectionToken<ProductsApi>('ProductsApi', {
  providedIn: 'root',
  factory: () => inject(HttpProductsService),
});
