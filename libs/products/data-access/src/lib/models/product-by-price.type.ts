import { ProductViewModel } from '../..';

export type ProductByPrice = Pick<ProductViewModel, 'id' | 'name' | 'sku'> & {
  price: { price: number; retailer: { name: string } };
};
