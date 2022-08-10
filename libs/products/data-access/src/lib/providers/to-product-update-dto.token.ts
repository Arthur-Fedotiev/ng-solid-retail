import { InjectionToken } from '@angular/core';
import { Product } from '@omnia/products/domain';
import { ProductViewModel } from '../models/ProductViewModel';
import { getProductPatchDto } from '../utils/to-dto-mappers/get-product-patch-dto';

export type ToProductPATCHDto = {
  (product: ProductViewModel): Product;
};

export const TO_PRODUCT_PATCH_DTO = new InjectionToken<ToProductPATCHDto>(
  'ToProductPatchDto',
  {
    providedIn: 'root',
    factory: () => getProductPatchDto,
  }
);
