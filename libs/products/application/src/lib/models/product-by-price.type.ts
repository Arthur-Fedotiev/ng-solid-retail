import { ProductViewModel } from '../..';

export type ProductByPrice = Pick<
  ProductViewModel,
  'id' | 'name' | 'sku' | 'url'
> & {
  price: { price: number; retailer: { name: string } };
};
