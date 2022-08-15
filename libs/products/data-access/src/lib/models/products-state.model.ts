import { EMPTY, Observable } from 'rxjs';
import { CategoryViewModel } from './CategoryViewModel';
import { ProductViewModel } from './ProductViewModel';
import { RetailerViewModel } from './RetailerViewModel';

export class ProductsStateModel {
  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(
    public readonly products$: Observable<
      ReadonlyArray<ProductViewModel>
    > = EMPTY,
    public readonly categories$: Observable<
      ReadonlyArray<CategoryViewModel>
    > = EMPTY,

    public readonly retailers$: Observable<
      ReadonlyArray<RetailerViewModel>
    > = EMPTY
  ) {}
}
