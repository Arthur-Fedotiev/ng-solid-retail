import {
  Category,
  Retailer,
  Specifications,
  Tier,
} from '@sr/products/entities';

export type CategoryViewModel = { value: Category; label: string };
export type RetailerViewModel = { value: Retailer; label: string };
export type TierViewModel = { value: Tier; label: string };
export type SpecificationsViewModel = Specifications;
