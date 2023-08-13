import { Injectable, inject } from '@angular/core';
import { PRODUCTS_API } from '@sr/products/infrastructure';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchAll,
  take,
} from 'rxjs';

import { TO_PRODUCT_SAVE_DTO } from './providers/to-product-save-dto.token';

import {
  toProductShortInfo,
  toProductViewModel,
  toProductsByPrice,
} from './utils/mappers/to-view-model';
import { ProductsNavigationManagerService } from './navigation/products-navigation-manager.service';
import {
  CreateProductForm,
  ProductViewModel,
  ProductsStateModel,
  RetailerViewModel,
} from './models';
import { Category } from './shared';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacadeService {
  private readonly productsApi = inject(PRODUCTS_API);
  private readonly toProductSaveDto = inject(TO_PRODUCT_SAVE_DTO);
  private readonly productsNavigationManager = inject(
    ProductsNavigationManagerService
  );

  private state = new ProductsStateModel(this.productsChanges$);

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

  private get productsChanges$(): Observable<ReadonlyArray<ProductViewModel>> {
    return this.productsApi
      .getProducts()
      .pipe(map((products) => products.map(toProductViewModel)));
  }

  public createProduct(createProductFormValue: CreateProductForm): void {
    this.productsApi
      .createProduct(this.toProductSaveDto(createProductFormValue))
      .pipe(take(1))
      .subscribe(() => this.navigateToProductDisplayPage());
  }

  public deleteSelectedProduct(id: string) {
    this.deleteProduct(id).subscribe(() => this.navigateToProductDisplayPage());
  }

  private deleteProduct(id: string) {
    return this.productsApi.deleteProduct(id).pipe(take(1));
  }

  public productSelected(productId: string) {
    this.productsNavigationManager.navigateToProduct(productId);
  }

  public selectedProductUpdate(product: ProductViewModel) {
    this.productsApi
      .updateProduct(this.toProductSaveDto(product) as any)
      .pipe(take(1))
      .subscribe(this.updateSelectedProduct);
  }

  public getCompetitorsForCategory$(category: Category) {
    return this.productsApi.getCompetitorsForCategory(category).pipe(
      map((retailers) => retailers.map((value) => ({ value, label: value } satisfies RetailerViewModel))),
      take(1)
    );
  }

  public loadProduct(id: string) {
    this.productsApi
      .getOneProduct(id)
      .pipe(take(1))
      .subscribe(this.updateSelectedProduct);
  }

  public releaseSelectedProduct(): void {
    this.state$.next(
      (this.state = {
        ...this.state,
        selectedProduct: null,
      })
    );
  }

  private updateSelectedProduct = (selectedProduct: any) => {
    this.state$.next(
      (this.state = {
        ...this.state,
        selectedProduct: toProductViewModel(selectedProduct),
      })
    );
  };

  private navigateToProductDisplayPage(): void {
    this.productsNavigationManager.navigateToDisplay();
  }
}
