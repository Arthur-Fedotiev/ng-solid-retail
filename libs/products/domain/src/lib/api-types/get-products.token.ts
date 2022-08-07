import { Observable } from 'rxjs';
import { Product } from '../..';

export interface GetProducts {
  getProducts(): Observable<ReadonlyArray<Product>>;
}
