import { inject, InjectionToken } from '@angular/core';
import { ProductUrls } from '@sr/products/entities';
import { ENVIRONMENT } from '@sr/shared/environments';

export const PRODUCT_URLS = new InjectionToken<ProductUrls>('ProductUrls', {
  providedIn: 'root',
  factory: () => {
    const { api } = inject(ENVIRONMENT);

    return {
      productsApi: `${api}/v1/catalogue`,
      categoriesApi: `${api}/categories`,
      pricesApi: `${api}/prices`,
      retailersApi: `${api}/retailers`,
    };
  },
});
