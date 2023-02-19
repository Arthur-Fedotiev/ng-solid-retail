import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Product, ProductsApi } from '@sr/products/entities';
import { PRODUCTS_API, makeProductsStub } from '@sr/products/infrastructure';
import { ID_GENERATOR } from '@sr/shared/util';
import { asyncScheduler, of, scheduled, Subject } from 'rxjs';
import { CategoryEnum } from './constants/category.enum';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/ProductViewModel';

import { ProductsFacadeService } from './products-facade.service';
import { TO_PRODUCT_SAVE_DTO } from './providers/to-product-save-dto.token';
import { makeProductViewModelsStub } from './testing/make-product-view-models-stub';
import { toProductViewModel } from './utils/to-product-view-model';
import { ProductsNavigationManagerService } from './navigation/products-navigation-manager.service';

describe('ProductsFacadeService', () => {
  const getProductsSubj$ = new Subject();
  const getCategoriesSubj$ = new Subject();
  const getRetailersSubj$ = new Subject();

  let service: ProductsFacadeService;
  let productsApiProviderMock: jest.Mocked<ProductsApi>;
  let toProductSaveDtoMock: jest.Mock;
  let navigationManagerMock: jest.Mocked<ProductsNavigationManagerService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCTS_API,
          useValue: {
            getProducts: jest.fn().mockReturnValue(getProductsSubj$),
            getCategories: jest.fn().mockReturnValue(getCategoriesSubj$),
            getRetailers: jest.fn().mockReturnValue(getRetailersSubj$),
            createProduct: jest.fn(),
            deleteProduct: jest.fn().mockReturnValue(of(void 0)),
            getOneProduct: jest.fn(),
            updateProduct: jest.fn(),
            getCompetitorsForCategory: jest.fn().mockReturnValue(of()),
          },
        },
        {
          provide: TO_PRODUCT_SAVE_DTO,
          useValue: jest.fn(),
        },

        {
          provide: ID_GENERATOR,
          useValue: () => 'id',
        },
        {
          provide: ProductsNavigationManagerService,
          useValue: {
            navigateToDisplay: jest.fn(),
            navigateToProduct: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(ProductsFacadeService);
    navigationManagerMock = TestBed.inject(
      ProductsNavigationManagerService
    ) as jest.Mocked<ProductsNavigationManagerService>;

    productsApiProviderMock = TestBed.inject(
      PRODUCTS_API
    ) as jest.Mocked<ProductsApi>;

    toProductSaveDtoMock = TestBed.inject(TO_PRODUCT_SAVE_DTO) as jest.Mock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());

  describe('loadProducts', () => {
    let productsStub: ReadonlyArray<Product>;

    beforeEach(() => (productsStub = makeProductsStub(5)));

    it('should delegate to GetProducts', () => {
      productsApiProviderMock.getProducts.mockReturnValue(
        scheduled([productsStub], asyncScheduler)
      );

      expect(productsApiProviderMock.getProducts).toHaveBeenCalledTimes(1);
    });

    it('should set product state', fakeAsync(() => {
      const productsStub = makeProductsStub(5);
      const expected = productsStub.map((p) => new ProductViewModel(p));

      service.products$.subscribe((products) => {
        expect(products).toEqual(expected);
      });

      getProductsSubj$.next(productsStub);
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

      service.state$.next(new ProductsStateModel(of(productsViewModelsStub)));

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
        toString: expect.any(Function),
      };

      service.state$.next(new ProductsStateModel(of(productsViewModelsStub)));

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

      expect(productsApiProviderMock.getCategories).toHaveBeenCalledTimes(1);
    }));

    it('should set categories state', fakeAsync(() => {
      const categoriesStub = [
        { id: '1', Name: 'Category 1' },
        { id: '2', Name: 'Category 2' },
      ];

      const expected = categoriesStub.map((c) => ({ id: c.id, name: c.Name }));

      service.categories$.subscribe((categories) => {
        expect(categories).toEqual(expected);
      });

      getCategoriesSubj$.next(categoriesStub);
      tick();
    }));
  });

  describe('#loadRetailers', () => {
    it('should delegate to GetRetailers', fakeAsync(() => {
      productsApiProviderMock.getRetailers.mockReturnValue(
        scheduled([[]], asyncScheduler)
      );

      expect(productsApiProviderMock.getRetailers).toHaveBeenCalledTimes(1);
    }));

    it('should set retailers state', fakeAsync(() => {
      const retailersStub = [
        { id: '1', Name: 'Retailer 1' },
        { id: '2', Name: 'Retailer 2' },
      ];

      const expected = retailersStub.map((r) => ({ id: r.id, name: r.Name }));

      tick();

      service.retailers$.subscribe((retailers) => {
        expect(retailers).toEqual(expected);
      });

      getRetailersSubj$.next(retailersStub);
      tick();
    }));
  });

  describe('#deleteProduct', () => {
    it('should delegate to DeleteProduct passing id', () => {
      const id = 'id';

      productsApiProviderMock.deleteProduct.mockReturnValue(of());

      service.deleteSelectedProduct(id);

      expect(productsApiProviderMock.deleteProduct).toHaveBeenCalledWith(id);
    });

    it('should navigate to products list', fakeAsync(() => {
      const id = 'id';

      const deleteProductResponse$ = of(void 0);

      productsApiProviderMock.deleteProduct.mockReturnValue(
        deleteProductResponse$
      );

      flush();

      service.deleteSelectedProduct(id);
    }));
  });

  describe('#selectProduct', () => {
    it('should navigate to product detail page', () => {
      const product = makeProductViewModelsStub(1)[0];

      service.productSelected(product.id);

      expect(navigationManagerMock.navigateToProduct).toHaveBeenCalledWith(
        product.id
      );
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

    it('should set selected product state', fakeAsync(() => {
      const product = makeProductsStub(1)[0];
      const expected = toProductViewModel(product);

      productsApiProviderMock.getOneProduct.mockReturnValue(
        scheduled([product], asyncScheduler)
      );

      service.selectedProduct$.subscribe((selectedProduct) => {
        expect(selectedProduct).toEqual(expected);
      });

      service.loadProduct(product.id);
      tick();
    }));
  });

  describe('#updateProductPrice', () => {
    it('should delegate to UpdateProduct passing updated product an updated price', fakeAsync(() => {
      const productStub = makeProductsStub(1)[0];
      const priceStub = productStub.Prices[0];

      const expectedProduct = { ...productStub, Prices: [priceStub] };

      toProductSaveDtoMock.mockReturnValue(expectedProduct);
      productsApiProviderMock.updateProduct.mockReturnValue(
        of(expectedProduct as Product)
      );

      service.selectedProductUpdate(toProductViewModel(productStub));

      tick();

      expect(productsApiProviderMock.updateProduct).toHaveBeenCalled();
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
