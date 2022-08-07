import { Product } from '@omnia/products/domain';

export const makeProductsStub = (count: number): ReadonlyArray<Product> =>
  Array(count)
    .fill(0)
    .map((_, i) => ({
      Id: i.toString(),
      Name: `Product ${i}`,
      Description: `Product ${i} description`,
      Prices: [
        {
          Id: '1',
          Retailer: { Id: '1', Name: 'Retailer 1' },
          Price: i,
          Tier: 1,
          UpdateTime: '2020-01-01',
        },
        {
          Id: '2',
          Retailer: { Id: '2', Name: 'Retailer 2' },
          Price: i * 2,

          Tier: 2,
          UpdateTime: '2020-01-02',
        },
        {
          Id: '3',
          Retailer: { Id: '3', Name: 'Retailer 3' },
          Price: i * 3,
          Tier: 3,
          UpdateTime: '2020-01-03',
        },
      ],
      Categories: [
        { Id: '1', Name: 'Gin' },
        { Id: '2', Name: 'Vodka' },
      ],
      SKU: '12345',
    }));
