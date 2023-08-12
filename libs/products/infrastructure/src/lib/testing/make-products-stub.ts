import { ProductDTO } from '@sr/products/entities';

export const makeProductsStub = (count: number): ReadonlyArray<ProductDTO> =>
  Array(count)
    .fill(0)
    .map((_, i) => ({
      id: i.toString(),
      name: `Product ${i}`,
      description: `Product ${i} description`,
      sku: `SKU-${i}`,
      url: `https://product-${i}.com`,
      category: 'Clothing',
      prices: [
        {
          tier: 'FirstTier',
          value: 1,
          currency: 'EUR',
        },
      ],
      retailer: 'Amazon',
      specifications: {
        cover: 'Hardcover',
      },
    }));
