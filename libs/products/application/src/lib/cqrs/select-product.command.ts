import { InjectionToken, inject } from '@angular/core';
import { ProductsFacadeService } from '../products-facade.service';

export const SELECT_PRODUCT_COMMAND = new InjectionToken<{
  execute: (productId: string) => void;
}>('SelectProductCommand', {
  providedIn: 'root',
  factory: () => {
    const productsFacadeService = inject(ProductsFacadeService);
    return {
      execute: (productId: string) => {
        productsFacadeService.productSelected(productId);
      },
    };
  },
});
