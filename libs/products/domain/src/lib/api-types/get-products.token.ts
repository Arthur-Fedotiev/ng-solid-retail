import { Observable } from 'rxjs';
import { Category, Product, Retailer } from '../..';

export interface ProductsApi {
  getProducts(): Observable<ReadonlyArray<Product>>;
  getCategories(): Observable<ReadonlyArray<Category>>;
  createProduct(product: Product): Observable<Product>;
  getRetailers(): Observable<ReadonlyArray<Retailer>>;
}
