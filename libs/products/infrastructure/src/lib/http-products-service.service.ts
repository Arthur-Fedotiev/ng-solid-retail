import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GetProducts, Product, ProductUrls } from '@omnia/products/domain';
import { Observable } from 'rxjs';
import { PRODUCT_URLS } from './providers/products-urls.token';

@Injectable({
  providedIn: 'root',
})
export class HttpProductsService implements GetProducts {
  constructor(
    @Inject(PRODUCT_URLS) private readonly productUrls: ProductUrls,
    private readonly http: HttpClient
  ) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrls.getProducts);
  }
}
