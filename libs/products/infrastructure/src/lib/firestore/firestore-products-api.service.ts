import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Category,
  Product,
  ProductsApi,
  Retailer,
} from '@omnia/products/domain';
import { convertOneSnap, convertSnaps } from '@omnia/shared/util';
import firebase from 'firebase/compat/app';
import { first, from, map, mapTo, Observable, pipe, take } from 'rxjs';

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

  public getOneProduct(id: string): Observable<Product> {
    return this.afs
      .doc<Product>(`products/${id}`)
      .get()
      .pipe(
        map<firebase.firestore.DocumentSnapshot<Product>, Product>(
          convertOneSnap
        ),
        take(1)
      );
  }

  public getCategories(): Observable<readonly Category[]> {
    return this.afs
      .collection<Product>('categories')
      .get()
      .pipe(map(convertSnaps));
  }

  public getCompetitorsForCategory(
    category: Category
  ): Observable<ReadonlyArray<Retailer>> {
    return from(
      this.afs
        .collection<Product>('products')
        .ref.where('Categories', 'array-contains', category)
        .get()
    ).pipe(
      map(convertSnaps),
      map((products) =>
        products
          .map((product) => product.Prices.map((price) => price.Retailer))
          .flat(1)
      )
    );
  }

  public createProduct(product: Product): Observable<Product> {
    const id = product.id;

    const toFirstProduct = () => pipe(first(), mapTo(product));

    const product$ = id
      ? from(this.afs.doc<Product>(`products/${id}`).set(product)).pipe(
          toFirstProduct()
        )
      : from(this.afs.collection<Product>(`products`).add(product)).pipe(
          toFirstProduct()
        );

    return product$;
  }

  public updateProduct(product: Product): Observable<Product> {
    return from(
      this.afs.doc<Product>(`products/${product.id}`).update(product)
    ).pipe(mapTo(product));
  }

  public getRetailers(): Observable<readonly Retailer[]> {
    return this.afs
      .collection<Product>('retailers')
      .get()
      .pipe(map(convertSnaps));
  }

  public deleteProduct(productId: string): Observable<void> {
    return from(this.afs.doc<Product>(`products/${productId}`).delete()).pipe();
  }
}
