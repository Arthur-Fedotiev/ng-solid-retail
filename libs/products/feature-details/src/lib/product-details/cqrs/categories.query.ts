import { InjectionToken, inject } from '@angular/core';
import {
  CategoryViewModel,
  ProductsFacadeService,
  RetailerViewModel,
} from '@sr/products/data-access';
import { Observable } from 'rxjs';

export const COMPETITORS_QUERY = new InjectionToken<CompetitorsQuery>(
  'CATEGORIES_QUERY',
  {
    providedIn: 'root',
    factory: () => ({
      get: (category: CategoryViewModel) =>
        inject(ProductsFacadeService).getCompetitorsForCategory$(category),
    }),
  }
);

export interface CompetitorsQuery {
  get: (category: CategoryViewModel) => Observable<RetailerViewModel[]>;
}
