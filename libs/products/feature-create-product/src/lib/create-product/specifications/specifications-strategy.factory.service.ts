import { Inject, Injectable } from '@angular/core';
import { Category } from '@sr/products/application';
import {
  SpecificationsFormGroupStrategy,
  NullSpecificationsFormGroupStrategy,
} from './strategies';

@Injectable()
export class SpecificationsStrategyFactory {
  constructor(
    @Inject(SpecificationsFormGroupStrategy)
    private strategies: SpecificationsFormGroupStrategy[]
  ) {}

  create(category: Category) {
    return (
      this.strategies.find((strategy) => strategy.category === category) ??
      new NullSpecificationsFormGroupStrategy()
    );
  }
}
