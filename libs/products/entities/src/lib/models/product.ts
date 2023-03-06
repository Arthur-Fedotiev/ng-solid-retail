import { Category } from './category';
import { Price } from './price';

export class Product {
  public readonly id: string;
  public readonly Name: string;
  public readonly Description: string;
  public readonly SKU: string;
  public readonly Category: Category;
  public readonly Prices: Price[];
  public readonly Url: string;
  public readonly Specifications: Record<string, any>;

  constructor(product: Product) {
    this.id = product.id;
    this.Name = product.Name;
    this.Description = product.Description;
    this.SKU = product.SKU;
    this.Category = product.Category;
    this.Prices = product.Prices;
    this.Url = product.Url;
    this.Specifications = product.Specifications;
  }
}
