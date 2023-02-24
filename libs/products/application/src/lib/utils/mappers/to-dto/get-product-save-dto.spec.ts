import { toISOStringWithTimezone } from '@sr/shared/util';
import { CreateProductForm } from '../../../models/create-product-from.interface';
import { ProductViewModel } from '../../../models/product.view-model';
import { getSaveProductDto } from './get-product-save-dto';

describe('getProductPostDto', () => {
  it('should return a Product dto for POST', () => {
    const idGeneratorMock = jest.fn(() => 'id');
    const product = {
      name: 'Product 1',
      sku: 'skU',
      description: 'Description 1',
      categories: [{ id: '1', name: 'Category 1' }],
      prices: [{ price: 100, tier: 1, retailer: { Name: 'Retailer 1' } }],
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
        id: expectedId,
        productId: expectedId,
        Price: price.price,
        Tier: price.tier,
        Retailer: { id: price.retailer.id, Name: price.retailer.name },
        UpdateTime: toISOStringWithTimezone(new Date()),
      })),
    };

    expect(getSaveProductDto(idGeneratorMock)(product)).toEqual(expected);
  });

  it('should return a Product dto for PATCH', () => {
    const idGeneratorMock = jest.fn(() => 'id');
    const product = {
      id: 'existingId',
      name: 'Product 1',
      sku: 'skU',
      description: 'Description 1',
      url: 'http://example.com',
      categories: [{ id: '1', name: 'Category 1' }],
      prices: [
        {
          updateTime: '2020-01-01T00:00:00.000Z',
          id: 'existingId',
          price: 100,
          tier: 1,
          retailer: { id: 'priceID', Name: 'Retailer 1' },
        },
      ],
    } as unknown as ProductViewModel;

    const expectedId = product.id;

    const expected = {
      id: expectedId,
      Name: product.name,
      SKU: product.sku.toUpperCase(),
      Description: product.description,
      Categories: product.categories.map((category) => ({
        id: category.id,
        Name: category.name,
      })),
      Url: product.url,
      Prices: product.prices.map((price) => ({
        id: price.id,
        productId: expectedId,
        Price: price.price,
        Tier: price.tier,
        Retailer: { id: price.retailer.id, Name: price.retailer.name },
        UpdateTime: price.updateTime,
      })),
    };

    expect(getSaveProductDto(idGeneratorMock)(product)).toEqual(expected);
  });
});
