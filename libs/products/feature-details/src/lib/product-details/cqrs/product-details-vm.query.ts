import { InjectionToken, inject } from '@angular/core';
import {
  ProductViewModel,
  ProductsFacadeService,
} from '@sr/products/data-access';
import { Observable, map } from 'rxjs';

export const PRODUCT_DETAIL_VM_QUERY = new InjectionToken<ProductDetailsVM>(
  'PRODUCT_DETAIL_VM_QUERY',
  {
    providedIn: 'root',
    factory: () => ({
      get: () =>
        inject(ProductsFacadeService).selectedProduct$.pipe(
          map((product) => ({ product }))
        ),
    }),
  }
);

export interface ProductDetailsVM {
  get: () => Observable<{ product: ProductViewModel }>;
}
