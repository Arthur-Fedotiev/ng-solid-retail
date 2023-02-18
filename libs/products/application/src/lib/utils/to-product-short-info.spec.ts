import { toProductShortInfo } from './to-product-short-info';

const testCases = [
  {
    input: {
      id: '1',
      name: 'Electronics',
      sku: '1',
      url: 'https://www.example.com',
      price: {
        price: 1,
        retailer: { name: 'retailer' },
      },
    },
    expected: {
      id: '1',
      name: 'Electronics',
      url: 'https://www.example.com',
      sku: '1',
      price: 1,
      retailer: 'retailer',
      toString: expect.any(Function),
    },
  },
  {
    input: {
      id: '2',
      name: 'Brandy',
      url: 'https://www.example.com',
      sku: '2',
      price: {
        price: 2,
        retailer: { name: 'retailer' },
      },
    },
    expected: {
      id: '2',
      name: 'Brandy',
      url: 'https://www.example.com',
      sku: '2',
      price: 2,
      retailer: 'retailer',
      toString: expect.any(Function),
    },
  },
];

describe('toProductShortInfo', () => {
  it.each(testCases)(
    'should return product short info: %s for product: %s',
    ({ expected, input }) => {
      expect(toProductShortInfo(input)).toEqual(expected);
    }
  );
});
