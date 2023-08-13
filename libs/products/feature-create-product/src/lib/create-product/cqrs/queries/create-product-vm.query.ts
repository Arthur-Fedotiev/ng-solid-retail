import { InjectionToken } from '@angular/core';
import { Categories, Retailers, Tiers } from '@sr/products/application';
import { CreateProductVM } from '../../models/view-model';

export const TIERS_DISPLAY_MAP = {
  [Tiers.FirstTier]: 'Tier #1',
  [Tiers.SecondTier]: 'Tier #2',
  [Tiers.ThirdTier]: 'Tier #3',
};

interface CreateProductVmQuery {
  get(): CreateProductVM;
}

export const CREATE_PRODUCT_VM_QUERY = new InjectionToken<CreateProductVmQuery>(
  'CREATE_PRODUCT_VM_QUERY',
  {
    providedIn: 'root',
    factory: () => {
      return {
        get: () => ({
          categories: Object.values(Categories).map((value) => ({
            value,
            label: value,
          })),
          retailers: Object.values(Retailers).map((value) => ({
            value,
            label: value,
          })),
          tiers: Object.values(Tiers).map((value) => ({
            value,
            label: TIERS_DISPLAY_MAP[value],
          })),
        }),
      };
    },
  }
);
