import { CategoryViewModel, RetailerViewModel } from '@sr/products/application';

export interface CreateProductVM {
  categories: ReadonlyArray<CategoryViewModel>;
  retailers: ReadonlyArray<RetailerViewModel>;
}
