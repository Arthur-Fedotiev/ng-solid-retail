import { Product } from '@omnia/products/domain';
import { CreateProductForm } from '../models/create-product-from.interface';
import { IdGenerator, toISOStringWithTimezone } from '@omnia/shared/util';

export const getProductPostDto = (
  product: CreateProductForm,
  IdGenerator: IdGenerator
): Product => {
  const productId = IdGenerator();

  return {
    id: productId,
    Name: product.name,
    SKU: product.sku,
    Description: product.description,
    Categories: product.categories.map((c) => ({ id: c.id, Name: c.name })),
    Prices: product.prices.map((p) => {
      const priceId = IdGenerator();

      return {
        id: priceId,
        productId,
        Price: p.price,
        Tier: p.tier,
        Retailer: { id: p.retailer.id, Name: p.retailer.name },
        UpdateTime: toISOStringWithTimezone(new Date()),
      };
    }),
  };
};
