import { Inject, Injectable } from '@angular/core';
import { GetProducts, Product } from '@omnia/products/domain';
import { GET_PRODUCTS } from '@omnia/products/infrastructure';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  pluck,
  take,
  tap,
} from 'rxjs';
import { ProductsStateModel } from './models/products-state.model';
import { toProductViewModel } from './utils/to-product-view-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacadeService {
  private state = new ProductsStateModel();

  public readonly state$ = new BehaviorSubject<ProductsStateModel>(this.state);
  public readonly products$ = this.state$.pipe(
    pluck('products'),
    distinctUntilChanged(),
    filter(Boolean)
  );

  constructor(
    @Inject(GET_PRODUCTS) private readonly getProducts: GetProducts
  ) {}

  public loadProducts(): void {
    this.getProducts
      .getProducts()
      .pipe(tap(this.updateProduct.bind(this)), take(1))
      .subscribe();
  }

  private updateProduct(products: ReadonlyArray<Product>): void {
    this.state$.next(
      (this.state = {
        ...this.state,
        products: products.map(toProductViewModel),
      })
    );
  }
}
