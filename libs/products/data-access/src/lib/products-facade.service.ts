import { Inject, Injectable } from '@angular/core';
import {
  ProductsApi,
  Product,
  Category,
  Retailer,
} from '@omnia/products/domain';
import { PRODUCTS_API } from '@omnia/products/infrastructure';
import { IdGenerator, ID_GENERATOR } from '@omnia/shared/util';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  pluck,
  take,
  tap,
} from 'rxjs';
import { CategoryEnum } from './constants/category.enum';
import { CategoryViewModel } from './models/CategoryViewModel';
import { CreateProductForm } from './models/create-product-from.interface';
import { ProductsStateModel } from './models/products-state.model';
import {
  ToProductPostDto,
  TO_PRODUCT_POST_DTO,
} from './providers/to-product-post-dto.token';
import { toCategoryViewModel } from './utils/to-category-view-model';
import { toProductShortInfo } from './utils/to-product-short-info';
import { toProductViewModel } from './utils/to-product-view-model';
import { toProductsByPrice } from './utils/to-products-by-price';
import { toRetailerViewModel } from './utils/to-retailer-view-model';

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

  public readonly categories$ = this.state$.pipe(
    pluck('categories'),
    distinctUntilChanged(),
    filter(Boolean)
  );

  public readonly retailers$ = this.state$.pipe(
    pluck('retailers'),
    distinctUntilChanged(),
    filter(Boolean)
  );

  constructor(
    @Inject(PRODUCTS_API)
    private readonly productsApi: ProductsApi,
    @Inject(TO_PRODUCT_POST_DTO)
    private readonly toProductPostDto: ToProductPostDto,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator
  ) {}

  public loadProducts(): void {
    this.productsApi
      .getProducts()
      .pipe(tap(this.updateProduct), take(1))
      .subscribe();
  }

  public loadCategories(): void {
    this.productsApi
      .getCategories()
      .pipe(tap(this.updateCategories), take(1))
      .subscribe();
  }

  public loadRetailers(): void {
    this.productsApi
      .getRetailers()
      .pipe(tap(this.updateRetailers), take(1))
      .subscribe();
  }

  public createProduct(createProductFormValue: CreateProductForm): void {
    this.productsApi
      .createProduct(
        this.toProductPostDto(createProductFormValue, this.idGenerator)
      )
      .pipe(take(1))
      .subscribe();
  }

  private updateProduct = (products: ReadonlyArray<Product>) => {
    this.state$.next(
      (this.state = {
        ...this.state,
        products: products.map(toProductViewModel),
      })
    );
  };

  private updateRetailers = (retailers: ReadonlyArray<Retailer>) => {
    this.state$.next(
      (this.state = {
        ...this.state,
        retailers: retailers.map(toRetailerViewModel),
      })
    );
  };

  private readonly updateCategories = (
    categories: ReadonlyArray<Category>
  ): void => {
    this.state$.next(
      (this.state = {
        ...this.state,
        categories: categories.map(toCategoryViewModel),
      })
    );
  };
}
