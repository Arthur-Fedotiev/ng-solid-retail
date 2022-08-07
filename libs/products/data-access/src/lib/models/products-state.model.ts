import { ProductViewModel } from './ProductViewModel';

export class ProductsStateModel {
  public readonly products: ReadonlyArray<ProductViewModel> | null;

  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(products?: ReadonlyArray<ProductViewModel>) {
    this.products = products ? products : null;
  }
}
