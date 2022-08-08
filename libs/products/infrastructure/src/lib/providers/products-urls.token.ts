import { InjectionToken } from '@angular/core';
import { ProductUrls } from '@omnia/products/domain';

export const PRODUCT_URLS = new InjectionToken<ProductUrls>('ProductUrls', {
  providedIn: 'root',
  factory: () => ({
    productsApi: '/api/products',
    categoriesApi: '/api/categories',
    pricesApi: '/api/prices',
    retailersApi: '/api/retailers',
  }),
});
