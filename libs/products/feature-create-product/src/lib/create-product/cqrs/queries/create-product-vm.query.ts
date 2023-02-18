import { InjectionToken, inject } from '@angular/core';
import { ProductsFacadeService } from '@sr/products/application';
import { Observable, asyncScheduler, combineLatest, observeOn } from 'rxjs';
import { CreateProductVM } from '../../models/view-model';

interface CreateProductVmQuery {
  get(): Observable<CreateProductVM>;
}

export const CREATE_PRODUCT_VM_QUERY = new InjectionToken<CreateProductVmQuery>(
  'CREATE_PRODUCT_VM_QUERY',
  {
    providedIn: 'root',
    factory: () => {
      const productsFacade = inject(ProductsFacadeService);

      return {
        get: () =>
          combineLatest({
            categories: productsFacade.categories$.pipe(
              observeOn(asyncScheduler)
            ),
            retailers: productsFacade.retailers$.pipe(
              observeOn(asyncScheduler)
            ),
          }),
      };
    },
  }
);
