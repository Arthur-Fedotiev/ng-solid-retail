import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {
  PRODUCTS_DISPLAY_VM_QUERY,
  ProductsDisplayVm,
} from '../cqrs/products-display-vm.query';
import { RESOLVED_VM } from '@sr/shared/util';

@Injectable({
  providedIn: 'root',
})
export class ProductsDisplayResolver
  implements Resolve<Observable<ProductsDisplayVm>>
{
  private readonly productsDisplayVm$ = inject(PRODUCTS_DISPLAY_VM_QUERY).get();

  resolve() {
    return this.productsDisplayVm$;
  }
}

export const injectVM = () =>
  inject(ActivatedRoute).snapshot.data[
    RESOLVED_VM
  ] as Observable<ProductsDisplayVm>;
