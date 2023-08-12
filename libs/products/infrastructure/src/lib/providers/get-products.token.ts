import { inject, InjectionToken } from '@angular/core';
import { ProductsApi } from '@sr/products/entities';
import { HttpProductsService } from '../http/http-products-service.service';

export const PRODUCTS_API = new InjectionToken<ProductsApi>('ProductsApi', {
  providedIn: 'root',
  factory: () => inject(HttpProductsService),
});
