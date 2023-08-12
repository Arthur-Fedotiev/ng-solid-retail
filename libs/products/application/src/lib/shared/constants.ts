import {
  ProductCategory,
  ProductRetailer,
  ProductTier,
  SHOES_AND_CLOTHING_COLORS,
} from '@sr/products/entities';

export const Categories = ProductCategory;
export const Retailers = ProductRetailer;
export const Tiers = ProductTier;
export const Colors = {
  [Categories.Shoes]: SHOES_AND_CLOTHING_COLORS,
  [Categories.Clothing]: SHOES_AND_CLOTHING_COLORS,
} as const;
