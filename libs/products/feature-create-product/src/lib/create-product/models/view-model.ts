import { CategoryViewModel, RetailerViewModel } from '@sr/products/data-access';

export interface CreateProductVM {
  categories: ReadonlyArray<CategoryViewModel>;
  retailers: ReadonlyArray<RetailerViewModel>;
}
