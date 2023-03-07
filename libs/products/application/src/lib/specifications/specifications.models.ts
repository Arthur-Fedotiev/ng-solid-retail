import {
  COVERS,
  FURNITURE_COLORS,
  SHOES_AND_CLOTHING_COLORS,
  SMARTPHONES_COLORS,
} from '@sr/products/entities';

export type CoverType = typeof COVERS[number];

export type ShoesAndClothingColor = typeof SHOES_AND_CLOTHING_COLORS[number];
export type SmartphonesColor = typeof SMARTPHONES_COLORS[number];
export type FurnitureColor = typeof FURNITURE_COLORS[number];
