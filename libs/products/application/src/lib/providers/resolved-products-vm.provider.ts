import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResolvedDataKeys } from '@sr/shared/util';
import { Observable } from 'rxjs';
import { ProductsDisplayVm } from '../cqrs/products-display-vm.query';

export const injectResolvedProductsVM = () =>
  inject(ActivatedRoute).snapshot.data[
    ResolvedDataKeys.ViewModel
  ] as Observable<ProductsDisplayVm>;
