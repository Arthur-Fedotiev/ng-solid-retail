import { Category } from './Category';
import { Price } from './Price';

export class Product {
  public readonly Id: string;
  public readonly Name: string;
  public readonly Description: string;
  public readonly SKU: string;
  public readonly Categories: Category[];
  public readonly Prices: Price[];

  public readonly id?: string;

  constructor(product: Product) {
    this.Id = product.Id;
    this.Name = product.Name;
    this.Description = product.Description;
    this.SKU = product.SKU;
    this.Categories = product.Categories;
    this.Prices = product.Prices;
  }
}
