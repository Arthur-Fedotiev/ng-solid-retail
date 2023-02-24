import { inject, InjectionToken } from '@angular/core';
import { Product } from '@sr/products/entities';
import { ID_GENERATOR } from '@sr/shared/util';
import { CreateProductForm, ProductViewModel } from '../models';
import { getSaveProductDto } from '../utils/mappers/to-dto/get-product-save-dto';

export interface ToProductSaveDto {
  (product: ProductViewModel | CreateProductForm): Product;
}

export const TO_PRODUCT_SAVE_DTO = new InjectionToken<ToProductSaveDto>(
  'ToProductPostDto',
  {
    providedIn: 'root',
    factory: () => getSaveProductDto(inject(ID_GENERATOR)),
  }
);
