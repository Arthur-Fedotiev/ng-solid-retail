import {
  FurnitureColor,
  ShoesAndClothingColor,
  SmartphonesColor,
} from '../constants/colors';
import { Cover } from '../constants/covers';

export type SpecificationFormGroup<T extends object> = {
  [K in keyof T]: T[K] | null;
};

export type ShoesCategoryFormGroup = SpecificationFormGroup<{
  size: number;
  color: ShoesAndClothingColor;
}>;

export type ClothingCategoryFormGroup = SpecificationFormGroup<{
  size: number;
  color: ShoesAndClothingColor;
}>;

export type SmartphonesCategoryFormGroup = SpecificationFormGroup<{
  color: SmartphonesColor;
}>;

export type FurnitureCategoryFormGroup = SpecificationFormGroup<{
  color: FurnitureColor;
  material: string;
}>;

export type BooksCategoryFormGroup = SpecificationFormGroup<{
  cover: Cover;
}>;
