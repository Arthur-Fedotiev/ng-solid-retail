import { Injectable } from '@angular/core';
import {
  SHOES_AND_CLOTHING_COLORS,
  SMARTPHONES_COLORS,
  FURNITURE_COLORS,
  COVERS,
} from '@sr/products/entities';
import { Categories } from '../shared/constants';
import { Category } from '../shared/models';

type Color =
  | typeof SHOES_AND_CLOTHING_COLORS[number]
  | typeof SMARTPHONES_COLORS[number]
  | typeof FURNITURE_COLORS[number];

@Injectable({
  providedIn: 'root',
})
export class SpecificationsDataService {
  getColors(category: Category): readonly Color[] {
    switch (category) {
      case Categories.Shoes:
      case Categories.Clothing:
        return SHOES_AND_CLOTHING_COLORS;
      case Categories.Smartphones:
        return SMARTPHONES_COLORS;
      case Categories.Furniture:
        return FURNITURE_COLORS;
      default:
        throw new Error('Invalid category');
    }
  }

  getSizes(category: Category): readonly (number | string)[] {
    switch (category) {
      case Categories.Shoes:
        return [36, 37, 38, 39, 40, 41, 42, 43, 44, 45] as const;
      case Categories.Clothing:
        return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
      default:
        throw new Error('Invalid category');
    }
  }

  getCoverTypes(): readonly typeof COVERS[number][] {
    return COVERS;
  }
}
