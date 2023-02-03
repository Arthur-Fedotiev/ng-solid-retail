import { inject, InjectionToken } from '@angular/core';
import { ProductUrls } from '@sr/products/domain';
import { ENVIRONMENT } from '@sr/shared/environments';

export const PRODUCT_URLS = new InjectionToken<ProductUrls>('ProductUrls', {
  providedIn: 'root',
  factory: () => {
    const { api } = inject(ENVIRONMENT);

    return {
      productsApi: `${api}/products`,
      categoriesApi: `${api}/categories`,
      pricesApi: `${api}/prices`,
      retailersApi: `${api}/retailers`,
    };
  },
});
