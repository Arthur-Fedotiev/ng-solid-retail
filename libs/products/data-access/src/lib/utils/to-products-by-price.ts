import { ProductByPrice } from '../models/product-by-price.type';
import { ProductViewModel } from '../models/ProductViewModel';

export const toProductsByPrice = (
  acc: ReadonlyArray<ProductByPrice>,
  { prices, id, name, sku, url }: ProductViewModel
): ReadonlyArray<ProductByPrice> => {
  const productsForPrice = prices.map(({ price, retailer }) => ({
    price: { price, retailer: { name: retailer.name } },
    id,
    name,
    sku,
    url,
  }));

  return [...acc, ...productsForPrice];
};
