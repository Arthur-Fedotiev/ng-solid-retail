import { CategoryDTO } from './category';
import { PriceDTO } from './price';

export class ProductDTO {
  public readonly id: string;
  public readonly Name: string;
  public readonly Description: string;
  public readonly SKU: string;
  public readonly Category: CategoryDTO;
  public readonly Prices: PriceDTO[];
  public readonly Url: string;
  public readonly Specifications: Record<string, any>;

  constructor(product: ProductDTO) {
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
