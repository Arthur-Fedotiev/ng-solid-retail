import { Tier, Retailer } from '@sr/products/entities';
import { Category } from '../shared/models';
import { SpecificationsViewModel } from './view-models';

export interface CreateProductForm {
  name: string;
  sku: string;
  description: string;
  url: string;
  category: Category;
  prices: ReadonlyArray<Price>;
  retailer: Retailer;
  specifications: SpecificationsViewModel;
}

export interface Price {
  value: number;
  tier: Tier;
  retailer: Retailer;
}
