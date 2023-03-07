import { Injectable } from '@angular/core';
import {
  SHOES_AND_CLOTHING_COLORS,
  SMARTPHONES_COLORS,
  FURNITURE_COLORS,
  COVERS,
} from '@sr/products/entities';
import { CategoryEnum } from '../constants/category.enum';

type Color =
  | typeof SHOES_AND_CLOTHING_COLORS[number]
  | typeof SMARTPHONES_COLORS[number]
  | typeof FURNITURE_COLORS[number];

@Injectable({
  providedIn: 'root',
})
export class SpecificationsDataService {
  getColors(category: CategoryEnum): readonly Color[] {
    switch (category) {
      case CategoryEnum.Shoes:
      case CategoryEnum.Clothing:
        return SHOES_AND_CLOTHING_COLORS;
      case CategoryEnum.Smartphones:
        return SMARTPHONES_COLORS;
      case CategoryEnum.Furniture:
        return FURNITURE_COLORS;
      default:
        throw new Error('Invalid category');
    }
  }

  getSizes(category: CategoryEnum): readonly (number | string)[] {
    switch (category) {
      case CategoryEnum.Shoes:
        return [36, 37, 38, 39, 40, 41, 42, 43, 44, 45] as const;
      case CategoryEnum.Clothing:
        return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
      default:
        throw new Error('Invalid category');
    }
  }

  getCoverTypes(): readonly typeof COVERS[number][] {
    return COVERS;
  }
}
