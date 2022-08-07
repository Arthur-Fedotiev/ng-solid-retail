import { ProductViewModel } from '../..';

export type ProductByPrice = Omit<ProductViewModel, 'prices'> & {
  price: ProductViewModel['prices'][number];
};
