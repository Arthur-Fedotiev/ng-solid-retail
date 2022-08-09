import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EMPTY, of } from 'rxjs';
import { makeProductsStub } from '../testing/make-products-stub';
import { makeCollectionStub } from './testing/make-collection-stub';
import { FirestoreProductsApiService } from './firestore-products-api.service';

describe('FirestoreProductsApiService', () => {
  const collectionGetMock = jest.fn().mockReturnValue(EMPTY);
  const collectionAddMock = jest.fn().mockReturnValue(EMPTY);
  const docSetMock = jest.fn().mockReturnValue(EMPTY);

  let service: FirestoreProductsApiService;
  let afsMock: jest.Mocked<AngularFirestore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: {
            collection: jest.fn().mockReturnValue({
              add: collectionAddMock,
              get: collectionGetMock,
            }),
            doc: jest.fn().mockReturnValue({ set: docSetMock }),
          },
        },
      ],
    });
    service = TestBed.inject(FirestoreProductsApiService);
    afsMock = TestBed.inject(AngularFirestore) as jest.Mocked<AngularFirestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());

  describe('getProducts', () => {
    it('should call afs.collection with the correct name', () => {
      service.getProducts().subscribe();

      expect(afsMock.collection).toHaveBeenCalledWith('products');
    });

    it('should return products', fakeAsync(() => {
      const productsStub = makeProductsStub(3);
      const collectionStub = makeCollectionStub(productsStub);

      service.getProducts().subscribe();

      collectionGetMock.mockReturnValueOnce(of(collectionStub)),
        service.getProducts().subscribe((products) => {
          expect(products).toEqual(productsStub);
        });
      tick();
    }));
  });

  describe('getCategories', () => {
    it('should call afs.collection with the correct name', () => {
      service.getCategories().subscribe();

      expect(afsMock.collection).toHaveBeenCalledWith('categories');
    });

    it('should return categories', fakeAsync(() => {
      const categoriesStub = makeProductsStub(3).filter(
        (product) => product.Categories
      );
      const collectionStub = makeCollectionStub(categoriesStub);

      service.getCategories().subscribe();

      collectionGetMock.mockReturnValueOnce(of(collectionStub)),
        service.getCategories().subscribe((categories) => {
          expect(categories).toEqual(categoriesStub);
        });
      tick();
    }));
  });

  describe('getRetailers', () => {
    it('should call afs.collection with the correct name', () => {
      service.getRetailers().subscribe();

      expect(afsMock.collection).toHaveBeenCalledWith('retailers');
    });

    it('should return retailers', fakeAsync(() => {
      const retailersStub = makeProductsStub(3).filter((product) =>
        product.Prices.map((price) => price.Retailer)
      );
      const collectionStub = makeCollectionStub(retailersStub);

      service.getRetailers().subscribe();

      collectionGetMock.mockReturnValueOnce(of(collectionStub)),
        service.getRetailers().subscribe((retailers) => {
          expect(retailers).toEqual(retailersStub);
        });

      tick();
    }));
  });

  //createProduct
  describe('createProduct', () => {
    it('should call afs.collection with the correct name', () => {
      const productStub = makeProductsStub(1)[0];

      service.createProduct(productStub).subscribe();

      expect(afsMock.collection).toHaveBeenCalledWith('prices');
    });

    it('should call persist each price', () => {
      const productStub = makeProductsStub(1)[0];

      service.createProduct(productStub).subscribe();

      expect(afsMock.collection).toHaveBeenCalledTimes(
        productStub.Prices.length
      );
    });
  });
});
