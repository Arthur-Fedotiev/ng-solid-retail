import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';
import { ProductsFacadeService, ProductViewModel } from '../..';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsResolver implements Resolve<ProductViewModel> {
  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ProductViewModel> {
    const id = route.paramMap.get('id');

    if (!this.hasIdParam(id)) {
      return of({} as ProductViewModel);
    }

    this.productsFacade.loadProduct(id);

    return this.productsFacade.selectedProduct$.pipe(filter(Boolean), take(1));
  }

  private hasIdParam(id: string | null): id is string {
    return Boolean(id);
  }
}
