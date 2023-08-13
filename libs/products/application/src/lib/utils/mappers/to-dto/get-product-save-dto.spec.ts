import { getSaveProductDto } from './get-product-save-dto';

describe('getProductPostDto', () => {
  it('should return a Product dto for POST', () => {
    const product = {
      name: 'Product 1',
      sku: 'skU',
      description: 'Description 1',
      category: 'Shoes',
      retailer: 'Amazon',
      url: 'http://example.com',
      specifications: { color: 'red', size: '36' },
      prices: [{ value: 100, tier: 'FirstTier', currency: 'USD' }],
    };

    const expected = {
      name: product.name,
      sku: product.sku.toUpperCase(),
      description: product.description,
      category: product.category,
      retailer: product.retailer,
      specifications: product.specifications,
      url: product.url,
      prices: product.prices.map((price) => expect.objectContaining(price)),
    };

    expect(getSaveProductDto(product as any)).toEqual(expected);
  });

  it('should return a Product dto for PATCH', () => {
    const product = {
      id: '1',
      name: 'Product 1',
      sku: 'skU',
      description: 'Description 1',
      category: 'Shoes',
      retailer: 'Amazon',
      url: 'http://example.com',
      specifications: { color: 'red', size: '36' },
      prices: [{ value: 100, tier: 'FirstTier', currency: 'USD' }],
    };

    const expected = {
      id: product.id,
      name: product.name,
      sku: product.sku.toUpperCase(),
      description: product.description,
      url: product.url,
      category: product.category,
      retailer: product.retailer,
      specifications: product.specifications,
      prices: product.prices.map((price) => expect.objectContaining(price)),
    };

    expect(getSaveProductDto(product as any)).toEqual(expected);
  });
});
