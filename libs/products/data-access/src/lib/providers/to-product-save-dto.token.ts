import { inject, InjectionToken } from '@angular/core';
import { Product } from '@omnia/products/domain';
import { ID_GENERATOR } from '@omnia/shared/util';
import { CreateProductForm } from '../models/create-product-from.interface';
import { ProductViewModel } from '../models/ProductViewModel';
import { getSaveProductDto } from '../utils/to-dto-mappers/get-product-post-dto';

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
