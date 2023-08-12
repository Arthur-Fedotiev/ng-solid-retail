import { InjectionToken, inject } from '@angular/core';
import { ProductsFacadeService } from '@sr/products/application';
import { Observable, of } from 'rxjs';
import { Retailer } from '@sr/products/entities';

export const COMPETITORS_QUERY = new InjectionToken<CompetitorsQuery>(
  'CATEGORIES_QUERY',
  {
    providedIn: 'root',
    factory: () => {
      const productsFacadeService = inject(ProductsFacadeService);
      return {
        get: () => of([]),
        // get: productsFacadeService.getCompetitorsForCategory$.bind(
        //   productsFacadeService
        // ),
      };
    },
  }
);

export interface CompetitorsQuery {
  get: (category: string) => Observable<Retailer[]>;
}
