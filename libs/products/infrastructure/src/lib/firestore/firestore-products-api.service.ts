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
import { ProductCollectionsEnum } from './product-collections.enum';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProductsApiService implements ProductsApi {
  constructor(private readonly afs: AngularFirestore) {}

  public getProducts(): Observable<ReadonlyArray<Product>> {
    return this.afs
      .collection<Product>(ProductCollectionsEnum.Products)
      .valueChanges();
  }

  public getOneProduct(id: string): Observable<Product> {
    return this.afs
      .doc<Product>(`${ProductCollectionsEnum.Products}/${id}`)
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
      .collection<Product>(`${ProductCollectionsEnum.Categories}`)
      .valueChanges({ idField: 'id' });
  }

  public getCompetitorsForCategory(
    category: Category
  ): Observable<ReadonlyArray<Retailer>> {
    return from(
      this.afs
        .collection<Product>(`${ProductCollectionsEnum.Products}`)
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
      ? from(
          this.afs
            .doc<Product>(`${ProductCollectionsEnum.Products}/${id}`)
            .set(product)
        ).pipe(toFirstProduct())
      : from(
          this.afs
            .collection<Product>(`${ProductCollectionsEnum.Products}`)
            .add(product)
        ).pipe(toFirstProduct());

    return product$;
  }

  public updateProduct(product: Product): Observable<Product> {
    return from(
      this.afs
        .doc<Product>(`${ProductCollectionsEnum.Products}/${product.id}`)
        .update(product)
    ).pipe(mapTo(product));
  }

  public getRetailers(): Observable<readonly Retailer[]> {
    return this.afs
      .collection<Product>(`${ProductCollectionsEnum.Retailers}`)
      .valueChanges({ idField: 'id' });
  }

  public deleteProduct(productId: string): Observable<void> {
    return from(
      this.afs
        .doc<Product>(`${ProductCollectionsEnum.Products}/${productId}`)
        .delete()
    ).pipe();
  }
}
