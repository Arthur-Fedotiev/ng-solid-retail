import { makeProductsStub } from '@sr/products/infrastructure';
import { ProductViewModel } from '../..';
import { toProductViewModel } from '../utils/to-product-view-model';

export const makeProductViewModelsStub = (
  count: number = 3
): ReadonlyArray<ProductViewModel> =>
  makeProductsStub(count).map(toProductViewModel);
