import { makeProductsStub } from '@sr/products/infrastructure';
import { ProductViewModel, toProductViewModel } from '../..';

export const makeProductViewModelsStub = (
  count: number = 3
): ReadonlyArray<ProductViewModel> =>
  makeProductsStub(count).map(toProductViewModel);
