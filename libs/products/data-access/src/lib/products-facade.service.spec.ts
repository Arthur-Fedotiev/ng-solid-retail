import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Product, ProductsApi } from '@omnia/products/domain';
import { PRODUCTS_API, makeProductsStub } from '@omnia/products/infrastructure';
import { ID_GENERATOR } from '@omnia/shared/util';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { CategoryEnum } from './constants/category.enum';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';

import { ProductsFacadeService } from './products-facade.service';
import { TO_PRODUCT_POST_DTO } from './providers/to-product-post-dto.token';
import { TO_PRODUCT_PATCH_DTO } from './providers/to-product-update-dto.token';
import { makeProductViewModelsStub } from './testing/make-product-view-models-stub';
import { toProductViewModel } from './utils/to-product-view-model';

describe('ProductsFacadeService', () => {
  let service: ProductsFacadeService;
  let productsApiProviderMock: jest.Mocked<ProductsApi>;
  let toProductPostDtoProviderMock: jest.Mock;
  let toProductPatchDtoProviderMock: jest.Mock;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCTS_API,
          useValue: {
            getProducts: jest.fn(),
            getCategories: jest.fn(),
            createProduct: jest.fn(),
            getRetailers: jest.fn(),
            deleteProduct: jest.fn().mockReturnValue(of()),
            getOneProduct: jest.fn(),
            updateProductPrice: jest.fn(),
            getCompetitorsForCategory: jest.fn().mockReturnValue(of()),
          },
        },
        {
          provide: TO_PRODUCT_POST_DTO,
          useValue: jest.fn(),
        },
        {
          provide: TO_PRODUCT_PATCH_DTO,
          useValue: jest.fn(),
        },
        {
          provide: ID_GENERATOR,
          useValue: () => 'id',
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });
    service = TestBed.inject(ProductsFacadeService);
    routerMock = TestBed.inject(Router) as jest.Mocked<Router>;

    productsApiProviderMock = TestBed.inject(
      PRODUCTS_API
    ) as jest.Mocked<ProductsApi>;

    toProductPostDtoProviderMock = TestBed.inject(
      TO_PRODUCT_POST_DTO
    ) as jest.Mock;
    toProductPatchDtoProviderMock = TestBed.inject(
      TO_PRODUCT_PATCH_DTO
    ) as jest.Mock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());

  describe('loadProducts', () => {
    let productsStub: ReadonlyArray<Product>;

    beforeEach(() => (productsStub = makeProductsStub(5)));

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
        url: productsViewModelsStub[0].url,
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
        { id: '1', Name: 'Category 1' },
        { id: '2', Name: 'Category 2' },
      ];

      const expected = categoriesStub.map((c) => ({ id: c.id, name: c.Name }));

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

  describe('#loadRetailers', () => {
    it('should delegate to GetRetailers', fakeAsync(() => {
      productsApiProviderMock.getRetailers.mockReturnValue(
        scheduled([[]], asyncScheduler)
      );

      service.loadRetailers();
      tick();

      expect(productsApiProviderMock.getRetailers).toHaveBeenCalledTimes(1);
    }));

    it('should set retailers state', fakeAsync(() => {
      const retailersStub = [
        { id: '1', Name: 'Retailer 1' },
        { id: '2', Name: 'Retailer 2' },
      ];

      const expected = retailersStub.map((r) => ({ id: r.id, name: r.Name }));

      productsApiProviderMock.getRetailers.mockReturnValue(
        scheduled([retailersStub], asyncScheduler)
      );

      service.loadRetailers();

      tick();

      service.retailers$.subscribe((retailers) => {
        expect(retailers?.length).toEqual(expected.length);
      });

      tick();
    }));
  });

  describe('#deleteProduct', () => {
    it('should delegate to DeleteProduct passing id', fakeAsync(() => {
      const id = 'id';

      productsApiProviderMock.deleteProduct.mockReturnValue(of());

      service.deleteProduct(id);

      expect(productsApiProviderMock.deleteProduct).toHaveBeenCalledWith(id);
    }));

    it('should remove product from state', fakeAsync(() => {
      const productsStub = makeProductViewModelsStub(1);
      const id = productsStub[0].id;

      Object.assign(service, { state: new ProductsStateModel(productsStub) });
      productsApiProviderMock.deleteProduct.mockReturnValue(of());

      service.deleteProduct(id);

      service.products$.subscribe((products) => {
        expect(products.length).toEqual(0);
      });

      tick();
    }));
  });

  describe('#selectProduct', () => {
    it('should navigate to product detail page', () => {
      const product = makeProductViewModelsStub(1)[0];

      service.productSelected(product.id);

      expect(routerMock.navigate).toHaveBeenCalledWith([
        '/products',
        product.id,
      ]);
    });
  });

  describe('#loadProduct', () => {
    it('should delegate to GetProduct passing id', () => {
      const id = 'id';

      productsApiProviderMock.getOneProduct.mockReturnValue(
        scheduled([{} as Product], asyncScheduler)
      );

      service.loadProduct(id);

      expect(productsApiProviderMock.getOneProduct).toHaveBeenCalledWith(id);
    });

    it('should set selected product state', (done: jest.DoneCallback) => {
      const product = makeProductsStub(1)[0];

      productsApiProviderMock.getOneProduct.mockReturnValue(
        scheduled([product], asyncScheduler)
      );

      service.loadProduct(product.id);

      service.selectedProduct$.subscribe((selectedProduct) => {
        expect(selectedProduct).toEqual(toProductViewModel(product));
        done();
      });
    });
  });

  describe('#updateProductPrice', () => {
    it('should delegate to UpdateProductPrice passing updated product an updated price', fakeAsync(() => {
      const productStub = makeProductsStub(1)[0];
      const priceStub = productStub.Prices[0];

      const expectedProduct = { ...productStub, Prices: [priceStub] };

      toProductPatchDtoProviderMock.mockReturnValue(expectedProduct);
      productsApiProviderMock.updateProductPrice.mockReturnValue(
        of(expectedProduct as Product)
      );

      service.selectedProductPriceUpdate(
        toProductViewModel(productStub),
        priceStub.id
      );

      tick();

      expect(productsApiProviderMock.updateProductPrice).toHaveBeenCalled();
    }));
  });

  describe('#getCompetitorsForCategory$', () => {
    it('should delegate to GetCompetitorsForCategory passing Category', fakeAsync(() => {
      const categoryStub = { id: '1', name: CategoryEnum.Wine };
      const expected = { id: '1', Name: CategoryEnum.Wine };

      service.getCompetitorsForCategory$(categoryStub);
      tick();

      expect(
        productsApiProviderMock.getCompetitorsForCategory
      ).toHaveBeenCalledWith(expected);
    }));

    it('should return retailers mapped to view models', fakeAsync(() => {
      const categoryStub = { id: '1', name: CategoryEnum.Wine };
      const expected = [{ id: '1', name: 'Competitor 1' }];

      productsApiProviderMock.getCompetitorsForCategory.mockReturnValue(
        of([{ id: '1', Name: 'Competitor 1' }])
      );

      service
        .getCompetitorsForCategory$(categoryStub)
        .subscribe((competitors) => {
          expect(competitors).toEqual(expected);
        });

      tick();
    }));
  });
});
