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
    return this.http.post<ApiV1CataloguePut200Response>(
      this.productUrls.productsApi,
      product
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.productUrls.productsApi}/${productId}`
    );
  }

  updateProduct(product: PutProductDto): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(this.productUrls.productsApi, product);
  }

  getCompetitorsForCategory(category: Category) {
    return this.http.get<readonly Retailer[]>(
      `${this.productUrls.productsApi}/retailers/${category}`
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

  private normalizePaginatedResponse(response: GetProductsPaginatedResponse) {
    return {
      ...response,
      data: response.data ?? [],
    };
  }
}
