import { makeProductsStub } from '@sr/products/infrastructure';
import { toProductViewModel } from './to-product-view-model';
import { ProductViewModel } from '../../../models';

describe('#toProductViewModel', () => {
  it('should return a ProductViewModel', () => {
    const product = makeProductsStub(1)[0];

    const productViewModel = toProductViewModel(product);

    expect(productViewModel).toBeInstanceOf(ProductViewModel);
  });
});
