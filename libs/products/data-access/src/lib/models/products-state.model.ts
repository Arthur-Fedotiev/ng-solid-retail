import { Product } from '@omnia/products/domain';
import { ProductViewModel } from './ProductViewModel';

export class ProductsStateModel {
  public readonly products: ReadonlyArray<ProductViewModel> | null;

  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(products?: Product[]) {
    this.products = products
      ? products.map((product) => new ProductViewModel(product))
      : null;
  }
}
