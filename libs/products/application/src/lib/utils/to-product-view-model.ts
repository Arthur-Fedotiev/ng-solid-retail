import { Product } from '@sr/products/entities';
import { ProductViewModel } from '../models/product.view-model';

export const toProductViewModel = (product: Product): ProductViewModel =>
  new ProductViewModel(product);
