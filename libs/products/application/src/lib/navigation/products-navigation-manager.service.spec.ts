import { TestBed } from '@angular/core/testing';

import { ProductsNavigationManagerService } from './products-navigation-manager.service';

describe('ProductsNavigationManagerService', () => {
  let service: ProductsNavigationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsNavigationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
