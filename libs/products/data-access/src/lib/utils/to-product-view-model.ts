import { Product } from '@omnia/products/domain';
import { ProductViewModel } from '../models/ProductViewModel';

export const toProductViewModel = (product: Product): ProductViewModel =>
  new ProductViewModel(product);
