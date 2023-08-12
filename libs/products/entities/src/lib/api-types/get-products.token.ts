import { Observable } from 'rxjs';
import { Category, ProductDTO, Retailer } from '../dtos/get';
import { CreateProductDto } from '../dtos/post/product';
import { PutProductDto } from '../dtos/put/product';

export interface ProductsApi {
  getProducts(): Observable<ReadonlyArray<ProductDTO>>;
  getOneProduct(id: string): Observable<ProductDTO>;
  getCategories(): Observable<ReadonlyArray<Category>>;
  createProduct(product: CreateProductDto): Observable<ProductDTO>;
  getRetailers(): Observable<ReadonlyArray<Retailer>>;
  deleteProduct(productId: string): Observable<void>;
  updateProduct(product: PutProductDto): Observable<ProductDTO>;
  getCompetitorsForCategory(
    category: Category
  ): Observable<ReadonlyArray<Retailer>>;
}
