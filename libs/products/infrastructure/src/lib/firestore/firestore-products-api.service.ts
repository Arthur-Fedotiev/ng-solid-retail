import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import {
  Category,
  Price,
  Product,
  ProductsApi,
  Retailer,
} from '@omnia/products/domain';
import { convertSnaps } from '@omnia/shared/util';
import {
  first,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProductsApiService implements ProductsApi {
  constructor(private readonly afs: AngularFirestore) {}

  public getProducts(): Observable<ReadonlyArray<Product>> {
    return this.afs
      .collection<Product>('products')
      .get()
      .pipe(map(convertSnaps));
  }

  public getCategories(): Observable<readonly Category[]> {
    return this.afs
      .collection<Product>('categories')
      .get()
      .pipe(map(convertSnaps));
  }

  public createProduct(product: Product): Observable<any> {
    const { Prices } = product;
    const id = product.id;

    const prices$ = Prices.length
      ? Prices.map((price) => this.createOnePrice({ ...price, productId: id }))
      : [of({})];

    const product$ = id
      ? from(this.afs.doc<Product>(`products/${id}`).set(product)).pipe(first())
      : from(this.afs.collection<Product>(`products`).add(product)).pipe(
          first()
        );

    return forkJoin(prices$).pipe(switchMap(() => product$));
  }

  public getRetailers(): Observable<readonly Retailer[]> {
    return this.afs
      .collection<Product>('retailers')
      .get()
      .pipe(map(convertSnaps));
  }

  public deleteProduct(productId: string): Observable<any> {
    return from(this.afs.doc<Product>(`products/${productId}`).delete()).pipe(
      tap(() => console.log('deleted product')),
      switchMap(() => this.deletePrices(productId))
    );
  }

  private createOnePrice(price: Price): Observable<DocumentReference<Price>> {
    return from(this.afs.collection<Price>(`prices`).add(price)).pipe(take(1));
  }

  private deletePrices(productId: string): Observable<void[]> {
    return from(
      this.afs
        .collection<Price>(`prices`)
        .ref.where('productId', '==', productId)
        .get()
    ).pipe(
      mergeMap(({ docs }) =>
        forkJoin(docs.map((doc) => from(doc.ref.delete())))
      )
    );
  }
}
