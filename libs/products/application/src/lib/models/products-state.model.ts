import { EMPTY, Observable } from 'rxjs';
import { ProductViewModel } from './product.view-model';

export class ProductsStateModel {
  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(
    public readonly products$: Observable<
      ReadonlyArray<ProductViewModel>
    > = EMPTY
  ) {}
}
