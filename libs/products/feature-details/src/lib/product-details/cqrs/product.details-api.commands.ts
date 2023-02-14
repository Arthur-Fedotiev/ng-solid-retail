import { InjectionToken, inject } from '@angular/core';
import {
  ProductsFacadeService,
  ProductViewModel,
} from '@sr/products/data-access';

export const PRODUCT_DETAILS_COMMANDS_API =
  new InjectionToken<ProductDetailsCommandsApi>('PRODUCT_DETAILS_API', {
    providedIn: 'root',
    factory: () => {
      const productsFacadeService = inject(ProductsFacadeService);
      return {
        update: inject(ProductsFacadeService).selectedProductUpdate.bind(
          productsFacadeService
        ),
        delete: inject(ProductsFacadeService).deleteSelectedProduct.bind(
          productsFacadeService
        ),
        releaseResources: inject(
          ProductsFacadeService
        ).releaseSelectedProduct.bind(productsFacadeService),
      };
    },
  });

export interface ProductDetailsCommandsApi {
  update: (product: ProductViewModel) => void;
  delete: (id: string) => void;
  releaseResources: () => void;
}
