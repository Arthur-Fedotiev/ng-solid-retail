import {
  SpecificationsViewModel,
  TierViewModel,
  RetailerViewModel,
  CategoryViewModel,
} from './view-models';

export interface CreateProductForm {
  name: string;
  sku: string;
  description: string;
  url: string;
  category: CategoryViewModel;
  prices: ReadonlyArray<Price>;
  retailer: RetailerViewModel;
  specifications: SpecificationsViewModel;
}

export interface Price {
  value: number;
  tier: TierViewModel;
  retailer: RetailerViewModel;
}
