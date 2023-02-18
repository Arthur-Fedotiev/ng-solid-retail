import { InjectionToken, inject } from '@angular/core';
import {
  ProductsFacadeService,
  ProductViewModel,
} from '@sr/products/application';

export const PRODUCT_DETAILS_COMMANDS_API =
  new InjectionToken<ProductDetailsCommandsApi>('PRODUCT_DETAILS_API', {
    providedIn: 'root',
    factory: () => {
      const productsFacadeService = inject(ProductsFacadeService);
      return {
        update: productsFacadeService.selectedProductUpdate.bind(
          productsFacadeService
        ),
        delete: productsFacadeService.deleteSelectedProduct.bind(
          productsFacadeService
        ),
        releaseResources: productsFacadeService.releaseSelectedProduct.bind(
          productsFacadeService
        ),
      };
    },
  });

export interface ProductDetailsCommandsApi {
  update: (product: ProductViewModel) => void;
  delete: (id: string) => void;
  releaseResources: () => void;
}
