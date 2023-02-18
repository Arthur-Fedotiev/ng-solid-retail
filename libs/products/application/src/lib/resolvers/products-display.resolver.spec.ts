import { TestBed } from '@angular/core/testing';

import { ProductsDisplayResolver } from './products-display.resolver';
import { PRODUCTS_DISPLAY_VM_QUERY } from '../cqrs/products-display-vm.query';
import { EMPTY } from 'rxjs';

describe('ProductsDisplayResolver', () => {
  it('should return productsDisplayVmQuery.get()', () => {
    const { resolver, getSpy, productsDisplayVmQueryGet } = setup();

    const result = resolver.resolve();

    expect(getSpy).toHaveBeenCalled();
    expect(result).toEqual(productsDisplayVmQueryGet);
  });

  function setup({ productsDisplayVmQueryGet = EMPTY } = {}) {
    TestBed.configureTestingModule({
      providers: [
        ProductsDisplayResolver,
        {
          provide: PRODUCTS_DISPLAY_VM_QUERY,
          useValue: {
            get: jest.fn().mockReturnValue(productsDisplayVmQueryGet),
          },
        },
      ],
    });

    return {
      resolver: TestBed.inject(ProductsDisplayResolver),
      productsDisplayVmQueryGet,
      getSpy: TestBed.inject(PRODUCTS_DISPLAY_VM_QUERY).get,
    };
  }
});
