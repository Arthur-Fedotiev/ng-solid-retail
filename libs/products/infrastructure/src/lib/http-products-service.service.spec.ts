import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Product, ProductUrls } from '@omnia/products/domain';
import { of } from 'rxjs';

import { HttpProductsService } from './http-products-service.service';
import { PRODUCT_URLS } from './providers/products-urls.token';
import { makeProductsStub } from './testing/make-products-stub';

describe('HttpProductsService', () => {
  let httpClientMock: jest.Mocked<HttpClient>;
  let service: HttpProductsService;
  let productUrlsMock: ProductUrls;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCT_URLS,
          useValue: {
            productsApi: '/test-api/products',
            categoriesApi: '/test-api/categories',
            pricesApi: '/test-api/prices',
            retailersApi: '/test-api/retailers',
          },
        },
        { provide: HttpClient, useValue: { get: jest.fn(), post: jest.fn() } },
      ],
    });

    service = TestBed.inject(HttpProductsService);
    httpClientMock = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
    productUrlsMock = TestBed.inject(PRODUCT_URLS);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    let productsStub: ReadonlyArray<Product>;

    beforeEach(() => (productsStub = makeProductsStub(3)));

    afterEach(() => jest.clearAllMocks());

    it('should call http.get with the correct url', () => {
      httpClientMock.get.mockReturnValueOnce(of(productsStub));

      service.getProducts().subscribe();

      expect(httpClientMock.get).toHaveBeenNthCalledWith(
        1,
        productUrlsMock.productsApi
      );
    });

    it('should return products', fakeAsync(() => {
      httpClientMock.get.mockReturnValueOnce(of(productsStub));

      service.getProducts().subscribe((products) => {
        expect(products).toEqual(productsStub);
      });

      tick();
    }));
  });

  describe('getCategories', () => {
    it('should call http.get with the correct url', () => {
      httpClientMock.get.mockReturnValueOnce(of([]));

      service.getCategories().subscribe();

      expect(httpClientMock.get).toHaveBeenNthCalledWith(
        1,
        productUrlsMock.categoriesApi
      );
    });

    it('should return an array of categories', fakeAsync(() => {
      const categoriesStub = ['category1', 'category2'];
      httpClientMock.get.mockReturnValueOnce(of(categoriesStub));

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(categoriesStub);
      });

      tick();
    }));
  });

  describe('createProduct', () => {
    it('should call http.post with the correct data', () => {
      const product = {
        id: '1',
        name: 'test',
        Prices: [],
      } as unknown as Product;
      httpClientMock.post.mockReturnValueOnce(of(product));

      service.createProduct(product).subscribe();

      expect(httpClientMock.post).toHaveBeenNthCalledWith(
        1,
        productUrlsMock.productsApi,
        product
      );
    });

    it('should return product when created', fakeAsync(() => {
      const product = {
        id: '1',
        name: 'test',
        Prices: [],
      } as unknown as Product;
      httpClientMock.post.mockReturnValueOnce(of(product));

      service.createProduct(product).subscribe((createdProduct) => {
        expect(createdProduct).toEqual(product);
      });

      tick();
    }));

    it('should also create one price for when the product is created', fakeAsync(() => {
      const productPOSTDtoStub = {
        Id: '1',
        Name: 'test',
        Prices: [
          { Id: '1', Price: 1 },
          { Id: '2', Price: 2 },
        ],
      } as unknown as Product;
      const expectedPrices = productPOSTDtoStub.Prices;

      httpClientMock.post.mockReturnValueOnce(of(expectedPrices[0]));
      httpClientMock.post.mockReturnValueOnce(of(expectedPrices[1]));
      httpClientMock.post.mockReturnValueOnce(of(productPOSTDtoStub));

      service.createProduct(productPOSTDtoStub).subscribe();

      expectedPrices.forEach((_, idx) => {
        expect(httpClientMock.post).toHaveBeenNthCalledWith(
          idx + 1,
          productUrlsMock.pricesApi,
          expectedPrices[idx]
        );
      });

      tick();
    }));
  });

  describe('getRetailers', () => {
    it('should call http.get with the correct url', () => {
      httpClientMock.get.mockReturnValueOnce(of([]));

      service.getRetailers();

      expect(httpClientMock.get).toHaveBeenNthCalledWith(
        1,
        productUrlsMock.retailersApi
      );
    });

    it('should return an array of retailers', fakeAsync(() => {
      const retailersStub = ['retailer1', 'retailer2'];
      httpClientMock.get.mockReturnValueOnce(of(retailersStub));

      service.getRetailers().subscribe((retailers) => {
        expect(retailers).toEqual(retailersStub);
      });

      tick();
    }));
  });
});
