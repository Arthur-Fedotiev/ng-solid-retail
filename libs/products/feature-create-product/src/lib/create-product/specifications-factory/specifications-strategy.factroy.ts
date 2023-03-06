import { Injectable } from '@angular/core';
import { CategoryEnum } from '@sr/products/application';
import {
  SpecificationsFormGroupStrategy,
  BooksSpecificationsFormGroupStrategy,
  ClothingSpecificationsFormGroupStrategy,
  FurnitureSpecificationsFormGroupStrategy,
  ShoesSpecificationsFormGroupStrategy,
  SmartphonesSpecificationsFormGroupStrategy,
  NullSpecificationsFormGroupStrategy,
} from '../specifications-form-group-strategy/strategies';

export type CategoriesWithStrategy =
  | CategoryEnum.Books
  | CategoryEnum.Shoes
  | CategoryEnum.Clothing
  | CategoryEnum.Smartphones
  | CategoryEnum.Furniture;

@Injectable({
  providedIn: 'root',
})
export class SpecificationsStrategyFactory {
  private readonly strategies: Record<
    CategoriesWithStrategy,
    SpecificationsFormGroupStrategy
  > = {
    [CategoryEnum.Books]: new BooksSpecificationsFormGroupStrategy(),
    [CategoryEnum.Shoes]: new ShoesSpecificationsFormGroupStrategy(),
    [CategoryEnum.Clothing]: new ClothingSpecificationsFormGroupStrategy(),
    [CategoryEnum.Smartphones]:
      new SmartphonesSpecificationsFormGroupStrategy(),
    [CategoryEnum.Furniture]: new FurnitureSpecificationsFormGroupStrategy(),
  } as Record<CategoriesWithStrategy, SpecificationsFormGroupStrategy>;

  create(category: CategoryEnum) {
    return (
      this.strategies[category as CategoriesWithStrategy] ??
      new NullSpecificationsFormGroupStrategy()
    );
  }
}
