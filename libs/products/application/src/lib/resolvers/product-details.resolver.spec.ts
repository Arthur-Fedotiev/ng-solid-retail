import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { makeProductsStub } from '@sr/products/infrastructure';
import { BehaviorSubject } from 'rxjs';
import { ProductsFacadeService, ProductViewModel } from '../..';

import { ProductDetailsResolver } from './product-details.resolver';

describe('ProductDetailsResolver', () => {
  const productStub = makeProductsStub(1)[0];
  const selectedProductMock$ = new BehaviorSubject<ProductViewModel | null>(
    null
  );

  let resolver: ProductDetailsResolver;
  let facadeMock: jest.Mocked<ProductsFacadeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductDetailsResolver,
        {
          provide: ProductsFacadeService,
          useValue: {
            selectedProduct$: selectedProductMock$,
            loadProduct: jest.fn(),
          },
        },
      ],
    });
    resolver = TestBed.inject(ProductDetailsResolver);
    facadeMock = TestBed.inject(
      ProductsFacadeService
    ) as unknown as jest.Mocked<ProductsFacadeService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('#resolve', () => {
    it('should load product when route has id param', () => {
      const routeMock = {
        paramMap: new Map([['id', '1']]),
      } as unknown as ActivatedRouteSnapshot;

      resolver.resolve(routeMock);

      expect(facadeMock.loadProduct).toHaveBeenCalledTimes(1);
    });

    it('should not load product when route has no id param', () => {
      const routeMock = {
        paramMap: new Map([['id', null]]),
      } as unknown as ActivatedRouteSnapshot;

      resolver.resolve(routeMock);

      expect(facadeMock.loadProduct).not.toHaveBeenCalled();
    });

    it('should return observable of empty object when route has no id param', fakeAsync(() => {
      const routeMock = {
        paramMap: new Map([['id', null]]),
      } as unknown as ActivatedRouteSnapshot;

      const result$ = resolver.resolve(routeMock);

      result$.subscribe((result) => {
        expect(result).toEqual({});
      });
    }));

    it('should return observable of ProductViewModel when route has id param', (done) => {
      const routeMock = {
        paramMap: new Map([['id', '1']]),
      } as unknown as ActivatedRouteSnapshot;
      const expectedProduct = new ProductViewModel(productStub);

      const result$ = resolver.resolve(routeMock);

      selectedProductMock$.next(expectedProduct);

      result$.subscribe((result) => {
        expect(result).toEqual(expectedProduct);

        done();
      });
    });
  });
});
