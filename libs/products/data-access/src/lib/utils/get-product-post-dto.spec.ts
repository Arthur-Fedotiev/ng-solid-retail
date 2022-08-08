import { CreateProductForm } from '../models/create-product-from.interface';
import { toISOStringWithTimezone } from '@omnia/shared/util';
import { getProductPostDto } from './get-product-post-dto';

describe('getProductPostDto', () => {
  it('should return a Product', () => {
    const idGeneratorMock = jest.fn(() => 'id');
    const product = {
      name: 'Product 1',
      sku: 'SKU 1',
      description: 'Description 1',
      categories: [{ id: '1', name: 'Category 1' }],
      prices: [
        { price: 100, tier: 1, retailer: { Id: '1', Name: 'Retailer 1' } },
      ],
    } as unknown as CreateProductForm;

    const expectedId = idGeneratorMock();
    const expectedPriceId = idGeneratorMock();

    const expected = {
      Id: expectedId,
      id: expectedId,
      Name: product.name,
      SKU: product.sku,
      Description: product.description,
      Categories: product.categories.map((c) => ({ Id: c.id, Name: c.name })),
      Prices: product.prices.map((p) => ({
        Id: idGeneratorMock(),
        id: expectedPriceId,
        Price: p.price,
        Tier: p.tier,
        Retailer: { Id: p.retailer.id, Name: p.retailer.name },
        UpdateTime: toISOStringWithTimezone(new Date()),
      })),
    };

    expect(getProductPostDto(product, idGeneratorMock)).toEqual(expected);
  });
});
