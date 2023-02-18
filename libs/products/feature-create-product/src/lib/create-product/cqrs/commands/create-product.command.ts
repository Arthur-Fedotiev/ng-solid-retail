import { InjectionToken, inject } from '@angular/core';
import {
  CreateProductForm,
  ProductsFacadeService,
} from '@sr/products/application';

export const CREATE_PRODUCT_COMMAND = new InjectionToken<CreateProductCommand>(
  'CREATE_PRODUCT_COMMAND',
  {
    providedIn: 'root',
    factory: () => {
      const productsFacade = inject(ProductsFacadeService);

      return {
        execute: productsFacade.createProduct.bind(productsFacade),
      };
    },
  }
);

interface CreateProductCommand {
  execute(product: CreateProductForm): void;
}
