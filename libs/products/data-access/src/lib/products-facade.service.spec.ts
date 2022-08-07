import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GetProducts, Product } from '@omnia/products/domain';
import { GET_PRODUCTS, makeProductsStub } from '@omnia/products/infrastructure';
import { asyncScheduler, scheduled } from 'rxjs';
import { ProductViewModel } from './models/ProductViewModel';

import { ProductsFacadeService } from './products-facade.service';

describe('ProductsFacadeService', () => {
  let service: ProductsFacadeService;
  let getProductsProviderMock: jest.Mocked<GetProducts>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GET_PRODUCTS,
          useValue: {
            getProducts: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(ProductsFacadeService);
    getProductsProviderMock = TestBed.inject(
      GET_PRODUCTS
    ) as jest.Mocked<GetProducts>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadProducts', () => {
    let productsStub: ReadonlyArray<Product>;

    beforeEach(() => (productsStub = makeProductsStub(5)));
    afterEach(() => jest.clearAllMocks());

    it('should delegate to getProducts', fakeAsync(() => {
      getProductsProviderMock.getProducts.mockReturnValue(
        scheduled([productsStub], asyncScheduler)
      );

      service.loadProducts();
      tick();

      expect(getProductsProviderMock.getProducts).toHaveBeenCalledTimes(1);
    }));

    it('should set product state', fakeAsync(() => {
      const expected = productsStub.map((p) => new ProductViewModel(p));

      getProductsProviderMock.getProducts.mockReturnValue(
        scheduled([productsStub], asyncScheduler)
      );

      service.loadProducts();

      service.products$.subscribe((products) => {
        expect(products).toEqual(expected);
      });

      tick();
    }));
  });
});
