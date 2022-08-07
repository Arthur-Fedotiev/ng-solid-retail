import { Inject, Injectable } from '@angular/core';
import { GetProducts, Product } from '@omnia/products/domain';
import { GET_PRODUCTS } from '@omnia/products/infrastructure';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  pluck,
  take,
  tap,
} from 'rxjs';
import { ProductsStateModel } from './models/products-state.model';
import { toProductShortInfo } from './utils/to-product-short-info';
import { toProductViewModel } from './utils/to-product-view-model';
import { toProductsByPrice } from './utils/to-products-by-price';

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

  public readonly productsListForEachPrice$ = this.products$.pipe(
    map((products) => products.reduce(toProductsByPrice, []))
  );

  public readonly productsShortInfo$ = this.productsListForEachPrice$.pipe(
    map((products) => products.map(toProductShortInfo))
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
