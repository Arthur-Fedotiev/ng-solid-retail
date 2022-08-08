import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ProductsApi,
  Product,
  ProductUrls,
  Category,
} from '@omnia/products/domain';
import { Observable, tap } from 'rxjs';
import { PRODUCT_URLS } from './providers/products-urls.token';

@Injectable({
  providedIn: 'root',
})
export class HttpProductsService implements ProductsApi {
  constructor(
    @Inject(PRODUCT_URLS) private readonly productUrls: ProductUrls,
    private readonly http: HttpClient
  ) {}

  public getCategories(): Observable<readonly Category[]> {
    return this.http.get<Category[]>(this.productUrls.categoriesApi);
  }

  public getProducts(): Observable<readonly Product[]> {
    return this.http.get<Product[]>(this.productUrls.productsApi);
  }

  public createProduct(product: Product): Observable<Product> {
    console.log('createProduct', product);
    console.log('createProduct', this.productUrls.productsApi);

    return this.http
      .post<Product>(this.productUrls.productsApi, product)
      .pipe(tap((createdProduct) => console.log(createdProduct)));
  }
}
