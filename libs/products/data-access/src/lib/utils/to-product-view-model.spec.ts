import { makeProductsStub } from '@sr/products/infrastructure';
import { ProductViewModel } from '../..';
import { toProductViewModel } from './to-product-view-model';

describe('#toProductViewModel', () => {
  it('should return a ProductViewModel', () => {
    const product = makeProductsStub(1)[0];

    const productViewModel = toProductViewModel(product);

    expect(productViewModel).toBeInstanceOf(ProductViewModel);
  });
});
