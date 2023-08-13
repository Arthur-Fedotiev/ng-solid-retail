import { InjectionToken, inject } from '@angular/core';
import { ProductsFacadeService } from '@sr/products/application';
import { Observable } from 'rxjs';
import { Category, RetailerViewModel } from '@sr/products/application';

export const COMPETITORS_QUERY = new InjectionToken<CompetitorsQuery>(
  'CATEGORIES_QUERY',
  {
    providedIn: 'root',
    factory: () => {
      const productsFacadeService = inject(ProductsFacadeService);
      return {
        get: productsFacadeService.getCompetitorsForCategory$.bind(
          productsFacadeService
        ),
      };
    },
  }
);

export interface CompetitorsQuery {
  get: (category: Category) => Observable<RetailerViewModel[]>;
}
