import { makeProductViewModelsStub } from '../../../testing/make-product-view-models-stub';
import { toProductsByPrice } from './to-products-by-price';

describe('#toProductsByPrice', () => {
  it('should return a ProductByPrice', () => {
    const productsStub = makeProductViewModelsStub(2);
    const result = productsStub.reduce(toProductsByPrice, []);

    expect(result).toMatchSnapshot();
  });
});
