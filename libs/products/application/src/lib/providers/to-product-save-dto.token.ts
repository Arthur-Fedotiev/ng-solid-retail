import { InjectionToken } from '@angular/core';
import { CreateProductDto, PutProductDto } from '@sr/products/entities';
import { CreateProductForm, ProductViewModel } from '../models';
import { getSaveProductDto } from '../utils/mappers/to-dto/get-product-save-dto';

export interface ToProductSaveDto {
  (product: ProductViewModel | CreateProductForm):
    | CreateProductDto
    | PutProductDto;
}

export const TO_PRODUCT_SAVE_DTO = new InjectionToken<ToProductSaveDto>(
  'ToProductPostDto',
  {
    providedIn: 'root',
    factory: () => getSaveProductDto,
  }
);
