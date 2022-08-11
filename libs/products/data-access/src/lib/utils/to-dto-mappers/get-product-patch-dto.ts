import { Product } from '@omnia/products/domain';
import { toISOStringWithTimezone } from '@omnia/shared/util';
import { ProductViewModel } from '../../..';

export const getProductPatchDto = (product: ProductViewModel): Product => {
  return {
    id: product.id,
    Name: product.name,
    SKU: product.sku.toUpperCase(),
    Description: product.description,
    Categories: product.categories.map((c) => ({ id: c.id, Name: c.name })),
    Url: product.url,
    Prices: product.prices.map((price) => ({
      id: price.id,
      productId: product.id,
      Price: price.price,
      Tier: price.tier,
      Retailer: { id: price.retailer.id, Name: price.retailer.name },
      UpdateTime: toISOStringWithTimezone(new Date()),
    })),
  };
};
