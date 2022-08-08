import { InjectionToken } from '@angular/core';
import { Product } from '@omnia/products/domain';
import { IdGenerator } from '@omnia/shared/util';
import { CreateProductForm } from '../models/create-product-from.interface';
import { getProductPostDto } from '../utils/get-product-post-dto';

export type ToProductPostDto = {
  (product: CreateProductForm, IdGenerator: IdGenerator): Product;
};

export const TO_PRODUCT_POST_DTO = new InjectionToken<ToProductPostDto>(
  'ToProductPostDto',
  {
    providedIn: 'root',
    factory: () => getProductPostDto,
  }
);
