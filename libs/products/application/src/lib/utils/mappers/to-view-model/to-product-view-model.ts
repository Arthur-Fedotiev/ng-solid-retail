import { Product } from '@sr/products/entities';
import { ProductViewModel } from '../../../models';

export const toProductViewModel = (product: Product): ProductViewModel =>
  new ProductViewModel(product);
