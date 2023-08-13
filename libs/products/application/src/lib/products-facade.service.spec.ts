import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ProductsApi } from '@sr/products/entities';
import { PRODUCTS_API, makeProductsStub } from '@sr/products/infrastructure';
import { ID_GENERATOR } from '@sr/shared/util';
import { asyncScheduler, of, scheduled, Subject } from 'rxjs';
import { ProductsStateModel } from './models/products-state.model';
import { ProductViewModel } from './models/product.view-model';

import { ProductsFacadeService } from './products-facade.service';
import { TO_PRODUCT_SAVE_DTO } from './providers/to-product-save-dto.token';
import { makeProductViewModelsStub } from './testing/make-product-view-models-stub';
import { toProductViewModel } from './utils/mappers/to-view-model';
import { ProductsNavigationManagerService } from './navigation/products-navigation-manager.service';
import { Categories, Retailers } from './shared/constants';
import { ProductDTO } from '@sr/products/entities';

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
    let productsStub: ReadonlyArray<ProductDTO>;

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
        price: productsViewModelsStub[0].prices[0].value,
        name: productsViewModelsStub[0].name,
        sku: productsViewModelsStub[0].sku,
        url: productsViewModelsStub[0].url,
        retailer: productsViewModelsStub[0].prices[0].retailer,
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
        scheduled([{} as ProductDTO], asyncScheduler)
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
      const priceStub = productStub.prices[0];

      const expectedProduct = { ...productStub, Prices: [priceStub] };

      toProductSaveDtoMock.mockReturnValue(expectedProduct);
      productsApiProviderMock.updateProduct.mockReturnValue(
        of(expectedProduct as ProductDTO)
      );

      service.selectedProductUpdate(toProductViewModel(productStub));

      tick();

      expect(productsApiProviderMock.updateProduct).toHaveBeenCalled();
    }));
  });

  describe('#getCompetitorsForCategory$', () => {
    it('should delegate to GetCompetitorsForCategory passing Category', fakeAsync(() => {
      const categoryStub = Categories.Books;

      service.getCompetitorsForCategory$(categoryStub);
      tick();

      expect(
        productsApiProviderMock.getCompetitorsForCategory
      ).toHaveBeenCalledWith(categoryStub);
    }));

    it('should return retailers mapped to view models', fakeAsync(() => {
      const categoryStub = Categories.Books;
      const retailersStub = [Retailers.Amazon];
      const expected = [{ value: Retailers.Amazon, label: Retailers.Amazon }];

      productsApiProviderMock.getCompetitorsForCategory.mockReturnValue(
        of(retailersStub)
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
