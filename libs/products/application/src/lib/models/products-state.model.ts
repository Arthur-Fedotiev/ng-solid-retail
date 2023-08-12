import { EMPTY, Observable } from 'rxjs';
import { ProductViewModel } from './product.view-model';
import { Category, Retailer } from '@sr/products/entities';

export class ProductsStateModel {
  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(
    public readonly products$: Observable<
      ReadonlyArray<ProductViewModel>
    > = EMPTY,
    public readonly categories$: Observable<ReadonlyArray<Category>> = EMPTY,

    public readonly retailers$: Observable<ReadonlyArray<Retailer>> = EMPTY
  ) {}
}
