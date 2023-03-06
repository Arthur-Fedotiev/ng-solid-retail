import { Inject, Injectable } from '@angular/core';
import { CategoryEnum } from '@sr/products/application';
import {
  SpecificationsFormGroupStrategy,
  NullSpecificationsFormGroupStrategy,
} from '../specifications-form-group-strategy/strategies';

@Injectable()
export class SpecificationsStrategyFactory {
  constructor(
    @Inject(SpecificationsFormGroupStrategy)
    private strategies: SpecificationsFormGroupStrategy[]
  ) {}

  create(category: CategoryEnum) {
    return (
      this.strategies.find((strategy) => strategy.category === category) ??
      new NullSpecificationsFormGroupStrategy()
    );
  }
}
