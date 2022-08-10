import { toISOStringWithTimezone } from '@omnia/shared/util';
import { CreateProductForm } from '../../models/create-product-from.interface';
import { getProductPostDto } from './get-product-post-dto';

describe('getProductPostDto', () => {
  it('should return a Product', () => {
    const idGeneratorMock = jest.fn(() => 'id');
    const product = {
      name: 'Product 1',
      sku: 'skU',
      description: 'Description 1',
      categories: [{ id: '1', name: 'Category 1' }],
      prices: [
        { price: 100, tier: 1, retailer: { id: '1', Name: 'Retailer 1' } },
      ],
    } as unknown as CreateProductForm;

    const expectedId = idGeneratorMock();

    const expected = {
      id: expectedId,
      Name: product.name,
      SKU: product.sku.toUpperCase(),
      Description: product.description,
      Categories: product.categories.map((category) => ({
        id: category.id,
        Name: category.name,
      })),
      Prices: product.prices.map((price) => ({
        id: idGeneratorMock(),
        productId: expectedId,
        Price: price.price,
        Tier: price.tier,
        Retailer: { id: price.retailer.id, Name: price.retailer.name },
        UpdateTime: toISOStringWithTimezone(new Date()),
      })),
    };

    expect(getProductPostDto(product, idGeneratorMock)).toEqual(expected);
  });
});
