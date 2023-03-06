import { Pipe, PipeTransform } from '@angular/core';
import { CategoryEnum } from '@sr/products/application';
import {
  Color,
  SHOES_AND_CLOTHING_COLORS,
  SMARTPHONES_COLORS,
  FURNITURE_COLORS,
} from './constants/colors';

@Pipe({
  name: 'srProductColor',
  standalone: true,
})
export class ProductColorPipe implements PipeTransform {
  transform(category: CategoryEnum): readonly Color[] {
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
}
