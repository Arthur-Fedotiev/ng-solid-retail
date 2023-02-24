import { ProductByPrice } from '../../../models';

export const toProductShortInfo = ({
  id,
  name,
  sku,
  url,
  price: {
    price,
    retailer: { name: retailer },
  },
}: ProductByPrice) => ({
  id,
  name,
  sku,
  url,
  price,
  retailer,
  toString: () => `${name} - ${retailer} - ${price}`,
});
