import { ProductDTO } from '@sr/products/entities';
import { ProductViewModel } from '../../../models';

export const toProductViewModel = (product: ProductDTO): ProductViewModel =>
  new ProductViewModel(product);
