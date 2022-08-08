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
          },
        },
        { provide: HttpClient, useValue: { get: jest.fn() } },
      ],
    });

    service = TestBed.inject(HttpProductsService);
    httpClientMock = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
    productUrlsMock = TestBed.inject(PRODUCT_URLS);
  });

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
});
