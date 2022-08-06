import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Product, ProductUrls } from '@omnia/products/domain';
import { of } from 'rxjs';

import { HttpProductsService } from './http-products-service.service';
import { PRODUCT_URLS } from './providers/products-urls.token';

describe('HttpProductsService', () => {
  let httpClientMock: jest.Mocked<HttpClient>;
  let service: HttpProductsService;
  let productUrlsMock: ProductUrls;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PRODUCT_URLS,
          useValue: { getProducts: '/test-api/products' },
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
    const makeProductsStub = (count: number): Partial<Product>[] =>
      Array(count).map((_, i) => ({
        Id: i.toString(),
        Name: `Product ${i}`,
        Description: `Product ${i} description`,
      }));
    let productsStub: Partial<Product>[];

    beforeEach(() => (productsStub = makeProductsStub(3)));

    afterEach(() => jest.clearAllMocks());

    it('should call http.get with the correct url', () => {
      httpClientMock.get.mockReturnValue(of(productsStub));

      service.getProducts().subscribe();

      expect(httpClientMock.get).toHaveBeenNthCalledWith(
        1,
        productUrlsMock.getProducts
      );
    });

    it('should return products', fakeAsync(() => {
      httpClientMock.get.mockReturnValue(of(productsStub));

      service.getProducts().subscribe((products) => {
        expect(products).toEqual(productsStub);
      });

      tick();
    }));
  });
});
