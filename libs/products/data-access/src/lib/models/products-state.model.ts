import { CategoryViewModel } from './CategoryViewModel';
import { ProductViewModel } from './ProductViewModel';
import { RetailerViewModel } from './RetailerViewModel';

export class ProductsStateModel {
  public products: ReadonlyArray<ProductViewModel> | null;
  public readonly categories: ReadonlyArray<CategoryViewModel> | null;
  public readonly retailers: ReadonlyArray<RetailerViewModel> | null;

  public readonly selectedProduct: ProductViewModel | null = null;
  public readonly loading = false;
  public readonly error: string | null = null;

  constructor(
    products?: ReadonlyArray<ProductViewModel>,
    categories?: ReadonlyArray<CategoryViewModel>,
    retailers?: ReadonlyArray<RetailerViewModel>
  ) {
    this.products = products ? products : null;
    this.categories = categories ? categories : null;
    this.retailers = retailers ? retailers : null;
  }
}
