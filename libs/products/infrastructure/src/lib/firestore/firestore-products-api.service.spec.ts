import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { makeProductsStub } from '../testing/make-products-stub';
import { makeCollectionStub } from './testing/make-collection-stub';
import { FirestoreProductsApiService } from './firestore-products-api.service';
import { makeDocStub } from './testing/make-doc-stub';

export class AngularFirestoreMock {
  collectionGetMock = jest.fn().mockReturnValue(of());
  collectionAddMock = jest.fn().mockReturnValue(of());
  docSetMock = jest.fn().mockReturnValue(of());
  docGetMock = jest.fn().mockReturnValue(of());
  docUpdateMock = jest.fn().mockReturnValue(of());

  deleteMock = jest.fn().mockReturnValue(of());
  whereMock = jest.fn().mockReturnValue({ get: this.docGetMock });

  collection = jest.fn().mockReturnValue({
    add: this.collectionAddMock,
    get: this.collectionGetMock,
    ref: { where: this.whereMock },
  });
  doc = jest.fn().mockReturnValue({
    get: this.docGetMock,
    set: this.docSetMock,
    delete: this.deleteMock,
    update: this.docUpdateMock,
  });
}

describe('FirestoreProductsApiService', () => {
  let service: FirestoreProductsApiService;
  let afsMock: AngularFirestoreMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useClass: AngularFirestoreMock,
        },
      ],
    });
    service = TestBed.inject(FirestoreProductsApiService);
    afsMock = TestBed.inject(
      AngularFirestore
    ) as unknown as AngularFirestoreMock;
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

      afsMock.collectionGetMock.mockReturnValueOnce(of(collectionStub)),
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

      afsMock.collectionGetMock.mockReturnValueOnce(of(collectionStub)),
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

      afsMock.collectionGetMock.mockReturnValueOnce(of(collectionStub)),
        service.getRetailers().subscribe((retailers) => {
          expect(retailers).toEqual(retailersStub);
        });

      tick();
    }));
  });

  describe('deleteProduct', () => {
    it('should call afs.collection with the correct collection name and id', () => {
      const productId = 'productId';

      service.deleteProduct(productId).subscribe();

      expect(afsMock.doc).toHaveBeenCalledWith(`products/${productId}`);
    });

    it('should call afs.doc.delete', () => {
      const productId = 'productId';

      service.deleteProduct(productId).subscribe();

      expect(afsMock.deleteMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneProduct', () => {
    it('should use products collection passing id', () => {
      const productId = 'productId';

      service.getOneProduct(productId).subscribe();

      expect(afsMock.doc).toHaveBeenCalledWith(`products/${productId}`);
    });

    it('should return product', fakeAsync(() => {
      const productStub = makeProductsStub(1)[0];
      const docStub = makeDocStub(productStub);

      afsMock.docGetMock.mockReturnValue(of(docStub));

      service
        .getOneProduct('1')
        .subscribe((product) => expect(product).toEqual(productStub));

      tick();
    }));
  });

  describe('#updateProductPrice', () => {
    //should call afs.doc with the correct collection name and id
    it('should call afs.doc with the correct collection name and id', waitForAsync(() => {
      const productStub = makeProductsStub(1)[0];

      service.updateProduct(productStub).subscribe(() => {
        expect(afsMock.doc).toHaveBeenCalledWith(`product/${productStub.id}`);
      });
    }));

    it('should call afs.doc.update with the correct price', waitForAsync(() => {
      const productStub = makeProductsStub(1)[0];

      service.updateProduct(productStub).subscribe(() => {
        expect(afsMock.docUpdateMock).toHaveBeenCalledWith(null);
      });
    }));
  });

  describe('getCompetitorsForCategory', () => {
    it('should call firestore with the correct data', () => {
      const categoryStub = makeProductsStub(1)[0].Categories[0];

      service.getCompetitorsForCategory(categoryStub).subscribe();

      expect(afsMock.whereMock).toHaveBeenCalledWith(
        'Categories',
        'array-contains',
        categoryStub
      );
    });

    it('should return competitors', fakeAsync(() => {
      const productsStub = makeProductsStub(3).slice(0, 1);
      const collectionStub = makeCollectionStub(productsStub);
      const categoryStub = productsStub[0].Categories[0];

      const expectedRetailers = productsStub[0].Prices.map(
        (price) => price.Retailer
      );

      afsMock.docGetMock.mockReturnValue(of(collectionStub));

      service
        .getCompetitorsForCategory(categoryStub)
        .subscribe((competitors) => {
          expect(competitors).toEqual(expectedRetailers);
        });

      tick();
    }));
  });
});
