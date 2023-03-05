import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { makeProductsStub } from '../testing/make-products-stub';
import { makeCollectionStub } from './testing/make-collection-stub';
import { FirestoreProductsApiService } from './firestore-products-api.service';
import { makeDocStub } from './testing/make-doc-stub';
import { Price } from '@sr/products/entities';

export class AngularFirestoreMock {
  collectionGetMock = jest.fn().mockReturnValue(of());
  collectionAddMock = jest.fn().mockReturnValue(of());
  collectionValueChangesMock = jest.fn().mockReturnValue(of());
  docSetMock = jest.fn().mockReturnValue(of());
  docGetMock = jest.fn().mockReturnValue(of());
  docUpdateMock = jest.fn().mockReturnValue(of());

  deleteMock = jest.fn().mockReturnValue(of());
  whereMock = jest.fn().mockReturnValue({ get: this.docGetMock });

  collection = jest.fn().mockReturnValue({
    add: this.collectionAddMock,
    get: this.collectionGetMock,
    ref: { where: this.whereMock },
    valueChanges: this.collectionValueChangesMock,
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

      service.getProducts().subscribe();

      afsMock.collectionValueChangesMock.mockReturnValueOnce(of(productsStub));

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

    it('should invoke valueChanges() on the collection with the correct idField', () => {
      service.getCategories().subscribe();

      expect(afsMock.collectionValueChangesMock).toHaveBeenCalledWith({
        idField: 'id',
      });
    });

    it('should return categories', fakeAsync(() => {
      const categoriesStub = makeProductsStub(3).filter(
        (product) => product.Category
      );

      service.getCategories().subscribe();

      afsMock.collectionValueChangesMock.mockReturnValueOnce(
        of(categoriesStub)
      );

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

    it('should invoke retailer collection valueChanges() on the collection with the correct idField', () => {
      service.getRetailers().subscribe();

      expect(afsMock.collectionValueChangesMock).toHaveBeenCalledWith({
        idField: 'id',
      });
    });

    it('should return retailers', fakeAsync(() => {
      const retailersStub = makeProductsStub(3).filter((product) =>
        product.Prices.map((price: Price) => price.Retailer)
      );

      afsMock.collectionValueChangesMock.mockReturnValueOnce(of(retailersStub));

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
    it('should call afs.doc with the correct collection name and id', () => {
      const productStub = makeProductsStub(1)[0];

      service.updateProduct(productStub).subscribe();

      expect(afsMock.doc).toHaveBeenCalledWith(`products/${productStub.id}`);
    });

    it('should map to updatedProduct', fakeAsync(() => {
      const productStub = makeProductsStub(1)[0];
      afsMock.docUpdateMock.mockReturnValue(of(productStub));

      service
        .updateProduct(productStub)
        .subscribe((updatedProduct) =>
          expect(updatedProduct).toEqual(productStub)
        );

      tick();
    }));
  });

  describe('getCompetitorsForCategory', () => {
    it('should call firestore with the correct data', () => {
      const categoryStub = makeProductsStub(1)[0].Category;

      service.getCompetitorsForCategory(categoryStub).subscribe();

      expect(afsMock.whereMock).toHaveBeenCalledWith(
        'Category.id',
        '==',
        categoryStub.id
      );
    });

    it('should return competitors', fakeAsync(() => {
      const productsStub = makeProductsStub(3).slice(0, 1);
      const collectionStub = makeCollectionStub(productsStub);
      const categoryStub = productsStub[0].Category;

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
