import { CategoryEnum } from '../constants/category.enum';

export class CategoryViewModel {
  constructor(
    public readonly id: string,
    public readonly name: CategoryEnum = CategoryEnum[name]
  ) {}
}
