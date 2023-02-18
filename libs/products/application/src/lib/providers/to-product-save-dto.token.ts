import { inject, InjectionToken } from '@angular/core';
import { Product } from '@sr/products/entities';
import { ID_GENERATOR } from '@sr/shared/util';
import { CreateProductForm } from '../models/create-product-from.interface';
import { ProductViewModel } from '../models/ProductViewModel';
import { getSaveProductDto } from '../utils/to-dto-mappers/get-product-save-dto';

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
