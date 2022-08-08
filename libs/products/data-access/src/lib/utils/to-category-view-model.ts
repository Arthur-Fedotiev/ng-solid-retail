import { Category } from '@omnia/products/domain';
import { CategoryEnum } from '../constants/category.enum';
import { CategoryViewModel } from '../models/CategoryViewModel';

export const toCategoryViewModel = ({
  Id,
  Name,
}: Category): CategoryViewModel =>
  new CategoryViewModel(Id as string, Name as CategoryEnum);
