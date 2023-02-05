import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsApi, Product } from '@sr/products/domain';
import { PRODUCTS_API } from '@sr/products/infrastructure';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchAll,
  take,
  tap,
} from 'rxjs';
import { CategoryViewModel } from './models/CategoryViewModel';
import { CreateProductForm } from './models/create-product-from.interface';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';
import { RetailerViewModel } from './models/RetailerViewModel';
import {
  TO_PRODUCT_SAVE_DTO,
  ToProductSaveDto,
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
  private state = new ProductsStateModel(
    this.productsChanges$,
    this.categoriesChanges$,
    this.retailersChanges$
  );

  public readonly state$ = new BehaviorSubject<ProductsStateModel>(this.state);
  public readonly products$ = this.state$.pipe(
    map((state) => state.products$),
    switchAll(),
    distinctUntilChanged(),
    filter(Boolean)
  );

  public readonly selectedProduct$ = this.state$.pipe(
    map((state) => state.selectedProduct),
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
    map((state) => state.categories$),
    switchAll(),
    distinctUntilChanged(),
    filter(Boolean)
  );

  public readonly retailers$ = this.state$.pipe(
    map((state) => state.retailers$),
    switchAll(),
    distinctUntilChanged(),
    filter(Boolean)
  );

  private get productsChanges$(): Observable<ReadonlyArray<ProductViewModel>> {
    return this.productsApi
      .getProducts()
      .pipe(map((products) => products.map(toProductViewModel)));
  }

  private get categoriesChanges$(): Observable<
    ReadonlyArray<CategoryViewModel>
  > {
    return this.productsApi
      .getCategories()
      .pipe(map((categories) => categories.map(toCategoryViewModel)));
  }

  private get retailersChanges$(): Observable<
    ReadonlyArray<RetailerViewModel>
  > {
    return this.productsApi
      .getRetailers()
      .pipe(map((retailers) => retailers.map(toRetailerViewModel)));
  }

  constructor(
    @Inject(PRODUCTS_API)
    private readonly productsApi: ProductsApi,
    @Inject(TO_PRODUCT_SAVE_DTO)
    private readonly toProductSaveDto: ToProductSaveDto,
    private readonly router: Router
  ) {}

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

  private deleteProduct(id: string): void {
    this.productsApi.deleteProduct(id).pipe(take(1)).subscribe();
  }

  public productSelected(productId: string) {
    this.navigateToProductPage(productId);
  }

  public selectedProductUpdate(product: ProductViewModel) {
    this.productsApi
      .updateProduct(this.toProductSaveDto(product))
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

  private updateSelectedProduct = (selectedProduct: Product) => {
    this.state$.next(
      (this.state = {
        ...this.state,
        selectedProduct: toProductViewModel(selectedProduct),
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
