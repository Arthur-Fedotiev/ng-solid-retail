import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductsApi,
  Product,
  Category,
  Retailer,
  Price,
} from '@omnia/products/domain';
import { PRODUCTS_API } from '@omnia/products/infrastructure';
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
import { CategoryViewModel } from './models/CategoryViewModel';
import { CreateProductForm } from './models/create-product-from.interface';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';
import { RetailerViewModel } from './models/RetailerViewModel';
import {
  ToProductSaveDto,
  TO_PRODUCT_SAVE_DTO,
} from './providers/to-product-save-dto.token';

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

  public readonly selectedProduct$ = this.state$.pipe(
    pluck('selectedProduct'),
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
    @Inject(TO_PRODUCT_SAVE_DTO)
    private readonly toProductSaveDto: ToProductSaveDto,
    private readonly router: Router
  ) {}

  public loadProducts(): void {
    this.productsApi
      .getProducts()
      .pipe(tap(this.updateProducts), take(1))
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
      .createProduct(this.toProductSaveDto(createProductFormValue))
      .pipe(
        tap(() => this.navigateToProductDisplayPage()),
        take(1)
      )
      .subscribe();
  }

  public deleteSelectedProduct(id: string): void {
    this.deleteProduct(id);
    this.navigateToProductDisplayPage();
  }

  public deleteProduct(id: string): void {
    this.productsApi
      .deleteProduct(id)
      .pipe(
        tap(() => this.removeProduct(id)),
        take(1)
      )
      .subscribe();
  }

  public productSelected(productId: string) {
    this.navigateToProductPage(productId);
  }

  public selectedProductPriceUpdate(
    product: ProductViewModel,
    updatedPriceId: string
  ) {
    const patchProductDto = this.toProductSaveDto(product);
    const pricePatchDto = patchProductDto.Prices.find(
      (price) => price.id === updatedPriceId
    );

    this.productsApi
      .updateProductPrice(
        this.toProductSaveDto(product),
        pricePatchDto as Price
      )
      .pipe(tap(this.updateSelectedProduct), take(1))
      .subscribe();
  }

  public getCompetitorsForCategory$({
    id,
    name,
  }: CategoryViewModel): Observable<RetailerViewModel[]> {
    return this.productsApi.getCompetitorsForCategory({ id, Name: name }).pipe(
      map((retailers) => [
        ...new Map(
          retailers.map((retailer) => [retailer.id, retailer])
        ).values(),
      ]),
      map((retailers) => retailers.map(toRetailerViewModel)),
      take(1)
    );
  }

  public loadProduct(id: string) {
    this.productsApi
      .getOneProduct(id)
      .pipe(tap(this.updateSelectedProduct), take(1))
      .subscribe();
  }

  public releaseSelectedProduct(): void {
    this.state$.next(
      (this.state = {
        ...this.state,
        selectedProduct: null,
      })
    );
  }

  private removeProduct(id: string): void {
    this.state$.next(
      (this.state = {
        ...this.state,
        products: this.state.products
          ? this.state.products.filter((product) => product.id !== id)
          : null,
      })
    );
  }

  private updateProducts = (products: ReadonlyArray<Product>): void => {
    this.state$.next(
      (this.state = {
        ...this.state,
        products: products.map(toProductViewModel),
      })
    );
  };

  private updateSelectedProduct = (selectedProduct: Product) => {
    this.state$.next(
      (this.state = {
        ...this.state,
        selectedProduct: toProductViewModel(selectedProduct),
      })
    );
  };

  private updateRetailers = (retailers: ReadonlyArray<Retailer>): void => {
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

  private navigateToProductPage(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  private navigateToProductDisplayPage(): void {
    this.router.navigate(['products', 'display']);
  }
}
