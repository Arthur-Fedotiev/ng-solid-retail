import { inject, InjectionToken } from '@angular/core';
import { GetProducts } from '@omnia/products/domain';
import { HttpProductsService } from '../http-products-service.service';

export const GET_PRODUCTS = new InjectionToken<GetProducts>('GetProducts', {
  providedIn: 'root',
  factory: () => inject(HttpProductsService),
});
