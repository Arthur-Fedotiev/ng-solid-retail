import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ProductsApi,
  Product,
  ProductUrls,
  Category,
} from '@omnia/products/domain';
import { Observable } from 'rxjs';
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
}
