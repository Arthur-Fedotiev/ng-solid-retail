import { Observable } from 'rxjs';
import { Category, Product } from '../..';

export interface ProductsApi {
  getProducts(): Observable<ReadonlyArray<Product>>;
  getCategories(): Observable<ReadonlyArray<Category>>;
  createProduct(product: Product): Observable<Product>;
}
