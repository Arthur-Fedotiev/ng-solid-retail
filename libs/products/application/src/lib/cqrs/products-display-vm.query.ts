import { InjectionToken, inject } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ProductsFacadeService } from '../products-facade.service';

export const PRODUCTS_DISPLAY_VM_QUERY = new InjectionToken<{
  get: () => Observable<ProductsDisplayVm>;
}>('ProductsDisplayVmQuery', {
  providedIn: 'root',
  factory: () => {
    const productsFacadeService = inject(ProductsFacadeService);
    return {
      get: () =>
        combineLatest({
          productsShortInfo: productsFacadeService.productsShortInfo$,
        }),
    };
  },
});

export interface ProductsDisplayVm {
  readonly productsShortInfo: ProductShortInfo[];
}

export interface ProductShortInfo {
  id: string;
  name: string;
  sku: string;
  url: string;
  price: number;
  retailer: string;
}
