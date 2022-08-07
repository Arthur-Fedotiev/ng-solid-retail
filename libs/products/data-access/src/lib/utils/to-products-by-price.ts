import { ProductByPrice } from '../models/product-by-price.type';
import { ProductViewModel } from '../models/ProductViewModel';

export const toProductsByPrice = (
  acc: ReadonlyArray<ProductByPrice>,
  { prices, ...product }: ProductViewModel
): ReadonlyArray<ProductByPrice> => {
  const productsForPrice = prices.map((price) => ({
    price,
    ...product,
  }));

  return [...acc, ...productsForPrice];
};
