import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ProductsApi,
  Product,
  ProductUrls,
  Category,
  Price,
  Retailer,
} from '@sr/products/entities';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { PRODUCT_URLS } from '../providers/products-urls.token';

@Injectable({
  providedIn: 'root',
})
export class HttpProductsService implements ProductsApi {
  constructor(
    @Inject(PRODUCT_URLS) private readonly productUrls: ProductUrls,
    private readonly http: HttpClient
  ) {}

  public getCategories(): Observable<ReadonlyArray<Category>> {
    return this.http.get<ReadonlyArray<Category>>(
      this.productUrls.categoriesApi
    );
  }

  public getProducts(): Observable<ReadonlyArray<Product>> {
    return this.http.get<ReadonlyArray<Product>>(this.productUrls.productsApi);
  }

  public getRetailers() {
    return this.http.get<ReadonlyArray<Retailer>>(
      this.productUrls.retailersApi
    );
  }

  public createProduct(product: Product): Observable<Product> {
    const { Prices } = product;
    const prices$ = Prices.length
      ? Prices.map((price) => this.createOnePrice(price))
      : [of({})];

    return forkJoin(prices$).pipe(
      switchMap(() =>
        this.http.post<Product>(this.productUrls.productsApi, product)
      )
    );
  }

  public deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.productUrls.productsApi}/${productId}`
    );
  }

  private createOnePrice(price: Price): Observable<Price> {
    return this.http.post<Price>(this.productUrls.pricesApi, price);
  }

  getOneProduct(): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  updateProduct(): Observable<Product> {
    throw new Error('Method not implemented.');
  }

  getCompetitorsForCategory(): Observable<readonly Retailer[]> {
    throw new Error('Method not implemented.');
  }
}
