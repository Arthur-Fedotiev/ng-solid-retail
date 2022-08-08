import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Product, ProductsApi } from '@omnia/products/domain';
import { PRODUCTS_API, makeProductsStub } from '@omnia/products/infrastructure';
import { ID_GENERATOR } from '@omnia/shared/util';
import { asyncScheduler, scheduled } from 'rxjs';
import { CreateProductForm } from './models/create-product-from.interface';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';

import { ProductsFacadeService } from './products-facade.service';
import { TO_PRODUCT_POST_DTO } from './providers/to-product-post-dto.token';
import { makeProductViewModelsStub } from './testing/make-product-view-models-stub';

describe('ProductsFacadeService', () => {
  let service: ProductsFacadeService;
  let productsApiProviderMock: jest.Mocked<ProductsApi>;
  let toProductPostDtoProviderMock: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCTS_API,
          useValue: {
            getProducts: jest.fn(),
            getCategories: jest.fn(),
            createProduct: jest.fn(),
          },
        },
        {
          provide: TO_PRODUCT_POST_DTO,
          useValue: jest.fn(),
        },
        {
          provide: ID_GENERATOR,
          useValue: () => 'id',
        },
      ],
    });
    service = TestBed.inject(ProductsFacadeService);
    productsApiProviderMock = TestBed.inject(
      PRODUCTS_API
    ) as jest.Mocked<ProductsApi>;
    toProductPostDtoProviderMock = TestBed.inject(
      TO_PRODUCT_POST_DTO
    ) as jest.Mock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadProducts', () => {
    let productsStub: ReadonlyArray<Product>;

    beforeEach(() => (productsStub = makeProductsStub(5)));
    afterEach(() => jest.clearAllMocks());

    it('should delegate to GetProducts', fakeAsync(() => {
      productsApiProviderMock.getProducts.mockReturnValue(
        scheduled([productsStub], asyncScheduler)
      );

      service.loadProducts();
      tick();

      expect(productsApiProviderMock.getProducts).toHaveBeenCalledTimes(1);
    }));

    it('should set product state', fakeAsync(() => {
      const expected = productsStub.map((p) => new ProductViewModel(p));

      productsApiProviderMock.getProducts.mockReturnValue(
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

  describe('loadCategories', () => {
    it('should delegate to GetCategories', fakeAsync(() => {
      productsApiProviderMock.getCategories.mockReturnValue(
        scheduled([[]], asyncScheduler)
      );

      service.loadCategories();
      tick();

      expect(productsApiProviderMock.getCategories).toHaveBeenCalledTimes(1);
    }));

    it('should set categories state', fakeAsync(() => {
      const categoriesStub = [
        { Id: '1', Name: 'Category 1' },
        { Id: '2', Name: 'Category 2' },
      ];

      const expected = categoriesStub.map((c) => ({ id: c.Id, name: c.Name }));

      productsApiProviderMock.getCategories.mockReturnValue(
        scheduled([categoriesStub], asyncScheduler)
      );

      service.loadCategories();

      service.categories$.subscribe((categories) => {
        expect(categories).toEqual(expected);
      });

      tick();
    }));
  });

  describe('#createProduct', () => {
    it('should delegate to CreateProduct passing  POST dto', fakeAsync(() => {
      const createdProductSub = {
        name: 'Product 1',
        sku: 'SKU 1',
        description: 'Description 1',
        categories: [{ id: '1', name: 'Category 1' }],
        prices: [
          { price: 100, tier: 1, retailer: { Id: '1', Name: 'Retailer 1' } },
        ],
      } as unknown as CreateProductForm;
      const expectedStub = {} as Product;

      toProductPostDtoProviderMock.mockReturnValueOnce(expectedStub);

      service.createProduct(createdProductSub);

      expect(productsApiProviderMock.createProduct).toHaveBeenNthCalledWith(
        1,
        expectedStub
      );
    }));
  });
});
