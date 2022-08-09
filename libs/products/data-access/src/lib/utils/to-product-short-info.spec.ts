import { toProductShortInfo } from './to-product-short-info';

const testCases = [
  {
    input: {
      id: '1',
      name: 'Electronics',
      sku: '1',
      price: {
        price: 1,
        retailer: { name: 'retailer' },
      },
    },
    expected: {
      id: '1',
      name: 'Electronics',
      sku: '1',
      price: 1,
      retailer: 'retailer',
    },
  },
  {
    input: {
      id: '2',
      name: 'Brandy',
      sku: '2',
      price: {
        price: 2,
        retailer: { name: 'retailer' },
      },
    },
    expected: {
      id: '2',
      name: 'Brandy',
      sku: '2',
      price: 2,
      retailer: 'retailer',
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
