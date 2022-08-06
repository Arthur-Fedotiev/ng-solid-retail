import { Category } from './Category';
import { Price } from './Price';

export interface Product {
  readonly Id: string;
  readonly Name: string;
  readonly Description: string;
  readonly Categories: Category[];
  readonly SKU: string;
  readonly Prices: Price[];
}
