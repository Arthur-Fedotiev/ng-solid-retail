import { TestBed } from '@angular/core/testing';

import { ProductsDisplayResolver } from './products-display.resolver';

describe('ProductsDisplayResolver', () => {
  let resolver: ProductsDisplayResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductsDisplayResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
