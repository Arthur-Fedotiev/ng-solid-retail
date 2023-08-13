import {
  CategoryViewModel,
  RetailerViewModel,
  TierViewModel,
} from '@sr/products/application';

export interface CreateProductVM {
  categories: ReadonlyArray<CategoryViewModel>;
  retailers: ReadonlyArray<RetailerViewModel>;
  tiers: ReadonlyArray<TierViewModel>;
}
