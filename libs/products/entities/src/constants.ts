import {
  SrApiProductsCatalogueCommonProductCategory,
  SrApiProductsCatalogueCommonProductRetailer,
  SrApiProductsCatalogueCommonProductTier,
} from '@sr/generated/solid-retail-api-types';

export const COVERS = ['Hardcover', 'Paperback', 'Kindle'] as const;

export const SHOES_AND_CLOTHING_COLORS = [
  'Black',
  'White',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
] as const;

export const SMARTPHONES_COLORS = [
  'Silver',
  'Space Gray',
  'Gold',
  'Rose Gold',
  'Midnight Green',
  'Pacific Blue',
  'Graphite',
  'White',
  'Black',
] as const;

export const FURNITURE_COLORS = [
  'Natural',
  'Cherry',
  'Walnut',
  'Maple',
  'Oak',
  'Mahogany',
  'Ebony',
  'Teak',
  'Birch',
  'Ash',
  'Pine',
  'Beech',
  'Cedar',
  'Rosewood',
] as const;

export const ProductCategory = SrApiProductsCatalogueCommonProductCategory;
export const ProductRetailer = SrApiProductsCatalogueCommonProductRetailer;
export const ProductTier = SrApiProductsCatalogueCommonProductTier;
