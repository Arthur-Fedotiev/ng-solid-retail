import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GetProducts, Product } from '@omnia/products/domain';
import { GET_PRODUCTS, makeProductsStub } from '@omnia/products/infrastructure';
import { asyncScheduler, scheduled } from 'rxjs';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';

import { ProductsFacadeService } from './products-facade.service';
import { makeProductViewModelsStub } from './testing/make-product-view-models-stub';

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

  describe('products state derivations', () => {
    it('should derive productsList for each product price', fakeAsync(() => {
      const productsViewModelsStub = makeProductViewModelsStub(1);
      const expected = productsViewModelsStub.reduce(
        (count, product) => count + product.prices.length,
        0
      );

      service.state$.next(new ProductsStateModel(productsViewModelsStub));

      tick();

      service.productsListForEachPrice$.subscribe((products) => {
        expect(products.length).toEqual(expected);
      });

      tick();
    }));

    it('should derive products short info', fakeAsync(() => {
      const productsViewModelsStub = makeProductViewModelsStub(1);
      const expectedShortInfo = {
        id: productsViewModelsStub[0].id,
        price: productsViewModelsStub[0].prices[0].price,
        name: productsViewModelsStub[0].name,
        sku: productsViewModelsStub[0].sku,
        retailer: productsViewModelsStub[0].prices[0].retailer.name,
      };

      service.state$.next(new ProductsStateModel(productsViewModelsStub));

      tick();

      service.productsShortInfo$.subscribe((products) => {
        expect(products[0]).toEqual(expectedShortInfo);
      });

      tick();
    }));
  });
});
