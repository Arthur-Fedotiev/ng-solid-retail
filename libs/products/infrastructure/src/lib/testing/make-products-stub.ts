import { Product } from '@omnia/products/domain';

export const makeProductsStub = (count: number): ReadonlyArray<Product> =>
  Array(count)
    .fill(0)
    .map((_, i) => ({
      id: i.toString(),
      Name: `Product ${i}`,
      Description: `Product ${i} description`,
      Prices: [
        {
          id: '1',
          Retailer: { id: '1', Name: 'Retailer 1' },
          Price: i,
          Tier: 1,
          UpdateTime: '2020-01-01',
        },
        {
          id: '2',
          Retailer: { id: '2', Name: 'Retailer 2' },
          Price: i * 2,

          Tier: 2,
          UpdateTime: '2020-01-02',
        },
        {
          id: '3',
          Retailer: { id: '3', Name: 'Retailer 3' },
          Price: i * 3,
          Tier: 3,
          UpdateTime: '2020-01-03',
        },
      ],
      Categories: [
        { id: '1', Name: 'Gin' },
        { id: '2', Name: 'Vodka' },
      ],
      SKU: '12345',
    }));
