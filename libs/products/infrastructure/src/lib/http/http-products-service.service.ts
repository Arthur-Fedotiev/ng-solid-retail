import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ProductUrls,
  GetProductsPaginatedResponse,
  Category,
  Retailer,
  ProductsApi,
  ProductDTO,
  PutProductDto,
} from '@sr/products/entities';
import { map, Observable, tap } from 'rxjs';
import { PRODUCT_URLS } from '../providers/products-urls.token';
import {
  ApiV1CataloguePut200Response,
  ApiV1CataloguePostRequest,
  ApiV1CataloguePutRequest,
  SrApiProductsCatalogueCommonProductRetailer,
} from '@sr/generated/solid-retail-api-types';

@Injectable({
  providedIn: 'root',
})
export class HttpProductsService implements ProductsApi {
  constructor(
    @Inject(PRODUCT_URLS) private readonly productUrls: ProductUrls,
    private readonly http: HttpClient
  ) {}

  getOneProduct(id: ProductDTO['id']): Observable<ProductDTO> {
    return this.http
      .get<GetProductsPaginatedResponse>(this.productUrls.productsApi, {
        params: new HttpParams().set('ids', id),
      })
      .pipe(
        map(this.normalizePaginatedResponse),
        map((response) => response.data[0])
      );
  }

  createProduct(
    product: ApiV1CataloguePostRequest
  ): Observable<ApiV1CataloguePut200Response> {
    throw new Error('Method not implemented.');
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.productUrls.productsApi}/${productId}`
    );
  }

  updateProduct(product: PutProductDto): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(this.productUrls.productsApi, product);
  }
  getCompetitorsForCategory(
    category: Category
  ): Observable<readonly SrApiProductsCatalogueCommonProductRetailer[]> {
    throw new Error('Method not implemented.');
  }

  public getCategories(): Observable<ReadonlyArray<Category>> {
    return this.http.get<ReadonlyArray<Category>>(
      this.productUrls.categoriesApi
    );
  }

  public getProducts() {
    return this.http
      .get<GetProductsPaginatedResponse>(this.productUrls.productsApi)
      .pipe(
        tap(console.log),
        map((response) => response.data)
      );
  }

  public getRetailers() {
    return this.http.get<ReadonlyArray<Retailer>>(
      this.productUrls.retailersApi
    );
  }

  private normalizePaginatedResponse(response: GetProductsPaginatedResponse) {
    return {
      ...response,
      data: response.data ?? [],
    };
  }

  // public createProduct(product: Product): Observable<Product> {
  //   const { Prices } = product;
  //   const prices$ = Prices.length
  //     ? Prices.map((price) => this.createOnePrice(price))
  //     : [of({})];

  //   return forkJoin(prices$).pipe(
  //     switchMap(() =>
  //       this.http.post<Product>(this.productUrls.productsApi, product)
  //     )
  //   );
  // }

  // private createOnePrice(price: Price): Observable<Price> {
  //   return this.http.post<Price>(this.productUrls.pricesApi, price);
  // }
}
